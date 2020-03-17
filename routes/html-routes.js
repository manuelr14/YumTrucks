// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/location");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/registration", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/users");
    }
    res.sendFile(path.join(__dirname, "../public/registration.html"));
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      if (isTruckOwner(req, res)) {
        res.redirect("/trucks");
      } else {
        res.redirect("/users");
      }
      res.sendFile(path.join(__dirname, "../public/registration.html"));
    }
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/users", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/users.html"));
  });

  app.get("/users", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/users.html"));
  });

  app.get("/trucks", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/trucks.html"));
  });

  app.get("/results", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/results.html"));
    });

  app.get("/location", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/location.html"));
    });
};

function isTruckOwner(user) {
  console.log(user);
  // Check if user has a record with a truck_owner value of "true" and return true or false
  return false;
}