let menuItems = document.querySelectorAll('.menu-item');
let containers = document.querySelectorAll('.container');

window.onload = function(){
    for(let i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener("click", function() {
            containers.forEach(element => element.style.visibility = "hidden");
            document.getElementById(menuItems[i].dataset.container).style.visibility = "visible";
        });
    }
    CalculatorMenu();
    poly();

    const funcs = [
        /*{f: (x) => Math.sin(x), color: 'red'},
        {f: (x) => Math.cos(x), color: 'blue'},
        {f: (x) => x * x, color: 'green'},
        {f: (x) => x, color: 'grey'}*/
    ];

    const width = 500;
    const height = 500;
    const ZOOM = 0.2;
    const WIN = {
        left: -10,
        bottom: -10,
        width: 20,
        height: 20,
    };
    let canMove = false;

    const canvas = new Canvas({
        id: 'graph',
        width,
        height,
        WIN,
        callbacks: {
            wheel,
            mouseup,
            mousedown,
            mousemove,
            mouseleave
        }
    });

    const ui = new UI({
        addFunction, delFunction, addColorToFunction, addWidthToFunction, addIntegralToAFunction, addIntegralToBFunction
    });

    // Добавление новой функции на график
    function addFunction(f, num, color, width) {
        funcs[num] = {f, color, width};
        render();
    }

    // Добавление цвета к функции
    function addColorToFunction(num, color) {
        funcs[num].color = color;
        render();
    }

    // Добавление толщины графика функции
    function addWidthToFunction(num, width) {
        funcs[num].width = width;
        console.log(funcs[num]);
        render();
    }

    function addIntegralToAFunction(num, a) {
        funcs[num].a = a;
    }

    function addIntegralToBFunction(num, b) {
        funcs[num].b = b;
        render();
    }

    // Удаление функции на графике
    function delFunction(num) {
        funcs[num] = null;
        render();
    }

    // Масштабирование графика
    function wheel(event) {
        const delta = (event.wheelDelta > 0) ? -ZOOM : ZOOM;

        if (WIN.width <= 10 && delta > 0) {
            WIN.width += delta;
            WIN.height += delta;
            WIN.left -= delta / 2;
            WIN.bottom -= delta / 2;
            render();
        }

        if (WIN.width >= 25 && delta < 0) {
            WIN.width += delta;
            WIN.height += delta;
            WIN.left -= delta / 2;
            WIN.bottom -= delta / 2;
            render();
        }

        if (WIN.width < 25 && WIN.width > 10) {
            WIN.width += delta;
            WIN.height += delta;
            WIN.left -= delta / 2;
            WIN.bottom -= delta / 2;
            render();
        }
    }

    function mousedown() {
        canMove = true;
    }

    function mouseup() {
        canMove = false;
    }

    function mouseleave() {
        canMove = false;
    }

    function mousemove(event) {
        if (canMove) {
            const { movementX, movementY } = event;
            WIN.left -= canvas.sx(movementX);
            WIN.bottom -= canvas.sy(movementY);
            render();
        }
    }

    // Рисуем сетку графика и задаем координаты осей
    function printNumbersAndNet() {
        const { left, bottom, width, height } = WIN;
        for (let i = 0; i < left + width; i++) {
            canvas.line(i, bottom, i, bottom + height, '#b8d0ff');
            canvas.line(i, -0.2, i, 0.2, 'black');

            if (i !== 0) {
                canvas.printNumbers(i, i - 0.1,  -0.7);
            }
        }

        for (let i = 0; i < bottom + height; i++) {
            canvas.line(left, i, left + width, i, '#b8d0ff');
            canvas.line(-0.2, i, 0.2, i, 'black');

            if (i !== 0) {
                canvas.printNumbers(i,  0.4,  i - 0.1);
            }
        }

        for (let i = 0; i > left; i--) {
            canvas.line(i, bottom, i, bottom + height, '#b8d0ff');
            canvas.line(i, -0.2, i, 0.2, 'black');

            if (i !== 0) {
                canvas.printNumbers(i, i - 0.3,  -0.7);
            }
        }

        canvas.printNumbers(0, 0.2,  - 0.5);
        for (let i = 0; i > bottom; i--) {
            canvas.line(left, i, left + width, i, '#b8d0ff');
            canvas.line(-0.2 , i, 0.2, i, 'black');

            if (i !== 0) {
                canvas.printNumbers(i, 0.4, i - 0.1);
            }
        }

        canvas.line(left, 0, left + width, 0);
        canvas.line(0, bottom, 0, bottom + height);
    }

    // Рисуем на оси ОХ направляющую стреклу
    function arrowsX() {
        canvas.line(WIN.left + WIN.width, 0, WIN.left + WIN.width - WIN.width / 70, WIN.width / 100, 'black');
        canvas.line(WIN.left + WIN.width, 0, WIN.left + WIN.width - WIN.width / 70, -WIN.width / 100, 'black');
    }

    // Рисуем на оси ОУ направляющую стреклу
    function arrowsY() {
        canvas.line(0, WIN.bottom + WIN.height, WIN.width / 100, WIN.bottom + WIN.height - WIN.height / 70);
        canvas.line(0, WIN.bottom + WIN.height, -WIN.width / 100, WIN.bottom + WIN.height - WIN.height / 70);
    }

    function printFunction(f, color, width) {
        const dx = WIN.width / 100;
        let x = WIN.left;
        while (x < WIN.left + WIN.width) {
            canvas.line(x, f(x), x + dx, f(x + dx), color, width);
            x += dx;
        }

        /*const dx = WIN.width / 100;
        let x = WIN.left;

        while (x < WIN.width + WIN.left) {
            const y1 = f(x);
            const y2 = f(x + dx);
            canvas.line(x, -y1, x + dx, y2, color, width);
            x += dx;
        }*/
    }

    function render() {
        canvas.clear();
        printNumbersAndNet();

        arrowsX();
        arrowsY();

        funcs.forEach(func => {
            if (func !== null) {
                printFunction(func.f, func.color, func.width);
                canvas.getIntegral(func.f, func.a - 0, func.b - 0);
                canvas.printIntegral(func.f, func.a - 0, func.b - 0);
            }
        })

    }
    render();
}