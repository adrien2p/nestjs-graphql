'use strict';

import { Car } from "../../cars/car.entity";
import { User } from "../../users/user.entity";
import { GraphQLSchema } from "graphql";

export interface IGraphqlService {
    readonly schema: GraphQLSchema;
    readonly resolvers: any;
    readonly cars: (user: User) => Promise<Array<Car>>;
    readonly getUsers: (_: any, { filter, limit, offset }) => Promise<Array<User>>;
    readonly getCars: (_: any, { filter, limit, offset }) => Promise<Array<Car>>;
    readonly updateUser: (_: any, user: User) => Promise<User>;
    readonly updateCar: (_: any, car: Car) => Promise<Car>;
}
