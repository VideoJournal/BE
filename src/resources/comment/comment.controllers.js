import { crudControllers } from '../../utils/crud';
import { Comment } from './comment.model';

const controllers = crudControllers(Comment);

export default controllers;
