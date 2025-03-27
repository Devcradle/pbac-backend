import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let bearerToken = req.header('role');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { user }: any = 'sjhkajsh';
    res.locals.user = user;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};
