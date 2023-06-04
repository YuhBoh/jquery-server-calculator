$(document).ready(onReady);
// Global variables:
// operation = undefined
let operation;
console.log(operation);

let result = 0;
console.log(result);

function onReady() {
  console.log("Client is working!");

  number1 = $("#num1").val("");
  number2 = $("#num2").val("");

  $('#results').append(result);

  $("#add").on("click", handleAdd);
  $("#minus").on("click", handleMinus);
  $("#mult").on("click", handleMult);
  $("#div").on("click", handleDiv);
  $("#equals").on("click", handleResults);

  $("#erase").on("click", handleErase);

  // When document is ready, automatically run this.
  // function will GET calculations array from the server and send equation to DOM and
  // keep it there until server is closed.
  renderCalculationsToDom();
}

// Make a global variable that can be reassigned based on which operator button is pressed:
// Making variable global will be accessible in any sub function.
// If original variable only exists in function, it can't be accessed in any other functions
// because that original variable only exists in that function.

function handleAdd() {
  operation = "+";
}

function handleMinus() {
  operation = "-";
}

function handleMult() {
  operation = "*";
}

function handleDiv() {
  operation = "/";
}

function handleResults() {
  // When only in global, it will not apply in handleResults function.
  // .val() = GETTER as in getting value of input.
  // .val(' ') = SETTER as in it is now string that is empty.
  number1 = $("#num1").val();
  number2 = $("#num2").val();
  result = $("#results").val();

  //make ajax here
  $.ajax({
    method: "POST",
    data: {
      number1: number1,
      operation: operation,
      number2: number2,
    },
    url: "/equation",
  })
    .then(function (response) {
      console.log("it is working");
      // renderCalculationsToDom will run when document is open but only
      // exists in that onReady function.
      // We put it here because when server is updated, we also update the page.
      renderCalculationsToDom();
    })
    .catch(function (error) {
      alert("you failed, horribly");
    });
}

// will GET data from server and then append calculations to client.js and
// to #results and #calculation-history.
function renderCalculationsToDom() {
  $.ajax({
    method: 'GET',
    url: '/equation',
  }).then(function(response) {
    let calculations = response;
    console.log(calculations)
    
    let replaceResults = {
      replaceResults: `${calculations[calculations.length - 1].result}`};
      $('#results').val(replaceResults);

    for (i=0; i<calculations.length; i++) {
      $('#calculation-history').append(`
      <li>
        ${calculations[i].expression};
      </li>`);
    }
  }).catch(function(error) {
    console.log('it failed :(')
  })
}


// function to clear everything on browser
function handleErase() {
  $("#num1").val("");
  $("#num2").val("");
}
