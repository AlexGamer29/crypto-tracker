import React from 'react'
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container'
import { Typography } from '@mui/material';
import Carousel from './Carousel/Carousel';
import logo  from '../../assets/img/background4.png';




const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: `url(${logo})`,
        backgroundSize: "cover",
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagLine: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    },
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
    },
}));
const Banner = () => {

    const classes = useStyles();
    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagLine}>
                    <Typography
                        variant="h2"
                        style={{
                            fontWeight: "bold",
                            marginBottom: "0.5rem",
                            fontFamily: "Montserrat",
                        }}>
                        Crypto Tracker
                    </Typography>

                    <Typography
                        variant="subtitle"
                        style={{
                            color: "darkgrey",
                            textTransform: "capitalize",
                            fontFamily: "Montserrat",
                        }}>
                        Be the first to know about the latest crypto news, prices, and more.
                    </Typography>
                </div> 
                <Carousel className={classes.carousel}/>
            </Container>
        </div>
    )
}

export default Banner