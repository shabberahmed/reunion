// import './tailwind.css'
import React, { useState, useEffect } from "react";
import data from "../Data.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "./Loading";
const Display = () => {
  const [originalData] = useState(data); 
  const [filteredData, setFilteredData] = useState(originalData); 
  const [searchFilter, setSearchFilter] = useState("");
  const[typeFilter,setTypeFilter]=useState('')
  const[typeFilter1,setTypeFilter1]=useState('')

  const [priceFilter, setPriceFilter] = useState("select");
  const[calender,setCalender]=useState(new Date())

console.log(calender,'state var')
  useEffect(() => {

    const type=originalData.filter((val)=>val.propertytype.includes(typeFilter))
    const type1=type.filter((val)=>val.location.includes(typeFilter1))
    const searchResult = type1.filter((val) =>
    ( val.propertyname.toLowerCase().includes(searchFilter.toLowerCase())) ||
    ( val.location.toLowerCase().includes(searchFilter.toLowerCase())) ||
    (val.propertytype.toLowerCase().includes(searchFilter.toLowerCase()))
  );
  

    const priceRange = priceFilter.split("-");
    const minPrice = parseInt(priceRange[0]);
    const maxPrice = parseInt(priceRange[1]);


    const priceResult =
      priceFilter === "select"
        ? searchResult
        : maxPrice<2000?searchResult.filter(
            (property) => (property.price >= minPrice && property.price <= maxPrice)
          ):searchResult.filter((property)=>property.price>2000)

    setFilteredData(priceResult);
  }, [searchFilter, priceFilter, originalData,typeFilter,typeFilter1]);

const cal = (e) => {
    setCalender(e.target.value)
   
    const selectedDate = new Date(e.target.value); 

    const nowDate = new Date();
    console.log(nowDate, "now date");
    nowDate.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < nowDate) {
        toast.error('please select a valid data')
    } else {
        toast.success(`you have ${( selectedDate-nowDate)/86400000} days left`)
    }
}
  return (
    <>
{
    (originalData)?

   (
    <div>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

<ToastContainer />
<div className="control">
      <input
    
            className="input is-focused w-75 mt-3"
          type="search"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder=" search by property name,location,type"
        />
      </div>
{/* next */}
     
      <div className=" mt-5 row  ">
        <div className="col-md-3 mt-3">
        
          <div className="control">
        <input 
       
        className="input is-focused" onChange={cal} type="datetime-local" name="" value={calender}/>
            {/* <input className="input is-focused" type="date" name="" value='2/08/2023'/> */}
          </div>
        </div>
  <div className="col-md-3  mt-3"> 
  <div className="select is-normal">
   <select onChange={(e)=>setTypeFilter(e.target.value)}>
    <option value="">Property Type</option>
  <option value="apartment">apartment</option>
  <option value="villa">villa</option>
  <option value="House">House</option>

</select>
   </div>
  </div>
   {/* here */}
  <div className="col-md-3  mt-3">
  <div className="select is-normal">
    <select   onChange={(e)=>setTypeFilter1(e.target.value)}>
        <option value="">selecte location</option>
       {
        [...new Set(originalData.map(val => val.location))].map((location) => (
            <option key={location} value={location}>
                {location}
            </option>
        ))
       }
    </select>
</div>
  </div>
      <div className="col-md-3  mt-3">
      <div className="select is-normal">
       <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="select">$price</option>
          <option value="1000-1200">1000-1200</option>
          <option value="1200-1500">1200-1500</option>
          <option value="1500-1700">1500-1700</option>
          <option value="1700-1999">1700-1999</option>
          <option value="0-2000">above 2000</option>

        </select>
       </div>
      </div>
      </div>
      {/* for rows */}
      <div className="row mt-5 ">
        {
            filteredData.length>0?(
                filteredData.map((val) => (
                    <div className="col-md-4 mt-3 d-flex justify-content-center " key={val.propertyname}>
                      <div className="card" style={{ width: "18rem",height:'23rem' }}>
                          <div style={{overflow:'hidden'}}>
                          <img src={val.image} className="card-img-top card1" style={{width:'18rem',height:'15rem'}} alt="..." />
          
                          </div>
                        <div className="card-body ">
                          <h5 className="card-title text-2xl text-gray-800	">{val.propertyname}</h5>
                          <p className="card-text text-lg"><i class="fa-solid fa-location-dot"></i> {val.location}</p>
                          <p className="card-text text-xl font-sans text-orange-500	">{val.price}<i class="fa-regular fa-dollar-sign"></i><span className="text-primary">/month</span></p>
                          <p className="card-text"><i class="fa-solid fa-house"></i> {val.propertytype}</p>
                          <div className="d-flex justify-content-around">
                          <a href="/" className="text-dark" >
                          <i class="fa-solid fa-bed fa-beat-fade text-sky-950"></i> {val.beds}
                          </a>
                          <a href="/" className="text-dark"> <i class="fa-solid fa-bath text-sky-900"></i>{val.bathroom}</a>
                          <a href="/" className="text-dark"><i class="fa-solid fa-building text-stone-950"></i>{val.area}<sup>2</sup></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
            ):(<h1 className="text-center fs-1 ">no data found</h1>)
        }
      </div>
    </div>)
   :( <div className="text-center align-items-center mt-5">
        <Loading/>
    </div>)
}
    </>
  );
};

export default Display;

