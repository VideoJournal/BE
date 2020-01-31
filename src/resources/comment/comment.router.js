import { Router } from 'express';
import controllers from './comment.controllers';

const router = Router();

router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne);

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

router
  .route('/videos/:id')
  .get(controllers.getByVideoID);

export default router;
