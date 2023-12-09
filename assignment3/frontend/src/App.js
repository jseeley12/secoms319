import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  //Category
  const [ProductsCategory, setProductsCategory] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllProducts();
  }, []);

  function getAllProducts() {
    setIsLoading(true);
    fetch("http://localhost:8081/listItems")
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setProductsCategory(res);
        setIsLoading(false);
      });
  }

  function getOneProducts(id) {
    setIsLoading(true);
    fetch("http://localhost:8081/"+id)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setOneProduct(res);
        setIsLoading(false);
      });
  }

  const listItems = ProductsCategory.map((el) => (
    <div key={el.id} className="col">
      <div style={{ backgroundColor: "#ECECEC" }} className="card shadow-sm">
        <img className="imgnew" src={el.image} width={200} /> <br />
        <div className="card-body" id="cardtoo">
          <p className="title">
            {el.title} <br />
          </p>
          {el.description} <br />
          <br />
          <span className="price">
            Price:
            {" $"}
            {el.price}
            <br />
          </span>
          Category: {el.category} <br />
          Rating: {el.rating}
          <br />
          Id: {el.id}
        </div>
      </div>
    </div>
  ));

  //ID Find
  const [queryID, setQueryID] = useState("");

  const FindQueryID = (e) => {
    setQueryID(e.target.value);
  };

  function SelectButton() {
    getOneProducts(queryID);
    console.log(queryID);
  };

  //Displays
  const [ListProduct, setListProduct] = useState(true);
  const [UpdateProduct, setUpdateProduct] = useState(false);
  const [AddProduct, setAddProduct] = useState(false);
  const [DeleteProduct, setDeleteProduct] = useState(false);
  const [Info, setInfo] = useState(false);

  function ShowList() {
    setListProduct(true);
    setUpdateProduct(false);
    setAddProduct(false);
    setDeleteProduct(false);
    setInfo(false);
  }

  function ShowUpdate() {
    setListProduct(false);
    setUpdateProduct(true);
    setAddProduct(false);
    setDeleteProduct(false);
    setInfo(false);
  }

  function ShowAdd() {
    setListProduct(false);
    setUpdateProduct(false);
    setAddProduct(true);
    setDeleteProduct(false);
    setInfo(false);
  }

  function ShowDelete() {
    setListProduct(false);
    setUpdateProduct(false);
    setAddProduct(false);
    setDeleteProduct(true);
    setInfo(false);
  }

  function ShowInfo() {
    setListProduct(false);
    setUpdateProduct(false);
    setAddProduct(false);
    setDeleteProduct(false);
    setInfo(true);
  }

  //add -  Mongo
  function postMethod() {
    fetch("http://localhost:8081/addRobot", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: 4,
        name: "Robot 4",
        price: 124.5,
        description: "This is a description of Robot 4",
        imageUrl: "https://robohash.org/",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        var container = document.getElementById("showData");
        container.innerHTML = JSON.stringify(data);
      });
  }

  //delete -  Mongo
  function deleteMethod(id) {
    fetch("http://localhost:8081/deleteItem", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        var container = document.getElementById("showData");
        container.innerHTML = JSON.stringify(data);
      })
      .catch((err) => console.log("Errror:" + err));
  }

  return (
    <>
      <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <div className="container-fluid d-flex align-items-center">
          <h2 className="d-flex align-items-center fs-4 text-white mb-0">
            Assignment 3
          </h2>
          <br />
          <div>
            <botton className="btn btn-primary my-2" onClick={ShowInfo}>
              Info
            </botton>
            .
            <botton className="btn btn-primary my-2" onClick={ShowList}>
              Read
            </botton>
            .
            <botton className="btn btn-primary my-2" onClick={ShowAdd}>
              Create
            </botton>
            .
            <botton className="btn btn-primary my-2" onClick={ShowUpdate}>
              Update
            </botton>
            .
            <botton className="btn btn-primary my-2" onClick={ShowDelete}>
              Delete
            </botton>
          </div>
        </div>
      </header>

      {/* Get */}
      {ListProduct && (
        <div>
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 ">
              {listItems}
            </div>
          </div>
        </div>
      )}

      {/* Add */}
      {AddProduct && <div></div>}

      {/* Update */}
      {UpdateProduct && <div></div>}

      {/* Delete */}
      {DeleteProduct && (
        <div>
          <h4>ID to delete</h4>
          <input 
            type="search" 
            value={queryID}
            onChange={FindQueryID}/>
            <botton className="btn btn-primary my-2" onClick={SelectButton}>
              Seach
            </botton>
        </div>
      )}

      <footer
        class="text-body-secondary py-5 background"
        style={{ backgroundColor: "#ECECEC" }}
      >
        <div class="container">
          <p class="float-end mb-2">
            <a href="#">Back to top</a>
          </p>
          <p class="mb-6">COM S 319 - Assignment 3</p>
        </div>
      </footer>
    </>
  );
}

export default App;
