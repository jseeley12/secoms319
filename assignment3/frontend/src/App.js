import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  //Category
  const [ProductsCategory, setProductsCategory] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [OneFound, setOneFound] = useState(false);

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
    setOneFound(false);
    fetch("http://localhost:8081/" + id)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setOneProduct(res);
        setIsLoading(false);
        setOneFound(true);
      })
      .catch((err) => {
        console.log("Item does not exist");
        setIsLoading(false);
        setOneProduct("Id Does not exist");
        setOneFound(true);
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
          Rating: {el.rating.rate} <br />
          Count: {el.rating.count}
          <br />
          Id: {el.id}
        </div>
      </div>
    </div>
  ));

  function showOne() {
    if (oneProduct === "Id Does not exist") {
      return <div>That Item ID does not Exist!</div>;
    } else {
      return (
        <div>
          Id: {oneProduct.id} <br />
          Title: {oneProduct.title}
          <br />
          Description: {oneProduct.description}
          <br />
          Category: {oneProduct.category}
          <br />
          Price: {oneProduct.price}
          <br />
          Rating: {oneProduct.rating.rate}
          <br />
          Count: {oneProduct.rating.count}
        </div>
      );
    }
  }

  //ID Find
  const [queryID, setQueryID] = useState("");

  const FindQueryID = (e) => {
    setQueryID(e.target.value);
  };

  function SelectButton() {
    getOneProducts(queryID);
    console.log(queryID);
  }

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

  function addItem() {
    postMethod();
  }

  //add -  Mongo
  function postMethod() {
    fetch("http://localhost:8081/addItems", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: Id,
        title: Title,
        price: Price,
        description: Description,
        category: Catagory,
        imageUrl: Image,
        rating: Rate,
        counting: Count
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
      window.location.reload();
  }

  function deleteItem() {
    deleteMethod(oneProduct.id);
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
      })
      .catch((err) => console.log("Errror:" + err));
    window.location.reload();
  }

  //update - Mongo
  function updateItem() {
    updateMethod(oneProduct.id);
  }

  function updateMethod(id) {
    fetch("http://localhost:8081/updateItems", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: id,
        price: Price
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log("Errror:" + err));
    window.location.reload();
  }


  //form
  const [Id, setId] = useState();
  const [Title, setTitle] = useState("");
  const [Price, setPrice] = useState();
  const [Description, setDescription] = useState("");
  const [Catagory, setCatagory] = useState("");
  const [Image, setImage] = useState("");
  const [Rate, setRate] = useState();
  const [Count, setCount] = useState();

  const IdChange = (e) => {
    setId(parseFloat(e.target.value));
  };

  const TitleChange = (e) => {
    setTitle(e.target.value);
  };

  const PriceChange = (e) => {
    setPrice(parseFloat(e.target.value));
  };

  const DescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const CatagoryChange = (e) => {
    setCatagory(e.target.value);
  };

  const ImageChange = (e) => {
    setImage(e.target.value);
  };

  const RateChange = (e) => {
    setRate(parseFloat(e.target.value));
  };

  const CountChange = (e) => {
    setCount(parseFloat(e.target.value));
  };

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
      {AddProduct && (
        <div>
          <h5>ID: </h5>
          <input type="Id" onChange={IdChange} />
          <h5>Title: </h5>
          <input type="Title" onChange={TitleChange} />
          <h5>Price: </h5>
          <input type="Price" onChange={PriceChange} />
          <h5>Description: </h5>
          <input type="Description" onChange={DescriptionChange} />
          <h5>Catagory: </h5>
          <input type="Catagory" onChange={CatagoryChange} />
          <h5>Image: </h5>
          <input type="Images" onChange={ImageChange} />
          <h5>Rating: </h5>
          <input type="Rate" onChange={RateChange} />
          <h5>Count: </h5>
          <input type="Count" onChange={CountChange} />
          <hr></hr>
          <botton className="btn btn-primary my-2" onClick={addItem}>
            Create Item!
          </botton>
        </div>
      )}

      {/* Update */}
      {UpdateProduct && <div>
        <h4>ID to Update</h4>
          <input type="search" value={queryID} onChange={FindQueryID} />
          <botton className="btn btn-primary my-2" onClick={SelectButton}>
            Seach
          </botton>
          {OneFound && (
            <div>
              {showOne()}
              <h5>Price: </h5>
              <input type="Price" onChange={PriceChange} />
              <botton className="btn btn-primary my-2" onClick={updateItem}>
                Update Item!
              </botton>
            </div>
          )}
      </div>}

      {/* Delete */}
      {DeleteProduct && (
        <div>
          <h4>ID to delete</h4>
          <input type="search" value={queryID} onChange={FindQueryID} />
          <botton className="btn btn-primary my-2" onClick={SelectButton}>
            Seach
          </botton>
          {OneFound && (
            <div>
              {showOne()}
              <botton className="btn btn-primary my-2" onClick={deleteItem}>
                Delete Item!
              </botton>
            </div>
          )}
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
