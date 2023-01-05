let a = document.querySelector(".input-A");
let b = document.querySelector(".input-B");
let c = document.querySelector(".input-C");
let d = document.querySelector(".input-E");
let e = document.querySelector(".input-D");
let resultEquation = document.querySelector(".result-equation");
let buttonEquation = document.querySelector(".button-go-equation");

let linear = function (a, b) {
    if (a === 0 && b === 0) {
        return [];
    }
    if (a === 0){
        return null;
    }

    return [-b / a];
};

let squared = function (a, b, c) {
    let discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
        resultEquation.textContent = "корней нет";
        return [];
    }
    if (discriminant === 0) {
        return [-b / (2 * a)];
    } else {
        return [
            (-b + Math.sqrt(discriminant))/ (2 * a),
            (-b - Math.sqrt(discriminant))/ (2 * a)
        ]
    }
}

/*function cubed(a, b, c, d) {
    if (a === 0) return (squared(b, c, d));
    let p, q, Q, alf, bet, x1, x2, x3;
    let x = [];
    p = c / a - b * b / 3 / a / a;
    q = d / a - b * c / 3 / a / a + 2 * b * b * b / 27 / a / a / a;
    Q = p * p * p / 27 + q * q / 4;
    alf = Math.cbrt(-q / 2 + Math.sqrt(Q));
    bet = Math.cbrt(-q / 2 - Math.sqrt(Q));
    x1 = alf + bet - b / 3 / a;
    x2 = -x1 / 2 + Math.sqrt(-3) * (alf - bet) / 2 - b / 3 / a;
    x3 = -x1 / 2 - Math.sqrt(-3) * (alf - bet) / 2 - b / 3 / a;
    x = [x1, x2, x3];
    let result = [];
    x.forEach(el => {
        if (!isNaN(el)) {
            result.push(el);
        }
    })
    return (result);
}

function doubleSquared(a, b, c, d, e) {
    let q = a;
    a = b / q;
    b = c / q;
    c = d / q;
    d = e / q;
    let y = cubed(1, -b, a * c - 4 * d, -a * a * d + 4 * b * d - c * c);
    let y1 = y[0];
    let xright = squared(a * a / 4 - b + y1, a * y1 / 2 - c, y1 * y1 / 4 - d);
    let xsolve = xright[0];
    let x1 = squared(1, a / 2 - Math.sqrt(a * a / 4 - b + y1), y1 / 2 + xsolve * Math.sqrt(a * a / 4 - b + y1));
    let x2 = squared(1, a / 2 + Math.sqrt(a * a / 4 - b + y1), y1 / 2 + xsolve * Math.sqrt(a * a / 4 - b + y1));

    let answerx = [x1[0], x1[1], x2[0], x2[1]];
    return (answerx);
}*/

function equation(a, b, c, d, e) {
    let amountOfVariables = [];

    for (let temp of arguments) {
        if (temp !== '') {
            amountOfVariables.push(temp);
        }
    }

    switch (amountOfVariables.length) {
        case 2:
            resultEquation.textContent = "Ответ = " + linear(a, b);
            console.log('linear');
            break;
        case 3:
            resultEquation.textContent = "Ответ = " + squared(a, b, c);
            console.log('squared');
            break;
       /* case 4:
            resultEquation.textContent = "Ответ = " + cubed(a, b, c, d);
            console.log('cubed');
            break;
        case 5:
            resultEquation.textContent = "Ответ = " + doubleSquared(a, b, c, d, e);
            console.log('doubleSquared');
            break;*/
        default:
            resultEquation.textContent = "Неверный формат данных";
    }
}

buttonEquation.addEventListener('click', function() {
    let valueA = String(a.value);
    let valueB = String(b.value);
    let valueC = String(c.value);
    let valueD = String(d.value);
    let valueE = String(e.value);
    equation(valueA, valueB, valueC, valueD, valueE);
});