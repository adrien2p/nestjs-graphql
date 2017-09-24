'use strict';

import { Module } from '@nestjs/common';
import { MiddlewaresConsumer } from "@nestjs/common/interfaces/middlewares";
import { AuthMiddleware } from "../common/middlewares/auth.middleware";
import { GraphqlController } from "./graphql.controller";

@Module({
    controllers: [GraphqlController],
    components: [],
    modules: [],
    exports: []
})
export class GraphqlModule {
    configure(consumer: MiddlewaresConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(GraphqlController);
    }
}
