'use strict';

import { Component, Inject } from '@nestjs/common';
import { Model } from 'sequelize-typescript';
import { MessageCodeError } from '../common/lib/error/MessageCodeError';
import { ICarService } from './interfaces/ICarService';
import { Car } from './car.entity';
import { ICar } from './interfaces/ICar';

@Component()
export class CarsService implements ICarService {
    constructor (@Inject('CarsRepository') private readonly carsRepository: typeof Model,
                @Inject('SequelizeInstance') private readonly sequelizeInstance) { }

    public async findAll (): Promise<Array<Car>> {
        return await this.carsRepository.findAll<Car>();
    }

    public async findById (id: number): Promise<Car | null> {
        return await this.carsRepository.findById<Car>(id);
    }

    public async findOne (options: Object): Promise<Car | null> {
        return await this.carsRepository.findOne<Car>(options);
    }

    public async create (user: Car): Promise<Car> {
        return await this.sequelizeInstance.transaction(async transaction => {
            return await this.carsRepository.create<Car>(user, {
                returning: true,
                transaction
            });
        });
    }

    public async update (id: number, newValue: ICar): Promise<Car | null> {
        return await this.sequelizeInstance.transaction(async transaction => {
            let user = await this.carsRepository.findById<Car>(id, { transaction });
            if (!user) throw new MessageCodeError('user:notFound');

            user = this._assign(user, newValue);
            return await user.save({
                returning: true,
                transaction
            });
        });
    }

    public async delete (id: number): Promise<void> {
        return await this.sequelizeInstance.transaction(async transaction => {
            return await this.carsRepository.destroy({
                where: { id },
                transaction
            });
        });
    }

    /**
     * @description: Assign new value in the user found in the database.
     *
     * @param {ICar} user
     * @param {ICar} newValue
     * @return {User}
     * @private
     */
    private _assign (user: ICar, newValue: ICar): Car {
        for (const key of Object.keys(user)) {
            if (user[key] !== newValue[key]) user[key] = newValue[key];
        }

        return user as Car;
    }
}
