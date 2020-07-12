import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import moment from "moment";

import UserModel from "../mongoose/schema/User";
import config from "src/config";

const authMiddleware: RequestHandler = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) {
			return next();
		}

		const accessToken = authorization.split(" ")[1];

		const decoded = verify(accessToken, config.auth.jwtSecret) as Record<string, unknown>;
		if (!decoded) {
			return next();
		}

		// TODO: add expiracy
		// const isExpired = await redis.get(`expiredToken:${accessToken}`);
		// if (isExpired) {
		// 	return next();
		// }

		const user = await UserModel.findById(decoded.id as string);
		if (!user) {
			return next();
		}

		Object.assign(user, {
			accessToken,
			tokenExpiredOn: moment().add(1, "h").toDate(),
		});
		await user.save();

		Object.assign(req, { user });

		return next();
	} catch (error) {
		return next();
	}
};

export default authMiddleware;
