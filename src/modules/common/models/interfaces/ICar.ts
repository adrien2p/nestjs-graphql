'use strict';

import { Instance } from 'sequelize';

export interface ICar {
    id: number;
    userId: number;
    brandName: string;
    purchaseDate: Date;
    birthday?: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface ICarInstance extends Instance<ICar> {
    dataValues: ICar;
}
