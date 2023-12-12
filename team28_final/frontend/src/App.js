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
  const [totalRevenue, settotalRevenue] = useState();
  const [totalSold, settotalSold] = useState();

  //Displays
  const [checkOut, setcheckout] = useState(false);
  const [catalog, setcatalog] = useState(true);
  const [userInfo, setUserInfo] = useState(false);
  const [confirmation, setconfirmation] = useState(false);
  const [error, setError] = useState(false);
  const [help, setHelp] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [adminUpdate, setAdminUpdate] = useState(false);
  const [adminAdd, setAdminAdd] = useState(false);
  const [Info, setInfo] = useState(false);
  const [signin, setSignin] = useState(false);
  const [signinError, setSigninError] = useState(false);

  //Get - Mongo
  useEffect(() => {
    getAllProducts();
  }, []);


  function getAllProducts(){
    setIsLoading(true);
    fetch("http://localhost:8081/listTools")
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setProductsCategory(res);
        setProductsCategoryRAW(res);
        setIsLoading(false);
      });
    
  }



  const listItems = ProductsCategory.map((el) => (
    <div key={el.id} className="col">
      <div style={{ backgroundColor: "#ECECEC" }} className="card shadow-sm">
        <img className="imgnew" src={el.img} width={200} /> <br />
        <div className="card-body" id="cardtoo">
          <p className="title">
            {el.name} <br />
          </p>
          <p className="description">
          {el.description} <br />
          </p>
          <br />
          <ul className=" list-group">
        <li className=" cardbackgroundspecs list-group-item">
          <span className="boldtitle commentPrice">Price: </span>${el.price}
        </li>
        <li className="cardbackgroundspecs list-group-item">
          <span className="boldtitle commentInventory">In Stock: </span>
          {el.inventory}
        </li>
        <li className="cardbackgroundspecs list-group-item">
       <span className="boldtitle"> ID Number: </span>{el.id}
        </li>
      </ul>
          <hr></hr>
          <div style={{ textAlign: "center"}}>
            <button
            className="custom-btn"
              type="button"
              variant="light"
              onClick={() => removeFromCart(el)}
            >
              -
            </button>{" "}
            {el.qty}{" "}
            <button className="custom-btn" type="button" variant="light" onClick={() => addToCart(el)}>
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
      el.qty = el.qty + 1;
    }else if(el.qty >= el.inventory) {
    } else {
      setCart(hardCopy);
      el.qty = el.qty + 1;
    }
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
            <div className="col" class="centerText">
              {" "}
              <img class="img-fluid" src={el.img} width={150} />{" "}
            </div>
            <div className="col" class="centerText">
              {" "}
              Item: <span style={{ fontWeight: "bold" }}>{el.name}</span>{" "}
            </div>
            <div className="col" class="centerText">
              {" "}
              Price: <span style={{ fontWeight: "bold" }}>
                ${el.price}
              </span>{" "}
            </div>
            <div className="col" class="centerText">
              {" "}
              <span>
                Quantity: <span style={{ fontWeight: "bold" }}>{el.qty}</span>
              </span>
            </div>
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
    totalVal = Math.round(totalVal * 100) / 100;
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



  //Changing Displays
  function ShowCatalog() {
    setQuery("");
    setProductsCategory(ProductsCategoryRAW);
    setcheckout(false);
    setcatalog(true);
    setUserInfo(false);
    setconfirmation(false);
    setError(false);
    setHelp(false);
    setAdmin(false);
    setInfo(false);
    setSignin(false);
    setSigninError(false);
  }

  function ShowCheckout() {
    setcheckout(true);
    setcatalog(false);
    setUserInfo(true);
    setconfirmation(false);
    setError(false);
    setHelp(false);
    setAdmin(false);
    setInfo(false);
    setSignin(false);
    setSigninError(false);
  }

  function ShowConfirmation() {
    setcheckout(true);
    setcatalog(false);
    setUserInfo(false);
    setconfirmation(true);
    setError(false);
    setHelp(false);
    setAdmin(false);
    setInfo(false);
    setSignin(false);
    setSigninError(false);
  }

  function ShowError() {
    setcheckout(true);
    setcatalog(false);
    setUserInfo(true);
    setconfirmation(false);
    setError(true);
    setHelp(false);
    setAdmin(false);
    setInfo(false);
    setSignin(false);
    setSigninError(false);
  }

  function ShowCatalog2() {
    window.location.reload();
  }

  function ShowHelp() {
    setcheckout(false);
    setcatalog(false);
    setUserInfo(false);
    setconfirmation(false);
    setError(false);
    setHelp(true);
    setAdmin(false);
    setInfo(false);
    setSignin(false);
    setSigninError(false);
  }

  function ShowInfo() {
    setcheckout(false);
    setcatalog(false);
    setUserInfo(false);
    setconfirmation(false);
    setError(false);
    setHelp(false);
    setAdmin(false);
    setInfo(true);
    setSignin(false);
    setSigninError(false);
  }

  function ShowSignIn() {
    setcheckout(false);
    setcatalog(false);
    setUserInfo(false);
    setconfirmation(false);
    setError(false);
    setHelp(false);
    setAdmin(false);
    setInfo(false);
    setSignin(true);
    setSigninError(false);
  }

  function ShowAdmin() {
    setcheckout(false);
    setcatalog(false);
    setUserInfo(false);
    setconfirmation(false);
    setError(false);
    setHelp(false);
    setAdmin(true);
    setInfo(false);
    setSignin(false);
    setSigninError(false);
    revenueTotals();
  }

  function ShowSignInError() {
    setcheckout(false);
    setcatalog(false);
    setUserInfo(false);
    setconfirmation(false);
    setError(false);
    setHelp(false);
    setAdmin(false);
    setInfo(false);
    setSignin(true);
    setSigninError(true);
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

    if (
      !(
        cardNum.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/) &&
        (cardNum.length == 16 || cardNum.length == 19)
      )
    ) {
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

    if (state.length == 0) {
      val = false;
      seterrorState("Please add your State");
    }

    if (!zip.match(/^[0-9]{5}$/)) {
      val = false;
      seterrorState("Zip Code is not valid");
    }

    if (val) {
      ShowConfirmation();
      removeInventory();
    } else {
      ShowError();
    }
  }

  //Removing Inventory after bought
  function removeInventory(){
    let c = cart.length - 1;
    while(c >= 0){
      let item = cart[c];
      console.log(item);
      console.log(item.inventory-item.qty);
      updateMethod(item.id,item.price,item.inventory-item.qty,item.name,item.img,item.description,item.sold+item.qty, item.revenue+(item.qty * item.price));
      c = c-1;
    }
  }

  //Check Password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getUsername = (e) => {
    setUsername(e.target.value);
  };

  const getPassword = (e) => {
    setPassword(e.target.value);
  };

  function testPassword(){
    if((username === "Username") && (password === "password"))
    {
      ShowAdmin();
    }else{
      ShowSignInError();
    }

  }


  //Create, Update, & Delete
  const [OneProduct, setOneProduct] = useState([]);
  const [ProductID, setProductID] = useState([]);
  const [ProductName, setProductName] = useState([]);
  const [Productdescription, setProductdescription] = useState([]);
  const [ProductPrice, setProductPrice] = useState([]);
  const [ProductImage, setProductImage] = useState([]);
  const [ProductInventory, setProductInventory] = useState([]);

  const [UserProductID, setUserProductID] = useState();

  const nameUserProductID = (e) => {
    setUserProductID(e.target.value);
  };

  const nameProductName = (e) => {
    setProductName(e.target.value);
  };

  const nameProductdescription = (e) => {
    setProductdescription(e.target.value);
  };

  const nameProductPrice = (e) => {
    setProductPrice(parseFloat(e.target.value));
  };

  const nameProductImage = (e) => {
    setProductImage(e.target.value);
  };

  const nameProductInventory = (e) => {
    setProductInventory(parseInt(e.target.value));
  };

  function clearInputs(){
    //setUserProductID("");
    //setProductID("");
    setProductName("");
    setProductdescription("");
    setProductPrice("");
    setProductImage("");
    setProductInventory("");
  }

  //Admin Views
  function SelectButton(){
    if(!isNaN(UserProductID)){
      setProductID(UserProductID);
    }
    else{
      setProductID();
    }
    if(OneProduct === "Id Does not exist"){
      if(isNaN(UserProductID)){
        setAdminUpdate(false);
        setAdminAdd(false);
        setProductName("");
        setProductdescription("");
        setProductPrice("");
        setProductInventory("");
        setProductImage("");
      }
      else{
        ShowAdminItemAdd()
        setProductName("");
        setProductdescription("");
        setProductPrice("");
        setProductInventory("");
        setProductImage("");
    }  
    }else{
      ShowAdminItemUpdate()
      setProductName(OneProduct.name);
      setProductdescription(OneProduct.description);
      setProductPrice(OneProduct.price);
      setProductInventory(OneProduct.inventory);
      setProductImage(OneProduct.img);
    }
  }

  function ShowAdminItemUpdate(){
    setAdminUpdate(true);
    setAdminAdd(false);
  }
  function ShowAdminItemAdd(){
    setAdminAdd(true);
    setAdminUpdate(false);
  }

  // Get Item
  function getOneProducts(id) {
    setIsLoading(true);
    fetch("http://localhost:8081/" + id)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setOneProduct(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Item does not exist");
        setIsLoading(false);
        setOneProduct("Id Does not exist");
      });
  }

    //Update - Mongo
    function updateMethod(id, price, inventory, name, img, description, sold, revenue) {
      fetch("http://localhost:8081/updateTools", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: id,
          name: name,
          img: img,
          inventory: inventory,
          price: price,
          description: description,
          sold: sold,
          revenue: revenue
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log("Errror:" + err));
    }

  //delete -  Mongo
  function deleteMethod(id) {
    fetch("http://localhost:8081/deleteTool", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log("Error:" + err));
  }

  //add -  Mongo
  function postMethod(id, price, inventory, name, img, description) {
    fetch("http://localhost:8081/addTool", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: id,
        name: name,
        img: img,
        inventory: inventory,
        price: price,
        description: description
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }
  
  //update Mongo
  function updateItem() {
    let itemNum = OneProduct.id;
    updateMethod(OneProduct.id,ProductPrice,ProductInventory,ProductName,ProductImage,Productdescription, OneProduct.sold, OneProduct.revenue);
    alert("Item " + itemNum + " has been updated");
    setAdminUpdate(false);
    getOneProducts(parseInt(UserProductID));
    clearInputs()
    getAllProducts();
  }

  //delete Mongo
  function deleteItem(){
    let itemNum = OneProduct.id;
    deleteMethod(OneProduct.id);
    alert("Item " + itemNum + " has been deleted");
    setAdminUpdate(false);
    getOneProducts(parseInt(UserProductID));
    clearInputs();
    getAllProducts();
  }

  //Add Mongo
  function AddItem() {
    let itemNum = ProductID;
    postMethod(parseInt(ProductID),ProductPrice,ProductInventory,ProductName,ProductImage,Productdescription);
    alert("Item " + itemNum + " has been created");
    setAdminAdd(false);
    getOneProducts(parseInt(UserProductID));
    clearInputs();
    getAllProducts();
  }
//method for admin page
  useEffect(() => {
    getOneProducts(parseInt(UserProductID));
  }, [UserProductID]);


  // Getting Product Revenue Data
  function revenueTotals(){
    var i = ProductsCategoryRAW.length;
    var totalRevenue = 0;
    var totalSold = 0;
    while(i > 0){
      i=i-1;
      let item1 = ProductsCategoryRAW[i];
      totalRevenue += item1.revenue;
      totalSold += item1.sold;
    }
    settotalRevenue(totalRevenue)
    settotalSold(totalSold)
  }

  return (
    <>
      <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <div className="container-fluid d-flex align-items-center">
          {!Info && (
            <botton className="btn btn-primary my-2" onClick={ShowInfo}>
              Website Info
            </botton>
          )}
          {Info && (
            <botton className="btn btn-primary my-2" onClick={ShowCatalog}>
              Return to Catalog
            </botton>
          )}
          <h2 className="d-flex align-items-center fs-4 text-white mb-0">
            Tools🛠
          </h2>
          {!(admin || signin) && (<button className="btn btn-primary my-2" onClick={ShowSignIn}>
            Sign in
          </button>
          )}

          {signin && (<button className="btn btn-primary my-2" onClick={ShowCatalog}>
            Return to Catalog
          </button>
          )}

          {admin && (<button className="btn btn-primary my-2" onClick={ShowCatalog}>
            Sign out / Return to Catalog
          </button>
          )}
          
        </div>
      </header>

      {/* Catalog */}
      {catalog && (
        <div className="container-fluid">
          <div className="row">
            <div style={{position: "fixed", height: "100%"}} className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
              <div className="align-items-center">
                <h3>Cart ({cart.length})</h3>
                <button className="btn btn-primary my-2" onClick={ShowCheckout}>
                  Check out
                </button>
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
              <p style={{ fontSize: "12px" }}>
                Click here for more information on products!
              </p>
              <button className="btn btn-primary my-2" onClick={ShowHelp}>
                Help
              </button>
              <img
                className="imgnew1"
                src="http://localhost:8081/images/multipletools.png"
                alt="toolbox"
                width="200px"
              ></img>
            </div>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div className="container">
                {!isLoading && (
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 ">
                    {listItems}
                  </div>
                )}
              </div>
            </main>
          </div>

          <footer
        className="text-body-secondary py-5 background"
        style={{ backgroundColor: "#ECECEC", marginLeft:"16%", marginRight:"-12px",height:"10px"}}
      >
        <div class="container">
          <p class="float-end mb-2">
            <a href="#">Back to top</a>
          </p>
          <p class="mb-6">
            Thanks for Visiting our catalog! Hope you have found everything
            needed!
          </p>
        </div>
      </footer>

        </div>
      )}

      {/* Checkout Page */}
      {checkOut && (
        <div className="container-fluid">
          <div className="row">
            <div className="sidebar border border-left col-md-3 col-lg-2 p-0 bg-body-tertiary">
              <h3>Cart ({cart.length})</h3>
              {userInfo && (
                <button className="btn btn-primary my-2" onClick={ShowCatalog}>
                  Return to Catalog
                </button>
              )}
              {confirmation && (
                <button className="btn btn-primary my-2" onClick={ShowCatalog2}>
                  Return to Catalog
                </button>
              )}
              <hr></hr>
              <h4>Price: ${cartTotal}</h4>
              <hr></hr>
              {/* User Info */}
              {userInfo && (
                <div>
                  <h5>User Info:</h5>
                  {error && (
                    <div style={{ backgroundColor: "red" }}>
                      <h3>
                        <i class="bi-exclamation-circle"></i> Something went
                        wrong!
                      </h3>
                      {errorState}
                    </div>
                  )}
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

                </div>
              )}

              {/* Confirmation Page */}
              {confirmation && (
                <div>
                  <h5 style={{width: "70px", whiteSpace: "nowrap"}}>✅Items Purchased✅</h5>
                  <h6>Name: {name}</h6>
                  <h6>Email: {email}</h6>
                  <h6>Card: {cardNum}</h6>
                  <h6>Adress: {adress}</h6>
                  <h6>State: {state}</h6>
                  <h6>ZIP: {zip}</h6>
                </div>
              )}
            </div>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div className="container">
                {!isLoading && (
                  <div className="row row-cols-1 g-3">{cartItems}</div>
                )}
              </div>
            </main>
          </div>
          <footer
        class="text-body-secondary py-5 background"
        style={{ backgroundColor: "#ECECEC", height:"10px"}}
      >
        <div class="container">
          <p class="float-end mb-2">
            <a href="#">Back to top</a>
          </p>
          <p class="mb-6">
            Thanks for Visiting our catalog! Hope you have found everything
            needed!
          </p>
        </div>
      </footer>
        </div>
      )}

      {/* Sign in Sheet */}
      {signin && (
        <div>
          <h3>Sign In</h3>
          {signinError && (<div>
            <hr></hr>
            <h3>You have entered the worng username or password!  (try Username: Username  and Password: password) </h3>
            <hr></hr>
          </div>)}
          <h5>User Name</h5>
          <input
            className="form-control"
            type="text"
            onChange={getUsername}
          />
          <h5>Password</h5>
          <input
            className="form-control"
            type="text"
            onChange={getPassword}
          />
          <botton className="btn btn-primary my-2" onClick={testPassword}>
            Sign In
          </botton>
          <footer
        class="text-body-secondary py-5 background"
        style={{ backgroundColor: "#ECECEC", height:"10px" }}
      >
        <div class="container">
          <p class="float-end mb-2">
            <a href="#">Back to top</a>
          </p>
          <p class="mb-6">
            Thanks for Visiting our catalog! Hope you have found everything
            needed!
          </p>
        </div>
      </footer>
        </div>
      )}

      


      {/* Admin Sheet */}
      {admin && (
       <div className="admintop">
    <h2 style={{marginLeft:"41%", marginRight:"46%", paddingTop:"15px"}}>Admin Page</h2>
    <hr />

    <div style={{marginLeft:"30px"}}>
      <h5><span className="boldtitle">Total Number of Items in Store: </span>{ProductsCategoryRAW.length}</h5>
      <h5><span className="boldtitle">Gross Revenue: </span>${totalRevenue}</h5>
      <h5><span className="boldtitle">Total Items Sold: </span>{totalSold}</h5>
    </div>

    <div style={{marginLeft: "15px", marginRight:"15px"}}>
      <hr />
      <h4 style={{fontStyle:"italic"}}>Enter an ID of a existing item or of a New item</h4>
      <input
        className="form-control borderadminsearch"
        type="search"
        onChange={nameUserProductID}
      />
      <button className="btn btn-primary mt-2" onClick={SelectButton}>
        Search
      </button>
    </div>

    {(adminUpdate || adminAdd) && <> 
    {adminAdd && (<div style={{backgroundColor:"lightgrey", marginTop:"30px"}}><div className="titleadminpagebox"><h5 style={{textAlign: "center", fontSize:"30px"}}>Add New Item</h5></div></div>)}
    {adminUpdate && (
    <div style={{backgroundColor:"lightgrey", marginTop:"30px"}}><div className="titleadminpagebox"><h5 style={{textAlign: "center", fontSize:"30px" }}>Update or Delete Item</h5></div></div>)}
      
        <div style={{backgroundColor: "lightgrey"}}>
        
        <div style={{marginLeft: "15px", marginRight:"15px"}}>
        
         <span style={{textAlign: "center",fontSize:"30px"}} className="adminpageformtitles">ID:</span> <span style={{fontSize:"30px"}}>{ProductID}</span>
          <br /><br />
          <span className="adminpageformtitles">Name:</span>{" "}
          <input
            className="form-control borderadminsearch"
            type="search"
            value={ProductName}
            onChange={nameProductName}
          />
          <br />
          <span className="adminpageformtitles">Description:{" "}</span>
          <input
            className="form-control borderadminsearch"
            type="search"
            value={Productdescription}
            onChange={nameProductdescription}
          />
          <br />
          <span className="adminpageformtitles">Price:{" "}</span>
          <input
            className="form-control borderadminsearch"
            type="search"
            value={ProductPrice}
            onChange={nameProductPrice}
          />
          <br />
          <span className="adminpageformtitles">Inventory:{" "}</span>
          <input
            className="form-control borderadminsearch"
            type="search"
            value={ProductInventory}
            onChange={nameProductInventory}
          />
          <br />
          <span className="adminpageformtitles">Image:{" "}</span>
          <input
            className="form-control borderadminsearch"
            type="search"
            value={ProductImage}
            onChange={nameProductImage}
          />
          <br />
          <br />
          {adminAdd && <button className="btn btn-primary my-2" onClick={AddItem}> Add Item </button>}
          {adminUpdate && <>
          <button style={{marginBottom:"15px"}} className="btn btn-primary" onClick={updateItem}>
            Update Item
          </button>{" "}
          <button style={{marginBottom:"15px"}} className="btn btn-danger" onClick={deleteItem}>
            Delete Item
          </button>
          
        </>}
        </div>
        </div>
        </>}
        
      <footer
        class="text-body-secondary py-5 background"
        style={{ backgroundColor: "#ECECEC", height:"10px" }}
      >
        <div class="container">
          <p class="float-end mb-2">
            <a href="#">Back to top</a>
          </p>
          <p class="mb-6">
            Thanks for Visiting our catalog! Hope you have found everything
            needed!
          </p>
        </div>
      </footer>
      </div>
      )}


  

      {/* info Sheet */}
      {Info && (
        <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="card shadow-sm text-center" style={{backgroundColor: "lightgrey"}}>
            <h1><strong>Date: </strong></h1>
            <h3>-12/3/2023</h3>
          </div>
          <br></br>
          <div className="card shadow-sm text-center" id="cards" style={{backgroundColor: "lightgrey"}}>
            <h1><strong>Course:</strong> </h1>
            <h3>SE/ComS319 Construction of User Interfaces, Fall 2023</h3>
          </div>
          <br></br>
          <div className="card shadow-sm text-center" id="cards" style={{backgroundColor: "lightgrey"}}>
            <h1><strong>Names: </strong></h1>
            <h3>-Josh Seeley</h3>
            <h3>-Michael Bracht</h3>
          </div>
          <br></br>
          <div className="card shadow-sm text-center" id="cards" style={{backgroundColor: "lightgrey"}}>
            <h1><strong>Emails: </strong></h1>
            <h3>-jseeley@iastate.edu</h3>
            <h3>-mlbracht@iastate.edu</h3>
          </div>
          <br></br>
          <div className="card shadow-sm text-center" id="cards" style={{backgroundColor: "lightgrey"}}>
            <h1><strong>Professor: </strong></h1>
            <h3>-Dr. Abraham Aldaco</h3>
            <h3>aaldaco@iastate.edu</h3>
          </div>
          <br></br>
          <div className="card shadow-sm text-center" id="cards" style={{backgroundColor: "lightgrey"}}>
            <h1><strong>Purpose: </strong></h1>
            <h4>To help users find the tool needed for their project.</h4>
          </div>
          </div>
          <footer
        class="text-body-secondary py-5 background"
        style={{ backgroundColor: "#ECECEC", height:"10px" }}
      >
        <div class="container">
          <p class="float-end mb-2">
            <a href="#">Back to top</a>
          </p>
          <p class="mb-6">
            Thanks for Visiting our catalog! Hope you have found everything
            needed!
          </p>
        </div>
      </footer>
          </div>
      )}

      {/* Help Page */}
      {help && (
        <div>
          <button
            className="btn btn-primary my-2 help1"
            onClick={ShowCatalog}
            style={{ float: "right" }}
          >
            Return to Catalog
          </button>
          <div className="help1">
            <img
              style={{ marginLeft: "50px", float: "left" }}
              src="http://localhost:8081/images/toolbox.png"
              alt="toolbox"
              width="200px"
            ></img>
            <div className="helptitlebox">
              <h2 style={{ fontSize: "40px", fontFamily: "fantasy" }}>
                Welcome to the Help Page!
              </h2>

              <hr
                style={{
                  height: "3px",
                  border: "none",
                  color: "#333",
                  backgroundColor: "#333",
                }}
              ></hr>
              <p className="textsize">
                Here you can find anwsers and information about the tools to
                best fit your job!
              </p>
            </div>
            <hr
              style={{
                height: "3px",
                border: "none",
                color: "#333",
                backgroundColor: "#333",
              }}
            ></hr>
            <div className="box">
              <h4 className="helpheadersize">Table/Miter/Circular Saws</h4>
              <hr
                style={{
                  marginLeft: "-50px",
                  marginRight: "-50px",
                  height: "1.5px",
                  border: "none",
                  color: "#333",
                  backgroundColor: "#333",
                }}
              ></hr>

              <br></br>

              <div
                className="divleftbox"
                style={{
                  backgroundColor: "lightgrey",
                  display: "inline-block",
                }}
              >
                <h5 style={{ marginLeft: "50px", textAlign: "center" }}>
                  Uses:
                </h5>
                <hr></hr>
                <ul>
                  <li>
                    <span className="boldtitle">Straight Cuts:</span> Table saws
                    excel at making precise and straight cuts in various
                    materials, including wood, plywood, MDF, and particleboard.
                  </li>
                  <li>
                    <span className="boldtitle">Rip Cuts:</span> Rip cuts
                    involve cutting material along the length. surfaces.
                  </li>
                  <li>
                    <span className="boldtitle">Crosscuts:</span> Crosscuts are
                    perpendicular to the wood grain.
                  </li>
                  <li>
                    <span className="boldtitle">Miter Cuts:</span> Table saws
                    equipped with a miter gauge allow for angled cuts, essential
                    for creating bevels and miter joints in woodworking
                    projects.
                  </li>
                  <li>
                    <span className="boldtitle">Resawing:</span> Resawing
                    involves cutting a board along its thickness to create
                    thinner boards.
                  </li>
                  <li>
                    <span className="boldtitle">Cabinet Making:</span> Table
                    saws are commonly used in cabinet making for cutting panels,
                    creating joinery, and making precise measurements.
                  </li>
                  <li>
                    <span className="boldtitle">Trimming and Edging:</span>{" "}
                    Table saws are useful for trimming and edging tasks, such as
                    cutting trim pieces or beveling the edges of boards.
                  </li>
                  <li>
                    <span className="boldtitle">
                      Plywood and Panel Cutting:
                    </span>{" "}
                    Table saws equipped with a stable surface and fence system
                    are ideal for cutting large sheets of plywood or panels.
                  </li>
                </ul>
              </div>

              <div
                className="divcenterbox"
                style={{
                  backgroundColor: "lightgrey",
                  display: "inline-block",
                }}
              >
                <h5 style={{ textAlign: "center" }}>Functionality:</h5>
                <hr></hr>
                <ul>
                  <li>
                    <span className="boldtitle">
                      Adjustable Depth Settings:
                    </span>{" "}
                    Set the depth of the blade for different cutting depths.
                  </li>
                  <li>
                    <span className="boldtitle">Beveling Capability:</span> Tilt
                    the blade to make beveled cuts for angled edges.
                  </li>
                  <li>
                    <span className="boldtitle">Miter Gauge:</span> Use a miter
                    gauge to make accurate angled crosscuts.
                  </li>
                  <li>
                    <span className="boldtitle">Rip Fence:</span> Guide for
                    making straight and parallel rip cuts.
                  </li>

                  <li>
                    <span className="boldtitle">Blade Guard:</span> Safety
                    feature to cover the blade during operation.
                  </li>
                  <li>
                    <span className="boldtitle">
                      Splitter and Anti-Kickback Pawls:
                    </span>{" "}
                    Prevent kickback and ensure smoother, safer cuts.
                  </li>
                  <li>
                    <span className="boldtitle">Riving Knife:</span> Positioned
                    behind the blade to prevent wood from pinching.
                  </li>
                  <li>
                    <span className="boldtitle">Table Extensions:</span> Extend
                    the work surface for handling larger materials.
                  </li>
                  <li>
                    <span className="boldtitle">Electric Brake:</span> Quickly
                    stops the blade when the power is turned off for enhanced
                    safety.
                  </li>
                  <li>
                    <span className="boldtitle">LED Work Light:</span>{" "}
                    Illuminates the work area for improved visibility
                  </li>
                  <li>
                    <span ClassName="boldtitle">Portable Design:</span> Some
                    models are designed for easy transport and job site
                    mobility.
                  </li>
                </ul>
              </div>

              <div
                className="divrightbox"
                style={{
                  backgroundColor: "lightgrey",
                  display: "inline-block",
                }}
              >
                <h5
                  style={{
                    paddingTop: "-10px",
                    marginRight: "30px",
                    textAlign: "center",
                  }}
                >
                  Additional Products:
                </h5>
                <hr></hr>

                <ul>
                  <li>
                    <span className="boldtitle">Safety Gear:</span> Safety
                    glasses, ear protection, and dust masks for personal
                    protection.
                  </li>
                  <li>
                    <span className="boldtitle">Push Blocks and Sticks:</span>{" "}
                    Aid in safely guiding materials through the saw.
                  </li>
                  <li>
                    <span className="boldtitle">Saw Blades:</span> Different
                    blades for specific materials and types of cuts.
                  </li>
                  <li>
                    <span className="boldtitle">Crosscut Sled:</span> Improves
                    accuracy when making crosscuts.
                  </li>

                  <li>
                    <span className="boldtitle">Outfeed Table:</span> Provides
                    additional support for longer workpieces.
                  </li>
                  <li>
                    <span className="boldtitle">Table Saw Stand:</span> Portable
                    stands for job site mobility. Allows for stable areas to
                    work.
                  </li>
                  <li>
                    <span className="boldtitle">Miter Saw Stand:</span> Allows
                    for the use of the table saw as a miter saw.
                  </li>
                  <li>
                    <span className="boldtitle">Dust Collector:</span> Attaches
                    to the saw to collect sawdust efficiently.
                  </li>
                  <li>
                    <span className="boldtitle">Saw Blade Cleaning Kit:</span>{" "}
                    Keeps blades clean for optimal performance. A clean blade is
                    important for ce
                  </li>
                  <li>
                    <span className="boldtitle">Mobile Bases:</span> Allows for
                    easy movement and storage of the table saw.
                  </li>
                  <li>
                    <span className="boldtitle">Power Feeders:</span>Assists in
                    feeding material smoothly through the saw.
                  </li>
                </ul>
              </div>

              <div className="brands">
                <h5 style={{ textAlign: "center" }}>Brands:</h5>
                <img className="img-container" src="http://localhost:8081/images/homepagecraftsman.jpg" alt="craftsman"></img>
                <img style={{height: "50px"}} className="img-container" src="http://localhost:8081/images/homepagemilwaukee.jpg" alt="milwaukee"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepagedewaltpng.png" alt="dewalt"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepagehitachi.png" alt="hitachi"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepageblackanddecker.jpg" alt="black&decker"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepageryobi.jpg" alt="ryobi"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepagerigid.jpg" alt="rigid"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepagebosch.jpg" alt="bosch"></img>
              </div>
            </div>
            <div className="box">
              <h4 className="helpheadersize">Drills/Impact Drills:</h4>
              <hr
                style={{
                  marginLeft: "-50px",
                  marginRight: "-50px",
                  height: "1.5px",
                  border: "none",
                  color: "#333",
                  backgroundColor: "#333",
                }}
              ></hr>

              <br></br>

              <div
                className="divleftbox"
                style={{
                  backgroundColor: "lightgrey",
                  display: "inline-block",
                }}
              >
                <h5 style={{ marginLeft: "50px", textAlign: "center" }}>
                  Uses:
                </h5>
                <hr></hr>
                <ul>
                  <li>
                    <span className="boldtitle">Drilling Holes:</span> In wood,
                    metal, plastic, and other materials.
                  </li>
                  <li>
                    <span className="boldtitle">Screwdriving:</span> Inserting
                    and removing screws from various surfaces.
                  </li>
                  <li>
                    <span className="boldtitle">Installing Fixtures:</span>{" "}
                    Hanging shelves, pictures, mirrors, and other fixtures.
                  </li>
                  <li>
                    <span className="boldtitle">Woodworking:</span> Joining wood
                    pieces, creating furniture, and crafting.
                  </li>
                  <li>
                    <span className="boldtitle">Assembly Work:</span> Putting
                    together furniture, cabinets, and other items.
                  </li>
                  <li>
                    <span className="boldtitle">Carpentry:</span> Building
                    structures, framing, and other carpentry tasks.
                  </li>
                  <li>
                    <span className="boldtitle">Masonry Work:</span> Drilling
                    into bricks, concrete, and other masonry materials.
                  </li>
                  <li>
                    <span className="boldtitle">Plumbing:</span> Drilling holes
                    for pipes and other plumbing installations.
                  </li>
                  <li>
                    <span className="boldtitle">Electrical Work:</span> Creating
                    openings for electrical outlets and switches
                  </li>
                </ul>
              </div>

              <div
                className="divcenterbox"
                style={{
                  backgroundColor: "lightgrey",
                  display: "inline-block",
                }}
              >
                <h5 style={{ textAlign: "center" }}>Functionality:</h5>
                <hr></hr>
                <ul>
                  <li>
                    <span className="boldtitle">Variable Speed:</span>{" "}
                    Adjustable speed settings for different tasks and materials.
                  </li>
                  <li>
                    <span className="boldtitle">Forward and Reverse Mode:</span>{" "}
                    Allows both drilling and screwdriving by changing the
                    rotation direction.
                  </li>
                  <li>
                    <span className="boldtitle">Chuck Size:</span>{" "}
                    Interchangeable drill bits and accessories with various
                    chuck sizes.
                  </li>
                  <li>
                    <span className="boldtitle">Adjustable Clutch:</span>{" "}
                    Control the torque to prevent over-tightening of screws.
                  </li>

                  <li>
                    <span className="boldtitle">LED Work Light:</span>{" "}
                    Illuminates the work area for better visibility.
                  </li>
                  <li>
                    <span className="boldtitle">Ergonomic Design:</span>{" "}
                    Comfortable grip and ergonomic design for extended use.
                  </li>
                  <li>
                    <span className="boldtitle">Compact Size:</span>{" "}
                    Maneuverability in tight spaces and ease of storage due to
                    size.
                  </li>
                </ul>
              </div>

              <div
                className="divrightbox"
                style={{
                  backgroundColor: "lightgrey",
                  display: "inline-block",
                }}
              >
                <h5
                  style={{
                    paddingTop: "-10px",
                    marginRight: "30px",
                    textAlign: "center",
                  }}
                >
                  Additional Products:
                </h5>
                <hr></hr>
                <ul>
                  <li>
                    <span className="boldtitle">Drill Bits:</span> Different
                    types and sizes for various materials (wood, metal,
                    masonry).
                  </li>
                  <li>
                    <span className="boldtitle">Screwdriver Bits:</span>{" "}
                    Phillips, flathead, torx, and other types for different
                    screw types.
                  </li>
                  <li>
                    <span className="boldtitle">Nut Drivers:</span> For driving
                    nuts and bolts with ease.
                  </li>
                  <li>
                    <span className="boldtitle">Spade Bits:</span> Used for
                    drilling larger holes in wood.
                  </li>

                  <li>
                    <span className="boldtitle">Hole Saws:</span> For cutting
                    larger holes in wood, metal, or plastic.
                  </li>
                  <li>
                    <span className="boldtitle">Countersink Bits:</span> Create
                    recessed holes for screw heads.
                  </li>
                  <li>
                    <span className="boldtitle">Driver Sets:</span>{" "}
                    Comprehensive sets of drill and screwdriver bits.
                  </li>
                  <li>
                    <span className="boldtitle">Extension Rods:</span>Extend the
                    reach of drill bits and drivers.
                  </li>
                  <li>
                    <span className="boldtitle">Carrying Cases:</span>Provides
                    storage and transportation for the drill and extras.
                  </li>
                </ul>
              </div>

              <div className="brands">
                <h5 style={{ textAlign: "center" }}>Brands:</h5>
                <img className="img-container" src="http://localhost:8081/images/homepagecraftsman.jpg" alt="craftsman"></img>
                <img style={{height: "50px"}} className="img-container" src="http://localhost:8081/images/homepagemilwaukee.jpg" alt="milwaukee"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepagedewaltpng.png" alt="dewalt"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepagehitachi.png" alt="hitachi"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepageblackanddecker.jpg" alt="black&decker"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepageryobi.jpg" alt="ryobi"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepagerigid.jpg" alt="rigid"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepagebosch.jpg" alt="bosch"></img>
              </div>
            </div>
            <div className="box">
              <h4 className="helpheadersize">Hammers/Mallets:</h4>
              <hr
                style={{
                  marginLeft: "-50px",
                  marginRight: "-50px",
                  height: "1.5px",
                  border: "none",
                  color: "#333",
                  backgroundColor: "#333",
                }}
              ></hr>

              <br></br>

              <div
                className="divleftbox"
                style={{
                  backgroundColor: "lightgrey",
                  display: "inline-block",
                }}
              >
                <h5 style={{ marginLeft: "50px", textAlign: "center" }}>
                  Uses:
                </h5>
                <hr></hr>
                <ul>
                  <li>
                    <span class="boldtitle">Driving Nails:</span> Securing nails
                    into various surfaces, such as wood, metal, or plastic.
                  </li>
                  <li>
                    <span class="boldtitle">Removing Nails:</span> Extracting
                    nails from surfaces for repair or replacement.
                  </li>
                  <li>
                    <span class="boldtitle">Shaping Metal:</span> Molding or
                    shaping metal surfaces using a hammer.
                  </li>
                  <li>
                    <span class="boldtitle">Woodworking:</span> Carving,
                    shaping, and assembling wood pieces in carpentry and
                    woodworking projects.
                  </li>
                  <li>
                    <span class="boldtitle">Masonry Work:</span> Breaking or
                    chipping away at bricks, concrete, or other masonry
                    materials.
                  </li>
                  <li>
                    <span class="boldtitle">Forming Metal:</span> Creating
                    bends, curves, or shapes in metal sheets or pieces.
                  </li>
                  <li>
                    <span class="boldtitle">Installation Work:</span> Securing
                    fixtures, hanging objects, or installing various items.
                  </li>
                  <li>
                    <span class="boldtitle">Demolition:</span> Breaking down
                    structures, walls, or materials during demolition projects.
                  </li>
                  <li>
                    <span class="boldtitle">Crafting:</span> Using a mallet for
                    delicate and precise work in crafts and arts.
                  </li>
                  <li>
                    <span class="boldtitle">Auto Repair:</span> Hammering out
                    dents or shaping metal components in automotive repairs.
                  </li>
                </ul>
              </div>

              <div
                className="divcenterbox"
                style={{
                  backgroundColor: "lightgrey",
                  display: "inline-block",
                }}
              >
                <h5 style={{ textAlign: "center" }}>Functionality:</h5>
                <hr></hr>
                <ul>
                  <li>
                    <span class="boldtitle">Head:</span> The heavy metal part
                    used for striking and driving nails or shaping materials.
                  </li>
                  <li>
                    <span class="boldtitle">Face:</span> The flat surface of the
                    hammer's head used for direct impact on nails or workpieces.
                  </li>
                  <li>
                    <span class="boldtitle">Claw:</span> The curved, forked end
                    of some hammers designed for pulling nails.
                  </li>
                  <li>
                    <span class="boldtitle">Handle:</span> The grip portion of
                    the hammer, usually made of wood, metal, or fiberglass.
                    Different materials can effect the feel.
                  </li>
                  <li>
                    <span class="boldtitle">Grip:</span> The textured or
                    contoured area of the handle held by the user for comfort
                    and control.
                  </li>
                  <li>
                    <span class="boldtitle">Striking Face:</span> The specific
                    area of the hammer's face intended for striking nails or
                    workpieces.
                  </li>
                  <li>
                    <span class="boldtitle">Mallet Head:</span> The solid, often
                    rubber or plastic, head used for softer blows in woodworking
                    or crafting.
                  </li>
                  <li>
                    <span class="boldtitle">Weight:</span> The overall mass of
                    the hammer, affecting its impact force and user control.
                  </li>
                  <li>
                    <span class="boldtitle">Handle Length:</span> The size of
                    the handle, affecting leverage and control in various
                    applications.
                  </li>
                </ul>
              </div>

              <div
                className="divrightbox"
                style={{
                  backgroundColor: "lightgrey",
                  display: "inline-block",
                }}
              >
                <h5
                  style={{
                    paddingTop: "-10px",
                    marginRight: "30px",
                    textAlign: "center",
                  }}
                >
                  Additional Products:
                </h5>
                <hr></hr>
                <ul>
                  <li>
                    <span class="boldtitle">Nail Set:</span> Tool used to recess
                    nail heads below the surface for a smooth finish.
                  </li>
                  <li>
                    <span class="boldtitle">Hammer Holder:</span> Belt-mounted
                    or tool belt accessory for easy and secure hammer storage.
                  </li>
                  <li>
                    <span class="boldtitle">Mallet Replacement Heads:</span>{" "}
                    Interchangeable heads for mallets to accommodate different
                    materials.
                  </li>
                  <li>
                    <span class="boldtitle">Rubber Mallet:</span> Mallet with a
                    rubber head, ideal for delicate surfaces and woodworking.
                    Perfect if a hammer will damage the surface.
                  </li>
                  <li>
                    <span class="boldtitle">Sledgehammer:</span> Heavy-duty
                    hammer with a long handle, used for demolition and driving
                    large stakes.
                  </li>
                  <li>
                    <span class="boldtitle">Ball Peen Hammer:</span> Hammer with
                    a rounded peen for shaping and forging metal.
                  </li>
                  <li>
                    <span class="boldtitle">Hickory Replacement Handles:</span>{" "}
                    Replacement handles for hammers and mallets for maintenance.
                  </li>
                  <li>
                    <span class="boldtitle">Hammer Tacker:</span> Tool for
                    fastening materials using staples, operated with a striking
                    motion.
                  </li>
                  <li>
                    <span class="boldtitle">Magnetic Nail Holder:</span>{" "}
                    Magnetic accessory to hold nails for easy access during
                    hammering.
                  </li>
                </ul>
              </div>

              <div className="brands">
                <h5 style={{ textAlign: "center" }}>Brands:</h5>
                <img className="img-container" src="http://localhost:8081/images/homepagecraftsman.jpg" alt="craftsman"></img>
                <img style={{height: "50px"}} className="img-container" src="http://localhost:8081/images/homepagemilwaukee.jpg" alt="milwaukee"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepagedewaltpng.png" alt="dewalt"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepagehitachi.png" alt="hitachi"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepageblackanddecker.jpg" alt="black&decker"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepageryobi.jpg" alt="ryobi"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepagerigid.jpg" alt="rigid"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepagebosch.jpg" alt="bosch"></img>
              </div>
            </div>

            <div style={{marginBottom:"20px"}} className="box">
              <h4 className="helpheadersize">Wrenchs/Socket sets</h4>
              <hr
                style={{
                  marginLeft: "-50px",
                  marginRight: "-50px",
                  height: "1.5px",
                  border: "none",
                  color: "#333",
                  backgroundColor: "#333",
                }}
              ></hr>

              <br></br>

              <div
                className="divleftbox"
                style={{
                  backgroundColor: "lightgrey",
                  display: "inline-block",
                }}
              >
                <h5 style={{ marginLeft: "50px", textAlign: "center" }}>
                  Uses:
                </h5>
                <hr></hr>
                <ul>
                  <li>
                    <span class="boldtitle">Mechanical Repairs:</span> Essential
                    for loosening and tightening nuts and bolts in automotive
                    repairs.
                  </li>
                  <li>
                    <span class="boldtitle">Home Maintenance:</span> Versatile
                    tools for various tasks around the house, including
                    furniture assembly and repairs.
                  </li>
                  <li>
                    <span class="boldtitle">Plumbing Work:</span> Ideal for
                    tightening or loosening nuts and bolts in plumbing
                    installations and repairs.
                  </li>
                  <li>
                    <span class="boldtitle">Construction:</span> Used in
                    building and construction projects for fastening and
                    unfastening nuts and bolts.
                  </li>
                  <li>
                    <span class="boldtitle">Appliance Repair:</span> Handy for
                    fixing or maintaining appliances that involve nuts and
                    bolts. This includes internal or external repairs.
                  </li>
                  <li>
                    <span class="boldtitle">Bicycle Maintenance:</span>{" "}
                    Necessary for adjusting and repairing components on
                    bicycles.
                  </li>
                  <li>
                    <span class="boldtitle">Assembly Work:</span> Useful for
                    assembling furniture, equipment, and machinery.
                  </li>
                  <li>
                    <span class="boldtitle">HVAC Systems:</span> Applied in
                    heating, ventilation, and air conditioning systems for
                    equipment adjustments.
                  </li>
                  <li>
                    <span class="boldtitle">Electrical Panels:</span> Utilized
                    for tightening and loosening nuts on electrical panels.
                  </li>
                  <li>
                    <span class="boldtitle">Farm and Agricultural Tasks:</span>{" "}
                    Essential for repairs and maintenance of farming equipment.
                  </li>
                  <li>
                    <span class="boldtitle">DIY Projects:</span> Versatile tools
                    for a wide range of do-it-yourself projects and home
                    improvements.
                  </li>
                  <li>
                    <span class="boldtitle">Aircraft Maintenance:</span> Used in
                    the aviation industry for maintaining and repairing
                    aircraft.
                  </li>
                </ul>
              </div>

              <div
                className="divcenterbox"
                style={{
                  backgroundColor: "lightgrey",
                  display: "inline-block",
                }}
              >
                <h5 style={{ textAlign: "center" }}>Functionality:</h5>
                <hr></hr>
                <ul>
                  <li>
                    <span class="boldtitle">Open-End Wrench:</span> Features
                    U-shaped jaws for gripping nuts and bolts. Provides quick
                    access in tight spaces.
                  </li>
                  <li>
                    <span class="boldtitle">Box-End Wrench:</span> Encloses nuts
                    and bolts with a closed-end design, offering better torque
                    and grip.
                  </li>
                  <li>
                    <span class="boldtitle">Adjustable Wrench:</span> Equipped
                    with an adjustable jaw, suitable for various nut and bolt
                    sizes.
                  </li>
                  <li>
                    <span class="boldtitle">Combination Wrench:</span>{" "}
                    Integrates both open-end and box-end wrenches for
                    versatility in applications.
                  </li>
                  <li>
                    <span class="boldtitle">Socket Wrench:</span> Utilizes
                    socket attachments and a ratcheting mechanism for efficient
                    fastening and loosening.
                  </li>
                  <li>
                    <span class="boldtitle">Ratchet Handle:</span> Part of a
                    socket set, enables continuous motion in one direction while
                    preventing backward motion.
                  </li>
                  <li>
                    <span class="boldtitle">Socket Set:</span> Collection of
                    various-sized sockets and accessories for different
                    applications.
                  </li>
                  <li>
                    <span class="boldtitle">Extension Bar:</span> Attaches to a
                    socket wrench to reach nuts and bolts in deep or recessed
                    areas.
                  </li>
                  <li>
                    <span class="boldtitle">Torque Wrench:</span> Specialized
                    wrench with an adjustable torque setting for precise
                    tightening according to specifications.
                  </li>
                  <li>
                    <span class="boldtitle">Breaker Bar:</span> Long-handled bar
                    for applying additional force to loosen tight or stubborn
                    fasteners.
                  </li>
                  <li>
                    <span class="boldtitle">Wrench Organizer:</span> Storage
                    solution to keep wrenches and sockets organized.
                  </li>
                </ul>
              </div>

              <div
                className="divrightbox"
                style={{
                  backgroundColor: "lightgrey",
                  display: "inline-block",
                }}
              >
                <h5
                  style={{
                    paddingTop: "-10px",
                    marginRight: "30px",
                    textAlign: "center",
                  }}
                >
                  Additional Products:
                </h5>
                <hr></hr>
                <ul>
                  <li>
                    <span class="boldtitle">Wrench Set:</span> Complete set of
                    various wrench types for comprehensive coverage in different
                    applications.
                  </li>
                  <li>
                    <span class="boldtitle">Impact Socket Set:</span> Specially
                    designed sockets for use with impact wrenches, providing
                    durability and strength.
                  </li>
                  <li>
                    <span class="boldtitle">Universal Joint:</span> Socket set
                    accessory allowing flexible movement in multiple directions
                    for challenging angles.
                  </li>
                  <li>
                    <span class="boldtitle">Socket Organizer:</span> Storage
                    solution to keep sockets organized and easily accessible in
                    a toolbox or workshop.
                  </li>
                  <li>
                    <span class="boldtitle">Wrench Holder:</span> Tool organizer
                    designed to keep wrenches neatly arranged and within reach.
                  </li>
                  <li>
                    <span class="boldtitle">Torque Wrench Adapter:</span>{" "}
                    Adapter accessories for torque wrenches to accommodate
                    different socket sizes.
                  </li>
                  <li>
                    <span class="boldtitle">Socket Rail:</span> Rail system for
                    organizing and storing sockets, facilitating quick selection
                    during work.
                  </li>
                  <li>
                    <span class="boldtitle">Oil Filter Wrench:</span> Tool
                    designed specifically for removing and installing oil
                    filters during automotive maintenance.
                  </li>
                  <li>
                    <span class="boldtitle">Wrench Extender:</span> Extension
                    tool for wrenches, providing extra reach and leverage when
                    needed.
                  </li>
                  <li>
                    <span class="boldtitle">Magnetic Pickup Tool:</span>{" "}
                    Telescoping tool with a magnetic tip for retrieving dropped
                    nuts, bolts, and other metal objects.
                  </li>
                  <li>
                    <span class="boldtitle">Thread Chaser Set:</span> Set of
                    tools for cleaning and restoring damaged threads on nuts and
                    bolts.
                  </li>
                </ul>
              </div>

              <div className="brands">
                <h5 style={{ textAlign: "center" }}>Brands:</h5>
                <img className="img-container" src="http://localhost:8081/images/homepagecraftsman.jpg" alt="craftsman"></img>
                <img style={{height: "50px"}} className="img-container" src="http://localhost:8081/images/homepagemilwaukee.jpg" alt="milwaukee"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepagedewaltpng.png" alt="dewalt"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepagehitachi.png" alt="hitachi"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepageblackanddecker.jpg" alt="black&decker"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepageryobi.jpg" alt="ryobi"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepagerigid.jpg" alt="rigid"></img>
                <img style={{height: "50px"}}className="img-container" src="http://localhost:8081/images/homepagebosch.jpg" alt="bosch"></img>
              </div>
            </div>
          </div>
          <footer
        class="text-body-secondary py-5 background"
        style={{ backgroundColor: "#ECECEC", height:"10px" }}
      >
        <div class="container">
          <p class="float-end mb-2">
            <a href="#">Back to top</a>
          </p>
          <p class="mb-6">
            Thanks for Visiting our catalog! Hope you have found everything
            needed!
          </p>
        </div>
      </footer>
        </div>
        
      )}

     
    </>
  );
}

export default App;
