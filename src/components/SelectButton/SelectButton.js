import { Button } from '@mui/material';
import { styled } from '@mui/system';

const SelectButton = ({ children, selected, onClick }) => {

    const MyButton = styled(Button)({
        border: "1px solid gold",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "white",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
            backgroundColor: "gold",
            color: "black",
        },
        width: "22%",
            //   margin: 5,
    })


    return (
        // <span onClick={onClick} className={classes.selectbutton}>
        //     {children}
        // </span>

        <MyButton onClick={onClick}>
            {children}
        </MyButton>
    );
};

export default SelectButton;