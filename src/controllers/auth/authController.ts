import bcrypt from 'bcryptjs';
import * as HttpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import UserService from '../../services/users/users.service';
import { AuthHandler } from '../../middlewares/authHandler';
import { sendFailureResponse } from '../../commonFunction/Utills';

const userService = new UserService();

class AuthController {

  constructor() {
  }

  /**
   * validate and create tokens for users for login
   * @param {Request} req Express request object derived from http.incomingMessage
   * @param {Response} res Express response object
   * @param {Function} next Callback function
   */
  async login(req: Request, res: Response, next: NextFunction) {

    try {
        req.body.email = req.body.email.toLowerCase();
        const user = await userService.getUser(req.body.email);
        if (!user) throw 'Email is not registred';
        if (!user.password) {
          throw 'Either your email or password is incorrect';
          return;
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) throw 'Incorrect Password';
        // generate token and return
        const authHandler = new AuthHandler();
        const token = authHandler.generateToken(user);
        return res.status(HttpStatus.OK).json({
          success: true,
          data: {
            token,
            user_data: {
              id: user.id,
              username: user.name,
              email: user.email,
            }
          }
        });
    } catch (error) {
      console.log(error);
      return sendFailureResponse(error, HttpStatus.BAD_REQUEST, false, res);
    }
  }

  /**
   * Register new user
   * @param {Request} req Express request object derived from http.incomingMessage
   * @param {Response} res Express response object
   * @param {Function} next Callback function
   */
  async register(req: Request, res: Response, next: NextFunction) {

    try {
        req.body.email = req.body.email.toLowerCase();
        const user = await userService.getUser(req.body.email);
        if (user) throw 'Email already exists';
        // generate token and return
        await userService.insert(req.body);
        return res.status(HttpStatus.OK).json({
          success: true,
          data: [],
          message: 'Email register successfully'
        });
    } catch (error) {
      return sendFailureResponse(error, HttpStatus.BAD_REQUEST, false, res);
    }
  }

  /**
   * Users social signup and signin
   * @param {Request} req Express request object derived from http.incomingMessage
   * @param {Response} res Express response object
   * @param {Function} next Callback function
   */
  async socialSignUP(req: Request, res: Response, next: NextFunction) {

    try {
        let user = await userService.getBySocialId(req.body.googleId);
        if (!user) {
          user = await userService.insert(req.body);
        }
        // generate token and return
        const authHandler = new AuthHandler();
        const token = authHandler.generateToken(user);
        return res.status(HttpStatus.OK).json({
          success: true,
          data: {
            token,
            user_data: {
              id: user.id,
              username: user.name,
              email: user.email,
            }
          }
        });
    } catch (error) {
      return sendFailureResponse(error, HttpStatus.BAD_REQUEST, false, res);
    }
  }

}

export default AuthController;
