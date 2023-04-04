//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose= require("mongoose");
const _=require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://priyatamkumareee20:Kpriyatam420@cluster0.vxcq1t6.mongodb.net/todolistDB",{useNewUrlParser:true});
 
const itemsSchema={
  name: String
};
const Item=mongoose.model( "Item",itemsSchema);

const item1=new Item({
  name:"Buy food and pay bill"
});
const item2=new Item({
  name:"cook food"
});
const item3=new Item({
  name:"eat food"
});
const item4=new Item({
  name:"read book"
});
const defaultItems=[item1,item2,item3,item4];

const listSchema={
  name: String,
  items: [itemsSchema]
};

const List=mongoose.model("List",listSchema);

// Item.insertMany(defaultItems)
// .then(function () {
//       console.log("Successfully added item");
//     })
//     .catch(function (err) {
//       console.log(err);
//     });

// Item.find({})
// .then(function (err,foundItems) {
//       res.render("list", {listTitle: day, newListItems: items});
//     })
//     .catch(function (err) {
//       console.log(err);
//     });

app.get("/", function(req, res) {

Item.find({})
  .then(function(foundItems)
  {
    if(foundItems.length === 0){
      Item.insertMany(defaultItems)
      .then(function () {
            console.log("Successfully added item");
          })
          .catch(function (err) {
            console.log(err);
          });
          res.redirect("/");
    }
    else
    res.render("list", {listTitle: "Today", newListItems: foundItems});
  });

});

app.get("/:customListName", function(req,res)
{
  const customeListName=_.capitalize(req.params.customListName);
  List.findOne({name : customeListName})
  .then(function(foundOne)
  {
    if(foundOne)
    {
      res.render("list",{listTitle:foundOne.name, newListItems:foundOne.items});
    }
    else
    {
      const list=new List({
        name: customeListName,
        items: defaultItems
      });
      list.save();
      res.redirect("/"+customeListName);
    }
  })

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName=req.body.list;
  const item=new Item({
    name:itemName
  });
  if(listName==="Today"){
    item.save();
    res.redirect("/");
  }
  else{
    List.findOne({name:listName})
    .then(function(foundList)
    {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName);
    })
  }
});
app.post("/delete",function(req,res){
  const checkedItemId=req.body.checkbox;
  const listName=req.body.listName;

  if(listName==="Today"){
    Item.findByIdAndRemove(checkedItemId)
    .then(function()
    {
        console.log("sucessfully deleted item ");
        res.redirect("/");
    });
  }
  else{
    List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemId}}})
    .then(function(foundList){
      if(foundList)
      res.redirect("/"+listName);
    });
  }
});

app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});
