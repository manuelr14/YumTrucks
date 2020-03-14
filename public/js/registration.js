$(document).ready(function () {
  $('select').formSelect();
});

$("#submit").on("click", function (event) {
  event.preventDefault();

  let favorite = $("#favorite").val();

  let newUser = {
    first_name: $("#first-name").val().trim(),
    last_name: $("#last-name").val().trim(),
    email: $("#email").val().trim(),
    password: $("#password").val().trim(),
    street: $("#street").val().trim(),
    city: $("#city").val().trim(),
    state: $("#state").val().trim(),
    zip: $("#zip").val().trim(),
    favorite: favorite, 
    avatar: $("#avatar-url").val().trim(),
  };

  let newTruck = {
    first_name: $("#first-name").val().trim(),
    last_name: $("#last-name").val().trim(),
    email: $("#email").val().trim(),
    password: $("#password").val().trim(),
    street: $("#street").val().trim(),
    city: $("#city").val().trim(),
    state: $("#state").val().trim(),
    zip: $("#zip").val().trim(),
    truck_name: $("#truck-name").val().trim(),
    avatar: $("#avatar-url").val().trim(),
    menu: $("#menu-url").val().trim(),
    website: $("#website-url").val().trim(),
  };

  if ($("#reg-type") === "user") {
    $.post("/api/new/user", newUser) 
      .then(data => {
        console.log(data);
      });
  } else if ($("#reg-type") === "truck") {
    $.post("/api/new/truck", newTruck) 
      .then(data => {
        console.log(data);
      });
  }

  $("#first-name").val("");
  $("#last-name").val("");
  $("#email").val("");
  $("#street").val("");
  $("#city").val("");
  $("#state").val("");
  $("#zip").val("");
  $("#avatar-url").val("");
  $("#menu-url").val("");
  $("#website-url").val("");
  $("#truck-name").val("");

});

function formFields() {
  if ($("#reg-type") === "user") {
    $("user-field").addClass(show) || $("#truck-field").addClass(hide);
  } else if ($("#reg-type") === "truck") {
    $("user-field").addClass(hide) || $("#truck-field").addClass(show);
  } else {
    $("user-field").addClass(hide) || $("#truck-field").addClass(hide);
  }
}