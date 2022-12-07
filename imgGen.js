'use strict';
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


async function imgGen(req, res, next) {
  try{
      let createPrompt = req.query.prompt;
      let generator = await openai.createImage({
        prompt: `${createPrompt}`,
        n: 1,
        size: '1024x1024'
      });
      image_url = generator.data.data[0].url;
      res.send(image_url);
  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}

module.exports = imgGen;
