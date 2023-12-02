// middleware/authenticate.ts
import { RequestHandler, Request, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import User from "../models/user";


import dotenv from 'dotenv';

/*
interface AuthRequest extends Request {
    userId?: string;
}

export const authenticate: RequestHandler<any, any, any, any> = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    try {
        const decoded = jwt.verify(token, 'e5520e9a60f29630f3d8d000cfa6135c237b176faebea851a367029c2d0be69e');
        (req as unknown as AuthRequest).userId = (decoded as { userId: string }).userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

*/



interface AuthRequest extends Request {
    user?: { id: string }; // Add the user property
  }


export const authenticate =  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
        return (res.status(401).json({ message: 'Unauthorized' }) as unknown) as Response;

    }
  
    try {

        const secret: any = process.env.JWT_SECRET_KEY
        
      const decoded = jwt.verify(token, secret) as { loginkey: string };
      
      console.log(decoded)
  
      // Use Sequelize's findOne method to retrieve the user
      const user = await User.findOne({
        where: { id: decoded.loginkey },
        attributes: ['id'],
      });
  
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      req.user = { id: user.dataValues.id }; // Attach the user to the request for further use
      next();
  
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'error in authorization' });
    }
  };

  