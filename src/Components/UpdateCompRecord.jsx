import React,{ useState, useEffect } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
toast.configure();

const UpdateCompRecord = () => {
const [items, setItems] = useState({
    Name: "",
    Contact: "",
    Address: ""
  });
  const inputHandler = (e) => {
    setItems({ ...items, [e.target.name]: e.target.value });
  };
    const [order ,setOrder]= useState('');
    const[date , setDate] = useState('');
    const [fetchRecord,setfetchRecord] = useState([]);

        const fetchCustomRecord =()=>{
        axios.get("https://api.khannburger.com/orderlist.php").then((res)=>{
                setfetchRecord(res.data);
            })
            .catch((error)=>{
            console.log(error);
            })
        }

        const setCustomerRecord =(e)=>{
                fetchRecord.filter((itemss)=> itemss.OrderNum === order && itemss.DateTime === date).map(item =>{
                setItems({Name: item.Name,
                        Contact:item.Contact,
                         Address:item.Address       
                })
            })
        }

        useEffect(() => {
            fetchCustomRecord();
        }, [])




    const submitForm = (e) => {
    e.preventDefault();

    const itemsObj = {
      Name: items.Name,
      Contact: items.Contact,
      Address: items.Address,
      Order:order,
      Date:date
    };

    axios
      .post(
        "https://api.khannburger.com/updateCompRecord.php",itemsObj
      )
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));

    toast.success("Customer Record Updated!");

    setItems({
      Name: "",
      Contact: "",
      Address: ""
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
                  <h1 >
                    Update Customer Record
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
                <div className="col-md-12">
                  {/* general form elements */}
                  <div className="card card-olive">
                    <div className="card-header">
                      <h2>Update Customer Record</h2>
                    </div>
                    {/* /.card-header */}
                    {/* form start */}
                    <form onSubmit={submitForm}>
                      <div className="card-body">
                        <div className="row">

                        <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Enter Order No*
                              </label>
                              <input
                                type="number"
                                name="Order"
                                value={order}
                                onKeyUp ={(e)=>setCustomerRecord(e)}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter Order Number"
                                onChange={(e)=>setOrder(e.target.value)}
                                required
                              />
                            </div>
                          </div>

                           <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Enter Date*
                              </label>
                              <input
                                type="date"
                                name="Order"
                                value={date}
                                onKeyUp ={(e)=>setCustomerRecord(e)}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter Quantity"
                                onChange={(e)=>setDate(e.target.value)}
                                required
                              />
                            </div>
                          </div>

                          </div>

                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Customer Name*
                              </label>
                              <input
                                type="text"
                                name="Name"
                                value={items.Name}
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter Name"
                                onChange={inputHandler}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Enter Contact*
                              </label>
                              <input
                                type="number"
                                // style={{ textTransform: "uppercase" }}
                                // autoCapitalize={true}
                                // onKeyPress={(e) => setItemName(e)}
                                name="Contact"
                                value={items.Contact}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter Contact"
                                onChange={inputHandler}
                                required
                              />
                            </div>
                          </div>

                          <di className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Address*
                              </label>
                              <input
                                type="text"
                                name="Address"
                                value={items.Address}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter Address"
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
    )
}

export default UpdateCompRecord
