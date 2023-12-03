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

const port = "8081";
const host = "localhost";

//Mongo
app.get("/listTools", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
        .collection("tools")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

app.post("/addTool", async (req, res) => {
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    const id = values[0]; // id
    const name = values[1]; // name
    const price = values[2]; // price
    const description = values[3]; // description
    const imageUrl = values[4]; // imageUrl
    console.log(id, name, price, description, imageUrl);
    const newDocument = {
       //form for new tool
    };
    const results = await db.collection("tools").insertOne(newDocument);
    res.status(200);
    res.send(results);
  });
  
  app.delete("/deleteTool", async (req, res) => {
    await client.connect();
    // const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    const id = values[0]; // id
    console.log("Tool to delete :",id);
    const query = { id: id };
    const results = await db.collection("tools").deleteOne(query);
    res.status(200);
    res.send(results);
    });
app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
  });