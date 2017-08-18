'use strict';

import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { ICar, ICarInstance } from "./interfaces/ICar";
import { MessageCodeError } from "../lib/error/MessageCodeError";

export default function Car (sequelize: Sequelize, dataTypes: DataTypes): SequelizeStatic.Model<ICarInstance, ICar> {
    let Car = sequelize.define<ICarInstance, ICar>('Car', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        brandName: {
            type: dataTypes.CHAR(30),
            allowNull: false
        },
        purchaseDate: {
            type: dataTypes.DATE,
            allowNull: false
        },
        createdAt: {
            type: dataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: true
        },
        deletedAt: {
            type: dataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'cars',
        paranoid: true,
        timestamps: true,
        scopes: {},
        indexes: [],
        classMethods: {
            associate: (models: any) => {
                Car.belongsTo(models.User, {
                    as: 'owner',
                    foreignKey: 'userId'
                });
            }
        },
        instanceMethods: {},
        hooks: {
            beforeValidate (car: ICarInstance, options: any): void {
                if (!options.transaction) throw new Error('Missing transaction.');
                if (!car.getDataValue('userId')) throw new MessageCodeError('car:create:missingUserId');
                if (!car.getDataValue('brandName')) throw new MessageCodeError('car:create:missingBrandName');
                if (!car.getDataValue('purchaseDate')) throw new MessageCodeError('car:create:missingPurchaseDate');
            },
            beforeCreate (car: ICarInstance, options: any): void {
                if (!options.transaction) throw new Error('Missing transaction.');
            },
            beforeDestroy (car: ICarInstance, options: any): void {
                if (!options.transaction) throw new Error('Missing transaction.');
            }
        }
    });

    return Car;
}
