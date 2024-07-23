const express = require('express');
const { connectDB } = require('./mongooseConncection'); // Ensure correct spelling
const urlRoutes = require('./routes/url');
const URL = require('./models/url');
let ejs = require('ejs');
const app = express();
const PORT = 8001;
const path=require('path')

connectDB('mongodb://127.0.0.1:27017/short-url')
  .then(() => console.log("Connection established"))
  .catch(err => console.log(err));

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({extended:false,}))
app.set("view engine", "ejs");
app.set('views',path.resolve("./views"))
app.use('/url', urlRoutes);
app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true }
  );

  if (!entry) {
    return res.status(404).send('URL not found');
  }

  res.redirect(entry.redirectURL);
});
app.get('/home/UrlShortner',async (req,res)=>{
  res.render("HomePage")
})

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
