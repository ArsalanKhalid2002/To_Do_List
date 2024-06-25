import express from "express";

const app=express();
const port=3000;
var taskList=[];
var workList=[];
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
let namee="";
let day=""
let year=new Date().getFullYear();
let date=new Date().getDate();
let todayDate="";

function calculatingDate(req,res,next){
    let now=new Date().getDay();
    switch(now) {
        case 0:
          day="Sunday";
          break;
        case 1:
            day="Monday";         
            break;
        case 2:
            day="Tuesday";         
            break;
        case 3:
            day="Wednesday";         
            break;
        case 4:
            day="Thursday";         
            break;
        case 5:
            day="Friday";         
            break;
        default:
            day="Saturday";
      }
      todayDate=date+", "+day+" "+year;
      next();
}
app.use(calculatingDate);

function addTolist(req,res,next){
    if(req.body.task){
    namee=req.body["task"];
    taskList.push(namee);
    console.log(taskList);
    }else if(req.body.work)
    {
    namee=req.body["work"];
    workList.push(namee);
    console.log(workList);
    }
    else{
        taskList=taskList;
        workList=workList;
    }
    next();
}
app.use(addTolist);
app.get("/",(req,res)=>{
    var data={
        tasklist:taskList,
       tdate:todayDate,
    };
        res.render("index.ejs",data);
});

app.get("/work",(req,res)=>{
    res.render("work.ejs",{tasklist:workList});
});

app.post("/",(req,res)=>{
    var data={
        tasklist:taskList,
         tdate:todayDate,
    };
    res.render("index.ejs",data);
});
app.post("/work",(req,res)=>{
    res.render("work.ejs",{tasklist:workList});
});
app.listen(port,()=>{
    console.log("Port no "+port);
});