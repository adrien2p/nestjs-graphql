![Nest](assets/logo.png)

### Project based on [nest-js-sequelize-jwt](https://github.com/adrien2p/nest-js-sequelize-jwt) and use

- [graphql](http://graphql.org/)
- [graphql-tools](https://github.com/apollographql/graphql-tools)
- [graphql-type-json](https://github.com/taion/graphql-type-json)
- [apollo-server-express](apollo-server-express)

### How it works
 
- To run lint and fix `npm run lint`
- To run tests suite `npm run test`
- Start the server `npm start`
- To run up/down migration `npm run migrate {up/down}`

### Configuration

To configure put all config file in the `./src/config/*`.
To use the env variable, remove `.demo` from `.env.demo`.

### What is provided more

This repo provide a `graphql` module which allow to request `users`
and filter them for authenticated user.

### Request example

#### To get users
`POST http://localhost:3000/graphql` with the following body :
```json
{
    "query": "{ getUsers(filter: { search: \"toto\" }) { id, firstName, lastName, email }}"
}
```

Where `getUsers` is a `Query` type which is difine in the `./modules/graphql/config/schema.ts` and implemented in `./modules/graphql/config/resolvers.ts`

And the result of this request is :
```json
{
    "data": {
        "getUsers": [
            {
                "id": "1",
                "firstName": "firstName",
                "lastName": "lastName",
                "email": "toto@email.fr"
            }
        ]
    }
}
``` 

#### To get user with cars
`POST http://localhost:3000/graphql` with the following body :
```json
{
    "query": "{ getUsers(filter: { email: \"toto\" }) { id, firstName, lastName, email, cars {id, brandName, purchaseDate }}}"
}
```

Where `getUsers` is a `Query` type which is difine in the `./modules/graphql/config/schema.ts` and implemented in `./modules/graphql/config/resolvers.ts`
and contain `cars` which is also define in `schema` and implemented in `resolver`

And the result of this request is :
```json
{
    "data": {
        "getUsers": [
            {
                "id": "1",
                "firstName": "firstName",
                "lastName": "lastName",
                "email": "toto@email.fr",
                "cars": [
                    {
                        "id": "1",
                        "brandName": "tesla",
                        "purchaseDate": "Thu Aug 17 2017 02:00:00 GMT+0200 (CEST)"
                    }
                ]
            }
        ]
    }
}
```

#### To update user (is same implementation for all you want)
`POST http://localhost:3000/graphql` with the following body :
```json
{
    "query": "mutation {updateUser(values:{ id:1, firstName:\"titi\" }){ id, firstName, lastName, email, cars { id, brandName, purchaseDate }}}"
}
```

The `updateUser` resolver is implemented in the `Mutation` and apply in the `schema`

And the result of this request is :
```json
{
    "data": {
        "updateUser": {
            "id": "1",
            "firstName": "titi",
            "lastName": "toto",
            "email": "toto@toto.fr",
            "cars": [
                {
                    "id": "1",
                    "brandName": "tesla",
                    "purchaseDate": "Thu Aug 17 2017 02:00:00 GMT+0200 (CEST)"
                }
            ]
        }
    }
}
``` 
