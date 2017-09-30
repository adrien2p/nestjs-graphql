'use strict';

import { Controller, Post, Request, Response, Next } from '@nestjs/common';
import { graphqlExpress } from 'apollo-server-express';
import { schema } from './config/schema';

@Controller()
export class GraphqlController {
    @Post('graphql')
    public async create (@Request() req, @Response() res, @Next() next) {
        return graphqlExpress({ schema })(req, res, next);
    }
}
