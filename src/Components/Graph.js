import React from 'react';
import {Bar, Doughnut} from 'react-chartjs-2';


  const Graph = (receivedData,forWhich) => {
    
      console.log("Int: ",parseInt(receivedData.forWhich));
      if(receivedData.receivedData){

      var TotalConfirmed = receivedData.forWhich === 'Global' ? receivedData.receivedData && receivedData.receivedData['Global']['TotalConfirmed'] : receivedData.receivedData && receivedData.receivedData['Countries'][parseInt(receivedData.forWhich)]['TotalConfirmed'];
      var TotalActive = receivedData.forWhich === 'Global' ? (receivedData.receivedData['Global']['TotalConfirmed'] - (receivedData.receivedData['Global']['TotalRecovered'] + receivedData.receivedData['Global']['TotalDeaths']))  : (receivedData.receivedData['Countries'][parseInt(receivedData.forWhich)]['TotalConfirmed'] - (receivedData.receivedData['Countries'][parseInt(receivedData.forWhich)]['TotalRecovered'] + receivedData.receivedData['Countries'][parseInt(receivedData.forWhich)]['TotalDeaths']));
      var TotalRecovered = receivedData.forWhich === 'Global' ? receivedData.receivedData['Global']['TotalRecovered'] : receivedData.receivedData['Countries'][parseInt(receivedData.forWhich)]['TotalRecovered'];
      var TotalDeaths = receivedData.forWhich === 'Global' ? receivedData.receivedData['Global']['TotalDeaths'] : receivedData.receivedData['Countries'][parseInt(receivedData.forWhich)]['TotalDeaths'];
      
    }
      const state = {
        labels: ['TotalConfirmed', 'Active', 'Recovered','Casualities'],
        datasets: [
          {
            label: 'Bar Form',
            backgroundColor: ['Cyan','Orange','Green','Red'],
            hoverBackgroundColor: ['Cyan','Orange','Green','Red'],
            
            borderWidth: 2,
            data: [receivedData.receivedData && TotalConfirmed, receivedData.receivedData && TotalActive, receivedData.receivedData && TotalRecovered, receivedData.receivedData && TotalDeaths]
          }, 
        ]
        
    }
    
      if(receivedData.forWhich === 'Global')
      {
        return (
          <div>
            <Doughnut
              data={state}
              options={{
                title:{
                  display:true,
                  text:'Data',
                  fontSize:20
                },
                legend:{
                  display:true,
                  position:'right'
                }
              }}
            />
          </div>
        );
      }
      return (
        <div>
          <Bar
            data={state}
            options={{
              title:{
                display:true,
                text:'Data',
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
        </div>
      );
    }
  
  export default Graph;