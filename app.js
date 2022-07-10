const express= require("express");
const bodyParser=require("body-parser");
const { listen } = require("express/lib/application");
const res = require("express/lib/response");
const date=require(__dirname+"/date.js")


const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let items=["Buy food","cook food","eat food"];
let workItems=[];
app.get("/", function(req,res){
    let day=date.getDate();
    res.render('list', {listTitle: day, newListItem : items});
});

app.post("/" ,function(req,res)
{
    console.log(req.body);
    let item=req.body.newItem;
    if(req.body.list==="work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work",function(req,res){
    res.render("list",{listTitle:"work list", newListItem: workItems})
});
app.get("/about", function(req,res)
{
    res.render("about");
})

app.listen(3000,function(){
    console.log("server started on port 3000");
}); 