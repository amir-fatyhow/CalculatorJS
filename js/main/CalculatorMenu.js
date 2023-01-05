function CalculatorMenu() {
    function buttonHandler(event) {
        const answer = document.getElementById('answer');
        const calc = new Calculator();

        let a = document.getElementById('a').value;
        let b = document.getElementById('b').value;

        const entityA = Calculator.prototype.getEntity(a);
        const entityB =  Calculator.prototype.getEntity(b);

        const operand = event.target.id;
        const c = calc[operand](entityA, entityB);
        answer.innerHTML = c.toString();
    }

    document.querySelectorAll('.button-calc')
        .forEach(button => button.addEventListener('click', buttonHandler));
}