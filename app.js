const fs= require('fs');
const express= require('express');
const app= express();
const path = require('path');


app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/',function(req,res){
    // res.send('Welcome to Home Page');
    fs.readdir(`./file`,function(err,files){
        res.render("index",{files});
    })
    
});
app.get('/edit/:filename',function(req,res){
    fs.readFile(`./file/${req.params.filename}`,'utf-8',function(err,data){
        if(err) throw err;
            res.render('edit',{data,filename:req.params.filename});
    });
   
    
});

app.post('/update/:filename',function(req,res){
    fs.writeFile(`./file/${req.params.filename}`,req.body.filedata,function(err){
        if(err) throw err;
            res.redirect('/');
    });
   
    
});

app.get('/creat',function(req,res){
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const fn=(`${day}-${month}-${year}.txt`);
    fs.writeFile(`./file/${fn}`,'Hello World!',function(err){
    if(err) throw err;
    else{
        res.send('File created successfully.');
    }
});
});


app.get('/khatabook',function(req,res){
  res.render("creatkhatabook");

});


app.listen(3000);