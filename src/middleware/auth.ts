import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";

import UserModel, { UserProps } from "src/mongoose/schema/User";
import config from "src/config";

const authMiddleware: RequestHandler = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) {
			return next();
		}

		const accessToken = authorization.split(" ")[1];

		const decoded = verify(accessToken, config.auth.jwtSecret, { maxAge: "1h" }) as Record<string, unknown>;
		if (!decoded) {
			return next();
		}

		const user = await UserModel.findOne({ _id: decoded.userId as string });
		if (!user) {
			return next();
		}

		Object.assign(req, { user: user.toObject() as UserProps });

		return next();
	} catch (error) {
		return next();
	}
};

export default authMiddleware;
