import React from "react"
import { Grid } from '@mui/material';

import Banner from '../banner/Banner';

import GenrePost from "../home/GenrePosts";

// import Explore from "../explore/Explore";

// import { Explore } from "@mui/icons-material";


function Motivation (){

      return (
        <>
          <Banner />
           <Grid style={{justifyContent:'center',display: 'flex'}}container>
                <Grid container item xs={12} >
                    <GenrePost genre={'Food Blog'}/>
                </Grid>
            </Grid>
        </>
      );
    }

export default Motivation

