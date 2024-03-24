import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';


export default function LogIn() {
    const [id, setId] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [users, setUsers] = useState();
    const { user, setUser } = useContext(Context);
    
    const saveUser = (id) =>{
      userValue.id = id;
      console.log(userValue)
      fetch("http://localhost:3001/currentUser", {
        method:"POST", body: JSON.stringify(userValue),
        headers: {
          "Content-Type": "application/json",
        }
      })
    };
  
    useEffect(() => {
      fetch("http://localhost:3001/users")
      .then(response=>response.json())
      .then(data=> {setUsers(data)});
    }, []);

    const validateUserAndLogin = () => {
      const compare = users.filter((element)=> {
          return(element.username === userValue.username && element.password === userValue.password)
      });
      if(compare.length === 1 && ((user && user.length === 0) || !user)) {
        navigate("/Profile");
        saveUser(compare[0].id);
      }else{
        alert("incorrect user");
      }
    }
    const userValue = {
      username: username,
      password: password,
    }
    const navigate = useNavigate();
    return (
        !user ? <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div style={{display:"flex", flexDirection:"column"}}>
            <TextField value= {username} id="username" label="Username" type="text" onChange={(e)=>setUsername(e.target.value)}/>
            <TextField value= {password} id="password" label="Password" type="password" onChange={(e)=>setPassword(e.target.value)}/>

            <FormControl sx={{ m: 1, width: "215.625px" }}>
            </FormControl>
            <Button onClick={()=>{validateUserAndLogin()}} style={{width:"100px", marginLeft:"20px"}} variant="contained" endIcon={<SendIcon />}>
            Log In
          </Button >
          </div>
        </Box> : <p>You are alredy logged in</p>
      );
}
