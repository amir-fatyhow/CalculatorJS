class UI{
    constructor({addFunction, delFunction, addColorToFunction, addWidthToFunction, addIntegralToAFunction, addIntegralToBFunction}){
        this.addFunction = addFunction;
        this.delFunction = delFunction;
        this.addColorToFunction = addColorToFunction;
        this.addWidthToFunction = addWidthToFunction;
        this.addIntegralToAFunction = addIntegralToAFunction;
        this.addIntegralToBFunction = addIntegralToBFunction;
        this.num = 0;

        document.getElementById('addFunction').addEventListener('click', 
        () => this.addFunctionHandler());
    }
    addFunctionHandler() {
        const div = document.createElement('div');

        const input = document.createElement('input');
        input.dataset.num = this.num;
        input.classList.add('input-graph');
        input.placeholder = 'Function';

        const color = document.createElement('input');
        color.dataset.num = this.num;
        color.classList.add('input-graph');
        color.placeholder = 'Color';
        color.addEventListener('keyup', (event) => this.keyupColorHandler(event));

        const width = document.createElement('input');
        width.dataset.num = this.num;
        width.classList.add('input-graph');
        width.placeholder = 'Width';
        width.addEventListener('keyup', (event) => this.keyupWidthHandler(event));

        const a = document.createElement('input');
        a.dataset.num = this.num;
        a.classList.add('input-graph');
        a.placeholder = 'a';
        a.addEventListener('keyup', (event) => this.keyupIntegralAHandler(event));

        const b = document.createElement('input');
        b.dataset.num = this.num;
        b.classList.add('input-graph');
        b.placeholder = 'b';
        b.addEventListener('keyup', (event) => this.keyupIntegralBHandler(event));

        const x = document.createElement('input');
        x.dataset.num = this.num;
        x.classList.add('input-graph');
        x.placeholder = 'x(кас-ая)';
        //

        input.addEventListener('keyup', (event) => this.keyupHandler(event));

        const divInput = document.getElementById('funcInputs');
        const button = document.createElement('button');
        button.innerHTML = 'Delete';
        button.classList.add('button');
        button.classList.add('button-inline');
        button.addEventListener('click', () => {
            this.delFunction(input.dataset.num);
            /*divInput.removeChild(input);
            divInput.removeChild(color);
            divInput.removeChild(width);
            divInput.removeChild(a);
            divInput.removeChild(b);
            divInput.removeChild(x);
            divInput.removeChild(button);*/
            divInput.removeChild(div);
        });

        div.appendChild(input);
        div.appendChild(color);
        div.appendChild(width);
        div.appendChild(a);
        div.appendChild(b);
        div.appendChild(x);
        div.appendChild(button);
        divInput.appendChild(div);

        /*divInput.appendChild(input);
        divInput.appendChild(color);
        divInput.appendChild(width);
        divInput.appendChild(a);
        divInput.appendChild(b);
        divInput.appendChild(x);
        divInput.appendChild(button);*/
        this.num++;
    }

    keyupHandler(event) {
        try {
            let f;
            eval(`f = function(x){return ${event.target.value};}`);
            this.addFunction(f, event.target.dataset.num);
        } catch(e) {
            console.log(e);
        }
    }

    keyupColorHandler(event) {
        this.addColorToFunction(event.target.dataset.num, event.target.value);
    }

    keyupWidthHandler(event) {
        this.addWidthToFunction(event.target.dataset.num, event.target.value);
    }

    keyupIntegralBHandler(event) {
        this.addIntegralToBFunction(event.target.dataset.num, event.target.value);
    }

    keyupIntegralAHandler(event) {
        this.addIntegralToAFunction(event.target.dataset.num, event.target.value);
    }
}