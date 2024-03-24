import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState, useContext } from 'react';
import { Context } from '../context/Context';

export default function Categories(props) {

  const { setAdvertisements, initialAdvertisements } = useContext(Context);
  
  useEffect(() => {
      fetch("http://localhost:3001/categories")
      .then(response=>response.json())
      .then(data=> {setCategories(data)});
    }, []);
    
  const [categories, setCategories] = useState([]);

  const filterAds = (category) => {
    // console.log(category);
    const arr = initialAdvertisements.filter((element) => {
      if (element.category && category) { // Verificăm dacă ambele valori sunt definite
        return element.category.toLowerCase() === category.toLowerCase();
      }
      return false; // În cazul în care cel puțin una dintre valorile este indefinită, returnăm false pentru a nu păstra acest element în filtrare
    });
    console.log(arr)
    setAdvertisements(arr);
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 300,
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "transparent", // setăm culoarea de fundal a chenarului exterior transparentă
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" style={{ backgroundColor: `white`,fontSize: '1.5rem', textAlign: 'center' }}>
          Categories
        </ListSubheader>
      }
    >
      {/* <ListItemButton onClick={() => setAdvertisements(initialAdvertisements)}>
        <ListItemText primary="All Advertisements"/>
      </ListItemButton>
      Buton pentru fiecare categorie */}
      <ListItemButton onClick={() => filterAds("All")}>
        <ListItemText primary="All" />
      </ListItemButton>
      {categories.map((category, index) => (
        <ListItemButton key={category.id} onClick={() => filterAds(category.name)}>
          <ListItemText primary={category.name} />
        </ListItemButton>
      ))}
    </List>
  );
}
