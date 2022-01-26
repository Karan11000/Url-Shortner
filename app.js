const express = require("express")
const app = express();
const mongoose = require("mongoose")
const ShortUrl = require("./models/shortUrl");

mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
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
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.fullUrl);
})

app.listen(8000, ()=>{
    console.log("running at 8000 port")
})