import React from "react"
import { Grid } from '@mui/material';
import Banner from '../banner/Banner';
import GenrePost from "../home/GenrePosts";
function Game (){

      return (
        <>
          <Banner />
           <Grid style={{justifyContent:'center',display: 'flex'}}container>
                <Grid container item xs={12} >
                    <GenrePost genre={'Gaming Blog'}/>
                </Grid>
            </Grid>
        </>
      );
    }

export default Game

