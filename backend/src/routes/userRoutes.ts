import express from 'express';
import { UserController } from '../controllers';
import { UserClient } from '../clients/userClient';

export function createUserRouter(userClient: UserClient): express.Router {
  const userController = new UserController(userClient);
  const router = express.Router();

  router.get('/', userController.getAll);
  router.get('/:id', userController.getById);
  router.put('/:id', userController.update);

  return router;
}
