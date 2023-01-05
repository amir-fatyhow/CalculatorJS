function Student(name, money) {
    this.name = name;
    this.money = money;
    this.stamina = 100;
    this.status = 'full of energy';
    
    this.doWork = function(time) {
        this.money += time * 10;
        this.stamina -= time * 2;
    }
    
    this.isAlive = function () {
        if (this.stamina <= 0) {
            this.status = 'you need to eat';
        }
    }
    
    this.toEat = function () {
        this.money -= 200;
        this.stamina += 100;
    }
    
    this.toMove = function (time) {
        this.stamina -= time * 0.5;
    }
    
    this.toThink = function () {
        this.stamina -= 10;
    }
}