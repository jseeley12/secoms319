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
    setIsLoading(true);
    fetch("http://localhost:8081/listTools")
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setProductsCategory(res);
        setProductsCategoryRAW(res);
        setIsLoading(false);
      });
  }, []);

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

  function ShowHelp() {
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
    } else {
      ShowError();
    }
  }

  return (
    <>
      <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <div className="container-fluid d-flex align-items-center">
          <h2 className="d-flex align-items-center fs-4 text-white mb-0">
            Tools
          </h2>
          <button className="btn btn-primary my-2">Sign in</button>
        </div>
      </header>

      {/* Catalog */}
      {catalog && (
        <div className="container-fluid">
          <div className="row">
            <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
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
              <button className="btn btn-primary my-2" onClick={ShowHelp}>
                Help
              </button>
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
                  <h5>✅ Items Purchased ✅</h5>
                  <h5>Name: {name}</h5>
                  <h5>Email: {email}</h5>
                  <h5>Card: {cardNum}</h5>
                  <h5>Name: {name}</h5>
                  <h5>Adress: {adress}</h5>
                  <h5>State: {state}</h5>
                  <h5>ZIP: {zip}</h5>
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
        </div>
      )}

      {/* Sign in Sheet */}

      {/* Help Page */}
      {help && (
        <div>
          <div className="help1">
          <img style={{ marginLeft:"50px", float: "left"}} src="./images/toolbox.png" alt="toolbox" width="200px"></img>
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
                style={{ backgroundColor: "lightgrey", display: "inline-block" }}
              >
                <h5 style={{ marginLeft: "50px", textAlign: "center" }}>
                  Uses:
                </h5>
                <hr></hr>
                <ul>
                  <li>
                  <span className="boldtitle">Straight Cuts:</span> Table saws excel at making precise and straight cuts in various materials, including wood, plywood, MDF, and particleboard.
                  </li>
                  <li>
                  <span className="boldtitle">Rip Cuts:</span> Rip cuts involve cutting material along the length.
                    surfaces.
                  </li>
                  <li>
                  <span className="boldtitle">Crosscuts:</span> Crosscuts are perpendicular to the wood grain.
                  </li>
                  <li>
                  <span className="boldtitle">Miter Cuts:</span> Table saws equipped with a miter gauge allow for angled cuts, essential for creating bevels and miter joints in woodworking projects.
                  </li>
                  <li>
                  <span className="boldtitle">Resawing:</span> Resawing involves cutting a board along its thickness to create thinner boards. 
                  </li>
                  <li>
                  <span className="boldtitle">Cabinet Making:</span> Table saws are commonly used in cabinet making for cutting panels, creating joinery, and making precise measurements.
                  </li>
                  <li>
                  <span className="boldtitle">Trimming and Edging:</span> Table saws are useful for trimming and edging tasks, such as cutting trim pieces or beveling the edges of boards.
                  </li>
                  <li>
                  <span className="boldtitle">Plywood and Panel Cutting:</span> Table saws equipped with a stable surface and fence system are ideal for cutting large sheets of plywood or panels.
                  </li>
                  
                </ul>
              </div>

              <div
                className="divcenterbox"
                style={{ backgroundColor: "lightgrey", display: "inline-block" }}
              >
                <h5 style={{ textAlign: "center" }}>Functionality:</h5>
                <hr></hr>
                <ul>
                  <li>
                    <span className="boldtitle">Adjustable Depth Settings:</span> Set the depth of the blade for different cutting depths.
                  </li>
                  <li>
                  <span className="boldtitle">Beveling Capability:</span> Tilt the blade to make beveled cuts for angled edges.
                  </li>
                  <li>
                  <span className="boldtitle">Miter Gauge:</span> Use a miter gauge to make accurate angled crosscuts.
                  </li>
                  <li>
                  <span className="boldtitle">Rip Fence:</span> Guide for making straight and parallel rip cuts.
                  </li>
                  
                  <li>
                  <span className="boldtitle">Blade Guard:</span> Safety feature to cover the blade during operation.
                  </li>
                  <li>
                  <span className="boldtitle">Splitter and Anti-Kickback Pawls:</span> Prevent kickback and ensure smoother, safer cuts.
                  </li>
                  <li>
                  <span className="boldtitle">Riving Knife:</span> Positioned behind the blade to prevent wood from pinching.
                  </li>
                  <li>
                  <span className="boldtitle">Table Extensions:</span> Extend the work surface for handling larger materials.
                  </li>
                  <li>
                  <span className="boldtitle">Electric Brake:</span> Quickly stops the blade when the power is turned off for enhanced safety.
                  </li>
                  <li>
                  <span className="boldtitle">LED Work Light:</span> Illuminates the work area for improved visibility
                  </li>
                  <li>
                    <span ClassName="boldtitle">Portable Design:</span> Some models are designed for easy transport and job site mobility.
                  </li>
                </ul>
              </div>

              <div
                className="divrightbox"
                style={{ backgroundColor: "lightgrey", display: "inline-block" }}
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
                    <span className="boldtitle">Safety Gear:</span> Safety glasses, ear protection, and dust masks for personal protection.
                  </li>
                  <li>
                  <span className="boldtitle">Push Blocks and Sticks:</span> Aid in safely guiding materials through the saw.
                  </li>
                  <li>
                  <span className="boldtitle">Saw Blades:</span> Different blades for specific materials and types of cuts.
                  </li>
                  <li>
                  <span className="boldtitle">Crosscut Sled:</span> Improves accuracy when making crosscuts.
                  </li>
                  
                  <li>
                  <span className="boldtitle">Outfeed Table:</span> Provides additional support for longer workpieces.
                  </li>
                  <li>
                  <span className="boldtitle">Table Saw Stand:</span> Portable stands for job site mobility. Allows for stable areas to work.
                  </li>
                  <li>
                  <span className="boldtitle">Miter Saw Stand:</span> Allows for the use of the table saw as a miter saw.
                  </li>
                  <li>
                  <span className="boldtitle">Dust Collector:</span> Attaches to the saw to collect sawdust efficiently.
                  </li>
                  <li>
                  <span className="boldtitle">Saw Blade Cleaning Kit:</span> Keeps blades clean for optimal performance. A clean blade is important for clean cuts.
                  </li>
                  <li>
                  <span className="boldtitle">Mobile Bases:</span> Allows for easy movement and storage of the table saw.
                  </li>
                  <li>
                  <span className="boldtitle">Power Feeders:</span>Assists in feeding material smoothly through the saw.
                  </li>
                
                 
                </ul>
              </div>

              <div className="brands">
                <h5 style={{ textAlign: "center" }}>Brands:</h5>
                <h6>DeWalt | Makita | Bosch | Milwaukee | Ryobi | Hilti | Black & Decker | Hitachi | RIDGID | Fein | Porter-Cable | Skil</h6>
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
                style={{ backgroundColor: "lightgrey", display: "inline-block" }}
              >
                <h5 style={{ marginLeft: "50px", textAlign: "center" }}>
                  Uses:
                </h5>
                <hr></hr>
                <ul>
                  <li>
                  <span className="boldtitle">Drilling Holes:</span> In wood, metal, plastic, and other materials.
                  </li>
                  <li>
                  <span className="boldtitle">Screwdriving:</span> Inserting and removing screws from various
                    surfaces.
                  </li>
                  <li>
                  <span className="boldtitle">Installing Fixtures:</span> Hanging shelves, pictures, mirrors, and
                    other fixtures.
                  </li>
                  <li>
                  <span className="boldtitle">Woodworking:</span> Joining wood pieces, creating furniture, and
                    crafting.
                  </li>
                  <li>
                  <span className="boldtitle">Assembly Work:</span> Putting together furniture, cabinets, and
                    other items.
                  </li>
                  <li>
                  <span className="boldtitle">Carpentry:</span> Building structures, framing, and other carpentry
                    tasks.
                  </li>
                  <li>
                  <span className="boldtitle">Masonry Work:</span> Drilling into bricks, concrete, and other
                    masonry materials.
                  </li>
                  <li>
                  <span className="boldtitle">Plumbing:</span> Drilling holes for pipes and other plumbing
                    installations.
                  </li>
                  <li>
                  <span className="boldtitle">Electrical Work:</span> Creating openings for electrical outlets
                    and switches
                  </li>
                </ul>
              </div>

              <div
                className="divcenterbox"
                style={{ backgroundColor: "lightgrey", display: "inline-block" }}
              >
                <h5 style={{ textAlign: "center" }}>Functionality:</h5>
                <hr></hr>
                <ul>
                  <li>
                    <span className="boldtitle">Variable Speed:</span> Adjustable speed settings for different
                    tasks and materials.
                  </li>
                  <li>
                  <span className="boldtitle">Forward and Reverse Mode:</span> Allows both drilling and
                    screwdriving by changing the rotation direction.
                  </li>
                  <li>
                  <span className="boldtitle">Chuck Size:</span> Interchangeable drill bits and accessories with
                    various chuck sizes.
                  </li>
                  <li>
                  <span className="boldtitle">Adjustable Clutch:</span> Control the torque to prevent
                    over-tightening of screws.
                  </li>
                  
                  <li>
                  <span className="boldtitle">LED Work Light:</span> Illuminates the work area for better
                    visibility.
                  </li>
                  <li>
                  <span className="boldtitle">Ergonomic Design:</span> Comfortable grip and ergonomic design for
                    extended use.
                  </li>
                  <li>
                  <span className="boldtitle">Compact Size:</span> Maneuverability in tight spaces and ease of
                    storage due to size.
                  </li>
                </ul>
              </div>

              <div
                className="divrightbox"
                style={{ backgroundColor: "lightgrey", display: "inline-block" }}
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
                    <span className="boldtitle">Drill Bits:</span> Different types and sizes for various materials (wood, metal, masonry).
                  </li>
                  <li>
                  <span className="boldtitle">Screwdriver Bits:</span> Phillips, flathead, torx, and other types for different screw types.
                  </li>
                  <li>
                  <span className="boldtitle">Nut Drivers:</span> For driving nuts and bolts with ease.
                  </li>
                  <li>
                  <span className="boldtitle">Spade Bits:</span> Used for drilling larger holes in wood.
                  </li>
                  
                  <li>
                  <span className="boldtitle">Hole Saws:</span> For cutting larger holes in wood, metal, or plastic.
                  </li>
                  <li>
                  <span className="boldtitle">Countersink Bits:</span> Create recessed holes for screw heads.
                  </li>
                  <li>
                  <span className="boldtitle">Driver Sets:</span> Comprehensive sets of drill and screwdriver bits.
                  </li>
                  <li>
                  <span className="boldtitle">Extension Rods:</span>Extend the reach of drill bits and drivers.
                  </li>
                  <li>
                  <span className="boldtitle">Carrying Cases:</span>Provides storage and transportation for the drill and extras.
                  </li>
                 
                </ul>
              </div>

              <div className="brands">
                <h5 style={{ textAlign: "center" }}>Brands:</h5>
                <h6>DeWalt | Makita | Bosch | Milwaukee | Ryobi | Hilti | Black & Decker | Hitachi | RIDGID | Fein | Porter-Cable | Skil</h6>
              </div>
            </div>
            </div>
            <div className="box"></div>
            <button
              className="btn btn-primary my-2 help1"
              onClick={ShowCatalog}
            >
              Return to Catalog
            </button>
          </div>

      )}

<footer class="text-body-secondary py-5 background" style={{backgroundColor:"#ECECEC"}}>
  <div class="container">
    <p class="float-end mb-2">
      <a href="#">Back to top</a>
    </p>
    <p class="mb-6">Thanks for Visiting our catalog! Hope you have found everything needed!</p>
  </div>
</footer>
    </>
  );
}

export default App;
