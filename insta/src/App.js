import logo from './logo.svg';
import {useState} from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Field from './Field'
import { updateFormData } from './redux/FormSlice';
import Gallery from './Gallery';
import Pricing from './Pricing';
import NameRegion from './NameRegion';
function App() {
const [value,setValue]=useState();
const dispatch=useDispatch();
  const handleKeyPress=async (event)=>{
    if(event.key==="Enter")
    {
         const response=   await fetch(`http://localhost:3005/api/?link=${value}`);
         const data=await response.json();
         console.log(response.status)
         if(response.status===200)
         {
          dispatch(updateFormData({...data.result}))
         }
    }
  }
  return (
     <div>
      <div className="App">
        <input type="text" placeholder="Enter text here" style={{width:"70%",height:"50px"}} value={value} onKeyDown={handleKeyPress} onChange={(event)=>setValue(event.target.value)}/>
      </div>
      <Field/>
      <Gallery/>
      <Pricing/>
      <NameRegion/>
      </div>
  
  ) ;
}

export default App;
