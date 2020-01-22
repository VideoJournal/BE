import { Router } from 'express';
import controllers from './video.controllers';

const router = Router();

router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne);

router
  .route('/:id')
  .get(controllers.getOne)
  .delete(controllers.removeOne);

export default router;
