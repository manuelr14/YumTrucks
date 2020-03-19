console.log(this);

$("#submit").on("click", function (event) {
    event.preventDefault();
    const regType = window.regType;
    const userId = window.userId;
  
    let updatedLocation = {
      street: $("#street").val().trim(),
      city: $("#city").val().trim(),
      state: $("#state").val().trim(),
      zip: $("#zip").val().trim(),
    };

    $.ajax({
      url: '/api/updateUser',
      type: 'PUT',
      data: updatedLocation,
      success: function(data) {
        console.log(data);
        $("#reg-form").trigger("reset");
        window.location = "/routeUser";
      },
      error: function(error) {
        console.log(error);
      }
    });
  }
)