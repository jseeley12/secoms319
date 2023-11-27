import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";



function App() {

  //Shop
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [ProductsCategory, setProductsCategory] = useState([]);
  const [ProductsCategoryRAW, setProductsCategoryRAW] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:8081/listTools')
      .then(response => response.json())
      .then(res => {
          console.log(res);
          setProductsCategory(res); 
          setProductsCategoryRAW(res);
          setIsLoading(false)
      })

  },[])

  const listItems = ProductsCategory.map((el) => (
    <div key={el.id} className="col">
      <div className="card shadow-sm">
        <img className="imgnew" src={el.img} width={200} /> <br />
        <div className="card-body" id="cardtoo">
          <p className="title">
            {el.name} <br />
          </p>
          {el.discription} <br />
          <br />
          <span className="price">
            <span className="commentPrice">{"For the small price of:"}</span>{" "}
            {"    "}{"$"}
            {el.price}
             <br /> <br />
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
    console.log(el.qty);
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
    console.log(el.qty);
  };

  const cartItems = cart.map((el) => (
    <div key={el.id} className="col">
      <div className="card shadow-sm">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 ">
            <div className="col" class="centerText"> <img class="img-fluid" src={el.img} width={150} /> </div>
            <div className="col" class="centerText"> Item: <span style={{ fontWeight: "bold" }}>{el.name}</span> </div>
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
    let items = ProductsCategoryRAW; 
    setQuery(e.target.value);
    const results = items.filter((eachProduct) => {
      if (e.target.value === "") return ProductsCategory;
      return eachProduct.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setProductsCategory(results);
  };

  //Displays
  const [checkOut, setcheckout] = useState(false);
  const [catalog, setcatalog] = useState(true);
  const [userInfo, setUserInfo] = useState(false);
  const [confirmation, setconfirmation] = useState(false);
  const [error, setError] = useState(false);

  function ShowCatalog() {
    setQuery("");
    setProductsCategory(ProductsCategoryRAW);
    setcheckout(false);
    setcatalog(true);
    setUserInfo(false);
    setconfirmation(false);
    setError(false);
  }

  function ShowCheckout() {
    setcheckout(true);
    setcatalog(false);
    setUserInfo(true);
    setconfirmation(false);
    setError(false);
  }

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

      {/* Catalog */}
      {catalog && <div className="container-fluid">
        <div className="row">
          <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
            <div className="align-items-center">
              <h3>Cart ({cart.length})</h3>
              <botton className="btn btn-primary my-2" onClick={ShowCheckout}>Check out</botton>
            </div>
            <hr></hr>
            <h4>Search</h4>
            <input
              className="searchbarbtn"
              type="search"
              value={query}
              onChange={handleChange}
            />
            <hr></hr>
            <botton className="btn btn-primary my-2">Help</botton>
          </div>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="container">
              {!isLoading &&<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 ">
                {listItems}
              </div>}
            </div>
          </main>
        </div>
      </div>}

      {checkOut && <div className="container-fluid">
        <div className="row">
          <div className="sidebar border border-left col-md-3 col-lg-2 p-0 bg-body-tertiary">
            <h3>Cart ({cart.length})</h3>
            <botton className="btn btn-primary my-2" onClick={ShowCatalog}>Return to Catalog</botton>
          </div>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

          </main>
        </div>
      </div>}
      <footer>
        <h1>Footer</h1>
      </footer>
    </>
  );
}

export default App;
