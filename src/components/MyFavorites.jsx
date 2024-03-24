import * as React from 'react';
import {  useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Advertisement from '../toSell/Advertisement';
import { useContext} from 'react';
import { Context } from '../context/Context';

const MyFavorites= () => {
    const {user, favorites, setFavorites} = useContext(Context);
    useEffect(() => {
        fetch("http://localhost:3001/favorites")
        .then(response=>response.json())
        .then(data=> {
          // setInitialAdvertisements(data);
            const filteredFav= data?.filter((element) => {
                return element.userId===user.id
            });
            setFavorites(filteredFav)
        });
    }, []);

    return (
        favorites ? <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {favorites.map(adv => {
                return (
                    <Grid item xs={2} sm={4} md={4}>
                        <Advertisement title={adv.title} description={adv.description} price={adv.price} image={adv.image} id={adv.id} favorite={true} isOriginalGrid={false} /> 
                    </Grid>
                )
            })}
        </Grid>
        </Box> : <p>You don't have any favorited advertisements yet</p>
    )
    
}

export default MyFavorites;