![Nest](assets/logo.png)

#### Project based on [nest-js-sequelize-jwt](https://github.com/adrien2p/nest-js-sequelize-jwt) and use

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

`POST http://localhost:3000/graphql` with the following body :
```json
{
    "query": "{ getUsers(filter: {search: \"toto\"}) { id,firstName,lastName,email} }"
}
```

Where `getUsers` is a `Query` type which is difine in the `./modules/graphql/config/schema.ts` and implemented in `./modules/graphql/config/resolvers.ts`

And the result of this request is :
```json
{
    "data": {
        "getUsers": [
            {
                "id": "9",
                "firstName": "firstName",
                "lastName": "lastName",
                "email": "toto2@email.fr"
            }
        ]
    }
}
``` 
