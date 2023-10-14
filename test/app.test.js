const chai = require('chai');
const expect = chai.expect;

describe('Current test', () => {
  it('Debería sumar dos números correctamente', () => {
    const num1 = 5;
    const num2 = 7;
    const resultadoEsperado = 12;

    // Realizamos la operación que queremos probar
    const suma = num1 + num2;

    // Utilizamos Chai para realizar la afirmación (assertion)
    expect(suma).to.equal(resultadoEsperado);
  });
});
