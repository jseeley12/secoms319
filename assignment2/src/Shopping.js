import React, { useState, useEffect } from "react";
import items from "./selected_products.json";
import "./Shopping.css";

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [ProductsCategory, setProductsCategory] = useState(items);

  const listItems = ProductsCategory.map((el) => (
    <div key={el.id} className="col">
      <div className="card shadow-sm" id="cards">
        <img className="img-fluid" src={el.image} width={200} /> <br />
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
          <button
            className="lbtnn"
            type="button"
            variant="light"
            onClick={() => removeFromCart(el)}
          >
            -
          </button>{" "}
          {el.qty}{" "}
          <button
            className="rbtnn"
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
        <img class="img-fluid" src={el.image} width={150} />
        {el.title} <span style={{ fontWeight: "bold" }}>${el.price}</span>{" "}
        <span style={{ marginLeft: 600 }}>Quantity: {el.qty}</span>
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
    setCartTotal(totalVal);
  };

  //Diffrent Pages

  const [checkOut, setcheckout] = useState(false);
  const [catalog, setcatalog] = useState(true);
  const [userInfo, setUserInfo] = useState(false);
  const [confirmation, setconfirmation] = useState(false);

  function ShowCatalog() {
    setcheckout(false);
    setcatalog(true);
    setUserInfo(false);
    setconfirmation(false);
  }

  function ShowChechout() {
    setcheckout(true);
    setcatalog(false);
    setUserInfo(true);
    setconfirmation(false);
  }

  function ShowConfirmation() {
    setcheckout(false);
    setcatalog(false);
    setUserInfo(false);
    setconfirmation(true);
  }

  function ShowCatalog2() {
    window.location.reload();
  }

  //Search

  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log(
      "Step 6 : in handleChange, Target Value :",
      e.target.value,
      " Query Value :",
      query
    );
    const results = items.filter((eachProduct) => {
      if (e.target.value === "") return ProductsCategory;
      return eachProduct.title
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setProductsCategory(results);
  };

  //form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNum, setcardNum] = useState("");
  const [adress, setAdress] = useState("");
  const [adress2, setAdress2] = useState("");
  const [town, setTown] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const nameChange = (e) => {
    setName(e.target.value);
  }

  const emailChange = (e) => {
    setEmail(e.target.value);
  }

  const CardChange = (e) => {
    setcardNum(e.target.value);
  }

  const AdressChange = (e) => {
    setAdress(e.target.value);
  }
  
  const Adress2Change = (e) => {
    setAdress2(e.target.value);
  }

  const townChange = (e) => {
    setTown(e.target.value);
  }

  const stateChange = (e) => {
    setState(e.target.value);
  }

  const zipChange = (e) => {
    setZip(e.target.value);
  }


  function ConfirmationInfo() {
    
  }


  return (
    <div>
      {/* Header */}
      <div className="headerc">
        <h1 className="t">Tools🛠</h1>
        {catalog && (
          <button className="checkoutbtn" onClick={ShowChechout}>
            Check Out
          </button>
        )}
        {userInfo && (
          <button className="checkoutbtn" onClick={ShowCatalog}>
            Return to catalog
          </button>
          
        )}
        {confirmation && (<button className="checkoutbtn" onClick={ShowCatalog2}>Return to catalog</button>)}

        {catalog && <h4 className="searchbar">Search</h4>}
        {catalog && (
          <input
            className="searchbarbtn"
            type="search"
            value={query}
            onChange={handleChange}
          />
        )}
        <hr></hr>
      </div>

      {/* Body */}
      <div className="whiteSpace">
        {catalog && (
          <div>
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 ">
                {listItems}
              </div>
            </div>
          </div>
        )}
        {checkOut && (
          <div>
            <div>
              <h3>Shopping Cart - Checkout</h3>
            </div>
            <div className="container">
              <div className="row row-cols-1 g-3 ">{cartItems}</div>
            </div>
            <hr></hr>
            <div style={{ marginLeft: "60px" }}>
              <div>
                <strong>Cost: </strong>${cartTotal}
              </div>
              <div>
                <strong>Tax: </strong>${cartTotal * 0.07}
              </div>
              <div>
                <strong>Total: </strong>${cartTotal * 1.07}
              </div>
            </div>
            <hr></hr>
          </div>
        )}

{/* Form */}
        {userInfo && (
          <div class="container">
            <div class="row">
              <div class="col-2"></div>

              <div class="col-8">
                <h1>Pay Here</h1>

                <div id="liveAlertPlaceholder"> 
                  <h3><i class="bi-exclamation-circle"></i> Something went wrong!</h3>
                </div>

                <form class="row g-3" id="checkout-form">
                  <div class="col-md-6">
                    <label for="inputName" class="form-label">
                      Full Name
                    </label>
                    <input type="text" class="form-control" onChange={nameChange} />
                  </div>

                  <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">
                      Email
                    </label>
                    <input type="email" class="form-control" onChange={emailChange}/>
                  </div>

                  <div class="col-12">
                    <label for="inputCard" class="form-label">
                      Card
                    </label>
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">
                        <i class="bi-credit-card-fill"></i>
                      </span>
                      <input
                        type="text"
                        id="inputCard"
                        class="form-control"
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={CardChange}
                      />
                    </div>
                  </div>

                  <div class="col-12">
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
                  </div>
                  <div class="col-12">
                    <label for="inputAddress2" class="form-label">
                      Address 2
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputAddress2"
                      placeholder="Apartment, studio, or floor"
                      onChange={Adress2Change}
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="inputCity" class="form-label">
                      City
                    </label>
                    <input type="text" class="form-control" onChange={townChange}/>
                  </div>
                  <div class="col-md-4">
                    <label for="inputState" class="form-label">
                      State
                    </label>
                    <input type="text" class="form-control" onChange={stateChange}/>
                  </div>
                  <div class="col-md-2">
                    <label for="inputZip" class="form-label">
                      Zip
                    </label>
                    <input type="text" class="form-control" onChange={zipChange}/>
                  </div>
                  <div class="col-12">
                    <button class="btn btn-success"onClick={ConfirmationInfo}><i class="bi-bag-check"></i> Order</button>
                  </div>
                </form>
              </div>
              <div class="col-2"></div>
            </div>
          </div>
        )}

{/* Confirm */}
        {confirmation && (
          <div>
            <h2 class="centerText">Items Purchased </h2>
            <div className="container">
              <div className="row row-cols-1 g-3 ">{cartItems}</div>
            </div>
            <h3 class="centerText">
              Purchase Amount: {"$"}{cartTotal * 1.07}
            </h3>
            
            <div class="centerText">
              <hr></hr>
              <h4>Info:</h4>
              <h6>{name}</h6>
              <h6>{email}</h6>
              <h6>{cardNum}</h6>
              <h6>{adress}</h6>
              <h6>{adress2}</h6>
              <h6>{state}</h6>
              <h6>{zip}</h6>
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <footer>
        <hr></hr>
        <p style={{ textAlign: "center" }}> COMS 319 - Assignment2</p>
        <p style={{ textAlign: "center" }}>
          {" "}
          Made By: Michael Bracht and Josh Seeley
        </p>
      </footer>
    </div>
  );
};
export default Shop;
