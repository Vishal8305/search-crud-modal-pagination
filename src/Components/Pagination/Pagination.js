import React from 'react'
import './Pagination.css'

const Pagination = ({nextClick, disableNext, prevClick,disablePrev,totalPage,handlePageChange,currentPage,number,noOfPages,showN,showP,getPageNumbers,setCurrentPage,setPageNumbers,sortedData,itemsPerPage}) => {

  
  return (
    <div className='pagination'>
     {
      showP &&  <div onClick={()=>prevClick()} disabled={disablePrev}> <i className='fa fa-chevron-left'></i> </div>
     }
      {
       number.slice(currentPage-1,currentPage+1).map((n,ind)=><div key={ind} className={`page-item ${currentPage !== n ? 'active': ''}`} >{n}</div>)
      }
 
 {/* {
  Array(Math.ceil(sortedData.length/itemsPerPage)).fill().map((_, index)=>(
    <div>{index + 1}</div>
  ))
 }
       */}
      {/* <div>{currentPage}</div> */}

      {/* {
        getPageNumbers().map((pageNumber)=>(
          <div onClick={()=> setCurrentPage(pageNumber)}>{pageNumber}</div>
        ))
      } */}

       {/* {
        setPageNumbers().map((pageNumber)=> (
          <div onClick={()=>setCurrentPage(pageNumber)}>{pageNumber}</div>
        ))
       } */}


      {
        showN && <div onClick={()=>nextClick()} disabled={disableNext}><i className='fa fa-chevron-right' ></i> </div>
      }
    </div>
  )
}

export default Pagination
