import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import { Context } from '../context/Context';
import { useNavigate } from "react-router-dom";


export default function AdvertisementForm() {

  const { setAdvertisements } = useContext(Context);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  
  const form = {
    title:title,
    description:description,
    price:price,
    image:image,
    category:category,
    favorites: []
  }

  const [categories, setCategories] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/categories")
    .then(response=>response.json())
    .then(data=> {setCategories(data)});
  }, [])


  const checkPrice = () =>{
    // if(((price[0] == 0) && (price.length>1)) || (price[0] =="-")){
    //   return false;
    // } else {
    //   return true
    // }
    return !(((price[0] == 0) && (price.length>1)) || (price[0] =="-"));
  }

  const validator = () => {
    // if(category && price && checkPrice() && description && title && image){
    //   return true;
    // } else {
    //   return false;
    // }
    return category && price && checkPrice() && description && title && image;
  }

  const clear = () => {
    setTitle("")
    setDescription("")
    setPrice("")
    setImage("")
    setCategory("")
  };

  const save = () =>{
    setIsSaving(true);
    fetch("http://localhost:3001/advertisements", {
      method:"POST", body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(() => {
      fetch("http://localhost:3001/advertisements")
        .then(response=>response.json())
        .then(data=> {
          // setInitialAdvertisements(data);
          setAdvertisements(data)})
          .then(() => {
            setIsSaving(false);
            navigate("/advertisements")
          })
          .catch(() => setIsSaving(false));
    })
    .catch(() => setIsSaving(false));
    
    clear();

  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{display:"flex", flexDirection:"column"}}>
        <TextField value={title} id="title" label="Title" type="text" onChange={(e)=>setTitle(e.target.value)} />
        <FormControl sx={{ m: 1, width: "215.625px" }}>
          <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={category}
            onChange={handleChange}
            // autoWidth
            label="Category"
          >
            {categories.map(element => <MenuItem value={element.name}>{element.name}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField value={description} id="description" label="description" type="text" onChange={(e)=>{setDescription(e.target.value)}}/>
        <TextField value={price} id="price" label="price" type="number" onChange={(e)=>{setPrice(e.target.value)}}/>
        {!checkPrice() && <p style={{ color:'red' }}>price is invalid</p>}
        <TextField value={image} id="image" label="image" type="text" onChange={(e)=>{setImage(e.target.value)}}/>
        <Button disabled={!validator()} onClick={()=>{save()}} style={{width:"100px", marginLeft:"20px"}} variant="contained" endIcon={<SendIcon />}>
        Send
      </Button >
      </div>
      {isSaving && <CircularProgress />}
    </Box>
  );
}