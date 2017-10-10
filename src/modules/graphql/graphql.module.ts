'use strict';

import { Module } from '@nestjs/common';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { CarsModule } from '../cars/cars.module';
import { UsersModule } from '../users/users.module';
import { AuthMiddleware } from '../common/index';
import { GraphqlController } from './graphql.controller';
import { GraphqlService } from './graphql.service';
import { typeDefsProvider } from './typeDefs.provider';

@Module({
    modules: [
        CarsModule,
        UsersModule,
    ],
    controllers: [GraphqlController],
    components: [
        GraphqlService,
        typeDefsProvider,
    ]
})
export class GraphqlModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(GraphqlController);
    }
}
