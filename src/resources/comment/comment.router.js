import { Router } from 'express';
import controllers from './comment.controllers';

const router = Router();
console.log("********", controllers);
router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne);

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

export default router;
