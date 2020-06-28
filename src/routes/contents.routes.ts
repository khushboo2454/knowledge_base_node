// third parties
import { Router } from 'express';
import multer from 'multer';

// middlwares
import { AuthHandler } from '../middlewares/authHandler';

// routers
import ContentController from '../controllers/content/contentController';
import {validateSchema} from '../validations/validater';

const ContentRouter: Router = Router();
const auth = new AuthHandler();
const content = new ContentController();
const uploads = multer();

ContentRouter.post('/', uploads.single('document'),  content.addContent);
ContentRouter.get('/', auth.authenticate(), content.listContent);

export default ContentRouter;