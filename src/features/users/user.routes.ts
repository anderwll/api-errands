import express, { Router } from 'express';
import { UserController } from './controllers/users.controllers';
import { validationDataUser, validationExistUser } from './middlewares';

const userRoutes = (router: Router) => {
    const userController = new UserController();

    router.post('/users', validationDataUser, userController.createUser);

    router.get('/users', userController.getUsers);

    router.get('/users/:id', validationExistUser, userController.getUserById);

    router.put('/users/:id', validationExistUser, userController.updateUser);
};

export { userRoutes };

// name: string;
// password: string;
// darkMode: boolean;
// typeAccount: TypeAccount;
