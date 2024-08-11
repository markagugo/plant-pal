'use client';

import { Box, Container, createTheme, CssBaseline, Fab, Grid, IconButton, ThemeProvider, Typography } from '@mui/material';
import ImgMediaCard from './components/item_card';
import { AccountCircle, Chat } from '@mui/icons-material';
import ChatDialog from './ai';
import { useState } from 'react';
import ChatWidget from './ai';


const products = [
  { name: 'Aloe Vera', price: 12.99, image: 'https://media.istockphoto.com/id/1345935119/photo/aloe-or-aloe-vera-fresh-leaves-and-slices-on-white-background.jpg?s=612x612&w=0&k=20&c=eIDRIhnKA8MaNQ9YZz4y2klBwFCuigIoCMH7vwQjaKg=', description: 'Soothing aloe vera plant.' },
  { name: 'Snake Plant', price: 19.99, image: 'https://media.istockphoto.com/id/1247359811/photo/close-up-of-snake-plants-for-sale.jpg?s=612x612&w=0&k=20&c=brRA3ebqEPedSxm_oOaeGKKtJwfSbUFdGqQRH2UJCXc=', description: 'Low-maintenance air-purifying plant.' },
  { name: 'Peace Lily', price: 15.99, image: 'https://media.istockphoto.com/id/1302923231/photo/blooming-white-flowers-spathiphyllum.jpg?s=612x612&w=0&k=20&c=kj5tEEcX3ri9dEeNXY_Wq9KmaEm6bCn1TZLhwVrfyNQ=', description: 'Beautiful indoor plant with white flowers.' },
  { name: 'Spider Plant', price: 10.99, image: 'https://media.istockphoto.com/id/823655632/photo/chlorophytum-in-flowerpot-on-table-variegatum-comosum-spider-plant.jpg?s=612x612&w=0&k=20&c=rRCnu92SmoVx9AOq5Kpp9n9dfbBxmADlHesSravZbbQ=', description: 'Easy-to-grow plant with arching leaves.' },
  { name: 'Pothos', price: 8.99, image: 'https://media.istockphoto.com/id/1320269359/photo/tropical-epipremnum-aureum-marble-queen-pothos-houseplant-in-flower-pot.jpg?s=612x612&w=0&k=20&c=Rc4J3wkUQgd9vN_O7c7wRnbqCy1UUafqRSYLE2KGv_c=', description: 'Versatile plant for any space.' },
  { name: 'ZZ Plant', price: 18.99, image: 'https://media.istockphoto.com/id/1921983098/photo/houseplant-in-pot-after-replantation.jpg?s=612x612&w=0&k=20&c=rS43Aa-ab-cDchl0T7WPvX3EQPQbjKlxLPedmPM45ng=', description: 'Resilient plant with glossy leaves.' },
  { name: 'Boston Fern', price: 14.99, image: 'https://media.istockphoto.com/id/1359561042/photo/beautiful-potted-boston-ferns-or-green-lady-houseplant-on-floor-by-brick-wall-in-living-room.jpg?s=612x612&w=0&k=20&c=Vm4gXKBfhg2CjfWP375LcT7Te4DRTJTIF5EEtdnEwrU=', description: 'Lush, green plant for a refreshing look.' }
];


function HomePage() {

  const theme = createTheme({
    palette: {
      background: {
        default: '#000000',
      },
    },
  });

  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ position: 'relative', minHeight: '100vh' }}>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          backgroundColor: '#23501C',
          color: 'white',
         zIndex: 1300,
         borderRadius: '8px',
         boxShadow: '0 0 15px 5px rgba(0, 255, 0, 0.7)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Add the logo before the text */}
            <img src="/images/logo.png" alt="Logo" style={{ width: '100px', marginRight: '20px', marginLeft: '180px'}} />
            <Typography variant="h3" sx={{ fontWeight: 'bold', textDecoration:'underline' }}>
          PlantPal
          </Typography>
          </Box>
          <IconButton
            sx={{
              color: 'white',
              fontFamily:'Arial, Helvetica, sans-serif',
              textDecoration:'underline',
            }}
          >
            <AccountCircle />
          </IconButton>
        </Box>
        <Container
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    mt: 10, 
    mb: 10
  }}
>
  <Grid container spacing={2} alignItems="stretch">
    {/* Grid item for the left side image */}
    <Grid item xs={12} sm={4} md={3} lg={3}>
      <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%', marginLeft:-25 }}>
        <img
          src="/images/picture.png"
          alt="Side Image"
          style={{ width: '650px', height: 'auto', borderRadius: '8px' }} 
        />
      </Box>
    </Grid>

    {/* Grid item for the product grid */}
    <Grid item xs={12} sm={8} md={9} lg={8}>
      <Grid container spacing={2} justifyContent="flex-start" alignItems="stretch" marginLeft={15} marginTop={7}>
        {products.map((product) => (
          <Grid item xs={13} sm={8} md={6} lg={3.5} key={product.name}>
            <Box sx={{ height: '100%' }}>
              <ImgMediaCard
                name={product.name}
                price={product.price}
                image={product.image}
                description={product.description}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
</Container>

        

        <ChatWidget />
      </Box>
    </ThemeProvider>
  );
}

export default HomePage;
