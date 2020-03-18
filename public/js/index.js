$(document).ready(function() {
    // Getting references to our form and inputs
    var loginForm = $("form.login");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");

    //Get true/false variable from a radio input that asks whether or not the user is logging in as a truck 
    var isTruck = false;

  
    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.email || !userData.password) {
        return;
      }
  
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
      //determine wiether 
      var url = isTruck ? "/api/trucks/login" : "/api/login";
      $.post(url, {
        email: email,
        password: password
      })
        .then(function() {
          ///if isTruck
          window.location.replace("/users");

         //else
         //redirect to /trucks instead 
         
          // If there's an error, log the error
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  });  


  $("#submit").on("click", function (event) {
    event.preventDefault(); 
    
    let regType = $("#reg-type").val();
  
    let userLogin = {
      username: $("#email").val().trim(),
      password: $("#password").val().trim(),
    };
  
    if (regType === "user") {
      $.post("/api/login/user", userLogin) 
        .then(data => {
          console.log(data);
          $(".login").trigger("reset");
          window.location = "/location";
        })
        .catch(error => {
          console.log(error);
        });
    } else if (regType === "truck") {
      $.post("/api/login/truck", userLogin) 
        .then(data => {
          console.log(data);
          $(".login").trigger("reset");
          window.location = "/location";
        })
        .catch(error => {
          console.log(error);
        });
    }
  });