import express, { Router } from 'express';
import { UserController } from './controllers/users.controllers';
import { createUserValidator, existUserValidator, updateUserValidator } from './middlewares';

const userRoutes = (router: Router) => {
    const userController = new UserController();

    router.post('/users', createUserValidator, userController.createUser);

    router.get('/users', userController.getUsers);

    router.get('/users/:id', existUserValidator, userController.getUserById);

    router.put('/users/:id', existUserValidator, updateUserValidator, userController.updateUser);

    router.delete('/users/:id', existUserValidator, userController.deleteUser);
};

export { userRoutes };
