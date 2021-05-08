import { NextFunction, Request, Response } from 'express';

const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (process.env.ENVIRONMENT === 'production') {
    if (req.headers['api-key'] === process.env.API_KEY) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  } else {
    next();
  }
};

export default authentication;
