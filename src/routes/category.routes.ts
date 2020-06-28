import { Router } from 'express';
import { AuthHandler } from '../middlewares/authHandler';
import CategoryController from '../controllers/category/categoryController';

const CategoryRouter: Router = Router();
const auth = new AuthHandler();
const category = new CategoryController();

CategoryRouter.get('/', auth.authenticate(), category.listCategory);
CategoryRouter.post('/', auth.authenticate(), category.addCategory);

export default CategoryRouter;