import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
toast.configure();

const UpdateIndRecord = (props) => {
  const itemRecord = props.location.itemData.id;
  const [listItems, setListItems] = useState([]);

  const [items, setItems] = useState({
    Item: "",
    ID: "",
    Price: "",
    Quantity: "",
  });
  const inputHandler = (e) => {
    setItems({ ...items, [e.target.name]: e.target.value });
  };
   useEffect(() => {
       axios.get('https://api.khannburger.com/editIndRecord.php?id='+itemRecord)
       .then(res =>{
          setItems({
            Item:res.data.itemName,
            ID:res.data.itemID,
            Price:res.data.itemPrice,
            Quantity:res.data.Quantity
          })
       })
    
     }, []) 
  const fetchAPiCall = () => {
    axios
      .get("https://api.khannburger.com/list.php")
      .then((res) => {
        setListItems(res.data);
        // console.log(item);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const setItemName = (e) => {
    let key = e.code;
    if (key === "Enter") {
      listItems
        .filter((itemss) => itemss.itemID === items.ID)
        .map((item) => {
          setItems({ Item: item.itemName });
        });
    }
  };

  useEffect(() => {
    fetchAPiCall();
  }, []);

  const submitForm = (e) => {
    e.preventDefault();

    const itemsObj = {
      Item: items.Item,
      ID: items.ID,
      Price: items.Price,
      Quantity: items.Quantity,
    };

    axios
      .post(
        "https://api.khannburger.com/updateIndRecord.php?id=" + itemRecord,
        itemsObj
      )
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));

    toast.success("Items Record Updated!");

    setItems({
      Item: "",
      ID: "",
      Price: "",
      Quantity: "",
    });
  };
  return (
    <>
      <div>
        <div className="content-wrapper" style={{background:"white"}}>
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>
                    Update Individual Record
                  </h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      {/* <a href="/">Logout</a> */}
                    </li>
                    {/* <li className="breadcrumb-item active">General Form</li> */}
                  </ol>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </section>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                {/* left column */}
                <div className="col-md-10">
                  {/* general form elements */}
                  <div className="card card-olive">
                    <div className="card-header">
                      <h2>Update Individual Record</h2>
                    </div>
                    {/* /.card-header */}
                    {/* form start */}
                    <form onSubmit={submitForm}>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Item Name*
                              </label>
                              <input
                                type="text"
                                name="Item"
                                value={items.Item}
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter Item Name"
                                onChange={inputHandler}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Item ID*
                              </label>
                              <input
                                type="text"
                                style={{ textTransform: "uppercase" }}
                                // autoCapitalize={true}
                                onKeyPress={(e) => setItemName(e)}
                                name="ID"
                                value={items.ID}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter ID"
                                onChange={inputHandler}
                                required
                              />
                            </div>
                          </div>

                          <di className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Price*
                              </label>
                              <input
                                type="number"
                                name="Price"
                                value={items.Price}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter Price"
                                onChange={inputHandler}
                                required
                              />
                            </div>
                          </di>

                          <di className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Item Quantity*
                              </label>
                              <input
                                type="number"
                                name="Quantity"
                                value={items.Quantity}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter Quantity"
                                onChange={inputHandler}
                                required
                              />
                            </div>
                          </di>
                        </div>
                      </div>
                      {/* /.card-body */}
                      <div className="card-footer">
                        <button type="submit" className="btn btn-outline-success">
                          Update
                        </button>
                        {/* <button type="submit" onClick={updateData}className="btn btn-outline-danger float-right">
                        Update
                      </button> */}
                      </div>
                    </form>
                  </div>
                  {/* /.card */}
                </div>

                {/* <div className="col-md-4">
               <div className="card card-primary card-outline">
              <div className="card-header">
                <h5 className="m-0">Featured</h5>
              </div>
              <div className="card-body">
                <h6 className="card-title">Special title treatment</h6>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
            </div> */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default UpdateIndRecord;
