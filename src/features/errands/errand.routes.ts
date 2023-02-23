import express, { Router } from 'express';
import { existUserValidator } from '../users/middlewares';
import { ErrandController } from './controllers/errands.controllers';
import { createErrandValidator } from './middlewares/createErrand.validator';
import { existErrandValidator } from './middlewares/existErrand.validator';
import { updateErrandValidator } from './middlewares/updateErrand.validator';

const errandRoutes = (router: Router) => {
    const errandController = new ErrandController();

    router.post(
        '/users/:id/errands',
        existUserValidator,
        createErrandValidator,
        errandController.createErrand,
    );

    router.get('/users/:id/errands', existUserValidator, errandController.getErrands);

    router.get(
        '/users/:id/errands/:idErrand',
        existUserValidator,
        existErrandValidator,
        errandController.getErrandById,
    );

    router.put(
        '/users/:id/errands/:idErrand',
        existUserValidator,
        existErrandValidator,
        updateErrandValidator,
        errandController.updateErrand,
    );

    router.delete(
        '/users/:id/errands/:idErrand',
        existUserValidator,
        existErrandValidator,
        errandController.deleteErrand,
    );
};

export { errandRoutes };
