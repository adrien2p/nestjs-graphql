'use strict';

import { Controller, Post, Request, Response, Next } from '@nestjs/common';
import { graphqlExpress } from 'apollo-server-express';
import { GraphqlService } from "./graphql.service";

@Controller()
export class GraphqlController {
    constructor(private readonly graphqlService: GraphqlService) { }

    @Post('graphql')
    public async create(@Request() req, @Response() res, @Next() next) {
        return graphqlExpress({ schema: this.graphqlService.schema })(req, res, next);
    }
}
