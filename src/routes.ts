import { Router } from 'express';
import AuthRouter from './routes/auth.routes';
import CategoryRouter from './routes/category.routes';
import ContentRouter from './routes/contents.routes';

const router: Router = Router({ caseSensitive: true });

// routers
router.use('/auth', AuthRouter);
router.use('/category', CategoryRouter);
router.use('/content', ContentRouter);

export default router;