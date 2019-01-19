var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose');

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

var Campground = mongoose.model("Campground", campgroundSchema);

var campgrounds = [
            {name: "Salmon Creek", image:"https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f0c678a7e9b7bb_340.jpg"},
            {name: "Granite Hill", image:"https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144295f7c079a3efb6_340.jpg"},
            {name: "Mountain Goat's Rest ", image:"https://farm8.staticflickr.com/7102/13379202295_8147ccee08.jpg"},
]


app.get("/", function(req,res){
    res.render("landing");
})
//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if (err){
           console.log(err);
       } else {
           res.render("index", {campgrounds: allCampgrounds});
       }
    });
});

//CREATE - a new campground
app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name,
        image = req.body.image,
        desc = req.body.description,
        newCampground = {name: name, image: image, description: desc};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if (err){
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect("campgrounds");
        }
    })
})

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
})

//SERVER SETUP
app.listen(process.env.PORT, process.env.IP, () =>{
    console.log("YelpCamp Server Has Started!");
})