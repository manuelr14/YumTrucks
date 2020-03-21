$(document).ready(function () {
  $('select').formSelect();
  applyHiddenClasses();
  $("#reg-type").on("change", (e) => { applyHiddenClasses(e); });


  $.get("/api/alltrucks", data => {
    let all_trucks = [];
      for (let i = 0; i < data.length; i++) {
        all_trucks.push(data[i].truck_name);
      }
      for (let i = 0; i < all_trucks.length; i++) {
        let truck = $(`<option value="${all_trucks[i]}">${all_trucks[i]}</option>`);
        $("#favorite").append(truck);
      }
      $('select').formSelect();
      console.log(all_trucks);
    });
})

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
    } else if (selectedRegType === "truck") {
      $(".user-field").addClass("hide");
      $(".truck-field").addClass("show");
    } else {
      $(".user-field").addClass("hide");
      $(".truck-field").addClass("hide");
    }
  }

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
  } else if (selectedRegType === "truck") {
    $(".user-field").addClass("hide");
    $(".truck-field").addClass("show");
  } else {
    $(".user-field").addClass("hide");
    $(".truck-field").addClass("hide");
  }
}