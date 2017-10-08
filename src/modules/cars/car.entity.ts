'use strict';

import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BeforeValidate,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
import { MessageCodeError } from '../common/lib/error/MessageCodeError';
import { User } from '../users/user.entity';

const tableOptions: IDefineOptions = { timestamp: true, tableName: 'users' } as IDefineOptions;

@Table(tableOptions)
export class Car extends Model<User> {
    @Column({
        type: DataType.NUMERIC,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    public id: number;

    @Column({
        type: DataType.NUMERIC,
        allowNull: false,
    })
    @ForeignKey(() => User)
    public userId: number;

    @Column({
        type: DataType.CHAR(50),
        allowNull: false,
    })
    public brandName: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    public purchaseDate: Date;

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;

    @DeletedAt
    public deletedAt: Date;

    @BelongsTo(() => User, {
        as: 'owner',
        foreignKey: 'userId',
    })
    public user: User;

    @BeforeValidate
    public static validateData(car: Car, options: any) {
        if (!options.transaction) throw new Error('Missing transaction.');
        if (!car.userId) throw new MessageCodeError('car:create:missingUserId');
        if (!car.brandName) throw new MessageCodeError('car:create:missingBrandName');
        if (!car.purchaseDate) throw new MessageCodeError('car:create:missingPurchaseDate');
    }
}
