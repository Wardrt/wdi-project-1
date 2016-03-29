$(function(){
  setupGrid();
  parkMainCar();
  setupCars();
  moveCars();
});

var width        = 6;
var carpark      = new Array(width*width);
var numberOfCars = 7;
var alphabet     = "bcdefghijklmnopqrstuvwxyz";
var cars         = [];
var allCarSpaces = [];
var counter      = 0;

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
  var main = new Car("a", 1, 2, "NS")
  main.space = [25, 31];
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
  $.each(cars, function(index, car) {
    // Skip first car
    if (index === 0) return true;

    var parked = false;

    while (!parked) {
      var carSpace = calculateCarSpace(car);

      var flattenedCarSpaces = [];
      for (var i = 0; i < cars.length; i++) {
        flattenedCarSpaces.push(cars[i].space);
      }
      flattenedCarSpaces = [].concat.apply([], flattenedCarSpaces);

      if (flattenedCarSpaces.indexOf(carSpace[0]) === -1 
       && flattenedCarSpaces.indexOf(carSpace[1]) === -1) {
        // Sort array for the orientation
        car.space = carSpace.sort(function(a, b){
          return a-b
        });
        parked = true;
      }
    }
  });

  markCarSpaces();
}

function calculateCarSpace(car) {
  var carsSpace = [];

  var spaceGenerated = false;
  var randomIndex;
  while (!spaceGenerated) {
    randomIndex = Math.floor(Math.random() * carpark.length);
    if (randomIndex % width === 1 && car.orientation === "NS") {
      // Do nothing
    } else {
      spaceGenerated = true;
    }
  }
  
  carsSpace.push(randomIndex);
  
  if (car.width > car.height) {
    if (randomIndex % width) {
      // It's on the edge
      carsSpace.push(randomIndex-1)
    } else {
      carsSpace.push(randomIndex+1)
    }
  } else {
    if (randomIndex+width >= (width*width)) {
      carsSpace.push(randomIndex-width)
    } else {
      carsSpace.push(randomIndex+width)
    }
  }

  return carsSpace.sort(function(a, b){
    return a-b
  });
}

function markCarSpaces() {
  var $lis = $("li");

  var allCarSpaces = [];
  for (var i = 0; i < cars.length; i++) {
    allCarSpaces.push(cars[i].space);
  }

  $.each(allCarSpaces, function(index, carSpace) {
    var randomCar;
    var colors = ["red", "green", "blue"];

    if (index === 0) {
      randomCar = "black";
    } else {
      randomCar = colors[Math.floor(Math.random()*colors.length)];
    }

    $.each(carSpace, function(index, spaceIndex) {
      $($lis[spaceIndex]).css("background", randomCar);
    });
  })
}

function moveCars() {
  $(".grid").on("click", function() {
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
    if (color === "rgba(0, 0, 0, 0)") return false;

    var moveDirection   = car.space.indexOf(spaceIndex);
    var travelDirection = car.orientation[moveDirection];

    var tempCarSpace;
    switch (travelDirection) {
      case "N":
        tempCarSpace = [car.space[0]-width, car.space[1]-width]
        break;
      case "E": 
        tempCarSpace = [car.space[0]+1, car.space[1]+1]
        break;
      case "S":
        tempCarSpace = [car.space[0]+width, car.space[1]+width]
        break;
      case "W":
        tempCarSpace = [car.space[0]-1, car.space[1]-1] 
        break;
    }

    if ($($lis[tempCarSpace[0]]).css("background-color") !== "rgba(0, 0, 0, 0)" 
     && $($lis[tempCarSpace[1]]).css("background-color") !== "rgba(0, 0, 0, 0)") {
      return false;
    }

    // Removing the car we clicked on
    for (var c = 0; c < car.space.length; c++) {
      $($lis[car.space[c]]).css("background", "none");
    }

    car.space = tempCarSpace.sort(function(a, b){
      return a-b
    });

    parkCar(car, color)
    incrementCounter()
    checkForWin()
  });
}

function parkCar(car, color){
  var $lis = $("li");
  
  $.each(car.space, function(index, spaceIndex) {
    $($lis[spaceIndex]).css("background", color);
  });
}

function incrementCounter(){
  counter++;
  $("#moves").html(counter);
}

function checkForWin(){
  if (cars[0].space.toString() === "1,7") $("#win").html("VICTORY!");
}