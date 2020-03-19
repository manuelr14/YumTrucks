

$(document).ready(function () {

  $("#submit").on("click", function (event) {
    event.preventDefault();

    let searchedTruck = $("#truck").val().trim();

    getTruck();


    function getTruck() {

      searchedTruck1 = searchedTruck.replace(/\s+/g, "").toLowerCase();
      console.log(searchedTruck1);
      $.get("/api/" + searchedTruck1, data => {

        console.log(data);

        $("#info-section").empty();
        // for (let i = 0; i < data.length; i++) {
        // create a parent div for the oncoming elements
        let infoSection = $("<div>");

        infoSection.addClass("card-panel amber");

        infoSection.attr("id", "info-1");

        $("#info-section").append(infoSection);

        if (data) {



          $("#info-1").append("<h2>" + data.truck_name + "</h2>");

          $("#info-1").append('<h4>Location: <a href="https://www.google.com/maps/place/' + data.street + ", " + data.city + ", " + data.state + ", " + data.zip + '"target="_blank"> ' + data.street + ", " + data.city + ", " + data.state + ", " + data.zip + '</a> </h4>');

          $("#info-1").append('<h4>Menu: <a href="' + data.menu + '" target="_blank">' + data.menu+'</a> </h4>');

          $("#info-1").append('<h4>Website: <a href="' + data.website + '"target="_blank"> ' + data.website + '</a> </h4>');



        } else {

          $("#info-1").append("<h2> No truck found </h2>");

        }


        $("#truck").val("");

      })
        .catch(error => {
          console.log(error);
        });

    };

  });

});