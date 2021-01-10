import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const auth = (req, res, next) => {
	const authToken = req.headers['authorization']
	if(authToken != undefined) {

		const token = authToken.split(' ')[1];
		jwt.verify(token, process.env.API_ACCESS_TOKEN, (err, data) => {
			if(err) 
				res.status(401).json({ err: `INVALID TOKEN! ${err}` })
			else {

				req.token = token;
				req.loggedUser = data.name;
				console.log(data);
				next();
			}
		})
	} else {
		res.status(401)
		.json({ err: "INVALID TOKEN!" })
	}
}