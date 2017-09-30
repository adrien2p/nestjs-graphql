'use strict';

import { Controller, Get, Post, Put, Delete, HttpStatus, Request, Response } from '@nestjs/common';
import { MessageCodeError, sequelize, Car } from '../common/index';

@Controller()
export class CarsController {
    @Get('cars')
    public async index (@Request() req, @Response() res) {
        const cars = await Car.findAll<Car>();
        return res.status(HttpStatus.OK).json(cars);
    }

    @Post('cars')
    public async create (@Request() req, @Response() res) {
        const body = req.body;
        if (!body || (body && Object.keys(body).length === 0)) throw new MessageCodeError('car:create:missingInformation');

        await sequelize.transaction(async t => {
            return await Car.create(body, { transaction: t });
        });

        return res.status(HttpStatus.CREATED).send();
    }

    @Get('cars/:id')
    public async show (@Request() req, @Response() res) {
        const id = req.params.id;
        if (!id) throw new MessageCodeError('car:show:missingId');

        const car = await Car.findOne<Car>({
            where: { id }
        });
        return res.status(HttpStatus.OK).json(car);
    }

    @Put('cars/:id')
    public async update (@Request() req, @Response() res) {
        const id = req.params.id;
        const body = req.body;
        if (!id) throw new MessageCodeError('car:update:missingId');
        if (!body || (body && Object.keys(body).length === 0)) throw new MessageCodeError('car:update:missingInformation');

        await sequelize.transaction(async t => {
            const car = await Car.findOne<Car>({
                where: {
                    id,
                    userId: req['loggedInUser']
                },
                transaction: t
            });
            if (!car) throw new MessageCodeError('car:notFound');

            /* Keep only the values which was modified. */
            const newValues = {};
            for (const key of Object.keys(body)) {
                if (car[key] !== body[key]) newValues[key] = body[key];
            }

            return await car.update(newValues, { transaction: t });
        });

        return res.status(HttpStatus.OK).send();
    }

    @Delete('cars/:id')
    public async delete (@Request() req, @Response() res) {
        const id = req.params.id;
        if (!id) throw new MessageCodeError('car:delete:missingId');

        await
        sequelize.transaction(async t => {
            return await Car.destroy({
                where: { id },
                transaction: t
            });
        });

        return res.status(HttpStatus.OK).send();
    }
}
