/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';

import { Request, Response, NextFunction } from 'express';

class UserController {
  public UserService = new userService();

  /**
   * Controller to get all users available
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.signUp(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'User created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to get a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.login(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'User logged in successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to create new user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public forgetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.forgetPassword(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Success'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to update a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public generateOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.generateOtp(req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Otp sent successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to delete a single user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await this.UserService.resetPassword(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: {},
        message: 'Password reset successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to delete a single user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public forgetPasswordOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await this.UserService.forgetPasswordOtp(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: {},
        message: 'Password reset successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to delete a single user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public regenerateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await this.UserService.regenerateToken(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: {},
        message: 'Tokens refreshed successfully'
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
