$(document).ready(function () {
    $.get("/api/user_data").then(function (data) {
        $("#submit").on("click", function (event) {
            event.preventDefault();

            let location = {
                street: $("#street").val().trim(),
                city: $("#city").val().trim(),
                state: $("#state").val().trim(),
                zip: $("#zip").val().trim(),
            };
            $.put("/api/user", location)
                .then(data => {
                    console.log(data);
                });

            $("#street").val("");
            $("#city").val("");
            $("#state").val("");
            $("#zip").val("");
        });
    });
})