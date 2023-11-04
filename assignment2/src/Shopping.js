import React, { useState, useEffect } from "react";
import items from "./selected_products.json";

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [ProductsCategory, setProductsCategory] = useState(items);

  const listItems = ProductsCategory.map((el) => (
    <div key={el.id}>
      <img class="img-fluid" src={el.image} width={150} /> <br />
      {el.title} <br />
      {el.category} <br />
      {el.price} <br />
      <button type="button" onClick={() => removeFromCart(el)}>
        -
      </button>{" "}{el.qty}
      <button type="button" variant="light" onClick={() => addToCart(el)}>
        {" "}
        +{" "}
      </button>
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
      {el.title}${el.price}x{el.qty}
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
      {catalog &&<div>
        <button onClick={ShowChechout}>Check Out</button>
        <h4>Search</h4>
        <input
              type="search"
              value={query}
              onChange={handleChange}
            />
        <div>{listItems}</div>
        
      </div>}
      {checkOut &&<div>
        {userInfo && <button onClick={ShowCatalog}>Return to catalog</button>}
        <div>Items in Cart :</div>
        <div>{cartItems}</div>
        <div>Order total to pay :{cartTotal}</div>
      </div>}
      {userInfo &&<div>
        <h2>User Info: </h2>
        <button onClick={ShowConfirmation}>Pay</button>
      </div>}
      {confirmation &&<div>
        <h2>Confirmation </h2>
        <button onClick={ShowCatalog2}>Return to catalog</button>
      </div>}
    </div>
  );
};
export default Shop;
