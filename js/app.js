$(function(){
  setupGrid();
  setupCars();
  parkCars();
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
var numberOfCars = 8;
var alphabet     = "abcdefghijklmnopqrstuvwxyz";
var cars         = [];

var types = {
  car: {width: 1, height:2},
}

function Car(name, width, height, orientation){
  this.name        = name;
  this.width       = width;
  this.height      = height;
  this.orientation = orientation;  
}

function setupGrid(){
  $("body").append("<ul class='carpark'></ul>");
  for (var i = 0; i < (width * width); i++) {
    $(".carpark").append("<li class='grid'></li>");
  }
}

function setupCars(){
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

function parkCars(){
  var allCarSpaces = []
  $.each(cars, function(index, car){
    var carSpaces = calculateCarSpaces(car);

    var flattenedAllCarSpaces = [].concat.apply([], allCarSpaces);
    while (flattenedAllCarSpaces.indexOf(carSpaces[0]) > 0 || flattenedAllCarSpaces.indexOf(carSpaces[1]) > 0) {
      carSpaces = calculateCarSpaces(car);
    }

    allCarSpaces.push(carSpaces);
  });

  console.log(allCarSpaces);
  markCarSpaces(allCarSpaces);
}

function calculateCarSpaces(car){
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
    if (randomIndex+width > (width*width)) {
      carsSpaces.push(randomIndex-width)
    } else {
      carsSpaces.push(randomIndex+width)
    }
  }
  return carsSpaces;
}

function markCarSpaces(allCarSpaces){
  var $lis = $("li");
  $.each(allCarSpaces, function(index, carSpace){
    var colors = ["red", "green", "blue"];
    var randomColor = colors[Math.floor(Math.random()*colors.length)];
    $.each(carSpace, function(index, spaceIndex) {
      $($lis[spaceIndex]).css("background", randomColor);
    });
  })

}