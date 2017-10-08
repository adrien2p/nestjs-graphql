'use strict';

import { Module } from '@nestjs/common';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { DatabaseModule } from '../database/database.module';
import { AuthMiddleware } from '../common/index';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { carsRepository } from './cars.provider';

@Module({
    modules: [DatabaseModule],
    controllers: [CarsController],
    components: [
        CarsService,
        carsRepository
    ]
})
export class CarsModule {
    configure (consumer: MiddlewaresConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(CarsController);
    }
}
