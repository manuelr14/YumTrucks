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
      id: req.user.id,
      city: req.user.city,
      favorite: req.user.favorite
    });
  });

  app.get("/api/trucks/:truck_name?", (req, res) => {
    console.log(req.user);
    console.log("hit this route instead")
    if (req.params.truck_name) {
      // Display the JSON for ONLY that character.
      // (Note how we're using the ORM here to run our searches)
      db.User.findOne({
        where: {
          truck_name: req.params.truck_name,
          type: "truck"
        }
      }).then(function (result) {
        // res.redirect("/location");
        return res.json(result);
      });
    } else {
      db.User.findAll({
        where: {
          type: "truck",
          city: req.user.city
        }
      }).then(function (result) {
        return res.json(result);
      })
        .catch(err => res.json(err));
    }
  });

  app.get("/api/alltrucks", (req, res) => {
    console.log("hitting all trucks route!");
    db.User.findAll({
      where: {
        type: "truck"
      }
    }).then(function (result) {
      return res.json(result);
    })
      .catch(err => res.json(err));
  });

  app.get("/api/trucks/favorites", (req, res) => {
    console.log("route hit!");
    // console.log(req.body);
    //  console.log("aqui");
    let favorites = req.user.favorite.split(',');   // '0,1,2,3' of ids, will become an array of [0,1,2,3]
    db.User.findAll({
      where: {
        type: "truck",
        id: { in: favorites }
      }
    })
      .then(function (dbPost) {
        console.log("dbPost", dbPost);
        res.json(dbPost);
      })
      .catch(err => res.json(err));
  });

  app.post("/api/trucks/favorite", (req, res) => {
    // 1. get the fav truck they sent over, get the param from the request
    // 2. get the current list of favorites of the user, get user id from the request as well, query the db for the user based on id
    // 3. update the current list with the new value, turn the user's favs into an array, add the new value, convert back to string
    // 4. save the updated list to the user, UPDATE user SET favorites = 'the new list' WHERE id = this user's id
    let hearts = $('.heart');
    $.each(hearts, function (i, heart) {
      $(heart).on("click", function () {
        let newFav = $(this).attr(id);  // this is the userid of the truck, 
        let userId = $(this).data('userid');   // this is the id of the current user who logged in
        $.ajax('/api/trucks/favorite', {
          method: 'post',
          data: {
            newFav: newFav, userId: userId
          }
        }).then(function (data) {
          //do something.
        })
      });
    })

    let newFav = 6; //req.body.newFav;

    let userId = 1; //req.body.userId;
    //  query
    db.User.findAll({
      where: {
        id: userId
      }
    })
      .then(function (dbPost) {
        let user = dbPost[0];
        // should be a list of numbers in a string '1,2,3'
        let currentFavs = user.favorite.split(',');
        currentFavs.push(newFav);
        currentFavs = currentFavs.join(',');
        console.log(currentFavs);
        user.update({ favorite: currentFavs });
      })
      .catch(err => res.json(err));
  });

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
    }).then(function (results) {
      res.json(results);
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
    }).then(function () {
      res.end();
    });
  });

  app.get("/api/users/:id?", (req, res) => {
    console.log(req.user);
    console.log("hit this user route")
    if (req.params.truck_name) {
      // Display the JSON for ONLY that character.
      // (Note how we're using the ORM here to run our searches)
      db.User.findOne({
        where: {
          id: req.params.id,
          type: "user"
        }
      }).then(function (result) {
        // res.redirect("/location");
        return res.json(result);
      });
    } else {
      db.User.findAll({
        where: {
          type: "user",
          city: req.user.city
        }
      }).then(function (result) {
        return res.json(result);
      })
        .catch(err => res.json(err));
    }
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
