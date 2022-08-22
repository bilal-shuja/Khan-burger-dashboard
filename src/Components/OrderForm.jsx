import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InvoiceToPrint from "./InvoiceToPrint";
import axios from "axios";
import ReactToPrint from "react-to-print";
import TokenPrint from "./TokenPrint";
import { AsyncStorage } from "AsyncStorage";
toast.configure();

const OrderForm = (e) => {
  let componentRef = useRef();
  let componentToken = useRef();
  const [inputName, setName] = useState("");
  const [inputNumber, setNumber] = useState("");
  // const [inputNumberTwo, setNumberTwo]=useState("");
  const [inputAddress, setAddress] = useState("");
  const [inputCharges, setCharges] = useState("");
  // const [gst,setGST] =useState("");
  const [uniqID, setUniqID] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [ridersNote, setRidersNote] = useState("");
  const [Sshow, setSShow] = useState(false);
  const [selectDropDown, setSelectDropDown] = useState('Delivery');

  const DropDownOptions = (e)=>{
    setSelectDropDown(e.target.value)
  }
 

  const useKeyPress = function (targetKey) {
    const [keyPressed, setKeyPressed] = useState(false);
    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };
    React.useEffect(() => {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    });
    return keyPressed;
  };

  const [selected, setSelected] = useState(undefined);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [hidden, setHidden] = useState(2);

  const fetchOrder = () => {
    axios
      .get("https://api.khannburger.com/list.php")
      .then((res) => {
        setAPIData(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  const ListItem = ({ item, active, setSelected, setHovered, color }) => (
    // <div className="row">
    <div
      className={`item ${active ? "active" : ""}`}
      onClick={() => {
        setHidden(1);
        setSearchInput("");
        setSelected(item);
        setProductID(item.itemID);
      }}
      onMouseEnter={() => {
        setProductID(item.itemID);
        setHovered(item);
      }}
      onMouseLeave={() => setHovered(undefined)}
    >
      <p
        style={{
          color: active ? "blue" : "black",
          fontWeight: active ? "bold" : "normal",
        }}
      >
        {item.itemName}
      </p>
      {item.itemID}
    </div>

    // </div>
  );

  useEffect(() => {
    if (searchInput.length > 1) {
      if (filteredResults.length && downPress) {
        setCursor((prevState) =>
          prevState < filteredResults.length - 1 ? prevState + 1 : prevState
        );
      }
    } else {
      if (APIData.length && downPress) {
        setCursor((prevState) =>
          prevState < APIData.length - 1 ? prevState + 1 : prevState
        );
      }
    }
  }, [downPress]);

  useEffect(() => {
    if (searchInput.length > 1) {
      if (filteredResults.length && upPress) {
        setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
      }
    } else {
      if (APIData.length && upPress) {
        setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
      }
    }
  }, [upPress]);

  useEffect(() => {
    if (searchInput.length > 1) {
      if (filteredResults.length && enterPress) {
        setSelected(filteredResults[cursor]);
        setHidden(1);
        setSearchInput("");
        if (filteredResults.length > 1) {
          setProductID(filteredResults[cursor].itemID);
        } else {
          return null;
        }
      }
    } else {
      if (APIData.length && enterPress) {
        setHidden(1);
        setSearchInput("");
        if (filteredResults.length > 1) {
          setProductID(filteredResults[cursor].itemID);
        } else {
          return null;
        }
        setSelected(APIData[cursor]);
      }
    }
  }, [cursor, enterPress]);

  useEffect(() => {
    if (searchInput.length > 1) {
      if (filteredResults.length && hovered) {
        setCursor(filteredResults.indexOf(hovered));
      }
    } else {
      if (APIData.length && hovered) {
        setCursor(APIData.indexOf(hovered));
      }
    }
  }, [hovered]);

  const submitForm = (e) => {
    e.preventDefault();
    TotalPrice();
    TotalPriceFromArr();
    submitRecord();
    setHolder(1);
  };

  const addEmpID = () => {
    AsyncStorage.setItem("UniqueID", JSON.stringify(uniqID));
    // window.reload(true);
  };
  const clearFields = () => {
    window.location.reload(true);
  };
  const [admin, setAdmin] = useState("");

  const SetLocalLogin = async () => {
    try {
      let userLogin = await AsyncStorage.getItem("email");
      let parsed = JSON.parse(userLogin);
      if (parsed !== null) {
        setAdmin(parsed);
      }
    } catch {
      return null;
    }
  };

  const Login = () => {
    AsyncStorage.setItem("login", JSON.stringify(1));
    window.location.reload(true);
  };

  const [holder, setHolder] = useState(null);
  const [ProductID, setProductID] = useState(undefined);
  const [Quantity, setQuantity] = useState("");

  //Add wala button
  const Onpress = (e) => {
    var keyCode = e.code;
    if (keyCode === "Enter" || keyCode === "NumpadEnter") {
      e.preventDefault();
      // fetchCustomRecord();
      AddTempProduct();
      TotalPrice();
      TotalPriceFromArr();
      setQuantity("");
      setId(ProductID);
      setProductID("");
      setConI(0);
    }
  };
  //Tick wala button
  const [conI, setConI] = useState(0);
  const ConfirmProduct = (e) => {
    let key = e.key;
    var keyCode = e.code;
    if (conI === 0) {
      if (keyCode === "Enter" || keyCode === "NumpadEnter") {
        e.preventDefault();
        AddTempProduct();
        TotalPriceFromArr();
        TotalPrice();
        setId(ProductID);
        setProductID("");
        setConI(1);
      }
    }
    if (key === ".") {
      setShowTable(true);
      console.log(showTable);
      setProductID(" ");
    } else if (key === "/") {
      setShowTable(false);
      console.log(showTable);
      setProductID(" ");
    }
  };
  const selectingFoodItems = (props) => {
    setProductID(props.itemID);
  };

  const FoodItemTable = () => {
    const [APIData, setAPIData] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    useEffect(() => {
      axios.get(`https://api.khannburger.com/list.php`).then((response) => {
        setAPIData(response.data);
      });
    }, []);

    const searchItems = (searchValue) => {
      setSearchInput(searchValue);
      if (searchInput !== "") {
        const filteredData = APIData.filter((item) => {
          return Object.values(item)
            .join("")
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        });
        setFilteredResults(filteredData);
      } else {
        setFilteredResults(APIData);
      }
    };

    return (
      <>
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-lg-12">
                  <h1>Items Table</h1>
                </div>
                <div className="col-lg-12">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      {/* <a href="/">Logout</a> */}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </section>
          <section className="d-flex content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Food Items Table</h3>
                    </div>

                    {/* /.card-header */}
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label
                              htmlFor=""
                              style={{
                                fontFamily:
                                  "Lucida Console  Courier New monospace",
                                fontSize: "16px",
                              }}
                            >
                              Search with Item Name:
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Search..."
                              onChange={(e) => searchItems(e.target.value)}
                              style={{ borderRadius: "7px" }}
                            />
                          </div>
                        </div>
                      </div>
                      <table
                        id="example1"
                        className="table table-bordered table-striped table-sm"
                      >
                        <thead>
                          <tr>
                            {/* <th>#</th> */}
                            <th>#</th>
                            <th>Item (ID)</th>
                            <th>Item Name</th>
                            <th>Item Price</th>
                            <th>Select</th>
                          </tr>
                        </thead>

                        <tbody>
                          {searchInput.length > 1
                            ? filteredResults
                                .sort((a, b) => {
                                  return a.uid - b.uid;
                                })
                                .map((item) => {
                                  return (
                                    <tr
                                      onClick={() => {
                                        selectingFoodItems(item);
                                        setShowTable(false);
                                      }}
                                    >
                                      {/* <td>{items.id}</td> */}
                                      <td>{item.uid}</td>
                                      <td>{item.itemID}</td>
                                      <td>{item.itemName}</td>
                                      <td>{item.itemPrice}</td>
                                      <td>
                                        <button
                                          onClick={() => {
                                            selectingFoodItems(item);
                                            setShowTable(false);
                                          }}
                                          className="btn btn-outline-info"
                                        >
                                          <i
                                            class="fa fa-check"
                                            aria-hidden="true"
                                          ></i>
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })
                            : APIData.sort((a, b) => {
                                return a.uid - b.uid;
                              }).map((item) => {
                                return (
                                  <tr
                                    onClick={() => {
                                      selectingFoodItems(item);
                                      setShowTable(false);
                                    }}
                                  >
                                    {/* <td>{items.id}</td> */}
                                    <td>{item.uid}</td>
                                    <td>{item.itemID}</td>
                                    <td>{item.itemName}</td>
                                    <td>{item.itemPrice}</td>
                                    <td>
                                      <button
                                        onClick={() => {
                                          selectingFoodItems(item);
                                          setShowTable(false);
                                        }}
                                        className="btn btn-outline-info"
                                      >
                                        <i
                                          class="fa fa-check"
                                          aria-hidden="true"
                                        ></i>
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                        </tbody>

                        {/* <tfoot>
                        <tr>
                         <th><button type="button" className="btn btn-outline-info"onClick={TotalPrice}>Total Amount</button></th>
                         <td>{finalTotalAmount}</td>
                        </tr>
                      </tfoot> */}
                      </table>
                    </div>
                    {/* /.card-body */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  };

  const DisplayProduct = (e) => {
    if (holder === null) {
      return (
        <InvoiceToPrint ref={(el) => (componentRef = el)} ItemOrder={arr} />
      );
    } else if (holder !== null) {
      return (
        <InvoiceToPrint
          ref={(el) => (componentRef = el)}
          ItemOrder={arr}
          TotalPrice={finalTotal}
          CustomName={inputName}
          CustomNumber={inputNumber}
          CustomAddress={inputAddress}
          DeliveryCharges={inputCharges}
          Quantity={Quantity}
          TotalAmountfromArr={finalTotalfromArr}
          // GstCharges={gst}
          uniqID={uniqID}
          orderNum={orderNum}
          ridersNote={ridersNote}
        />
      );
    }
  };

  const DisplayTokenPrint = () => {
    if (holder === null) {
      return <TokenPrint ref={(el) => (componentToken = el)} ItemOrder={arr} />;
    } else if (holder !== null) {
      return (
        <TokenPrint
          ref={(el) => (componentToken = el)}
          ItemOrder={arr}
          // TotalPrice={finalTotal}
          // CustomName={inputName}
          // CustomNumber={inputNumber}
          // CustomAddress={inputAddress}
          // DeliveryCharges={inputCharges}
          // Quantity={quantity}
          // GstCharges={gst}
          // uniqID={uniqID}
          orderNum={orderNum}
          // ridersNote={ridersNote}
        />
      );
    }
  };

  /* Sending Order to Database*/

  const [arr, setArr] = useState([]);

  const submitRecord = () => {
    let today = new Date();
    let year = today.getFullYear();
    let mes = today.getMonth() + 1;
    let dia = today.getDate();
    let fecha = year + "-" + mes + "-" + dia;

    let currentTime = new Date();
    let hours = currentTime.getHours();
    hours = hours % 12 || 12;
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    let time = hours + ":" + minutes + ":" + seconds;

    arr.map((items) => {
      const CustomerData = {
        Name: items.itemName,
        ID: items.itemID,
        Price: items.itemPrice,
        Quantity: items.Quantity,
        CustomerName: inputName,
        CustomerContact: inputNumber,
        // CustomerContactTwo:inputNumberTwo,
        CustomerAddress: inputAddress,
        // GST:gst,
        date: fecha,
        Time: time,
        order: orderNum,
        Type:selectDropDown
      };
      axios.post("https://api.khannburger.com/record.php", CustomerData)
        .then((res) =>{
        console.log(res.data);
      }) 
      .catch((error) =>
      {
        console.log(error)
        toast.warn("Order not submitted")
      });
    });
    toast.success("Order Submitted!");
  };

  // fetching Customer Record against number:
  const [condition, setCondition] = useState(0);
  const [orderNum, setOrderNum] = useState("");

  const [fetchRecord, setfetchRecord] = useState([]);

  const fetchCustomRecord = () => {
    axios
      .get("https://api.khannburger.com/orderlist.php")
      .then((res) => {
        setfetchRecord(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const [click , setClick] = useState(1)
  const setOrderNums = () => {
    // if(click === 1){
    // fetchCustomRecord()
    // setClick(2)
    // }

    if (condition === 0) {
      fetchRecord.map((items) => {
        setOrderNum(items.OrderNum++ + 1);
        setCondition(1);
        console.log("data", items.OrderNum++ + 1);
      });
    }
  };

  const setCustomerDetails = (e) => {
    let key = e.code;
    if (key === "Enter") {
      fetchRecord
        .filter((item) => item.Contact === inputNumber)
        .map((items) => {
          setName(items.Name);
          setAddress(items.Address);
        });
    }
  };

  const SetUniqueId = async () => {
    try {
      let userLogin = await AsyncStorage.getItem("UniqueID");
      let parsed = JSON.parse(userLogin);
      if (parsed) {
        setUniqID(parsed);
      } else if (!parsed) {
        setUniqID(null);
      }
    } catch {
      return null;
    }
  };

  /* yahna sy apna nizaam start hai*/

  const [item, setItem] = useState([]);
  const [id, setId] = useState([]);

  const fetchAPiCall = () => {
    axios
      .get("https://api.khannburger.com/list.php")
      .then((res) => {
        setItem(res.data);
        // console.log(item);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    SetUniqueId();
    fetchAPiCall();
    TotalPrice();
    SetLocalLogin();
    fetchCustomRecord();
    fetchOrder();
  }, []);

  const [orderVal, setOrderVal] = useState("");
  const [updateOrder, setUpdateOrder] = useState([]);
  const [OrderDate, setOrderInfoDate] = useState("");

  const getOrderArr = () => {
    axios
      .get(`https://api.khannburger.com/fetchOrderNumber.php?id=` + OrderDate)
      .then((res) => {
        console.log(res.data);
        setUpdateOrder(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(updateOrder);
  };

  const UpdateUserInfo = () => {
    updateOrder
      .filter((items) => items.OrderNum === orderVal)
      .map((item) => {
        setNumber(item.Contact);
        setName(item.Name);
        setAddress(item.Address);
      });
  };

  const getArrData = () => {
    updateOrder
      .filter((item) => item.OrderNum === orderVal)
      .map((item) => {
        return setArr((prevItems) => [
          ...prevItems,
          {
            itemName: item.itemName,
            itemID: item.itemID,
            itemPrice: item.itemPrice,
            Quantity: item.Quantity,
          },
        ]);
      });
  };

  const getResumeOrder = () => {
    if (orderVal && OrderDate) {
      getOrderArr();
      UpdateUserInfo();
      getArrData();
    } else {
      toast.error("Please Enter Values correctly !");
    }
  };

  const [finalTotalfromArr, setFinalTotalFromArr] = useState([]);

  const TotalPriceFromArr = () => {
    const totalPrice = arr.reduce(function (accumulator, currentValue) {
      return accumulator + +currentValue.itemPrice;
    }, 0);
    setFinalTotalFromArr(totalPrice);
  };

  const [total, setTotal] = useState([]);
  const [finalTotal, setFinalTotal] = useState([]);
  const TotalPrice = (e) => {
    item
      .filter((item) => item.itemID === id)
      .map((item) => {
        return setTotal((prevItems) => [
          ...prevItems,
          {
            itemPrice: item.itemPrice * Quantity,
          },
        ]);
      });
    const totalPrice = total.reduce(function (accumulator, currentValue) {
      return accumulator + +currentValue.itemPrice;
    }, 0);
    setFinalTotal(totalPrice);
  };

  const AddTempProduct = (e) => {
    item
      .filter((item) => item.itemID === id)
      .map((item) => {
        return setArr((prevItems) => [
          ...prevItems,
          {
            itemName: item.itemName,
            itemID: item.itemID,
            itemPrice: item.itemPrice * Quantity,
            Quantity: Quantity,
          },
        ]);
      });
  };
  // .filter((items)=> items.OrderNum === orderVal)
  const returnList = arr.map((item, index) => {
    const delProduct = (index) => {
      setArr((preState) => {
        const items = [...preState];
        items.splice(index, 1);
        return items;
      });
    };

    // const delProductPrice = (index) => {
    //   setTotal((preState) => {
    //     const items = [...preState];
    //     items.splice(index, 1);
    //     return items;
    //   });
    // };
    return (
      <tr key={item.id}>
        <td>{index+1}</td>
        <td>{item.itemName}</td>
        {/* <td>{item.itemID}</td> */}
        <td>{item.itemPrice}</td>
        <td>{item.Quantity}</td>

        <td>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              delProduct(index);
              // delProductPrice(index);
              // delProductPricee(item);
            }}
          >
            <i className="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    );
  });
 
  const restOrderNum = () => {
    let today = new Date();
    let year = today.getFullYear();
    let mes = today.getMonth() + 1;
    let dia = today.getDate();
    let fecha = year + "-" + mes + "-" + dia;

    let currentTime = new Date();
    let hours = currentTime.getHours();
    hours = hours % 12 || 12;
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    let time = hours + ":" + minutes + ":" + seconds;

    const CustomerData = {
      Name: "Null",
      ID: "Null",
      Price: 0,
      Quantity: "Null",
      CustomerName: "Null",
      CustomerContact: "Null",
      // CustomerContactTwo:inputNumberTwo,
      CustomerAddress: "Null",
      // GST:gst,
      date: fecha,
      Time: time,
      order: 0,
    };
    axios
      .post("https://api.khannburger.com/record.php", CustomerData)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
    // console.log(CustomerData);
    toast.info("Successfully Reset!");
  };
  const showItemTable = (e) => {
    setShowTable(true);
  };
  return (
    <div>
      <div className="row" style={{ marginLeft: "13em" }}>
        <div className="col-md-6 mt-2">
          <button
            className="btn btn-outline-success ml-5"
            onClick={(e) => showItemTable(e)}
          >
            Show Table
          </button>
          <button
            className="btn btn-outline-danger ml-2"
            onClick={() => setShowTable(false)}
          >
            Hide Table
          </button>
          <br />
          <br />
        </div>
      </div>
      {showTable === true ? <FoodItemTable /> : null}
      <div className="content-wrapper"  style={{background:"white"}}>
        {/* Content Header (Page header)  */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <h1 className="logout" onClick={Login}>
                      <i className="fas fa-unlock"></i>
                    </h1>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid  */}
        </section>

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              {/* left column */}
              <div className="col-lg-7">
                {/* general form elements */}
                <div className="card card-olive">
                  <div className="card-header">
                    <h2>Order Form</h2>
                  </div>

                  {/* /.card-header */}
                  {/* form start */}
                  <form onSubmit={submitForm}>
                    <div className="card-body">
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={addEmpID}
                      >
                        Add System ID
                      </button>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            {uniqID !== null ? (
                              <p>{uniqID}</p>
                            ) : (
                              <div>
                                <label htmlFor="exampleInputEmail1">
                                  Enter System Unique ID*
                                </label>

                                <input
                                  type="number"
                                  value={uniqID}
                                  className="form-control"
                                  id="exampleInputEmail1"
                                  placeholder="Enter Employee Unique ID"
                                  onChange={(e) => setUniqID(e.target.value)}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Choose</label>
                            <select
                              class="form-control"
                              aria-label="Default select example"
                              id="selectBox"
                              value={selectDropDown}
                              onChange={DropDownOptions}
                            >
                              <option disabled value="0">
                                --------------Select Menu--------------
                              </option>
                              <option value="Dine In">
                                Dine In
                              </option>
                              <option value="Take Away">
                              Take Away
                              </option>
                              <option value="Delivery">
                                Delivery
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        {/* <div className="col-md-4">
                          <div class="form-group">
                           <label for="exampleFormControlSelect1">
                              Select Item
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={searchInput}
                              onChange={(e) => searchItems(e.target.value)}
                              placeholder="---Select---"
                              onClick={() => {
                                setHidden(2);
                              }}
                            /> 
                            {hidden > 1
                              ? 
                                filteredResults.map((item, i) => {
                                  return (
                                    <ListItem
                                      key={item.itemID}
                                      active={i === cursor}
                                      item={item}
                                      setSelected={setSelected}
                                      setHovered={setHovered}
                                    />
                                  );
                                })
                              : null}
                          </div>
                        </div> */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Enter item ID*
                            </label>
                            <input
                              type="text"
                              onKeyPress={(e) => ConfirmProduct(e)}
                              // style={{textTransform:"uppercase"}}
                              value={ProductID}
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Enter Item ID"
                              onChange={(e) => setProductID(e.target.value)}
                            />
                            {/* <button
                              type="submit"
                              // onClick={ConfirmProduct}
                              onKeyPress = {(e) => ConfirmProduct(e) }
                              className="btn btn-outline-success btn-sm"
                              style={{
                                borderRadius: "70%",
                                margin: "5px",
                                fontSize: "8px",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "Arial Unicode MS, Lucida Grande",
                                }}
                              >
                                ✔
                              </span>
                            </button>
                            Confirm Order */}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Quantity*
                            </label>
                            {/* <button
                              type="submit"
                               onClick={Onpress}
                              className="btn btn-outline-success btn-sm"
                              style={{
                                borderRadius: "30%",
                                marginLeft: "5px",
                                fontSize: "12px",
                              }}
                            >
                              Add
                            </button> */}

                            <input
                              type="number"
                              name="Quantity"
                              onKeyPress={(e) => Onpress(e)}
                              value={Quantity}
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Enter Quantity"
                              onChange={(e) => setQuantity(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Customer Name*
                            </label>
                            <input
                              type="text"
                              name="Name"
                              value={inputName}
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Enter Name"
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Phone No #*
                            </label>

                            <input
                              type="number"
                              name="Contact"
                              value={inputNumber}
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Enter Number"
                              onKeyPress={(e) => setCustomerDetails(e)}
                              onChange={(e) => setNumber(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        {/* <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Phone No #2(Optional)*
                            </label>
                            <input
                              type="number"
                              name="Contact"
                              value={inputNumberTwo}
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Enter another Number"
                              onChange={(e) => setNumberTwo(e.target.value)}
                            />
                          </div>
                        </div> */}
                        {selectDropDown == "Delivery"?
                          <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Delivery Charges*
                            </label>
                            <input
                              type="number"
                              name="Delivery"
                              value={inputCharges}
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Delivery Charges"
                              onChange={(e) => setCharges(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        :
                       null
                        }
                       
                      </div>

                      <div className="row">
                        {/* <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              GST TAX(Optional)*
                            </label>
                            <input
                              type="number"
                              name="GST"
                              value={gst}
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Enter GST TAX"
                              onChange={(e) => setGST(e.target.value)}
                            />
                          </div>
                        </div> */}
                      </div>

                      <div className="row">
                        { selectDropDown == "Delivery" ?
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Address*
                            </label>
                            <input
                              type="text"
                              name="Address"
                              value={inputAddress}
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Enter Address"
                              onChange={(e) => setAddress(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        :
                        null
                        }
                      </div>

                      <div className="row">
                        {selectDropDown == "Delivery" ?
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Enter Riders Note*
                            </label>
                            <input
                              type="text"
                              name="Riders Note"
                              value={ridersNote}
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Enter Riders Note"
                              onChange={(e) => setRidersNote(e.target.value)}
                            />
                          </div>
                        </div>
                        :
                        null
                        }
                        <div className="col-md-6">
                          <label htmlFor="exampleInputPassword1">
                            Order No*
                          </label>
                          <input
                            type="number"
                            name="Order Number"
                            // onKeyPress={() => setOrderNums()}
                            value={orderNum}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Order Number"
                            onChange={(e) => setOrderNum(e.target.value)}
                            required
                          />
                          {/* <label htmlFor="exampleInputPassword1">Order No*</label> */}

                          {/*                         
                            <button
                              type="button"
                              onClick={()=>setOrderNums()}
                              name="Order Number"
                              // value={orderNum}
                              className="btn btn-block btn-outline-success"
                              id="exampleInputPassword1"                                
                              // onChange={(e) => setOrderNum(e.target.value)}
                              required
                            >
                                {orderNum ?<div>{orderNum}</div>: '+'}
                            
                            </button> */}
                        </div>
                      </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                      <div className="row">
                        <div className="col-md-10">
                          <button
                            type="submit"
                            className="btn btn-outline-success"
                          >
                            Submit
                          </button>
                          <button
                            type="button"
                            onClick={clearFields}
                            className="btn btn-outline-warning"
                            style={{ marginLeft: "10px" }}
                          >
                            Clear
                          </button>
                        </div>
                        {admin === "SarfarazKhan" ? (
                          <div className="col-md-2">
                            <button
                              className="btn btn-outline-dark"
                              onClick={restOrderNum}
                            >
                              Reset
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </form>
                </div>
                {/* /.card */}
              </div>

              <div className="col-lg-5">
                {/* Main content */}
                <section className="content">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="card">
                          {/* /.card-header */}
                          <div className="card-header">
                            <h2 className="card-title ">Order Table</h2>
                          </div>

                          <div className="card-body">
                            <label htmlFor="" className="mr-2">
                              Get Resume Order
                            </label>
                            {Sshow === false ? (
                              <button
                                className="btn btn-outline-info btn-sm"
                                onClick={() => setSShow(true)}
                              >
                                <i
                                  className="fa fa-arrow-down"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            ) : (
                              <div className="row">
                                <div className="col-md-5">
                                  <div className="form-group">
                                    <button
                                      className="btn btn-outline-info btn-sm"
                                      onClick={() => setSShow(false)}
                                    >
                                      <i
                                        className="fa fa-arrow-up"
                                        aria-hidden="true"
                                      ></i>
                                    </button>
                                    <div className="row">
                                      <div className="col-md-12 mb-2 mt-2">
                                        <button
                                          className="btn btn-outline-success btn-sm"
                                          onClick={() => getResumeOrder()}
                                        >
                                          Click Twice
                                        </button>
                                      </div>
                                    </div>
                                    <label htmlFor="">Order No*</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={orderVal}
                                      onChange={(e) =>
                                        setOrderVal(e.target.value)
                                      }
                                      style={{ borderRadius: "10px" }}
                                      required
                                    />
                                    <br />
                                    <label htmlFor="">Date*</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={OrderDate}
                                      onChange={(e) =>
                                        setOrderInfoDate(e.target.value)
                                      }
                                      style={{ borderRadius: "10px" }}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            <table className="table table-bordered table-sm">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Product</th>
                                  {/* <th>ItemID</th> */}
                                  <th>Price</th>
                                  <th>Quantity</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody key={item.id}>{returnList}</tbody>
                            </table>
                          </div>
                        </div>
                        {/* /.card */}
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="col-lg-3">
                <div className="invoice p-3 mb-3">
                  {/* title row */}
                  {/* /.row */}

                  {/* /.row */}
                  {/* this row will not appear when printing */}
                  <div className="row no-print">
                    <div className="col-5">
                      <ReactToPrint
                        trigger={() => (
                          <button
                            type="print"
                            rel="noopener"
                            target="_blank"
                            className="btn btn-default"
                          >
                            <i className="fas fa-print" /> Print
                          </button>
                        )}
                        content={() => componentRef}
                      />
                      {/* <button
                        className="btn btn-outline-info"
                        onClick={submitOrder}
                        style={{ marginLeft: "5px" }}
                      >
                        Submit Record
                      </button> */}
                    </div>
                  </div>
                  <DisplayProduct />
                </div>
              </div>

              <div className="col-lg-3">
                <div className="invoice p-3 mb-3">
                  {/* title row */}
                  {/* /.row */}

                  {/* /.row */}
                  {/* this row will not appear when printing */}
                  <div className="row no-print">
                    <div className="col-5">
                      <ReactToPrint
                        trigger={() => (
                          <button
                            type="print"
                            rel="noopener"
                            target="_blank"
                            className="btn btn-default"
                          >
                            <i className="fas fa-print" /> Print
                          </button>
                        )}
                        content={() => componentToken}
                      />
                    </div>
                  </div>
                  <DisplayTokenPrint />
                </div>
              </div>

              {/*end col-md-4*/}
            </div>{" "}
            {/*end main row*/}
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderForm;
