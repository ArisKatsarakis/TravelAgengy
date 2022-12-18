//Index file
var exxpress = require("express");
var fCookie = require("./lib/fortune.js");
var app = exxpress();
var handlebars = require("express3-handlebars").create({
  defaultLayout: "main",
});

app.set("view engine", "handlebars");
app.disable("x-powered-by");

app.engine("handlebars", handlebars.engine);

app.set("port", process.env.PORT || 8080);
app.use(exxpress.static(__dirname + "/public"));
app.use(function(req,res, next) {
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weather = getWeatherData();
    next();
});

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/about", function (req, res) {
  res.render("about", { fortune: fCookie.getFortune() });
});

app.get("/table", function (req, res) {
  let renderElements = {
    currency: {
      name: "United States dollars",
      abbrev: "USD",
    },
    tours: [
      { name: "Hood River", price: "$99.95" },
      { name: "Oregon Coast", price: "$159.95" },
    ],
    specialsUrl: "/january-specials",
    currencies: ["USD", "GBP", "BTC"],
  };
  res.render("table", renderElements);
});

app.use(function (req, res) {
  res.status(404);
  res.render("404");
});

//custom 50 page

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500);
  res.render("500");
});

app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost: " +
      app.get("port") +
      "; press Ctrl- C to terminate"
  );
});



function getWeatherData() {
  return {
    locations: [
      {
        name: "Portland",
        forecastUrl: "http://www.wunderground.com/US/OR/Portland.html",
        iconUrl: "http://icons-ak.wxug.com/i/c/k/cloudy.gif",
        weather: "Overcast",
        temp: "54.1 F (12.3 C)",
      },
      {
        name: 'Bend',
        forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
        iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
        weather: "Partly Cloudy",
        temp: " 55.0 F (12.C)"
      },
      {
        name: "Manzanita",
        forecastUrl: 'httpL//www.wunderground.com/US/OR/Manzanita.html',
        iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
        weather: "Partly Cloudy",
        temp: '55.0 F (12.8 C)'
      },
    ],
  };
}
