import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../../Domain/constants/StatusCodes";

export const authorize = (...uloge: string[]) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		const user = req.user;
  
		if (!user || !uloge.includes(user.uloga)) {
			res
        .status(StatusCodes.FORBIDDEN)
        .json({ success: false, message: "Zabranjen pristup" });
			return;
		}
    
		next();
	};
};
