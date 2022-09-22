const express = require("express");
const bodyParser = require("body-Parser");
const { link } = require("fs");

const app = express();

var items = [];
var workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function (req, res) {
    var today = new Date();
    
    var options = {
        weekday:"long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);

    res.render("list", { listTitle: day , newListItems: items});
});

app.post("/", function(req,res){
    var item = req.body.newItem;
    if(req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list",{listTitle: "Work List", newListItems: workItems});
})

app.listen(80, function () {
    console.log("Server started on port 80");
})
