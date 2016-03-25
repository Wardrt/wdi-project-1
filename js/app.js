$(start)

function start() {
  $(".grid").on("click", function(event) {
    var clickedId = event.target.id;
    var clickedElement = $(event.target);
    // console.log(clickedId);

    if (clickedElement.is("#red_lorry")) {
      console.log("match!!");
    } else if (clickedElement.is("#green_car")) {
      console.log("match!!");
    } else if (clickedElement.is("#blue_car")) {
      console.log("match!!");
    } else if (clickedElement.is("#main_car")) {
      console.log("match!!");
    } else {
      console.log("no match");
    }
  });
}