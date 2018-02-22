(function () {

    'use strict';

    class Car {
        constructor(weight, tankCapacity, power) {
            if (arguments.length !== 3) {
                throw new Error('Не верное количество аргументов функции-конструктора');
            }
            this.weight = weight;
            this.tankCpacity = tankCapacity;
            this.power = power;
            this.acceleration = ((((this.weight + this.tankCpacity * 4)) / Math.sqrt(this.power / 1.2)) / 13).toFixed(2) + 'с';
            this.fuelRate = ((this.power * Math.sqrt(this.power) + (this.weight + this.tankCpacity * 10) / 1.8) / 30000).toFixed(3) + 'л/км';
            this.maxSpeed = ((Math.sqrt(this.power) / (this.weight + this.tankCpacity * 3)) * 28000).toFixed(1) + 'км/ч';
        }

        race(dist) {
            let time, pipStop, h, m, s, ms;
            pipStop = (dist / (parseFloat(this.tankCpacity) / parseFloat(this.fuelRate))).toFixed(0) * 0.15;/// у кого маленький бак придется тратить время на заправки
            time = dist / (parseFloat(this.maxSpeed) * 0.6) + pipStop;

            h = time;
            m = (h - ~~h) * 60;
            s = (m - ~~m) * 60;
            ms = (s - ~~s) * 1000 ^ 0;

            h = ~~h;
            h = h < 10 ? "0" + h : h;
            m = ~~m;
            m = m < 10 ? "0" + m : m;
            s = ~~s;
            s = s < 10 ? "0" + s : s;
            ms = ms < 100 && ms > 10 ? "0" + ms : ms;
            ms = ms < 10 ? "00" + ms : ms;

            return `${h}:${m}:${s}.${ms}`;

        };
    }


    let sitroenXsara = new Car(1300, 62, 110);

    console.log(sitroenXsara.acceleration);
    console.log(sitroenXsara.fuelRate);
    console.log(sitroenXsara.maxSpeed);
    console.log(sitroenXsara.race(800));////// на ситроене до Москвы )))


}());
