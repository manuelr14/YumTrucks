$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/users").then(function(data) {
   console.log(data);
   getUsers(data);
  });
});  

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});

function getUsers(data) {
  console.log(data);
  $("#users-info").empty();
  for (let i = 0; i < data.length; i++) {
    // create a parent div for the oncoming elements
    let infoSection = $("<div>");
    infoSection.addClass("card-panel orange lighten-2");
    infoSection.attr("id", "info-" + i);
    $("#users-info").append(infoSection);
    $("#info-" + i).append("<h2>" + data[i].first_name + " " + data[i].last_name +"</h2>");
    $("#info-" + i).append('<h4>Location: <a href="https://www.google.com/maps/place/' + data[i].street + ", " + data[i].city + ", " + data[i].state + ", " + data[i].zip + '"target="_blank"> ' + data[i].street + ", " + data[i].city + ", " + data[i].state + ", " + data[i].zip + '</a> </h4>');
    $("#info-" + i).append('<h4>Email: <a href="' + data[i].email + '" target="_blank">' + data[i].email + '</a> </h4>');
    $("#info-" + i).append('<h4>user since: <a href="' + data[i].createdAt + '"target="_blank"> ' + data[i].createdAt + '</a> </h4>');
  }
}