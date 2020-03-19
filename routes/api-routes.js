// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      type: req.user.type,
      email: req.user.email,
      id: req.user.id
    });
  });

app.get("/api/:truck_name?", (req, res) => {
  if (req.params.truck_name) {
    // Display the JSON for ONLY that character.
    // (Note how we're using the ORM here to run our searches)
    db.User.findOne({
      where: {
        truck_name: req.params.truck_name
      }
    }).then(function (result) {
      // res.redirect("/location");
      return res.json(result);
    });
  } else {
    db.User.findAll().then(function (result) {
      return res.json(result);
    });
  }
});


// app.get("/api/:characters?", (req, res) => {
//   if (req.params.characters) {
//     // Display the JSON for ONLY that character.
//     // (Note how we're using the ORM here to run our searches)
//     Character.findOne({
//       where: {
//         routeName: req.params.characters
//       }
//     }).then(function(result) {
//       return res.json(result);
//     });
//   } else {
//     Character.findAll().then(function(result) {
//       return res.json(result);
//     });
//   }
// });


app.put("/api/updateUser", (req, res) => {
  console.log(req.body);
  console.log(req.user);
  db.User.update({
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
  }, {
    where: {
      id: req.user.id
    }
  }).then(function(results) {
    res.json(results);
  });
});

app.get("/api/trucks_data", function(req,res){
  console.log(req.body);
  console.log(req.user);

  db.User.findAll({
    where: {
      type: req.body.type,
      city: req.body.city

    }
  }).then(function(results){
    // res.json(
    // email: req.user.email,
    // id: req.user.id);
   
    res.json(results);
    console.log(results);
  });
});

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });


  app.post("/api/new/user", (req, res) => {
    db.User.create({
      type: req.body.type,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      favorite: req.body.favorite || "",
      avatar: req.body.avatar,
      truck_name: req.body.truck_name || "",
      menu: req.body.menu || "",
      website: req.body.website || ""
    }).then(function (){
      res.end();
    });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
