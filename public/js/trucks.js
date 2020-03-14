$(document).ready(function() {
    // This file just does a the JS for the trucks page to figure out what information gets populated in what areas
    // and updates the HTML on the page
    $.get("/api/trucks_data").then(function(data) {
      $(".truck-name").text(data.email);
    });
  });  