import React,{useState} from "react";
import "./Search.css";
import Logo from '../assets/logo.jpg'

const Search = ( props)   => {
  const [query, setQuery] = useState('')
  
  const handlsearch = () => {
    if(query.length > 0){
   const searchData = props.sortedData.filter((item)=> item.name.toLowerCase().includes(query.toLowerCase())
    );
    props.setSortedData(searchData)
  }else if(query === ''){
    props.setSortedData(props.dataFilter)
  }
  setQuery()
  }
  
  const handlepress = (event)=>{
    if(event.key === "Enter"){
      handlsearch();
    }
  }

  return (
    <>
      <div className="nav">
        <img src={Logo} alt="logo" />
        <div className="searchbox">
            <input type="text" placeholder="search..."  onChange={(e)=>setQuery(e.target.value)} onKeyUp={handlepress}/>
            <button className="search-icon"><i className="fa fa-search" aria-hidden="true"></i></button>
      </div>
      </div>

    </>
  );
};

export default Search;
