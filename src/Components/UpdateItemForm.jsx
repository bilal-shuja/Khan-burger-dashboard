
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
toast.configure();

const UpdateItemForm = (props) => {

    const foodID = props.location.ID.id;
  const [items, setItems] = useState({
    Item: '',
    ID: '',
    Price: '',
  });
  const inputHandler = (e) => {
    setItems({ ...items, [e.target.name]: e.target.value });
  };

  
     useEffect(() => {
       axios.get('https://api.khannburger.com/editFoodItems.php?id='+foodID)
       .then(res =>{
          setItems({
            Item:res.data.itemName,
            ID:res.data.itemID,
            Price:res.data.itemPrice,
          })
       })
    
     }, []) 

  const submitForm = (e) => {
    e.preventDefault();

    const itemsObj = {
      Item: items.Item,
      ID: items.ID,
      Price: items.Price
    };
    
    axios.post('https://api.khannburger.com/updateFoodItems.php?id='+foodID,itemsObj)
    .then(res => console.log(res.data))
    .catch(error => console.log(error))
    

    toast.success("Item Updated!");

    setItems({
      Item: "",
      ID: "",
      Price: ""    
      });
 
  };

  return (
    <div>
      <div className="content-wrapper" style={{background:"white"}}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Update Items</h1>
              {/* <button onClick={showID}>Click</button> */}
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
                    <h2>Update Food Items</h2>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form onSubmit={submitForm}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
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
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Item ID*
                            </label>
                            <input
                              type="text"
                              style={{textTransform:"uppercase"}}
                              // autoCapitalize={true}
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

                        <di className="col-md-4">
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
                          
                          {/* 
                           <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              UID*
                            </label>
                            <input
                              type="number"
                              name="uid"
                              value={items.uid}
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Enter UID"
                              onChange={inputHandler}
                              required
                            />
                          </div>
                        </div> */}

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
  );
};

export default UpdateItemForm;





