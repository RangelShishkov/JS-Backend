const calculatorDefaultExport = require("./calculator-default-export");
console.log(calculatorDefaultExport.sum(1,2));

const {sum, multiply, subtract} = require("./calculator-named-export");
console.log(subtract(2,1))