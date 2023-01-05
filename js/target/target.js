let x = document.querySelector(".input-x");
let y = document.querySelector(".input-y");

let min = document.querySelector(".input-min");
let max = document.querySelector(".input-max");
let count = document.querySelector(".input-count");

let resultTarget = document.querySelector(".result-target");
let resultTargetRandom = document.querySelector(".result-target-random");
let buttonTarget = document.querySelector(".button-target");
let buttonTargetRandom = document.querySelector(".button-random-target");

let points = 0;
function showResult(x, y) {
    let a = (-1 + Math.sqrt(5)) / 2;
    let b = (-Math.sqrt(5) + 1) / 2;

    if (+x === 0 && +y === 0) {
        points += 10; // Центр
        resultTarget.textContent = "Центр (общее количество очков: " + points + ")";
    } else if (Math.abs(x) <= 1 && y <= 1 / (Math.abs(x) + a) + b) {
        points += 4;  // Гипербола
        resultTarget.textContent = "Гипербола (общее количество очков: " + points + ")";
    } else if (Math.abs(x) + Math.abs(y) <= 1) {
        points += 3; // Ромб
        resultTarget.textContent = "Ромб (общее количество очков: " + points + ")";
    } else if (x * x + y * y <= 1) {
        points += 2; // Окружность
        resultTarget.textContent = "Окружность (общее количество очков: " + points + ")";
    } else if (Math.abs(x) <= 1 && Math.abs(y) <= 1) {
        points += 1; // Квадрат
        resultTarget.textContent = "Квадрат (общее количество очков: " + points + ")";
    } else {
        points += 0;
        resultTarget.textContent = "Мимо (общее количество очков: " + points + ")";
    }
}

function shotToSquare(x, y) {
    return (Math.abs(x) <= 1 && Math.abs(y) <= 1) ? 1 : 0;
}

function shotToCircle(x, y) {
    return (x * x + y * y <= 1) ? 2 : 0;
}

function shotToRhomb(x, y) {
    return (Math.abs(x) <= 1 - Math.abs(y) && Math.abs(y) <= 1 - Math.abs(x)) ? 3 : 0;
}

function shotToCenter(x, y) {
    return (x === 0 && y === 0) ? 10 : 0;
}

function shotToGyperbola(x, y) {
    let a = (-1 + Math.sqrt(5)) / 2;
    let b = (-Math.sqrt(5) + 1) / 2;
    return (Math.abs(x) <= 1 && y <= 1 / (Math.abs(x) + a) + b) ? 4 : 0;
}

function shot(x, y) {
    return shotToCenter(x, y) || shotToCircle(x, y) || shotToRhomb(x, y) || shotToCircle(x, y) || shotToSquare(x, y) ||
        shotToGyperbola(x, y) || 0;
}

function showResultOfRandomShots(min, max, count) {
    if (min < -1 || max > 1) {
        resultTargetRandom.textContent = "incorrect min or max :( ";
    } else {
        let score = 0;
        for (let i = 0; i < count; i++) {
            let x = Math.random() * (max - min) + min;
            let y = Math.random() * (max - min) + min;
            score += shot(x, y);
        }
        resultTargetRandom.textContent = "общее количество очков: " + score;
    }
}

buttonTarget.addEventListener('click', function() {
    let valueX = x.value;
    let valueY = y.value;
    showResult(valueX, valueY);
});

buttonTargetRandom.addEventListener('click', function() {
    let minimum = min.value;
    let maximum = max.value;
    let counter = count.value;

    showResultOfRandomShots(minimum, maximum, counter);
});

function circle() {
    let canvas = document.getElementById('circle');
    let obCanvas = canvas.getContext('2d');

    obCanvas.beginPath();
    obCanvas.arc(100, 100, 50, 0, 2*Math.PI, false);
    obCanvas.lineWidth = 2;
    obCanvas.strokeStyle = 'red';
    obCanvas.stroke();


}

function parabola(x, y, start, end) {
    let canvas = document.getElementById('circle');
    let obCanvas = canvas.getContext('2d');
    obCanvas.beginPath();

    obCanvas.beginPath();
    obCanvas.arc(x, y, 50, start, end, false);

    obCanvas.lineWidth = 2;
    obCanvas.strokeStyle = 'green';
    obCanvas.stroke();

}

function rhombus() {
    let canvas = document.getElementById('circle');
    let ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(150, 50); // линия вправо
    ctx.lineTo(150, 150); // линия вниз
    ctx.lineTo(50, 150); // линия влево
    ctx.closePath(); // смыкание начала и конца рисунка (левая стена)
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(150, 100);
    ctx.lineTo(100, 150);
    ctx.lineTo(50, 100);
    ctx.closePath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.stroke();
}
circle();

parabola(150, 50, 1/2 * Math.PI, Math.PI);
parabola(150, 150, Math.PI, 3/2 * Math.PI);
parabola(50, 150, 3/2 * Math.PI, 2 * Math.PI);
parabola(50, 50, 0, 1/2 * Math.PI);

rhombus();