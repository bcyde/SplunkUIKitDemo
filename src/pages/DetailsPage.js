import { useEffect, useState } from 'react';
import { useParams } from 'react-router';


import Table from '@splunk/react-ui/Table';
import Bar from '@splunk/visualizations/Bar';
import Pie from '@splunk/visualizations/Pie';

import getTheme from '@splunk/themes/getTheme';
import SplunkThemeProvider from '@splunk/themes/SplunkThemeProvider';
const baseTheme = getTheme({family: 'prisma', colorScheme: 'dark', density: 'comfortable' });

const DetailsPage = (props) => {
    
    const  [tournamentList, setTournamentListValue] =  useState([]);
    const  [barColumns, setBarColumnsValue] =  useState({});
    const  [pieColumns, setPieColumnsValue] =  useState({}); //pie columns data
    const  [graphCount, setGraphCountValue] =  useState(0); //meta count total for visualizations    
    const  [tournamentName, setTournamentNameValue] =  useState(''); //tournament title
    const params = useParams();
    
    const calculateAggregateData = (data) => {
        const playerData = {};
        //get total game/match wins by player for some sample visualizations
        data.map( (row) => {
            //initialize player objects if they don't exist
            if (!playerData.hasOwnProperty(row.player_1_name) ) {
                playerData[row.player_1_name] = {games: 0, matches: 0};
            }
            if (!playerData.hasOwnProperty(row.player_2_name) ) {
                playerData[row.player_2_name] = {games: 0, matches: 0};
            }
            //update total game wins for each player
            playerData[row.player_1_name].games += row.player_1_score; 
            playerData[row.player_2_name].games += row.player_2_score; 
            
            //update total match wins for each player
            if (row.player_1_name == row.winner_name) {
                playerData[row.player_1_name].matches ++; 
            } else {
                playerData[row.player_2_name].matches ++; 
            }            
        });
        return playerData;
    }    

    const getMatches = () => {                
        if (props.hasOwnProperty('apiEndpoint') ) {            
            fetch(props.apiEndpoint + 'tournaments/' + parseInt(params.tournament_id) )
                .then((res) => {                                   
                    return res.json();
                })
                .then((data) => {
                    setTournamentListValue(data)
                    const aggregateData = calculateAggregateData(data);
                    const playerNames = Object.keys(aggregateData); 
                    playerNames.sort();
                    const pieValues = []; 
                    const barValues = [];
                    playerNames.map( (currentPlayer) => {
                        pieValues.push(aggregateData[currentPlayer].games);
                        barValues.push(aggregateData[currentPlayer].matches);
                    });

                    setBarColumnsValue([playerNames, barValues]);
                    setPieColumnsValue([playerNames, pieValues]);
                    setGraphCountValue(playerNames.length);
                    if (data.length) {
                        setTournamentNameValue(data[0].tournament_name)
                    }                
                });
        }        
    };

    useEffect(() => {                
        getMatches();      
     }, []);

    return (
        <div style={{color: baseTheme.contentColorDefault}}>
            <h1>Tournament Details: {tournamentName}</h1>
            <SplunkThemeProvider family="prisma" colorScheme="dark" density="comfortable">                
                <h2>Player Game Wins</h2>
                <Bar                    
                    options={{                        
                        height: 400
                    }}           
                    dataSources={{
                        primary: {
                            requestParams: { offset: 0, count: graphCount },
                            data: {
                                fields: [{ name: 'Player'}, { name: 'Game Wins' }],
                                columns: barColumns
                            },
                            meta: { totalCount: graphCount },
                        }
                    }}
                />
                <h2>Player Set Wins</h2>            
                <Pie
                    options={{                        
                        height: 400
                    }}                    
                    dataSources={{
                        primary: {
                            requestParams: { offset: 0, count: graphCount },
                            data: {
                                fields: [{ name: 'Player'}, { name: 'Match Wins' }],
                                columns: pieColumns
                            },
                            meta: { totalCount: graphCount },
                        }
                    }}
                />
                <h2>Tournament Summary</h2>                
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Player 1</Table.HeadCell>
                        <Table.HeadCell>Player 2</Table.HeadCell>
                        <Table.HeadCell>Score</Table.HeadCell>
                        <Table.HeadCell>Winner</Table.HeadCell>                    
                    </Table.Head>
                    <Table.Body>
                        {tournamentList.map((row) => (
                            <Table.Row key={row.id}>
                                <Table.Cell>{row.player_1_name}</Table.Cell>
                                <Table.Cell>{row.player_2_name}</Table.Cell>
                                <Table.Cell>{row.player_1_score} - {row.player_2_score}</Table.Cell>
                                <Table.Cell>{row.winner_name}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>            
            </SplunkThemeProvider>
        </div>
    );
}

export default DetailsPage;