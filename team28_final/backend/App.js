var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

console.log("test");

//Mongo
const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms319";
const client = new MongoClient(url);
const db = client.db(dbName);

app.use(cors());
app.use(bodyParser.json());

app.use(express.static("public"));
app.use("/images", express.static("images"));

const port = "8081";
const host = "localhost";

//Mongo - Get
app.get("/listTools", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db.collection("tools").find(query).limit(100).toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});

//Mongo Get ID
app.get("/:id", async (req, res) => {
    const itemid = Number(req.params.id);
    console.log("Item to find :", itemid);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = { id: itemid };
    const results = await db.collection("tools").findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
  });

//Mongo - Add
app.post("/addTool", async (req, res) => {
  await client.connect();
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const id = values[0];
  const name = values[1];
  const image = values[2];
  const inventory = values[3];
  const price = values[4];
  const description = values[5];
  console.log(id, name, price, description, imageUrl);
  const newDocument = {
    id: id,
    name: name,
    img: image,
    qty: 0,
    inventory: inventory,
    price: price,
    description: description,
  };
  const results = await db.collection("tools").insertOne(newDocument);
  res.status(200);
  res.send(results);
});

//Mongo - Delete
app.delete("/deleteTool", async (req, res) => {
  await client.connect();
  // const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const id = values[0]; // id
  console.log("Tool to delete :", id);
  const query = { id: id };
  const results = await db.collection("tools").deleteOne(query);
  res.status(200);
  res.send(results);
});

//Mongo - Update
app.post("/updateTools", async (req, res) => {
  await client.connect();
  //const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const id = values[0]; 
  const price = values[1]; 
  const inventory = values[2];
  const results = await db.collection("tools").updateOne({ id: id },{ $set: { inventory: inventory } });
  const results1 = await db.collection("tools").updateOne({ id: id },{ $set: { price: price } });
  console.log("Item Updated: " + id);
  res.status(200);
  res.send(results);
});

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});
