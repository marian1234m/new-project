import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Context } from '../context/Context';
import { useContext } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';

export default function Advertisement(props) {
  const navigate = useNavigate();

  const { advertisements, setAdvertisements, favorites, setFavorites, user } = useContext(Context);

  const favcard = {
      title: props.title,
      description: props.description,
      price: props.price,
      image: props.image,
      category: props.category,
      id: props.id,
      favorites: props.favorites,
      userId: user.id
  }

  const eraseFav = (e) => {
    e.stopPropagation();
    fetch(`http://localhost:3001/favorites/${props.id}`, {
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(() => {
      // favcard.favorite=false
      if (props.isOriginalGrid) {
        const favorites = [...favcard.favorites];
        // favorites.push(user.id);
        const newFavs = favorites.filter(id => id !== user.id);
        favcard.favorites = newFavs;
      } else {
        // favcard.favorite = false;
        // fetch(`http://localhost:3001/advertisements/${props.id}`,{
        //   headers: {
        //     "Content-Type": "application/json",
        //   }
        // })
        // .then((data) => data.json())
        // .then(())
        const myAdv = advertisements.filter(adv => adv.id === props.id);
        // const myFavorites = [...myAdv.favorites];
        const newFavs = myAdv.favorites?.filter(u => u !== user.id);
        favcard.favorites = newFavs ?? [];
      }
      
      fetch(`http://localhost:3001/advertisements/${props.id}`,{
        method: "PUT", body: JSON.stringify(favcard),
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(() => {
        // sa updatam advertisements cu noul adv cu favorite pe false
        // advertisements.forEach(element => {
        //   if(element.id===props.id) {
        //     element.favorite=false
        //   }
        // });
        
        // advertisements.forEach(element => {
        //   if(element.id===props.id) {
        //     const favorites = [...element.favorites];
        //     const newFavs = favorites.filter(id => id !== user.id);
        //     element.favorites = newFavs;
        //     // element.favorite=true
        //   }
        // });
        // setAdvertisements(advertisements);
        // // sa stergem din favorites adv
        // const myFavorites = favorites.filter(adv => adv.id !== props.id);
        // setFavorites(myFavorites);

        fetch("http://localhost:3001/advertisements")
        .then(response=>response.json())
        .then(data=> {
          // setInitialAdvertisements(data);
          setAdvertisements(data)});

        fetch("http://localhost:3001/favorites")
        .then(response=>response.json())
        .then(data=> {
          const filteredFav= data?.filter((element) => {
            return element.userId===user.id
          });
          setFavorites(filteredFav)
        });  
      })
    });
  }

  const erase = (e) => {   
    e.stopPropagation();
    fetch(`http://localhost:3001/advertisements/${props.id}`, { 
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(() => {
      fetch("http://localhost:3001/advertisements")
        .then(response=>response.json())
        .then(data=> {
          // setInitialAdvertisements(data);
          setAdvertisements(data)});
    });
  };
  const markFavorite = (e) => {
    console.log('fav');
    e.stopPropagation();
    fetch(`http://localhost:3001/favorites`, {
      method: "POST", body: JSON.stringify(favcard),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(() => {
      // favcard.favorite = true;
      if (props.isOriginalGrid) {
        const favorites = [...favcard.favorites];
        favorites.push(user.id);
        favcard.favorites = favorites;
      }
      fetch(`http://localhost:3001/advertisements/${props.id}`,{
        method: "PUT", body: JSON.stringify(favcard),
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(() => {
        // setFavorite(true)
        // sa updatam advertisements cu noul adv cu favorite pe true
        
        // advertisements.forEach(element => {
        //   if(element.id===props.id) {
        //     const favorites = [...element.favorites];
        //     favorites.push(user.id);
        //     element.favorites = favorites;
        //     // element.favorite=true
        //   }
        // });
        // setAdvertisements(advertisements);
        // // sa adaugam in favorites noul adv cu fav pe true
        // const copyObj = [ ...favorites ];
        // copyObj.push(favcard);
        // setFavorites(copyObj);
        fetch("http://localhost:3001/advertisements")
        .then(response=>response.json())
        .then(data=> {
          // setInitialAdvertisements(data);
          setAdvertisements(data)});

          fetch("http://localhost:3001/favorites")
          .then(response=>response.json())
          .then(data=> {
            // setInitialAdvertisements(data);
            const filteredFav= data?.filter((element) => {
              return element.userId===user.id
            });
            setFavorites(filteredFav)
          });  
      })
    })
  }

  return (
    <Card sx={{ maxWidth: 345, maxHeight: 345,height:"100%",Width:"100%"  }} style={{cursor: "pointer"}} onClick={() => {navigate(`/advertisements/${props.id}`, {state:props})}}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <hr></hr>
        <Typography variant="p" color="text.secondary">
          {props.description}   
        </Typography>
        <br></br>
        <Typography variant="p" color="text.secondary">
          {props.price}
        </Typography>    
      </CardContent>
      <CardActions>
        {
          props.favorite ? <FavoriteIcon onClick={eraseFav} style={{color: "red"}}/> :<FavoriteBorderIcon onClick={markFavorite}>Adauga la favorite</FavoriteBorderIcon>
        }
        <Button size="small" onClick={erase} >Sterge-ma</Button>
      </CardActions>
    </Card>
)
}