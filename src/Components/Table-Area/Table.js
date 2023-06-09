import React, {useEffect, useRef, useState } from 'react'
//import './Table.css'
import Modal from '../Modal/Modal'
import Search from '../SearchBar/Search'
import Pagination from '../Pagination/Pagination'
import PopImage from '../Image-PopUp/PopImage'
import Delete from '../Delete-Popup/Delete'
//import axios from 'axios'

//let API2 = 'https://fakestoreapi.com/products'
let API = 'http://localhost:4000/users'

const Table = () => {
const [name,setName] = useState('')
const [email,setEmail] = useState('')
const [city,setCity] = useState('')
const [url,setUrl] = useState('')
const [gender,setGender] = useState('')
const [userId,setUserId] = useState(null)

const [sortedData,setSortedData] = useState([])
const [sortDirection, setSortDirection] = useState('asc');

const [modalOpen,setModalOpen] = useState(false)
const [file , setFile] = useState(null)
const [userData, setUserData] = useState([])
const [filterData, setFilterData] = useState([])
const [currentPage, setCurrentPage] = useState(1)

const [dailogue,setDailogue] = useState(false)


const idUserDataRef = useRef();
const handleDialog = (message, isLoading) => {
  setDailogue({
    message,
    isLoading,
  })
}
  

//**** Get API Data */ 
useEffect(() => {
  getUserdata();
}, []);
const getUserdata = async () => {
  const reqData = await fetch(API);
  const resData = await reqData.json();
  setUserData(resData);
  setFilterData(resData);
  setSortedData(resData)
  setUserId(resData[0].id)
  setName(resData[0].name)
  setEmail(resData[0].email)
  setCity(resData[0].city)
  setUrl(resData[0].url)
  setGender(resData[0].gender)
  
}
//**** Delete Data */
const handlDelete = (id) => {
  handleDialog("Are You Sure You Want To Delete ?",true)
idUserDataRef.current = id
}
// delete logic
const areUSureDelete = (choose) => {
  if(choose){
    fetch(`http://localhost:4000/users/${idUserDataRef.current}`,{
      method: 'DELETE'
    }).then((result)=>{
         result.json().then((resp)=>{
           console.log(resp)
           getUserdata();
           handleDialog("",false)
         })
    })
  }else{
    handleDialog("",false)
  }
}

// Close Modal
const modalClose = () =>{
    return setModalOpen(false)
}
  
const selectEmploye = (item) => { 
  setUserId(item.id)
  setUrl(item.url)
  setName(item.name)
  setCity(item.city)
  setEmail(item.email)
  setGender(item.gender)
  setModalOpen(true)
  }

//**** update employe function ****/
function updateEmploye(){
  let item={name,city,email,gender,url}
  fetch(`http://localhost:4000/users/${userId}`,{
    method: 'PUT',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body:JSON.stringify(item)
  }).then((result)=>{
 result.json().then((res)=>{
  console.log(res)
   getUserdata();
 })
 setModalOpen(false)
  })
}


// **** Handle Pagination  */
const itemsPerPage = 5;
const pageNumbersToShow = 2;
const PrevDisable = currentPage === 1;
const endIndex = currentPage * itemsPerPage;
const startIndex = endIndex -  itemsPerPage;
const itemsToDisplay = sortedData.slice(startIndex,endIndex)
const npages = Math.ceil(sortedData.length / itemsPerPage)
const nextDisable = currentPage === npages;
const numbers = [...Array(npages + 1).keys()].slice(1)

const [showN, setShowN] = useState(true)
const [showP, setShowP] = useState(false)

// current pages function
const handlePageChange = (id) => {
     setCurrentPage(id)
     if(currentPage === npages-1){
      setShowN(false)
     }if(currentPage === 1){
 setShowP(false)
     }
}

// handle Next Click
const handleNextClick = () => {
   if(currentPage !== npages){
    setCurrentPage(currentPage + 1)
   }
   if(currentPage === npages-1){
setShowN(false)
   }
   setShowP(true)
  }

// handle Prev Click
  const handlePrevClick = () => {
    if(currentPage > 1){
setCurrentPage(currentPage - 1)
    }
    setShowN(true);
    if(currentPage ===2 ){
      setShowP(false)
    }
  }
const getPageNumbers = () => {
  if (currentPage === npages){
    return [currentPage - 1, currentPage];
  }else if(currentPage === 1){
    return [currentPage, currentPage + 1];
  }else{
    return [currentPage - 1, currentPage, ];
  }
}
const setPageNumbers = () => {
  const halfPageNumbers = Math.floor(pageNumbersToShow / 2);
  let startPage = Math.max(1, currentPage - halfPageNumbers);
  const endPage = Math.min(npages, startPage + pageNumbersToShow - 1);

  if (endPage - startPage + 1 < pageNumbersToShow) {
    startPage = Math.max(1, endPage - pageNumbersToShow + 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
}

// const sortByName = () => {
//   if(sorted) {
//     setUserData((prevData) => prevData.sort((a,b)=> a.id - b.id));
//   }else{
//     setUserData((prevData)=> [...prevData].sort((a,b)=> a.name.localeCompare(b.name)))
//   }
//   setSorted((prevSorted)=> !prevSorted);
// }

const handleSort = () => {
  const direction = sortDirection === 'asc' ? 'desc' : 'asc';
   const sorted = [...sortedData].sort((a, b) =>
    sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );
  setSortedData(sorted);
  setSortDirection(direction);
};





// const sortByName = () => {
//   if(sorted) {
//     setUserData((prevData) => prevData.sort((a,b)=> a.name.localeCompare(b.name)));
//   }else{
//     setUserData((prevData)=> [...prevData].sort((a,b)=> b.name.localeCompare(a.name)))
//   }
//   setSorted((prevSorted)=> !prevSorted);
// }


  return (
    <>
    {/* Search Component */}
    <Search data={userData} updateData={setUserData} dataFilter={filterData} setFilterData={setFilterData} sortedData={sortedData} setSortedData={setSortedData}/>

    {/* Table Component */}
    <div className='heading'>
     <h1>Employee Details</h1>
    </div>
      <section className='table-section'>
          <table className='table'>
            <thead className='thead-light'>
                <tr >
                    <th scope='col'>Sr No.</th>
                    <th scope='col'>Profile</th>
                    <th scope='col' style={{cursor:"pointer"}}>Name<button onClick={handleSort}><i className="fa fa-sort" ></i></button> </th>
                    <th scope='col'>Email ID</th>
                    <th scope='col'>City </th>
                    <th scope='col'>ACTION</th>
                </tr>
            </thead>
            <tbody>
               {
                itemsToDisplay.map((item,ind)=>{
                  return(
                    <tr  key={ind} >
                    <td data-title='Sr No.' >{startIndex + ind + 1}</td>
                    <td data-title='Profile'  onClick={()=>setFile(item.url)} key={ind}><img src={item.url} alt='Profile'/></td>
                    <td data-title='Name'>{item.name}</td>
                    <td data-title='Email'>{item.email}</td>
                    <td data-title='City'>{item.city}</td>
                    <td data-title='ACTION' >
                    <button onClick={()=>selectEmploye(item)}><i className='fa fa-pencil btn-edit' ></i></button>
                    <button onClick={()=>handlDelete(item.id)}><i className='fa fa-trash btn-delete' ></i></button>
                    </td>
                </tr>
                  )
                })
               }       
            </tbody>
          </table>
      </section>


      {/* Pagination Component */}
      <Pagination nextClick={handleNextClick}  prevClick={handlePrevClick} disablePrev={PrevDisable} disableNext={nextDisable} npages={npages} handlePageChange= 
      {handlePageChange} currentPage={currentPage} number={numbers} noOfPages={npages} showN={showN} showP={showP} setCurrentPage={setCurrentPage} getPageNumbers={getPageNumbers} setPageNumbers={setPageNumbers} itemsToDisplay={itemsToDisplay} sortedData={sortedData} itemsPerPage={itemsPerPage}/>


      {/* Modal Component */}
      {
        modalOpen && <Modal function={modalClose}  
            name={name} setName={setName} setEmail={setEmail} setCity={setCity}
            city={city} email={email} update={updateEmploye} url={url} gender={gender} setUrl={setUrl} setGender={setGender} userData={userData} setUserData={setUserData} 
        />
      }

       
       {/* Delete Dailog Box */}
      {
        dailogue.isLoading && <Delete message={dailogue.message} onDialog={areUSureDelete}/>
      }
    {/* Image-PopUp Component */}
    <PopImage setFile={setFile} file={file}/>

    </>
  )
}

export default Table
