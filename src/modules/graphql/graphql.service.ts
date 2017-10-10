'use strict';

import { Component, Inject } from '@nestjs/common';
import { GraphQLSchema } from 'graphql';
import * as GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';
import { CarsService } from '../cars/cars.service';
import { Car } from '../cars/car.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { IGraphqlService } from './interfaces/IGraphqlService';

@Component()
export class GraphqlService implements IGraphqlService {
    constructor(@Inject('TypeDefsProvider') private readonly typeDefsProvider,
                private readonly carsService: CarsService,
                private readonly usersService: UsersService) { }

    public get schema(): GraphQLSchema {
        return makeExecutableSchema({
            typeDefs: this.typeDefsProvider,
            resolvers: this.resolvers,
        });
    }

    public get resolvers(): any {
        return {
            JSON: GraphQLJSON,
            User: {
                cars: this.cars,
            },
            Query: {
                getUsers: this.getUsers,
                getCars: this.getCars,
            },
            Mutation: {
                updateUser: this.updateUser,
                updateCar: this.updateCar,
            },
        };
    }

    public get cars(): (user: User) => Promise<Array<Car>> {
        return async (user: User): Promise<Array<Car>> => {
            return await this.carsService.findAll({ where: { userId: user.id }});
        };
    }

    public get getUsers(): (_: any, { filter, limit, offset }) => Promise<Array<User>> {
        return async (_: any, { filter, limit = 10, offset = 0 }) => {
            limit = Math.min(limit, 100);

            const where: any = {};
            if (filter) {
                if (filter.id) where.id = { $eq: filter.id };
                if (filter.email) where.email = { $ilike: `%${filter.email}%` };
                if (filter.firstName) where.firstName = { $ilike: `%${filter.firstName}%` };
                if (filter.lastName) where.lastName = { $ilike: `%${filter.lastName}%` };
            }
            return await this.usersService.findAll({
                where,
                offset,
                limit,
                order: [
                    ['id', 'ASC'],
                ],
            });
        };
    }

    public get getCars(): (_: any, { filter, limit, offset }) => Promise<Array<Car>> {
        return async (_: any, { filter, limit = 10, offset = 0 }) => {
            limit = Math.min(limit, 100);

            const where: any = {};
            if (filter) {
                if (filter.id) where.id = { $eq: filter.id };
                if (filter.brandName) where.brandName = { $ilike: `%${filter.brandName}%` };
                if (filter.purchareDate) where.purchareDate = { $eq: filter.purchareDate };
            }

            return await this.carsService.findAll({
                where,
                offset,
                limit,
                order: [
                    ['id', 'ASC'],
                ],
            });
        };
    }

    public get updateUser(): (_: any, user: User) => Promise<User> {
        return async (_: any, user: User): Promise<User> => {
            if (!user.id) throw new Error('Missing user id.');
            return await this.usersService.update(user.id, user);
        };
    }

    public get updateCar(): (_: any, car: Car) => Promise<Car> {
        return async (_: any, car: Car): Promise<Car> => {
            if (!car.id) throw new Error('Missing car id.');
            return await this.carsService.update(car.id, car);
        };
    }
}
