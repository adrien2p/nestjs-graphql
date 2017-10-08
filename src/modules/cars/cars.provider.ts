'use strict';

import { Car } from './car.entity';

export const carsRepository = {
    provide: 'CarsRepository',
    useValue: Car,
};
