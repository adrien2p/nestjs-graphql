'use strict';

import { Car } from "../../cars/car.entity";
import { User } from "../../users/user.entity";
import {
    GraphQLScalarType,
    GraphQLSchema
} from "graphql";
import { IResolverObject } from "graphql-tools/dist/Interfaces";

export interface IGraphqlSerializedObject {
    [key: string]: (() => any) | IResolverObject | GraphQLScalarType
}

export interface IGraphqlService {
    readonly schema: GraphQLSchema;
    readonly resolvers: IGraphqlSerializedObject;
    cars(user: User): Promise<Array<Car>>;
    getUsers(_: any, { filter, limit, offset }): Promise<Array<User>>;
    getCars(_: any, { filter, limit, offset }): Promise<Array<Car>>;
    updateUser(_: any, user: User)
    updateUser(_: any, user: User)
}
