const express = require("express")
const app = express()
const path = require('path')
const fs = require('fs')

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))


// when you are create the any file so every file is stored in the myfiles 
app.get("/", function (req, res) {
  fs.readdir(`./files`, function (err, files) {
    res.render("index", { myfiles: files })
  })
})



// when i am click the create button then your title should be converted in the filename .txt but this is not using the satatic this is using the dynamically that's the reason we are using the post method not uding the get method .
app.post("/create", function (req, res) {
  // this is create the file when user write in the textbox .
  fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function (err) {
    //  after we are show the new page without refresh 
    res.redirect("/")
    // res.errored("page not fount")
  })
})


// this is using in the new edit file privouse file name wass gonna in the text box
app.get("/edit/:filename" , function(req,res){
  res.render("edit" , {filename : req.params.filename})
})



// this is create the change the privouse file name to new file name 

app.post("/edit" , (req,res)=>{
   fs.rename(`./files/${req.body.privous}` , `./files/${req.body.new}` , function(err){
   res.redirect("/")
  })
})


// when you are click the read more than this is called 
app.get("/files/:filename", function (req, res) {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, filedata) {
    res.render("show", { filename: req.params.filename, filedata: filedata })
  })
})
app.listen(3000)