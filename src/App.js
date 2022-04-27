import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import './App.css';
import { Home, Coin } from './pages';


const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));


function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        {/* <Page containers Header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins/:id" element={<Coin />} />
        </Routes>

        AppJS
      </div>
    </BrowserRouter>
  );
}

export default App;
