import { Injectable, HttpException } from '@nestjs/common';
import { CARS } from './cars.mock';
import { resolve } from 'path';

@Injectable()
export class CarService {

    private cars = CARS;

    public getCars() {
        return this.cars;
    }

    public postCar(car) {
        return this.cars.push(car);
    }

    public getCarById(id: number): Promise<any> {
        const carId = Number(id);
        return new Promise((resolve) => {
            const car = this.cars.find(car => car.id == carId);
            if (!car) {
                throw new HttpException('Car not found!', 404);
            }
            resolve(car);
        });
    }

    public deleteCarById(id: number): Promise<any> {
        const carId = Number(id);
        return new Promise((resolve) => {
            const index = this.cars.findIndex(car => car.id == carId);
            if (index === -1) {
                throw new HttpException('Not found', 404);
            }
            this.cars.splice(index, 1);
            resolve(this.cars);
        });
    }

    public putCarById(id: number, propertyName: string, propertyValue: string): Promise<any> {
        const carId = Number(id);
        return new Promise((resolve) => {
            const index = this.cars.findIndex(car => car.id == carId);
            if (index === -1) {
                throw new HttpException('Not found', 404);
            }
            this.cars[index][propertyName] = propertyValue;
            resolve(this.cars[index]);
        });
    }

}
