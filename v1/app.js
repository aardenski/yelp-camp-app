var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
            {name: "Salmon Creek", image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f0c170a2eeb6bb_340.jpg"},
            {name: "Granite Hill", image:"https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f0c170a2eeb6bb_340.jpg"},
            {name: "Mountain Goat's Rest ", image:"https://farm8.staticflickr.com/7102/13379202295_8147ccee08.jpg"}
]

//MANAGING ROUTES
app.get("/", function(req,res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect("campgrounds"); //redirect is a get request
})

app.get("/campgrounds/new", function(req, res){
    res.render("new");
})
//SERVER SETUP
app.listen(process.env.PORT, process.env.IP, () =>{
    console.log("YelpCamp Server Has Started!");
})