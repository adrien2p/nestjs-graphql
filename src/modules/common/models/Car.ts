'use strict';

import {
    Table, Column, Model, DataType,
    CreatedAt, UpdatedAt, DeletedAt, BeforeValidate, BelongsTo, ForeignKey
} from 'sequelize-typescript';
import { IDefineOptions } from "sequelize-typescript/lib/interfaces/IDefineOptions";
import { MessageCodeError } from '../lib/error/MessageCodeError';
import { User } from "./User";

const tableOptions: IDefineOptions = { timestamp: true, tableName: 'cars' } as IDefineOptions;

@Table(tableOptions)
export class Car extends Model<Car> {
    @Column({
        type: DataType.NUMERIC,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.NUMERIC,
        allowNull: false
    })
    @ForeignKey(() => User)
    userId: number;

    @Column({
        type: DataType.CHAR(50),
        allowNull: false
    })
    brandName: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    purchaseDate: Date;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    deletedAt: Date;

    @BelongsTo(() => User, {
        as: 'owner',
        foreignKey: 'userId'
    })
    user: User;

    @BeforeValidate
    static validateData (car: Car, options: any) {
        if (!options.transaction) throw new Error('Missing transaction.');
        if (!car.userId) throw new MessageCodeError('car:create:missingUserId');
        if (!car.brandName) throw new MessageCodeError('car:create:missingBrandName');
        if (!car.purchaseDate) throw new MessageCodeError('car:create:missingPurchaseDate');
    }
}
