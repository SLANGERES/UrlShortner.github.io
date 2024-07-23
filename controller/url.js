const shortid = require('shortid');
const URL = require('../models/url');
const path=require('path')
const express= require('express')
const app = express();
app.set("view engine", "ejs");
app.set('views',path.resolve("./views"))

async function handleGenerateShortUrl(req, res) {
  console.log("handleGenerateShortUrl function called");
  console.log("Request body:", req.body);
  
  const body = req.body;
  if (!body.url) {
    console.log("URL is missing in the request body");
    return res.status(400).json("url is required");
  }

  const shortID = shortid.generate();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: []
  });

  return res.render("HomePage",{
    id:shortID
  });
}

async function handleAnalyticsUrl(req, res){
  console.log('analytics');
  const shortId = req.params.shortId;

  try {
      const result = await URL.findOne({ shortId }); // Correct field name

      if (!result) {
          return res.status(404).json({ error: 'Short URL not found' });
      }
      
      return res.render("clicks",{
        siteName:result.redirectURL,
        totalclick:result.visitHistory.length,
      });
      // return res.json({ totalClick: result.visitHistory.length });
  } catch (error) {
      console.error('Error fetching analytics:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  handleGenerateShortUrl,
  handleAnalyticsUrl,
};
