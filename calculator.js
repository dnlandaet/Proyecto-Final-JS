let historic = [];
let order = 0

const Calculator = function () { //Una función a modo de objeto
  this.evaluate = string => {
    var a = string.split(' ');
    var index = 0;
    console.log(a)
    if (a.length > 1) {
      while (true) {
        if (this.findIndexOperador(a) != 0)
          index = this.findIndexOperador(a);
        else
          index = this.findIndexOperadorSumRest(a);

        var antIndex = index - 1; //encontrado el operador, evaluar el numero a la izquierda
        var aop = a[antIndex]
        var o = this.findOperador(index, a);// encuentra el operador en la cadena
        var ope = this.resolveOp(o, aop, a[index + 1])

        a.splice(antIndex, 3)
        a.splice(antIndex, 0, ope)
        console.log(a)
        if (a.length == 1)
          break;
      }
      return a[0];
    } else {
      return string;
    }
  }


  this.findOperador = (index, a) => {
    return a[index];
  }
  this.resolveOp = (el, a, b) => {
    var operacion = 0;
    a = parseFloat(a);
    b = parseFloat(b);
    switch (el) {
      case '*':
        operacion = a * b;
        break;
      case '/':
        operacion = a / b;
        break;
      case '+':
        operacion = a + b;
        break;
      case '-':
        operacion = a - b;
        break;
    }
    return operacion;
  }
  this.findIndexOperador = (a) => {
    var index = 0;
    for (var i = 0; i < a.length; i++) {
      if (a[i] === '*' || a[i] === '/') {
        index = i;
        break;
      }
    }
    return index;
  }
  this.findIndexOperadorSumRest = (a) => {
    var index = 0;
    for (var i = 0; i < a.length; i++) {
      if (a[i] === '+' || a[i] === '-') {
        index = i;
        break;
      }
    }
    return index;
  }

};

let btn = document.getElementById('calc');

function showOperation(event){
  for (let i = 0; i< historic.length; i++){
    if (historic[i].order === event){
      document.getElementById('calculator').value = historic[i].operation;
    }
  }
  console.log(historic)
}

function calcular() {
  let calc = new Calculator();
  let txt = document.getElementById('calculator');
  const result = calc.evaluate(txt.value);
  let resultDiv = document.getElementById('results');
  const div = document.createElement("div");
  div.textContent = result; 
  div.setAttribute("style", "background: darkgrey;  color: chartreuse;  font-size: 1.789rem;  width: 35%; margin: 0.5rem; padding: 0.5rem")
  div.setAttribute("onclick", "showOperation("+order+")");
  div.setAttribute("id", "res"+order);
  resultDiv.insertAdjacentElement("afterend", div);
  
  historic.push( { 
    result: result, 
    order: order, 
    operation: txt.value
  } )
  order++;
  //view.innerHTML = result
}
btn.addEventListener('click', calcular, false);
