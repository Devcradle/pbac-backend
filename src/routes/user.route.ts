import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';

class UserRoutes {
  private UserController = new userController();
  private router = express.Router();
  private UserValidator = new userValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.post('', this.UserValidator.signUp, this.UserController.signUp);

    this.router.post(
      '/login',
      this.UserValidator.login,
      this.UserController.login
    );

    this.router.post(
      '/generateOtp',
      this.UserValidator.login,
      this.UserController.generateOtp
    );

    this.router.post(
      '/forgetPasswordOtp',
      this.UserValidator.login,
      this.UserController.forgetPasswordOtp
    );

    this.router.post(
      '/forgetPassword',
      this.UserValidator.login,
      this.UserController.forgetPassword
    );

    this.router.post(
      '/resetPassword',
      this.UserValidator.login,
      this.UserController.resetPassword
    );

    this.router.post(
      '/regenerateToken',
      this.UserValidator.login,
      this.UserController.regenerateToken
    );
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
