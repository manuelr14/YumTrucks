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
          `<div id='${truck.id}' class="truck-card col s12 m6 l3" data-name='${truck.name}'>
            <div class="card-panel cyan">
                <h2>${truck.truck_name}</h2>
                <div class="card-image center-align">
                  <img class="responsive-img" width="200px" src="${truck.avatar}">
                </div>
                  <a href="${truck.website}">Website: ${truck.website}</a>
              <br />
            </div>
          </div>`     
        )
        generateModal(truck); // Adds the modal
      })
      activateCards();  // Add the on click handler to the truck cards in order to show the modal
}

function generateModal(truck) {
  let doc = $('body');
  $(doc).append(
  // Modal Structure
  `<div id="modal${truck.id}" class="modal">
    <div class="modal-content" style= "color:black">

      <h5 id="tName-${truck.id}">${truck.name}</h5>
 
      <h6 id="tAvatar-${truck.id}">${truck.avatar}</h6>
      <h6 id="tMenu-${truck.id}">Menu: ${truck.menu}</h6>
      <h6 id="tLocation-${truck.id}">Location:${truck.city}</h6>
    </div>
    <div class="modal-footer">
      <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Close</a>
    </div>
  </div>`
  )
  activateModals();
}

function activateCards() {
  let truckCards = $(".truck-card");
  $.each(truckCards, function (i, card) {
  $(card).off().on("click", function() {
  let truckID = $(this).attr("id");
  let currentTruckModal = $("#modal" + truckID);
  $(currentTruckModal).show();
}

function activateModals(){
  let modals = $('.modal');  // select all modals
  $.each(modals, function(i, modal){ // loop over each one
    $('.modal-close', modal).off().on('click', function() { // add an on click event handler to the 'close' button.  the $('.modal-close', modal) means, select the element with the class: 'modal-close', inside the current modal
      $(modal).hide(); // hide the modal again
    })
  })
}