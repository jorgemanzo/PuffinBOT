### PuffinBOT 🐦 🌈☀️ ☔️ ☁️
A discord JS bot I made because idk why you gotta ask me so many questions uvu. I like birds and I made a small weather app thing before so I wanted to make a bot that did things.

#### Install
Current progress lives on Dev, polished stuff lives on master.
To use, do `npm install` once you clone the repo and then
do a `node puffin.js`.

Once thats done, you should make a `token.json` file in the same directory. In there you should do this:
```
{
  "token": "<YOUR_TOKEN_FROM_DISCORD>"
}
```
Go to discord and get yourself a bot token. Plug that in here. Its not gonna work without it.

### Current commands
- `!weather <zipcode>` Returns a greeting stating the nearest
location to that zipcode with temperature and humidity. Only U.S. zipcodes supported.
