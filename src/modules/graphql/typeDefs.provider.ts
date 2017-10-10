'use strict';

export const typeDefsProvider = {
    provide: 'TypeDefsProvider',
    useValue: `
        scalar JSON

        schema {
            query: Query
            mutation: Mutation
        }

        type User {
            id: ID!
            email: String!
            firstName: String!
            lastName: String!
            createAt: String!
            updatedAt: String!
            deletedAt: String

            cars: [Car!]
        }

        type Car {
            id: ID!
            userId: ID!
            brandName: String!
            purchaseDate: String!
            createAt: String!
            updatedAt: String!
            deletedAt: String
        }

        type Query {
            getUsers(filter: UsersSearchFilter limit: Int offset: Int): [User!]!
            getCars(filter: CarsSearchFilter limit: Int offset: Int): [Car!]!
        }

        type Mutation {
            updateUser(values: JSON!): User!
            updateCar(values: JSON!): Car!
        }

        input UsersSearchFilter {
            id: Int
            email: String
            firstName: String
            lastName: String
        }

        input CarsSearchFilter {
            id: Int
            userId: Int
            brandName: String
            purchaseDate: String
        }
    `,
};
