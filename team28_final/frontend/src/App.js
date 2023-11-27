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

  //Calculating Totals

  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price * cart[i].qty;
    }
    totalVal = Math.round(totalVal*100)/100;
    setCartTotal(totalVal);
  };


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
  const [help, setHelp] = useState(false);

  function ShowCatalog() {
    setQuery("");
    setProductsCategory(ProductsCategoryRAW);
    setcheckout(false);
    setcatalog(true);
    setUserInfo(false);
    setconfirmation(false);
    setError(false);
    setHelp(false);
  }

  function ShowCheckout() {
    setcheckout(true);
    setcatalog(false);
    setUserInfo(true);
    setconfirmation(false);
    setError(false);
    setHelp(false);
  }

  function ShowConfirmation() {
    setcheckout(true);
    setcatalog(false);
    setUserInfo(false);
    setconfirmation(true);
    setError(false);
    setHelp(false);
  }

  function ShowError() {
    setcheckout(true);
    setcatalog(false);
    setUserInfo(true);
    setconfirmation(false);
    setError(true);
    setHelp(false);
  }

  function ShowCatalog2() {
    window.location.reload();
  }

  function ShowHelp(){
    setcheckout(false);
    setcatalog(false);
    setUserInfo(false);
    setconfirmation(false);
    setError(false);
    setHelp(true);
  }

  //Ordering Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNum, setcardNum] = useState("");
  const [adress, setAdress] = useState("");
  const [town, setTown] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [errorState, seterrorState] = useState("");

  const nameChange = (e) => {
    setName(e.target.value);
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const CardChange = (e) => {
    setcardNum(e.target.value);
  };

  const AdressChange = (e) => {
    setAdress(e.target.value);
  };

  const townChange = (e) => {
    setTown(e.target.value);
  };

  const stateChange = (e) => {
    setState(e.target.value);
  };

  const zipChange = (e) => {
    setZip(e.target.value);
  };

  //testing form
  function ConfirmationInfo() {
    let val = true;

    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      val = false;
      seterrorState("Email is not valid");
    }

    if (name.length == 0) {
      val = false;
      seterrorState("Please add your Name");
    }

    if (!(cardNum.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/) && (cardNum.length == 16||cardNum.length == 19))) {
      val = false;
      seterrorState("Card Number is not valid");
    }

    if (adress.length == 0) {
      val = false;
      seterrorState("Please add your adress");
    }

    if (town.length == 0) {
      val = false;
      seterrorState("Please add your City");
    }

    if (state.length == 0){
      val = false
      seterrorState("Please add your State");
    }

    if (!zip.match(/^[0-9]{5}$/)){
      val = false
      seterrorState("Zip Code is not valid");
    }
  
    if(val){
      ShowConfirmation()
    }else{
      ShowError()
    }
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
              className="form-control"
              type="search"
              value={query}
              onChange={handleChange}
            />
            <hr></hr>
            <botton className="btn btn-primary my-2" onClick={ShowHelp}>Help</botton>
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

      {/* Checkout Page */}
      {checkOut && <div className="container-fluid">
        <div className="row">
          <div className="sidebar border border-left col-md-3 col-lg-2 p-0 bg-body-tertiary">
            <h3>Cart ({cart.length})</h3>
            {userInfo && <botton className="btn btn-primary my-2" onClick={ShowCatalog}>Return to Catalog</botton>}
            {confirmation && <botton className="btn btn-primary my-2" onClick={ShowCatalog2}>Return to Catalog</botton>}
            <hr></hr>
            <h4>Price: ${cartTotal}</h4>
            <hr></hr>
            {/* User Info */}
            {userInfo && <div>
              <h5>User Info:</h5>
              {error && <div style={{ backgroundColor: "red"}}>
                  <h3>
                    <i class="bi-exclamation-circle"></i> Something went wrong!
                  </h3>
                  {errorState}
                </div>}
              <label for="inputName" class="form-label">
                Full Name
              </label>
              <input
                type="text"
                class="form-control"
                onChange={nameChange}
              />
              <label for="inputEmail4" class="form-label">
                Email
              </label>
              <input
                type="email"
                class="form-control"
                onChange={emailChange}
              />
              <label for="inputCard" class="form-label">
                Card
              </label>
              <input
                type="text"
                id="inputCard"
                class="form-control"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={CardChange}
              />
              <label for="inputAddress" class="form-label">
                Address
              </label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                onChange={AdressChange}
              />
              <label for="inputCity" class="form-label">
                City
              </label>
              <input
                type="text"
                class="form-control"
                onChange={townChange}
              />
              <label for="inputState" class="form-label">
                State
              </label>
              <input
                type="text"
                class="form-control"
                onChange={stateChange}
              />
              <label for="inputZip" class="form-label">
                Zip
              </label>
              <input
                type="text"
                class="form-control"
                onChange={zipChange}
              />
              <button class="btn btn-success" onClick={ConfirmationInfo}>
                <i class="bi-bag-check"></i> Order
              </button>
  
            </div>}

            {/* Confirmation Page */}
            {confirmation && 
            <div>
              <h5>✅ Items Purchased ✅</h5>
              <h5>Name: {name}</h5>
              <h5>Email: {email}</h5>
              <h5>Card: {cardNum}</h5>
              <h5>Name: {name}</h5>
              <h5>Adress: {adress}</h5>
              <h5>State: {state}</h5>
              <h5>ZIP: {zip}</h5>
            </div>
            }

          </div>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="container">
              {!isLoading &&<div className="row row-cols-1 g-3">
                {cartItems}
              </div>}
            </div>
          </main>
        </div>
      </div>}

      {/* Sign in Sheet */}




      {/* Help Page */}
      {help && <div>
        <botton className="btn btn-primary my-2" onClick={ShowCatalog}>Return to Catalog</botton>
        
        
        
      </div>}


      <footer>
        <h1>Footer</h1>
      </footer>
    </>
  );
}

export default App;
