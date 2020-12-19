import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const ApiDataFetcher = () => {
    
    const classes = useStyles();
    const [datafetch,isDataFetch] = useState();
    const [data,setData] = useState();
    useEffect(()=>{
        async function fetcher(){
            isDataFetch(true);
            const API_Fetch = await fetch('https://api.covid19api.com/world/total');
            console.log(API_Fetch);
            const dataReceived = await API_Fetch.json();
            console.log(dataReceived);
            setData(dataReceived);
            isDataFetch(false);
        }
        fetcher();        
    },[])
    
    if(datafetch){
        console.log(data); 
        return(
            <div>Loading...</div>
            )
        }
        {const dataForBar = data}
    return (
        
        <div className={classes.root} style={{fontWeight:'bolder'}}>
                       
        </div>
    );
};

export default ApiDataFetcher;