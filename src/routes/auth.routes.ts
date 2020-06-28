import { Router } from 'express';
import AuthController from '../controllers/auth/authController';
import { register, login} from './../validations/authValidation';
import { validateSchema } from './../validations/validater';


const AuthRouter: Router = Router();
const auth = new AuthController();

AuthRouter.post('/signup', validateSchema(register), auth.register);
AuthRouter.post('/login', validateSchema(login), auth.login);
AuthRouter.post('/googles', auth.socialSignUP);

export default AuthRouter;