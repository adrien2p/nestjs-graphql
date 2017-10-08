'use strict';

import { ICar } from './ICar';
import { Car } from '../car.entity';

export interface ICarService {
    findAll(): Promise<Array<Car>>;
    findById(id: number): Promise<Car | null>;
    findOne(options: Object): Promise<Car | null>;
    create(user: ICar): Promise<Car>;
    update(id: number, newValue: ICar): Promise<Car | null>;
    delete(id: number): Promise<void>;
}
