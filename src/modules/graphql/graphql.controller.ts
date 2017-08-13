'use strict';

import { Controller, Get, Post, Put, Delete, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { schema } from './config/schema';

@Controller()
export class GraphqlController {
    @Post('graphql')
    public async create (req: Request, res: Response, next: NextFunction) {
        return graphqlExpress({ schema })(req, res, next);
    }
}
