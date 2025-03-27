import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

class UserValidator {
  public signUp = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      username: Joi.string().min(4).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      role: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };

  public login = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };

  public forgetPassword = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const schema = Joi.object({
      email: Joi.string().email().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };

  public resetPassword = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const schema = Joi.object({
      password: Joi.string().min(6).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };
}

export default UserValidator;
