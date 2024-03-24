import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Advertisement from './Advertisement';
import { Context } from '../context/Context';
import { useContext } from 'react';

export default function ResponsiveGrid(props) {
    
    const { advertisements, user } = useContext(Context);

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {advertisements.map(adv => {
                const ids = adv?.favorites?.filter(el => el === user.id)
                let isFavorite = false;
                if (ids && ids.length === 1) {
                    isFavorite = true;
                }
                return (
                    <Grid item xs={2} sm={4} md={4} key={adv.id}>
                        <Advertisement title={adv.title} description={adv.description} price={adv.price} image={adv.image} id={adv.id} favorite={isFavorite} favorites={adv.favorites} isOriginalGrid={true}/> 
                    </Grid>
                )
            })}
        </Grid>
        </Box>
    </>
    )
}