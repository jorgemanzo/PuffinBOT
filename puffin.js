const Discord = require("discord.js");
const k2f =  require("kelvin-to-fahrenheit");
const cities = require("cities");
const fetch = require("node-fetch");
const config = require("./config.json");
const tokenFile = require("./token.json");

const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

function searchZip(zipCode){
  try {
    let cityName = cities.zip_lookup(zipCode).city;
    let callURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&APPID=aa9644578cbb315c8d2f7c97b00ecba3";
    return {
      OMWCALL: callURL,
      city: cityName
    }
  } catch (error) {
    return {
      OMWCALL: -1,
      city: -1
    }
  }

}

function JSONify(resp) {
  return resp.json();
}

client.on("message", (message) => {
  if(!message.content.startsWith(config.prefix) || message.author.bot){
    return;
  }

  let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();

  if(command === "weather" && args.length > 0) {
    let searchInfo = searchZip(args[0]);
    if (searchInfo.OMWCALL !== -1) {

      fetch(searchInfo.OMWCALL).then(
        resp => JSONify(resp)
      ).then(
        JSONobj => {
          let temp = k2f(JSONobj.main.temp);
          let humidity = JSONobj.main.humidity.toString();
          let phrase = "Heya! The weather for " + searchInfo.city
          + " is currently " + temp + " °F with " + humidity + "% humidity!";
          message.channel.send(phrase);
        }
      )

    } else {
      message.channel.send("Hey uhh... check your args pls. I was expecting "
    + "a zipcode, but you gave me " + args[0] + " or nothing at all. And I wasn't "
    + "expecting that.. please dont.");
    }
  }
});

client.login(tokenFile.token);
