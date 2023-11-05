import React, { useState, useEffect } from "react";
import items from "./selected_products.json";
import "./Shopping.css";

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [ProductsCategory, setProductsCategory] = useState(items);

  const listItems = ProductsCategory.map((el) => (
    <div key={el.id} className="album py-3 bg-body-tertiary ">
      <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3  row-cols-lg-4 row-cols-xl-5 g-3 ">
      <div className="col">
      <div className="card shadow-sm" id="cards">
      <img className="img-fluid" src={el.image} width={200}/> <br />
      <div className="card-body" id="cardtoo">
      <p className="title">
      {el.title} <br />
      </p>
      {el.description} <br /><br/>
      
      
        <span className = "price">
      <span className = "commentPrice">{"For the small price of:"}</span> {"    "}{el.price}{"$"} <br /> <br />
      </span>
      <button className = "lbtnn" type="button" variant="light" onClick={() => removeFromCart(el)}>
        -
      </button>{" "}{el.qty}{" "}
      <button  className = "rbtnn" type="button" variant="light" onClick={() => addToCart(el)}>
        {" "}
        +{" "}
      </button>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  ));

  //Cart

  const addToCart = (el) => {
    let hardCopy = [...cart];
    if(el.qty < 1)
    {
      setCart([...cart, el]);
    }
    else{
      setCart(hardCopy);
    }
    el.qty = el.qty + 1;
    console.log(el.qry);
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    //hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    if(el.qty > 0){
      el.qty = el.qty - 1; 
    }
    if(el.qty <= 0){
      hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    }
    setCart(hardCopy);
    console.log(el.qry);
  };

  const cartItems = cart.map((el) => (
    <div key={el.id}>
      <img class="img-fluid" src={el.image} width={150} />
      {el.title} <span style= {{ fontWeight: "bold"  }}>${el.price}</span>  <span style={{ marginLeft: 600 }}>Quantity: {el.qty}</span>
    </div>
  ));

    //Calculating Totals

  useEffect(() => {
    total();
    }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
    totalVal += cart[i].price*cart[i].qty;
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
      setcheckout(true);
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


  return (
    <div>
      {catalog &&<div className="headerc">
        <h1 className="t">Tools🛠</h1>
        <button className= "checkoutbtn" onClick={ShowChechout}>Check Out</button>
        <h4 className="searchbar">Search</h4>
        <input className="searchbarbtn"
              type="search"
              value={query}
              onChange={handleChange}
            />
        <div>{listItems}</div>
        <footer>
          <p style = {{ textAlign: "center" }}> COMS 319 - Assignment2</p>
        </footer>
      </div>}
      {checkOut &&<div>
        {userInfo && <button onClick={ShowCatalog}>Return to catalog</button>}
        <div>Items in Cart : <span style={{ marginLeft: "20" }}> Quantity</span>  </div>
        <div style={{ marginLeft: "20"}}>{cartItems}</div>
        <div>Order Total: {cartTotal}</div>
      </div>}
      {userInfo &&<div>
        <h2>Payment information: </h2>
        <button onClick={ShowConfirmation}>Pay</button>
      </div>}
      {confirmation &&<div>
        <h2>Confirmation </h2>
        div{cartItems}
        <h3>Purchase Amount: {cartTotal}{"$"}</h3>
        <button onClick={ShowCatalog2}>Return to catalog</button>
      </div>}
    </div>
  );
};
export default Shop;
