import './App.css';
import Navbar from './components/Navbar';
import { useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import NoPage from './components/NoPage';
import Users from './components/Users';
import Advertisements from './toSell/Advertisements';
import AdvertisementForm from './components/AdvertisementForm';
import { Context } from './context/Context';
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import Profile from "./components/Profile";
import MyFavorites from './components/MyFavorites';
import CardDetails from './components/CardDetails';

function App() {

  
  const [initialAdvertisements, setInitialAdvertisements] = useState([]);

  const [advertisements, setAdvertisements] = useState([]);

  const [user, setUser] = useState([]);

  const [favorites,setFavorites] = useState();

  
  useEffect(() => {
    let loggedUser;
    fetch("http://localhost:3001/currentUser")
    .then(response=>response.json())
    .then(data=> {
      if(data){
        // console.log(data)
        setUser(data[0])
        loggedUser = data[0];
      }else {
        setUser(null)
      }
    })
    .then(() => {
      fetch("http://localhost:3001/favorites")
      .then(response=>response.json())
      .then(response=> {
        // console.log(response)
        // console.log(user.id)
        const filteredFav= response?.filter((element) => {
          return element.userId===loggedUser.id
        });
        console.log(filteredFav)
        setFavorites(filteredFav);
      });
    });

    fetch("http://localhost:3001/advertisements")
    .then(response=>response.json())
    .then(data=> {
      setAdvertisements(data);
      setInitialAdvertisements(data);
    });
  }, []);

  // console.log(favorites)

  return (
    <>
      <Context.Provider value={{advertisements, setAdvertisements, initialAdvertisements, setInitialAdvertisements, user, setUser, favorites, setFavorites}}>
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="advertisements" element={<Advertisements />} />
            <Route path="myFavorites" element={<MyFavorites />} />
            <Route path="users" element={<Users />} />
            <Route path="advertisement-form" element={<AdvertisementForm />} />
            <Route path="/Login" element={<LogIn />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="advertisements/:id" element={<CardDetails/>}/>
            <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;
