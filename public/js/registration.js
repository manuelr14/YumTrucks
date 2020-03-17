$(document).ready(function () {
  $('select').formSelect();
  applyHiddenClasses();
  $("#reg-type").on("change", (e) => {applyHiddenClasses(e);});
});

$("#submit").on("click", function (event) {
  event.preventDefault();
  const regType = M.FormSelect.getInstance($("#reg-type")).el.value;

  let favorite = $("#favorite").val();

  let newEntity = {
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
    truck_name: $("#truck-name").val().trim() || "",
    menu: $("#menu-url").val().trim() || "",
    website: $("#website-url").val().trim() || ""
  };

  if (regType === "user") {
    $.post("/api/new/user", newEntity) 
      .then(data => {
        console.log(data);
        $("#reg-form").trigger("reset");
        window.location = "/location";
      })
      .catch(error => {
        console.log(error);
      });
  } else if (regType === "truck") {
    $.post("/api/new/truck", newEntity) 
      .then(data => {
        console.log(data);
        $("#reg-form").trigger("reset");
        window.location = "/location";
      })
      .catch(error => {
        console.log(error);
      });
  }

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
  } else if (selectedRegType === "truck") {
    $(".user-field").addClass("hide");
    $(".truck-field").addClass("show");
  } else {
    $(".user-field").addClass("hide");
    $(".truck-field").addClass("hide");
  }
}