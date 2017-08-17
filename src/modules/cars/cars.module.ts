'use strict';

import { Module } from '@nestjs/common';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { CarsController } from "./cars.controller";

@Module({
    controllers: [CarsController],
    components: [],
    modules: [],
    exports: []
})
export class CarsModule {
    configure(consumer: MiddlewaresConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(CarsController);
    }
}
