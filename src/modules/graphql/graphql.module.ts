'use strict';

import { Module } from '@nestjs/common';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { DatabaseModule } from '../database/database.module';
import { AuthMiddleware } from '../common/index';
import { GraphqlController } from './graphql.controller';

@Module({
    modules: [DatabaseModule],
    controllers: [GraphqlController],
})
export class GraphqlModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(GraphqlController);
    }
}
