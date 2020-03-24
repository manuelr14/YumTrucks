const color = {
  cyan: {
    cardBackground: "#00bcd4",
    photoBorderColor: "#black"
  },
  amber: {
    cardBackground: "#ffc107",
    photoBorderColor: "#73448C"
  },
};

$(document).ready(function () {
  // This file just does a the JS for the trucks page to figure out what information gets populated in what areas
  // and updates the HTML on the page
  $.get("/api/trucks").then(function (data) {
    console.log(data);
    getTruck(data);


  });
});


function getTruck(data) {
  console.log(data);

  $("#trucks-info").empty();

  for (let i = 0; i < data.length; i++) {
    // create a parent div for the oncoming elements
    let infoSection = $("<div>");

    infoSection.addClass("card-panel cyan");

    infoSection.attr("id", "info-" + i);

    $("#trucks-info").append(infoSection);





    $("#info-" + i).append("<h2>" + data[i].truck_name + "</h2>");

    $("#info-" + i).append('<h4>Location: <a href="https://www.google.com/maps/place/' + data[i].street + ", " + data[i].city + ", " + data[i].state + ", " + data[i].zip + '"target="_blank"> ' + data[i].street + ", " + data[i].city + ", " + data[i].state + ", " + data[i].zip + '</a> </h4>');

    $("#info-" + i).append('<h4>Menu: <a href="' + data[i].menu + '" target="_blank">' + data[i].menu + '</a> </h4>');

    $("#info-" + i).append('<h4>Website: <a href="' + data[i].website + '"target="_blank"> ' + data[i].website + '</a> </h4>');





  }



};




function generateTruckCards(data) {
  data.forEach(truck => {
    $("#trucks-container").append(
      //TODO 
      //1. write a click event targeting the "truck-card" class (different func)
      //2. use our data-name attribute to call our /api/trucks/<truck_name> route
      //3. use the truck info we get from that to populate values into the modal
      `<div class="truck-card col s12 m6 l3" data-name='${truck.name}'>
            <div class="card-panel cyan">
                <h2>${truck.truck_name}</h2>
                <div class="card-image center-align">
                  <img class="responsive-img" width="200px" src="${truck.avatar}">
                </div>
                  <a href="${truck.website}">Website:</a>
              <br />
            </div>
          </div>`
    )
  })
}

// <!-- Modal Structure -->
// <div id="modal1" class="modal">
//     <div class="modal-content" style= "color:black">
//         <img id="tImage-0" class="float" src="https://www.fillmurray.com/200/300">

//         <h5 id="tName-0">Truck Name</h5>

//         <h6 id="tAvatar-0" ></h6>
//         <h6 id="tMenu-0" >Menu:</h6>
//         <h6 id="tLocation-0" >Location:</h6>

//     </div>

//     <div class="modal-footer">
//         <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Close</a>
//     </div>
// </div>

// module.exports = generateTruckCards();