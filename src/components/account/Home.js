import React from "react";
import { Grid } from "@mui/material";
import Banner from "../banner/Banner";
import Posts from "../home/Posts";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import BotpressChat from "../BotpressChat";
import { useLocation ,useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleFabClick = () => {
    // Navigate to the create page
    navigate('/create');
  };
  return (
    <>
      <Banner />
      <Grid style={{ justifyContent: 'center', display: 'flex' }} container>
        <Grid container item xs={12}>
          <Posts />
        </Grid>
      </Grid>

      <Fab color="primary" aria-label="add" style={{ position: "fixed", bottom: 105, right: 51 }}  onClick={handleFabClick}>
        <AddIcon />
      </Fab>

      {location.pathname === '/home' && <BotpressChat />}
    </>
  );
}

export default Home;
