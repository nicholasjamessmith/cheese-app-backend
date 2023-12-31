//Dependencies
//Import .env variables (PORT and MONGODB_URL):
require("dotenv").config()
//Extract PORT from .env, and give it a default value of 3000:
const { PORT = 3000, MONGODB_URL } = process.env;
//Import express framework (for Node.js):
const express = require("express");
//Create an application object:
const app = express();
//Import mongoose (the thing that was downloaded in setup that allows app to connect to MongoDB):
const mongoose = require("mongoose");
//Import cors
const cors = require("cors");
//Import morgan
const morgan = require("morgan");

//Database Connection
//Establishes connection:
mongoose.connect(MONGODB_URL, {
  //gives this property a boolean value of true (?)
  useUnifiedTopology: true,
  // "" (?)
  useNewUrlParser: true,
});

//Connection events
//Initiate connection events syntax:
mongoose.connection
  //When the connection to monoose is working, console.log the message:
  .on("open", () => console.log("You are connected to mongoose"))
  //When the connection to mongoose is broken, console.log the message:
  .on("close", () => console.log("You are disconnected from mongoose"))
  //When there is an error, console.log the error
  .on("error", (error) => console.log(error));

//Models
//Create new variable 'PeopleSchema':
const CheeseSchema = new mongoose.Schema({
  //Assign property 'name' a value which will be a String
  name: String,
  //Assign property 'countryOfOrigin' a value which will be a String
  countryOfOrigin: String,
  //Assign property 'image' a value which will be a String (note: must end in an appropriate image file extension such as .jpg)
  image: String,
});

//Create a variable Cheese (that receives 2 parameters, string "Cheese" and variable 'CheeseSchema' ?)
const Cheese = mongoose.model("Cheese", CheeseSchema);

//Middleware
//To prevent cors errors, open access to all origins
app.use(cors())
//Extra logging detail/specifics
app.use(morgan("dev"));
//To parse json bodies
app.use(express.json());

//Routes
//When the "/" route is hit, execute the next line of code:
app.get("/", (req, res) => {
  //Resond to the 'get' request by sending this string to the browser
  res.send("Hello, World!");
})

//Cheese Index Route
//When the "/cheese" get route is hit, execute the next line of code:
app.get("/cheese", async (req, res) => {
  //Try (?)
  try {
    //Fetch all cheese from the database, .find built in to "Cheese", pass empty object to return all cheese
    const cheese = await Cheese.find({})
    //Send all people (in database?)
    res.json(cheese)
    //Catch (?)
  } catch (error) {
    //Send error message
    res.status(400).json({ error });
  }
});

//Cheese Create Route
//When the "/cheese" post route is hit, execute the next line of code:
app.post("/cheese", async (req, res) => {
  //Try (?)
  try {
    //Create the new cheese
    const cheese = await Cheese.create(req.body);
    //Send newly created cheese as JSON
    res.json(cheese)
    //Catch (?)
  } catch (error) {
    //Send error message
    res.status(400).json(error);
  }
});

//Cheese Show Route
app.get("/cheese/:id", async (req, res) => {
  try {
    const cheese = await Cheese.findById(req.params.id);
    res.json(cheese);
  } catch (error) {
    res.status(400).json({ error });
  }
})

//Cheese Update Route
//When the /cheese:/:id put route is hit, execute the next line of code as part of an asynchronous request to the (database?)
app.put("/cheese/:id", async (req, res) => {
  //Try (?)
  try {
    const cheese = await Cheese.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cheese);
    //Catch (?) kind of like else if (error):
  } catch (error) {
    //Then display 400 error message (if program 'catches' an error)
    res.status(400).json({ error });
  }
});

//People Delete Route
//When the /cheese:/:id delete route is hit, execute the next line of code as part of an asynchornous request to the (database ?)
app.delete("/cheese/:id", async (req, res) => {
  //Try (?)
  try {
    const cheese = await Cheese.findByIdAndRemove(req.params.id)
    res.status(204).json(cheese)
  } catch (error) {
    //Then display 400 error message (if program 'catches' an error
    res.status(400).json({ error });
  }
});

//Cheese

//Listener
//Tells this application where (which port) to receive information from/on, and to console log a message when it is doing so:
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

//Progress Report: Check that endpoints are working on Postman.