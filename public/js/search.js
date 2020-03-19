$("#submit").on("click", function (event) {
    event.preventDefault();
  
    let truck = $("#truck").val().trim();
    getTruck();
  }
)

function getTruck(truck) {
    $.post("/api/:truck?", truck) 
      .then(data => {
        console.log(data);
        $("#reg-form").trigger("reset");
        window.location = "/result";
      })
      .catch(error => {
        console.log(error);
      });
  }