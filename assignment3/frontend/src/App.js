import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  //Category
  const [ProductsCategory, setProductsCategory] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8081/listItems")
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setProductsCategory(res);
        setIsLoading(false);
      });
  }, []);

  const listItems = ProductsCategory.map((el) => (
    <div key={el.id} className="col">
      <div style={{ backgroundColor: "#ECECEC" }} className="card shadow-sm">
        <img className="imgnew" src={el.img} width={200} /> <br />
        <div className="card-body" id="cardtoo">
          <p className="title">
            {el.name} <br />
          </p>
          {el.discription} <br />
          <br />
          <span className="price">
            <span className="commentPrice">{"For the small price of:"}</span>{" "}
            {"    "}
            {"$"}
            {el.price}
            <br /> <br />
          </span>
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              variant="light"
              onClick={() => removeFromCart(el)}
            >
              -
            </button>{" "}
            {el.qty}{" "}
            <button type="button" variant="light" onClick={() => addToCart(el)}>
              {" "}
              +{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  //Displays
  const [ListProduct, setListProduct] = useState(true);
  const [UpdateProduct, setUpdateProduct] = useState(false);
  const [AddProduct, setAddProduct] = useState(false);
  const [DeleteProduct, setDeleteProduct] = useState(false);

  function ShowList() {
    setListProduct(true);
    setUpdateProduct(false);
    setAddProduct(false);
    setDeleteProduct(false);
  }

  function ShowUpdate() {
    setListProduct(false);
    setUpdateProduct(true);
    setAddProduct(false);
    setDeleteProduct(false);
  }

  function ShowAdd() {
    setListProduct(false);
    setUpdateProduct(false);
    setAddProduct(true);
    setDeleteProduct(false);
  }

  function ShowDelete() {
    setListProduct(false);
    setUpdateProduct(false);
    setAddProduct(false);
    setDeleteProduct(true);
  }

  return (
    <>
      <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <div className="container-fluid d-flex align-items-center">
          Assignment 3
          
        </div>
      </header>

      {/* Get */}
      {ListProduct && <div>

      </div>}
      
      {/* Add */}
      {AddProduct && <div>

      </div>}

      {/* Update */}
      {UpdateProduct && <div>

      </div>}

      {/* Delete */}
      {DeleteProduct && <div>
        
      </div>}

      <footer
        class="text-body-secondary py-5 background"
        style={{ backgroundColor: "#ECECEC" }}
      >
        <div class="container">
          <p class="float-end mb-2">
            <a href="#">Back to top</a>
          </p>
          <p class="mb-6">
            COM S 319 - Assignment 3
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
