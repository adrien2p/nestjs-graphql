'use strict';

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GraphqlModule } from './graphql/graphql.module';
import { CarsModule } from './cars/cars.module';

@Module({
    modules: [
        UsersModule,
        CarsModule,
        AuthModule,
        GraphqlModule,
    ]
})
export class ApplicationModule { }
