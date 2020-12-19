import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid, NativeSelect } from '@material-ui/core';
import Graph from './Graph';
import '../App.css';

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
  



const MainGrid = () => {

    const [forWhich,setforWhich] = useState("Global");
    const [fetchedCountries,setCountries] = useState([]);
    const classes = useStyles();
    const [datafetch,isDataFetch] = useState();
    const [data,setData] = useState();

    // var defaultStatus = 'Global';
    
    useEffect(()=>{
        async function fetcher(){
            isDataFetch(true);
            const API_Fetch = await fetch('https://api.covid19api.com/summary');
            console.log(API_Fetch);
            const dataReceived = await API_Fetch.json();
            console.log(dataReceived);
            setData(dataReceived);
            setCountries(dataReceived['Countries'])
            isDataFetch(false);
        }
        fetcher();        
    },[])
    
    
    if(datafetch){
        
        console.log(fetchedCountries);
        console.log(data); 
        
        return(
            <div>Loading...</div>
            )
    }
    var TotalConfirmed = 0;
    var TotalActive = 0;
    var TotalRecovered = 0;
    var TotalDeaths = 0;
    if(data){
        TotalConfirmed = forWhich === 'Global' ? data && data['Global']['TotalConfirmed'] : data && data['Countries'][parseInt(forWhich)]['TotalConfirmed'];
        TotalActive = forWhich === 'Global' ? (data['Global']['TotalConfirmed'] - (data['Global']['TotalRecovered'] + data['Global']['TotalDeaths']))  : (data['Countries'][parseInt(forWhich)]['TotalConfirmed'] - (data['Countries'][parseInt(forWhich)]['TotalRecovered'] + data['Countries'][parseInt(forWhich)]['TotalDeaths']));
        TotalRecovered = forWhich === 'Global' ? data['Global']['TotalRecovered'] : data['Countries'][parseInt(forWhich)]['TotalRecovered'];
        TotalDeaths = forWhich === 'Global' ? data['Global']['TotalDeaths'] : data['Countries'][parseInt(forWhich)]['TotalDeaths'];
        }

    return (
        
        <div className={classes.root} style={{top:'10%',position:'absolute',margin:'1px',width:'100%'}} id='MainGrid'> 
          <Grid container spacing={3}>
              <Grid item xs={4}>
              <Paper className={classes.paper} style={{ top:'2%'}} elevation={5} id='Paper'>
                    <Typography variant="h5" component="h2" >Total Cases</Typography>
                    <br/>

                    <Typography variant="h4" component="h2" style={{color:'black'}}>{data && TotalConfirmed.toLocaleString()}</Typography>
                </Paper>
                <Paper className={classes.paper} style={{marginTop:'10%',height:'100px'}} elevation={5} id='Paper'>
                    <Typography variant="h5" component="h2">Active</Typography>
                    <br/>
                    <Typography variant="h4" component="h2" style={{color:'orange'}}>{data && TotalActive.toLocaleString() }</Typography>
                </Paper>
                <Paper className={classes.paper} style={{marginTop:'10%',height:'100px'}} elevation={5} id='Paper'>
                    <Typography variant="h5" component="h2">Recovered</Typography>
                    <br/>
                    <Typography variant="h4" component="h2" style={{color:'green'}}>{data && TotalRecovered.toLocaleString()}</Typography>
                </Paper>
                <Paper className={classes.paper} style={{marginTop:'10%',height:'100px'}} elevation={5} id='Paper'>
                    <Typography variant="h5" component="h2">Casualities</Typography>
                    <br/>
                    <Typography variant="h4" component="h2" style={{color:'red'}}>{data && TotalDeaths.toLocaleString()}</Typography>
                </Paper>   
              </Grid>
              <Grid item xs={8}>
                  <Paper className={classes.paper} elevation={5} style={{color:'green', fontWeight:'bolder', fontStyle:'bold'}} id='Paper'>
                      <Typography variant="h5" component="h2">Global Data
                      <br/>
                        <NativeSelect defaultValue='Global' onChange={(e)=>{setforWhich(e.target.value)}}>
                            <option value={'Global'}>Global</option>
                            
                            {fetchedCountries.map((i,Country)=> <option key={Country} value={Country}> {i['Country']}</option>)}
                            {/* {fetchedCountries.map((Country,i)=> <option key={i} value={Country}>{Country}</option>)} */}
                        </NativeSelect>
                        
                        <Graph receivedData={data} forWhich={forWhich}/>
                        {console.log(typeof(forWhich))  }
                        
                      </Typography>
                  </Paper>
              </Grid>
            </Grid>
        </div>
    );
};

export default MainGrid;