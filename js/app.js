$(function(){
  setupGrid();
  parkMainCar();
  setupCars();
  moveCars();
});

var width                 = 6;
var carpark               = new Array(width*width);
var numberOfCars          = 3;
var alphabet              = "bcdefghijklmnopqrstuvwxyz";
var cars                  = [];
var allCarSpaces          = [];

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

function parkMainCar() {
  var mainCarSpace = [25, 31];
  var main = new Car("a", 1, 2, "NS")
  main.space = mainCarSpace;
  cars.push(main);
}

function setupCars() {
  for (var i = 0; i < numberOfCars; i++) {
    var randomWidth  = Math.ceil(Math.random() * 2);
    var randomHeight = randomWidth === 2 ? 1 : 2;
    var randomOrientation;
    if (randomHeight > randomWidth) {
      randomOrientation = "NS";
    } else {
      randomOrientation = "WE";
    }
    cars.push(new Car(alphabet[i], randomWidth, randomHeight, randomOrientation))
  }

  parkCars();
}

function parkCars() {
  var allCarSpaces = [];
  for (var i = 0; i < cars.length; i++) {
    allCarSpaces.push(cars[i].space);
  }

  $.each(cars, function(index, car) {
    // Skip first car
    if (index === 0) return true;

    var parked = false;
    
    while (!parked) {
      var carSpaces = calculateCarSpaces(car);

      var flattenedCarSpaces = [];
      for (var i = 0; i < cars.length; i++) {
        flattenedCarSpaces.push(cars[i].space);
      }
      flattenedCarSpaces = [].concat.apply([], flattenedCarSpaces);

      if (flattenedCarSpaces.indexOf(carSpaces[0]) === -1 && flattenedCarSpaces.indexOf(carSpaces[1]) === -1) {
        // Sort array for the orientation
        car.space = carSpaces.sort();
        parked = true;
      }
    }
  });

  markCarSpaces();
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

function markCarSpaces() {
  var $lis = $("li");

  var allCarSpaces = [];
  for (var i = 0; i < cars.length; i++) {
    allCarSpaces.push(cars[i].space);
  }

  $.each(allCarSpaces, function(index, carSpace) {
    var randomColor;
    var colors = ["red", "green", "blue"];

    if (index === 0) {
      randomColor = "black";
    } else {
      randomColor = colors[Math.floor(Math.random()*colors.length)];
    }
    
    $.each(carSpace, function(index, spaceIndex) {
      $($lis[spaceIndex]).css("background", randomColor);
    });
  })
}

function moveCars() {
  $(".grid").on("click", function() {
    console.log(allCarSpaces)
    var $lis = $("li");
    var spacesArray = [].slice.call($lis)
    var spaceIndex  = spacesArray.indexOf(this);

    var car;
    for (var i = 0; i < cars.length; i++) {
      if (cars[i].space.indexOf(spaceIndex) >= 0) {
        car = cars[i];
      }
    }

    // Get the color of the car
    var color = $($lis[spaceIndex]).css("background-color");

    // Removing the car we clicked on
    for (var c = 0; c < car.space.length; c++) {
      $($lis[car.space[c]]).css("background", "none");
    }

    var moveDirection   = car.space.indexOf(spaceIndex);
    var travelDirection = car.orientation[moveDirection];
    console.log(car.space)

    switch (travelDirection) {
      case "N":
        car.space = [car.space[0]-width, car.space[1]-width]
        break;
      case "E": 
        car.space = [car.space[0]+1, car.space[1]+1]
        break;
      case "S":
        car.space = [car.space[0]+width, car.space[1]+width]
        break;
      case "W":
        car.space = [car.space[0]-1, car.space[1]-1] 
        break;
    }

    parkCar(car, color)
  });
}

function parkCar(car, color){
  var $lis = $("li");
  console.log(car.space);
  console.log(color);
  $.each(car.space, function(index, spaceIndex) {
    $($lis[spaceIndex]).css("background", color);
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


