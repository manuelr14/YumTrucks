$(document).ready(function () {


  $.get("/api/trucks", data => {

    console.log(data);
    //createTruckCards(data);

  });
  $.get("/api/trucks/favorites", data => {

    console.log(data);
    //createTruckCards(data);

  });






});  