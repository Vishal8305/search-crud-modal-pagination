import React from 'react'
import './Modal.css'

const Modal = (props) => {

  const handlSubmit = (e)=>{
e.preventDefault();
props.update()
  }
  return (
    <div className='modal-container' >
<div className='modal'>
  <form onSubmit={(e)=>handlSubmit(e)}>
  <div className='form-group'>
          <label htmlFor='profile'> Profile </label>
       <input type='text' value={props.url} onChange={(e)=>props.setUrl(e.target.value)} />
      </div>
      <div className='form-group'>
          <label htmlFor='name'> Name </label>
       <input type='text' value={props.name} onChange={(e)=>props.setName(e.target.value)} />
      </div>
      <div className='form-group'>
          <label htmlFor='email'> Email </label>
       <input type='text' value={props.email} onChange={(e)=>props.setEmail(e.target.value)}/>
      </div>
      <div className='form-group'>
          <label htmlFor='email'> City </label>
       <input type='text' value={props.city} onChange={(e)=>props.setCity(e.target.value)}/>
      </div>
      
      
      <div className='btn-group'>
      <button type='submit' className='btn'  style={{background:"green"}}>Update</button>
      <button className='btn' onClick={()=>props.function()}>Cancle</button>
      </div>
  </form>
</div>
</div>
  )
}

 export default Modal
