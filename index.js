//hemlo ashish
const express = require('express');
const port = 8000;


const db=require('./config/mongoose');
const Work = require('./model/Works');
const app = express();

app.set('view engine','ejs');
app.set('views',"./views");
app.use(express.urlencoded());
app.use(express.static('assets'));



app.get('/',function(req,res){
  console.log('entered');
   Work.find({},function(err,Work){
       if(err){
           console.log(`Error in fetching contacts from db`);
           return;
       }

        return res.render('home',{
           title:"I am flying",
           work_detail:Work
       });
   }); 
});

// create a array which stores all the id of the data;
arr=[];
// route the add task icon to this controller ,to store data in database
app.post('/create-work',function(req,res){
    Work.create({
        description:req.body.description ,
        category:req.body.category ,
        date:req.body.date
    },function(err,newWork){
        if(err){
            console.log('error in creating a work');
            return;
        }
        arr.push(newWork._id);
        console.log('.........',newWork);
        return res.redirect('back');
    });
});

// route the delete button to this controller
app.get('/delete-single-element',function(req,res){
    let id=req.query.id;
    Work.findByIdAndDelete(id,
        function(err){
            if(err){
                console.log('error in deleting objet from database');
                return;
            }
            return res.redirect('back');
        })
})


// route the delete all button to this controller
app.get('/delete-all',function(req,res){
    console.log('delete');
    for(let i of arr){
        Work.findByIdAndDelete(i,
            function(err){
                if(err){
                    console.log('error in deleting object from database');
                    return;
                }
            })
        
    }
    return res.redirect('back');
})


// run the server the the port:8000
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`server is running fine on port : ${port}`);
});

