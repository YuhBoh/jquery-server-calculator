//------------------------!!!!!-------------------//
//How I think it's going to run when equate button is clicked
//Client side assigns input fields and button presses to an object
//Object is pushed to the server, object will probably look like:

// {
//     firstNumber: first-number-Input.val(),
//     operator: number based off ,
//     secondNumber: second-number-input.val()
// }

//On the server, it will be calculated based of operator symbol.
//Then return an object to the dom that will look like this:

// {
    // counter : {
//     answer: calculatedAnswer,
//     expression: expression
//     }
// }

// The clear button will clear the user input, and honestly that can happen just on the front end
// The history will be built based off the return object and built in the client the string will look like:

// 1. Expression = Answer -> `${counter}. ${expression}=${calculatedAnswer}
//------------------------!!!!!-------------------//

// Yellow express is now a function. require() means the code library, 'express'
// will be read and executed in this file if yellow express is called on.
const express = require('express');

// bodyParser same as express but blue because it holds less info and certain 
// types of data as opposed to yellow.
// bodyParser will execute require function when called on.
let bodyParser = require('body-parser');


// variable app is assigned the const express.
const app = express();

// app.use puts the specified middleware functions at the specified path.

// A request handler with access to the application's 
// request-response cycle is known as middleware.
//https://expressjs.com/en/guide/writing-middleware.html
app.use(express.static('server/public'));

// app.use will use bodyParser.urlencoded to ???
app.use(bodyParser.urlencoded({ extended: true }));

// ALL CODE BELOW HERE

// }
// number1: number1,
// operation: operation,
// number2: number2,
// }
let calculations = [];
app.get('/equation', (req,res) => {
  res.send(calculations);
})

app.post('/equation', (req,res) => {
  let postedObject = req.body;
  let number1 = postedObject.number1;
  let operation = postedObject.operation;
  let number2 = postedObject.number2;
  let result;

  if (operation == '+') {
    result = Number(number1) + Number(number2);
  } else if (operation == '-') {
    result = Number(number1) - Number(number2);
  } else if (operation == '*') {
    result = Number(number1) * Number(number2);
  } else if (operation == '/') {
    result = Number(number1) / Number(number2);
  }

  console.log(result);
  
  // {
  //   expression: expression,
  //   result: result,
  // }

  calculations.push({
    expression: `${number1} ${operation} ${number2} = ${result}`,
    result: result,
  });
  // res.send will send back to client.
  res.send('it worked');
})
// ALL CODE WILL GO ABOVE HERE!
// app will 'listen' or will access port number 3000 and run function();

// Note: Will only be able to access localhost:3000 if node server/server.js
// on terminal first.
app.listen(3000, function() {
    console.log('You made a server');
})