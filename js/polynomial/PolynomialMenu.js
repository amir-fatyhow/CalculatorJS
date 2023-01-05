function poly() {
    function operandHandler(e) {
        const calc = new PolynomialCalculator();

        const num1 = document.getElementById('a-poly');
        const num2 = document.getElementById('b-poly');


        const a = calc.getPolynomial(num1.value);
        const b = calc.getPolynomial(num2.value);


        const operand = e.target.dataset.operand;
        const c = calc[operand](a, b);
        document.getElementById('answer-poly').innerHTML = (c) ? (c.toString() ? c.toString() : '0') : 'Ошибка';
    }

    function operandHandlerX(e) {
        console.log('click')
        const calc = new PolynomialCalculator();

        const num1 = document.getElementById('a-poly');
        const numX = document.getElementById('x');

        const a = calc.getPolynomial(num1.value);
        const x = numX.value;

        let c = a.getValue(x);
        console.log(c);
        document.getElementById('b-poly').innerHTML = '';
        document.getElementById('b-poly').innerHTML = (c) ? c.toString() : 'Ошибка';
    }

    document.querySelectorAll('.button-poly').
        forEach(e => e.addEventListener('click', operandHandler));

    document.querySelectorAll('.x').
    forEach(e => e.addEventListener('click', operandHandlerX));
}