const express = require('express');
const path = require('path');
const port =8000;
const db = require('./config/mongoose');
const  Task  = require('./Task/task');
const app = express();

app.set('view engine','ejs')
app.path('views',path.join(__dirname,'views'));
app.path('Task',path.join(__dirname,'Task'));
app.use(express.urlencoded(({ extended: true })));



app.get('/', function(req, res){
    Task.find({}, function(err, task){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('home', {
            tittle: "Home",
            task: task
        });
    }
)});


// creating Tasks
app.post('/create-task', function(req, res){
  //  console.log("Creating Task");
    
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
        }, function(err, newtask){
        if(err){console.log('error in creating task', err); return;}
        

        //console.log(newtask);
        return res.redirect('back');

    });
});


// deleting Tasks
app.get('/delete-task', function(req, res){
    // get the id from query
    var id = req.query;

    // checking the number of tasks selected to delete
    var count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
        
        // finding and deleting tasks from the DB one by one using id
        Task.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err){
            console.log('error in deleting task');
            }
        })
    }
    return res.redirect('back'); 
});


app.listen(port ,function(err){
    if(err){
        console.log('server is not running');
    }
    console.log('server is running');
})