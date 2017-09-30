'use strict';

import * as GraphQLJSON from 'graphql-type-json';
import { sequelize, User, Car } from '../../common/index';

export const resolvers = {
    JSON: GraphQLJSON,
    User: {
        /* Return cars belongs to the user when user(s) is/are requested. */
        cars: async (user: User) => {
            return await Car.findAll<Car>({
                where: { userId: user.getDataValue('id') }
            });
        }
    },
    Query: {
        getUsers: (_, { filter, limit = 10, offset = 0 }) => {
            limit = Math.min(limit, 100);

            const where: any = {};
            if (filter) {
                if (filter.id) where.id = { $eq: filter.id };
                if (filter.email) where.email = { $ilike: `%${filter.email}%` };
                if (filter.firstName) where.firstName = { $ilike: `%${filter.firstName}%` };
                if (filter.lastName) where.lastName = { $ilike: `%${filter.lastName}%` };
            }
            return User.findAll<User>({
                where,
                offset,
                limit,
                order: [
                    ['id', 'ASC']
                ]
            });
        },

        getCars: (_, { filter, limit = 10, offset = 0 }) => {
            limit = Math.min(limit, 100);

            const where: any = {};
            if (filter) {
                if (filter.id) where.id = { $eq: filter.id };
                if (filter.brandName) where.brandName = { $ilike: `%${filter.brandName}%` };
                if (filter.purchareDate) where.purchareDate = { $eq: filter.purchareDate };
            }
            return Car.findAll<Car>({
                where,
                offset,
                limit,
                order: [
                    ['id', 'ASC']
                ]
            });
        }
    },
    Mutation: {
        updateUser: async (_, data) => {
            const values: User = data.values;
            if (!values || !values.id) throw new Error('Missing user id.');

            let user = await User.findById(values.id);
            if (!user) throw new Error('User not found.');

            /* Keep only the values which was modified. */
            const newValues = {};
            for (const key of Object.keys(values)) {
                if (user.getDataValue(key) !== values[key]) newValues[key] = values[key];
            }

            await sequelize.transaction(async t => {
                await user.update(newValues, { transaction: t });
            });
            await user.reload();
            return user;
        },

        updateCar: async (_, data) => {
            const values: User = data.values;
            if (!values || !values.id) throw new Error('Missing car id.');

            let car = await Car.findById(values.id);
            if (!car) throw new Error('User not found.');

            /* Keep only the values which was modified. */
            const newValues = {};
            for (const key of Object.keys(values)) {
                if (car.getDataValue(key) !== values[key]) newValues[key] = values[key];
            }

            await sequelize.transaction(async t => {
                await car.update(newValues, { transaction: t });
            });
            await car.reload();
            return car;
        }
    }
};
