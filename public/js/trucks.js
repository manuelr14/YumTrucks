const color = {
  green: {
    cardBackground: "#66bb6a",
    photoBorderColor: "#black"
  },
  orange: {
    cardBackground: "#ffb74d",
    photoBorderColor: "#73448C"
  },
};

$(document).ready(function () {
  // This file just does a the JS for the trucks page to figure out what information gets populated in what areas
  // and updates the HTML on the page
  $.get("/api/trucks").then(function (data) {
    generateTruckCards(data);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});

function generateTruckCards(data) {

  data.forEach(truck => {
    $("#trucks-container").append(
      `<div id='${truck.id}' class="truck-card col s12 m6 l3" data-name='${truck.name}'>
            <div class="card-panel orange lighten-2">
                <h2>${truck.truck_name}</h2>
                <div class="card-image center-align">
                  <img class="responsive-img" width="200px" src="${truck.avatar}">
                </div>
                <span id="{truck.id}" class="hearts" data-userid={user.id}><i class="far fa-heart"></i></span>
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
      <span id="{truck.id}" class="hearts" data-userid={user.id}><i class="far fa-heart"></i></span>
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
    $(card).off().on("click", function () {
      let truckID = $(this).attr("id");
      let currentTruckModal = $("#modal" + truckID);
      $(currentTruckModal).show();
    })
  })
}

function activateModals() {
  let modals = $('.modal');  // select all modals
  $.each(modals, function (i, modal) { // loop over each one
    $('.modal-close', modal).off().on('click', function () { // add an on click event handler to the 'close' button.  the $('.modal-close', modal) means, select the element with the class: 'modal-close', inside the current modal
      $(modal).hide(); // hide the modal again
    })
  })
}