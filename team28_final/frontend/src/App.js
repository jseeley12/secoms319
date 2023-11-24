import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {

  let items;

  //From Mongo
  function getMethod() {
    fetch('http://localhost:8081/listTools')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            items = data; 
        })
  };

  //Shop
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [ProductsCategory, setProductsCategory] = useState(items);

  const listItems = ProductsCategory.map((el) => (
    <div key={el.id} className="col">
      <div className="card shadow-sm" id="cards">
        <img className="imgnew" src={el.image} width={200} /> <br />
        <div className="card-body" id="cardtoo">
          <p className="title">
            {el.title} <br />
          </p>
          {el.description} <br />
          <br />
          <span className="price">
            <span className="commentPrice">{"For the small price of:"}</span>{" "}
            {"    "}
            {el.price}
            {"$"} <br /> <br />
          </span>
          <div style = {{ textAlign: "center"}}>
          <button
            type="button"
            variant="light"
            onClick={() => removeFromCart(el)}
          >
            -
          </button>{" "}
          {el.qty}{" "}
          <button
            type="button"
            variant="light"
            onClick={() => addToCart(el)}
          >
            {" "}
            +{" "}
          </button>
          </div>
        </div>
      </div>
    </div>
  ));

  //Cart
  const addToCart = (el) => {
    let hardCopy = [...cart];
    if (el.qty < 1) {
      setCart([...cart, el]);
    } else {
      setCart(hardCopy);
    }
    el.qty = el.qty + 1;
    console.log(el.qry);
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    //hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    if (el.qty > 0) {
      el.qty = el.qty - 1;
    }
    if (el.qty <= 0) {
      hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    }
    setCart(hardCopy);
    console.log(el.qry);
  };

  const cartItems = cart.map((el) => (
    <div key={el.id} className="col">
      <div className="card shadow-sm">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 ">
            <div className="col" class="centerText"> <img class="img-fluid" src={el.image} width={150} /> </div>
            <div className="col" class="centerText"> Item: <span style={{ fontWeight: "bold" }}>{el.title}</span> </div>
            <div className="col" class="centerText"> Price: <span style={{ fontWeight: "bold" }}>${el.price}</span>{" "} </div>
            <div className="col" class="centerText"> <span >Quantity: <span style={{ fontWeight: "bold" }}>{el.qty}</span></span></div>
          </div>
        </div>

      </div>
    </div>
  ));

  //Search
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    const results = items.filter((eachProduct) => {
      if (e.target.value === "") return ProductsCategory;
      return eachProduct.title
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setProductsCategory(results);
  };


  return (
    <>
      <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <div className="container-fluid d-flex align-items-center">
          <h2 className="d-flex align-items-center fs-4 text-white mb-0">
            Tools
          </h2>
          <botton className="btn btn-primary my-2">Sign in</botton>
        </div>
      </header>
      <div className="container-fluid">
        <div className="row">
          <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
            <div className="align-items-center">
              <h3>Cart (0)</h3>
              <botton className="btn btn-primary my-2">Check out</botton>
            </div>
            <hr></hr>
            <h4>Search</h4>
            <input
              className="searchbarbtn"
              type="search"
              // value={query}
              // onChange={handleChange}
            />
            <hr></hr>
            <botton className="btn btn-primary my-2">Help</botton>
          </div>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 ">
                {listItems}
              </div>
            </div>
            <h1>Hello World</h1>
            <h1>Hello World</h1>
            <h1>Hello World</h1>
            <h1>Hello World</h1>
            <h1>Hello World</h1>
            <h1>Hello World</h1>
            <h1>Hello World</h1>
            <h1>Hello World</h1>
            <h1>Hello World</h1>
            <h1>Hello World</h1>
            <h1>Hello World</h1>
            <h1>Hello World</h1>
            <h1>Hello World</h1>
            <h1>Hello World</h1>
            <h1>Hello World</h1>
            <h1>Hello World</h1>
          </main>
        </div>
      </div>
      <footer>
        <h1>Footer</h1>
      </footer>
    </>
  );
}

export default App;
