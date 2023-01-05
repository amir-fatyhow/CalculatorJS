function StudentGirl(name, money) {
    Student.call(this, name, money);

    this.beauty = 100;
    this.happines = 100;

    this.goThroughPuddles = function (time) {
        this.beauty -= time * 0.5;
    }

    this.goShop = function () {
        this.stamina += 1000;
        this.money -= 9999.99;
        this.happines += 1000;
        this.beauty += 9999;
    }
}

let girl = new StudentGirl('Girl', 1000);