import React from 'react'
import './PopImage.css'

const PopImage = ({setFile, file}) => {
  return (
    <div className='container' style={{display: file? 'block': 'none'}}>
     <div className='popup-image'>
        <span onClick={()=>setFile(null)}>&times;</span>
        <img src={file} alt='' />
      </div>
</div>
  )
}

export default PopImage
