class Canvas {
    constructor({ id, width = 500, height = 500, WIN, callbacks}) {
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;
        this.WIN = WIN;

        const {wheel, mouseup, mousedown, mousemove, mouseleave} = callbacks;

        this.canvas.addEventListener('wheel', wheel);
        this.canvas.addEventListener('mouseup', mouseup);
        this.canvas.addEventListener('mousedown', mousedown);
        this.canvas.addEventListener('mousemove', mousemove);
        //this.canvas.addEventListener('mousemove', position, false);
        this.canvas.addEventListener('mouseleave', mouseleave);
    }

    xs = (x) => this.canvas.width * (x - this.WIN.left) / this.WIN.width;
    ys = (y) => this.canvas.height - this.canvas.height * (y - this.WIN.bottom) / this.WIN.height;

    //канвас в декартовую
    /*xs = (x) => (x - this.WIN.left) / this.WIN.width * this.canvas.width;
    ys = (y) => (y - this.WIN.bottom) / this.WIN.height * this.canvas.height;*/

    clear() {
        this.context.fillStyle = '#fff';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };

    line (x1, y1, x2, y2, color, lineWidth) {
        try {
            this.context.beginPath();
            this.context.lineWidth = lineWidth || 1;
            this. context.strokeStyle = color || '#050505';
            this.context.moveTo(this.xs(x1), this.ys(y1));
            this.context.lineTo(this.xs(x2), this.ys(y2));
            this.context.stroke();
            this.context.closePath();
        } catch(e) {
            this.context.beginPath();
            this.context.lineWidth = lineWidth || 1;
            this. context.strokeStyle = '#050505';
            this.context.moveTo(this.xs(x1), this.ys(y1));
            this.context.lineTo(this.xs(x2), this.ys(y2));
            this.context.stroke();
            this.context.closePath();
        }

    };

    sx = (x) => x * this.WIN.width / this.canvas.width;
    sy = (y) => -y * this.WIN.height / this.canvas.height;

    //декартовая в канвас
   /* sx = (x) => x * this.WIN.width / this.canvas.width;
    sy = (y) => y * this.WIN.height / this.canvas.height;*/

    printNumbers (i, x , y, t= 13, color) {
        this.context.fillStyle = color || 'black';
        this.context.font = `${t}px Arial`;
        this.context.fillText(i, this.xs(x), this.ys(y));
    }

    getIntegral(f, a = 0, b = 0, d = 1000) {
        let x = a;
        const dx = (b - a) / d;
        let s = 0;
        while (x < b) {
            if (f(x) * f(x + dx) > 0) {
                s += (Math.abs(f(x)) + Math.abs(f(x + dx))) * dx / 2;
            } else {
                s += (Math.abs(f(x)) + Math.abs(f(x + dx))) * dx / 4;
            }
            x += dx;
        }
        return s;
    }

    printIntegral (f, a = 0, b = 0, d = 1000) {
        const dx = (b - a) / d;
        for (let x = a; x < b; x += dx) {
            this.polygon([
                { x: x, y: 0 },
                { x: x + dx, y: 0 },
                { x: x + dx, y: f(x + dx) },
                { x: x, y: f(x + dx) },
            ])
        }
    }

    // Рисуем фигуру по заданным точкам (минимум три точки)
    polygon (points = [], color = '#0f05') {
        if (points.length >= 3) {
            this.context.beginPath();
            this.context.strokeStyle = color;
            this.context.fillStyle = color;
            this.context.moveTo(this.xs(points[0].x), this.ys(points[0].y));
            for (let i = 1; i < points.length; i++) {
                this.context.lineTo(this.xs(points[i].x), this.ys(points[i].y));
            }
            this.context.lineTo(this.xs(points[0].x), this.ys(points[0].y));
            this.context.fill();
        }
        /*if (points.length >= 3) {
            this.context.beginPath();
            this.context.strokeStyle = color;
            this.context.moveTo(this.xs(points[0].x), this.ys(points[0].y));
            for (let i = 1; i < points.length; i++) {
                this.context.lineTo(this.xs(points[i].x), this.ys(points[i].y));
            }

            this.context.fillStyle = color;
            this.context.fill();
            this.context.lineTo(this.xs(points[0].x), this.ys(points[0].y));
            this.context.stroke();
            this.context.closePath();
        }*/
    };

    /**
     *
     * цвет, толщина, касательная, искать нули на отрезке, ноль функции, по чекбоксу рисовать площадь трапеции,
     * добвалять и удалять функцию
     *
     * */
}