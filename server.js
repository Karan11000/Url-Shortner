const express = require("express")
const app = express();
const mongoose = require("mongoose")
const ShortUrl = require("./models/shortUrl");

const DB = 'mongodb+srv://Karan:Karan11000@cluster0.o05wq.mongodb.net/mernstack?retryWrites=true&w=majority'

mongoose.connect(DB)
.then(()=>{
    console.log("succesfull connection");
}).catch((err)=>{
    console.log(err);
});

app.set("view engine", "hbs") 
app.use(express.urlencoded({ extended: false }))

app.get("/", async (req, res)=>{
    // res.send("hello")
    const shortUrls = await ShortUrl.find();
    res.render("index", {shortUrls:shortUrls});
})

app.post("/shortUrls", async (req, res)=>{
         await ShortUrl.create({fullUrl: req.body.fullUrl})
         res.redirect("/")
})

app.get("/:shortUrl", async (req, res)=>{
    const shortUrl = await ShortUrl.findOne({ shortUrl: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.fullUrl);
})

app.listen(8000, ()=>{
    console.log("running at 8000 port")
})