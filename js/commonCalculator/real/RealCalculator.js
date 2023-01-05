class RealCalculator {
    // сложение
    add(a, b) {
        return a + b
    };

    // вычитание
    sub(a,b) {
        return a - b
    };

    // умножение
    mult(a,b) {
        return a * b
    };

    // деление
    div(a,b) {
        return a / b
    };

    // умножение на действительное число
    prod(p,a) {
        return p * a
    };

    // возведение в натуральную степень
    pow(a,p) {
        return Math.pow(a, p)
    };

    one() {
        return 1
    };

    zero() {
        return 0
    };

    module(elem) {
        return Math.abs(elem);
    }
}