import React, { useEffect, useState } from "react";
import "./field.css";
import  Button  from "@mui/material/Button";
import {useDispatch,useSelector} from 'react-redux'
import { getCategory } from "./Data.js";
import { updateFormData } from "./redux/FormSlice.js";
const Field = () => {
const dispatch=useDispatch();
  const [categories, setCategories] = useState(new Set());
   const {formData}=useSelector(state=>state.form)
 
  const handler = (index) => {
    const s = new Set(categories);
    if (s.has(index)) {
      s.delete(index);
    } else {
      s.add(index);
    }
    setCategories(s);
    dispatch(updateFormData({ field: Array.from(categories) }));
  };

  useEffect(()=>
  {
    dispatch(updateFormData({ field: Array.from(categories) }));

  },[categories])

  return (
    <div className="containery">
      <p>Select categories that match with your content.</p>
      <div className="button-container">
        {getCategory(-1).map((value, index) => (
          <Button
            key={index}
            sx={{ m: 0.5 }}
            onClick={() => handler(index)}
            variant={categories.has(index) ? "contained" : "outlined"}
            style={{textTransform:'capitalize'}}
          >
            {value}
          </Button>
        ))}
      </div>
    
    </div>
  );
};

export default Field;
