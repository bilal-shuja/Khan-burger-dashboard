import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Card, Input } from 'semantic-ui-react'

const App = () => {
  ////////PASTE THIS IN THE TOP OF THE COMPONENT////////
  const useKeyPress = function(targetKey) {
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
  ////////////ADD THESE HOOKS IN YOUR HOOKS SECTION////////
  const [selected, setSelected] = useState(undefined);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);
  const [APIData, setAPIData] = useState([])
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
const [hidden , setHidden] = useState(2)


////////CODE FO SEARCHING ITEMS FROM ITEM TABLE/////////////////
const fetchOrder = () => {
  axios.get("https://api.khannburger.com/list.php").then((res) => {
    setAPIData(res.data);
    // console.log(res.data); 
  
  })
    .catch((error) => {
      console.log(error);
    });
    
};
useEffect(() => {
  fetchOrder();
}, []);
const searchItems = (searchValue) => {
  setSearchInput(searchValue)
  if (searchInput !== '') {
      const filteredData = APIData.filter((item) => {
          return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
  }
  else{
      setFilteredResults(APIData)
  }
}
//////////////////////////////////////////////////
  const ListItem = ({ item, active, setSelected, setHovered ,color}) => (
    <div
      className={`item ${active ? "active" : ""}`}
    
      onClick={() => {
        setHidden(1)
        setSearchInput('')
        setSelected(item)
      }}
      onMouseEnter={() => {
       
        setHovered(item)}}
      onMouseLeave={() => setHovered(undefined)}
    >
      <p style={{color:active ?"blue": 'black',fontWeight:active ? 'bold':'normal'}}>{item.itemName}</p>
      {item.itemID}
    </div>
  );
  useEffect(() => {

    if(searchInput.length > 1 ){
    if (filteredResults.length && downPress) {
      setCursor(prevState =>
        prevState < filteredResults.length - 1 ? (
          
          prevState + 1
           ): prevState
      );
    }

  }
  else{
    if (APIData.length && downPress) {
      setCursor(prevState =>
        prevState < APIData.length - 1 ? (
          
          prevState + 1
           ): prevState
      );
    }

  }
  }, [downPress]);

  useEffect(() => {
    if(searchInput.length > 1 ){

    if (filteredResults.length && upPress) {
      setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }
  }
  else{
    if (APIData.length && upPress) {
      setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }

  }
  }, [upPress]);

  useEffect(() => {
    if(searchInput.length > 1 ){

  
    if (filteredResults.length && enterPress) {
      setSelected(filteredResults[cursor]);
      setHidden(1)
      setSearchInput('')
    }
    }
  else{
    if (APIData.length && enterPress) {
      setHidden(1)
      setSearchInput('')

      setSelected(APIData[cursor]);
    }
  }
  
  }, [cursor, enterPress]);

  useEffect(() => {
    if(searchInput.length > 1 ){

    if (filteredResults.length && hovered) {
      setCursor(filteredResults.indexOf(hovered));
    }}
    else{
      if (APIData.length && hovered) {
        setCursor(APIData.indexOf(hovered));
      }
    }
    
  }, [hovered]);

  return (
    <div>
      <p>
        <small>
          Use up down keys and hit enter to select, or use the mouse
        </small>
      </p>
      <span>Selected: {selected ? selected.itemID : "none"}</span>
      <Input icon='search'
                placeholder='Search...'
                value = {searchInput}
                onChange={(e) => searchItems(e.target.value)}
                
                onClick={() =>{
                  
                     setHidden(2)
                 
                }}
            />

{hidden > 1 ? 
  filteredResults.map((item,i) => {
    return(
    <ListItem
    key={item.itemID}
    active={i === cursor}
    item={item}
    setSelected={setSelected}
    setHovered={setHovered}
  />
    )
  })
 : 
null

}

    </div>
  );
};
export default App;


      

               