$(function(){
  setupGrid();
  // setupMainCar();
  parkMainCar();
  setupCars();
  parkCars();
  moveCars();
})

// function start() {
//   $(".grid").on("click", function(event) {
//     var clickedId = event.target.id;
//     var clickedElement = $(event.target);
//     // console.log(clickedId);

//     if (clickedElement.is("#red_lorry")) {
//       console.log("match!!");
//     } else if (clickedElement.is("#green_car")) {
//       console.log("match!!");
//     } else if (clickedElement.is("#blue_car")) {
//       console.log("match!!");
//     } else if (clickedElement.is("#main_car")) {
//       console.log("match!!");
//     } else {
//       console.log("no match");
//     }
//   });
// }

var width        = 6;
var carpark      = new Array(width*width);
var numberOfCars = 3;
var alphabet     = "abcdefghijklmnopqrstuvwxyz";
var cars         = [];
var allCarSpaces = [];

var types = {
  car: {width: 1, height:2},
}

function Car(name, width, height, orientation){
  this.name        = name;
  this.width       = width;
  this.height      = height;
  this.orientation = orientation;  
}

function setupGrid() {
  $("body").append("<ul class='carpark'></ul>");
  for (var i = 0; i < (width * width); i++) {
    $(".carpark").append("<li class='grid'></li>");
  }
}

// function setupMainCar() {
//   var name        = "main";
//   var width       = 1;
//   var height      = 2;
//   var orientation = "NS";
//   cars.push(new Car(name, width, height, orientation));
// }

function parkMainCar() {
  var mainCarSpace = [25, 31];
  allCarSpaces.push(mainCarSpace);
}

function setupCars() {
  for (var i = 0; i < numberOfCars; i++) {
    var randomWidth  = Math.ceil(Math.random() * 2);
    var randomHeight = randomWidth === 2 ? 1 : 2;
    var randomOrientation;
    if (randomHeight > randomWidth) {
      randomOrientation = ["NS", "SN"][Math.floor(Math.random()*2)]
    } else {
      randomOrientation = ["EW", "WE"][Math.floor(Math.random()*2)]
    }
    cars.push(new Car(alphabet[i], randomWidth, randomHeight, randomOrientation))
  }
}

function parkCars() {
  $.each(cars, function(index, car) {
    var carSpaces = calculateCarSpaces(car);

    var flattenedAllCarSpaces = [].concat.apply([], allCarSpaces);
    console.log(flattenedAllCarSpaces);

    while (flattenedAllCarSpaces.indexOf(carSpaces[0]) >= 0 || flattenedAllCarSpaces.indexOf(carSpaces[1]) >= 0) {
      carSpaces = calculateCarSpaces(car);
    }

    allCarSpaces.push(carSpaces);
  });

  console.log(allCarSpaces);
  markCarSpaces(allCarSpaces);
}

function calculateCarSpaces(car) {
  var carsSpaces = [];
  var randomIndex = Math.floor(Math.random() * carpark.length);
  carsSpaces.push(randomIndex);
  if (car.width > car.height) {
    if (randomIndex % width) {
      // It's on the edge
      carsSpaces.push(randomIndex-1)
    } else {
      carsSpaces.push(randomIndex+1)
    }
  } else {
    if (randomIndex+width >= (width*width)) {
      carsSpaces.push(randomIndex-width)
    } else {
      carsSpaces.push(randomIndex+width)
    }
  }
  return carsSpaces;
}

function markCarSpaces(allCarSpaces) {
  var $lis = $("li");
  $.each(allCarSpaces, function(index, carSpace) {
    var colors = ["red", "green", "blue"];
    var randomColor = colors[Math.floor(Math.random()*colors.length)];
    $.each(carSpace, function(index, spaceIndex) {
      $($lis[spaceIndex]).css("background", randomColor);
    });
  })

}



function moveCars() {
  $(".grid").on("click", function() {
    for (var i = 0; i < allCarSpaces.length; i++) {
      if (Car.orientation === "NS" || "SN") {
        allCarSpaces[i] = parseFloat(allCarSpaces[i]) + parseFloat(width);
        console.log(allCarSpaces);
      } else if (Car.orientation === "EW" || "WE") {
        allCarSpaces[i] = parseFloat(allCarSpaces[i]) + 1;
        console.log(allCarSpaces);
      } else {
        console.log("You have clicked an empty square.")
      }
    }
  });
}

// Setup color into the parkCars function? and have a key pair value for color in the car object?

// At the moment the second space of the car can go into the first space of another car. So the calculateCarSpaces is only looking at the first space of the car and should look at both. And the first space of a car can go into the first space of another car.
// How to fix?
// 


// On moving the cars, need to look at the orientation.
// If NS or SN can only move width +-6.
// If EW or WE can only move width +-1.
// Cannot move if there is something in the space they would move into. 
// Setup the function that will click on the cars and moved them based on orientation.
// Add or subtract 1 or 6 to the allCarSpaces index for the car clicked.


