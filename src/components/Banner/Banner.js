import React from 'react'
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container'


const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: "url('https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?cs=srgb&dl=pexels-adrien-olichon-2387793.jpg&fm=jpg')",
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    }
}));
const Banner = () => {

    const classes = useStyles();
    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>

            </Container>
        </div>
    )
}

export default Banner