'use strict';

import * as _ from 'lodash';
import * as GraphQLJSON from 'graphql-type-json';
import { models } from "../../../models/index";

export const resolvers = {
    JSON: GraphQLJSON,
    Query: {
        getUsers: (_, { filter, limit = 10, offset = 0 }) => {
            limit = Math.min(limit, 100);

            const where: any = {};
            if (filter) {
                where.email = {
                    $ilike: `%${filter.search}%`
                };
            }
            return models.User.findAll({
                where,
                offset,
                limit,
                order: [
                    ['id', 'ASC']
                ]
            });
        },
    }
};
