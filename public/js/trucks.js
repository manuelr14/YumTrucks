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

$(document).ready(function() {
    // This file just does a the JS for the trucks page to figure out what information gets populated in what areas
    // and updates the HTML on the page
    $.get("/api/trucks").then(function(data) {
      generateTruckCards(data);
      //$(".truck-name").text(data.email);

    });
  });

//function getInfo() {
  //axios.get("/api/trucks") {

  //}
//}

//function favoriteTrucks {

//}

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

module.exports = generateTruckCards;