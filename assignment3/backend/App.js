var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

console.log("test");

//Mongo
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

app.use(cors());
app.use(bodyParser.json());

app.use(express.static("public"));
app.use("/images", express.static("images"));

const port = "8081";
const host = "localhost";

//Mongo Get
app.get("/listItems", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db.collection("fakestore_catalog").find(query).limit(100).toArray();
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
  const results = await db.collection("fakestore_catalog").findOne(query);
  console.log("Results :", results);
  if (!results) res.send("Not Found").status(404);
  else res.send(results).status(200);
});

//Mongo Add
app.post("/addItems", async (req, res) => {
  await client.connect();
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const id = values[0]; // id
  const title = values[1]; // name
  const price = values[2]; // price
  const description = values[3]; // description
  const category = values[4]; // imageUrl
  const image = values[5];
  const rating = values[6];
  console.log(id, title, price, description, image);
  const newDocument = {
    id: id,
    title: title,
    price: price,
    description: description,
    category: category, 
    image: image,
    rating: rating
  };
  const results = await db.collection("fakestore_catalog").insertOne(newDocument);
  res.status(200);
  res.send(results);
});

//Mongo Delete
app.delete("/deleteItem", async (req, res) => {
  await client.connect();
  // const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const id = values[0]; // id
  console.log("Item to delete :", id);
  const query = { id: id };
  const results = await db.collection("fakestore_catalog").deleteOne(query);
  res.status(200);
  res.send(results);
});

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});
