// middleware/authenticate.ts
import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken"; // Import Secret type from jsonwebtoken
import User, { IUser } from "../models/user"; // Correct casing for the file name

interface AuthRequest extends Request {
  user?: IUser;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" }); // Remove unnecessary casting
  }

  try {
    const secret: Secret = process.env.JWT_SECRET_KEY as Secret; // Use Secret type for clarity

    const decoded = jwt.verify(token, secret) as { loginkey: string };

    console.log(decoded);

    // Use Sequelize's findOne method to retrieve the user
    const user = await User.findOne({
      where: { id: decoded.loginkey },
      attributes: ["id"],
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log(user);

    // req.user = user; // Attach the user to the request for further use
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Error in authorization" }); // Fix typo in the error message
  }
};
