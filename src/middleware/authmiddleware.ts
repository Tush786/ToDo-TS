import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Authentication middleware to check if the user is authenticated

export const authenticate = ()=> {
return (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded; // Attach user info to request object
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
}

// Authorization middleware to check if the user has the correct role
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
