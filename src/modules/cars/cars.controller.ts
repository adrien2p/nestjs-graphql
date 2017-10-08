'use strict';

import { Controller, Get, Post, Put, Delete, HttpStatus, Request, Response } from '@nestjs/common';
import { MessageCodeError } from '../common/index';
import { CarsService } from './cars.service';

@Controller()
export class CarsController {
    constructor (private readonly carsService: CarsService) { }

    @Get('cars')
    public async index (@Response() res) {
        const users = await this.carsService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Post('cars')
    public async create (@Request() req, @Response() res) {
        const body = req.body;
        if (!body || (body && Object.keys(body).length === 0)) throw new MessageCodeError('car:create:missingInformation');

        await this.carsService.create(req.body);
        return res.status(HttpStatus.CREATED).send();
    }

    @Get('cars/:id')
    public async show (@Request() req, @Response() res) {
        const id = req.params.id;
        if (!id) throw new MessageCodeError('car:show:missingId');

        const user = await this.carsService.findById(id);
        return res.status(HttpStatus.OK).json(user);
    }

    @Put('cars/:id')
    public async update (@Request() req, @Response() res) {
        const id = req.params.id;
        if (!id) throw new MessageCodeError('car:update:missingId');

        await this.carsService.update(id, req.body);
        return res.status(HttpStatus.OK).send();
    }

    @Delete('cars/:id')
    public async delete (@Request() req, @Response() res) {
        const id = req.params.id;
        if (!id) throw new MessageCodeError('car:delete:missingId');

        await this.carsService.delete(id);
        return res.status(HttpStatus.OK).send();
    }
}
