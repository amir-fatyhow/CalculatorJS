class Vector {
    constructor(values = []) {
        this.values = [];
        values.forEach(e => this.values.push(e));
    }

    toString() {
        return `(${this.values.map(el => el.toString()).join(', ')})`;
    }

    module() {
        let result = 0;
        this.values.forEach(elem => {
            result += elem * elem;
        });
        return `${Math.sqrt(result).toFixed(2)}`;
    }
}