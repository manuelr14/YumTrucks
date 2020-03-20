$(document).ready(function () {
  $('select').formSelect();
  applyHiddenClasses();
  $("#reg-type").on("change", (e) => { applyHiddenClasses(e); });

});

$("#submit").on("click", function (event) {
  event.preventDefault();
  const type = M.FormSelect.getInstance($("#reg-type")).el.value;

  const favorite = $("#favorite").val();

  let newEntity = {
    type,
    first_name: $("#first-name").val().trim(),
    last_name: $("#last-name").val().trim(),
    email: $("#email").val().trim(),
    password: $("#password").val().trim(),
    street: $("#street").val().trim(),
    city: $("#city").val().trim(),
    state: $("#state").val().trim(),
    zip: $("#zip").val().trim(),
    favorite,
    avatar: $("#avatar-url").val().trim(),
    truck_name: $("#truck-name").val().trim() || "",
    menu: $("#menu-url").val().trim() || "",
    website: $("#website-url").val().trim() || ""
  };

  $.post("/api/new/user", newEntity)
    .then(data => {
      console.log(data);
      $("#reg-form").trigger("reset");
      window.location = "/";
    })
    .catch(error => {
      console.log(error);
    });
});

function applyHiddenClasses(e) {
  const selectedRegType = e ? e.target.value : "";
  $(".user-field").removeClass("show");
  $(".truck-field").removeClass("show");
  $(".user-field").removeClass("hide");
  $(".truck-field").removeClass("hide");

  if (selectedRegType === "user") {
    $(".user-field").addClass("show");
    $(".truck-field").addClass("hide");

    $.get("/api/alltrucks",data => {
      console.log("all trucks info");
      console.log(data);
    
      // // // for each character that our server sends us back
      // // for (let i = 0; i < data.length; i++) {
      // //   // create a parent div for the oncoming elements
      // //   let favoriteSection = $('<option value=' i'>');
      // //   // add a class to this div: 'well'
      // //   // wellSection.addClass("well");
      // //   // add an id to the well to mark which well it is
      // //   favoriteSection.attr('id', 'value-'i);
      // //   // append the well to the well section
      // //   $("#favorite").append(favoriteSection);
    
      // //   // Now add all of our character data to the well we just placed on the page
    
      // //   // make the name an h2,
      // //   $('#value-' + i).append( data[i].truck_name );
      // //   // // the role an h3,
      //   // $("#character-well-" + i).append("<h3>Role: " + data[i].role + "</h4>");
      //   // // the age an h3,
      //   // $("#character-well-" + i).append("<h3>Age: " + data[i].age + "</h4>");
      //   // // and the forcepoints an h3.
      //   // $("#character-well-" + i).append("<h3>Force Points: " + data[i].forcePoints + "</h4>");
      // }
    });
    







  } else if (selectedRegType === "truck") {
    $(".user-field").addClass("hide");
    $(".truck-field").addClass("show");
  } else {
    $(".user-field").addClass("hide");
    $(".truck-field").addClass("hide");
  }
}