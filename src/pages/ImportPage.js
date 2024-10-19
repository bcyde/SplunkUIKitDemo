import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { TOAST_TYPES } from '@splunk/react-toast-notifications/ToastConstants';

import ControlGroup from '@splunk/react-ui/ControlGroup';
import Text from '@splunk/react-ui/Text';
import Button from '@splunk/react-ui/Button';

import ActionTable from '../components/ActionTable/ActionTable';

import getTheme from '@splunk/themes/getTheme';
import SplunkThemeProvider from '@splunk/themes/SplunkThemeProvider';
const baseTheme = getTheme({family: 'prisma', colorScheme: 'dark', density: 'comfortable' });

function ImportPage(props) {
    const  [tournamentValue, setTournamentValue] =  useState('');
    const  [tournamentList, setTournamentListValue] =  useState([]);
    const navigate = useNavigate();

    const handleTournamentChange = (event) => {
        setTournamentValue(event.target.value);
    };

    const getTournaments = () => {        
        if (props.hasOwnProperty('apiEndpoint') ) {            
            fetch(props.apiEndpoint + 'tournaments')
                .then((res) => {                    
                    return res.json();
                })
                .then((data) => {
                    setTournamentListValue(data)
                });
        }        
    };

    const viewTournament = (event, data) => {
        if (data && data.hasOwnProperty('id') ) {
            navigate('/tournaments/' + parseInt(data.id) );
        }       
    }

    //42006
    const deleteTournament = (event, data) => {        
        if (props.hasOwnProperty('apiEndpoint') && data && data.hasOwnProperty('id') ) {            
            fetch(props.apiEndpoint + `tournaments/${data.id}`, {method: "DELETE"} )
                .then((res) => {                    
                    return res.json();
                })
                .then((data) => {
                    if (data.status == 'Success') {
                        if (props.hasOwnProperty('createToast') ) {
                            const toastProps = {
                                message: `Tournament deleted.`,
                                type: TOAST_TYPES.SUCCESS,        
                            };
                            props.createToast(toastProps);
                        }
                    } else {
                        if (props.hasOwnProperty('createToast') ) {
                            const toastProps = {
                                message: `Unable to delete tournament.`,
                                type: TOAST_TYPES.ERROR,
                            };
                            props.createToast(toastProps);
                        }
                    }                    
                    getTournaments();
                });
        } else {
            console.log('An error occured attempting to delete tournament, either no apiEndpoint set, or no id specified.')
        }
    };

    const actionMenuOptions = [
        { label: 'View', eventHandler: viewTournament},
        { label: 'Delete', eventHandler: deleteTournament}
    ];

    const importTournament = (id) => {
        try {
            const formData = new FormData();
            formData.append('tournament_id', id);
            if (props.hasOwnProperty('apiEndpoint') ) {            
                fetch(props.apiEndpoint + `tournaments`, 
                    {
                        method: "POST",
                        body: formData
                    })
                    .then((res) => {     
                        if (res.status == 200) {
                            return res.json();
                        } else {
                            return null;
                        }                        
                    })
                    .then((data) => {
                        if (data && data.hasOwnProperty('status') && data.status == 'Success') {
                            if (props.hasOwnProperty('createToast') ) {
                                const toastProps = {
                                    message: `Tournament imported successfully.`,
                                    type: TOAST_TYPES.SUCCESS,        
                                };
                                props.createToast(toastProps);
                            }
                        } else {
                            if (props.hasOwnProperty('createToast') ) {
                                const toastProps = {
                                    message: `Unable to import tournament.`,
                                    type: TOAST_TYPES.ERROR,
                                };
                                props.createToast(toastProps);
                            }
                        }                    
                        getTournaments();
                    });
            }
        } catch (error) {
            console.log('An error occurred trying to import tournament', error);
        }
        
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        importTournament(tournamentValue);
    };
    
    useEffect(() => {                
       getTournaments();      
    }, []);

    const columns = [
        { name: 'name', label: 'Tournament Name'},
        { name: 'event_date', label: 'Event Date'}
    ];

    return (
        <div>
            <SplunkThemeProvider family="prisma" colorScheme="dark" density="comfortable">
                <form onSubmit={handleSubmit}>
                    <ControlGroup label="Tournament ID:" labelPosition="top" tooltip="The numerical id of the tournament">
                        <Text value={tournamentValue} onChange={handleTournamentChange} canClear autoFocus name="tournament" />
                        <Button type="submit" label="Import" appearance="primary" />
                    </ControlGroup>
                </form>                             
                <ActionTable data={tournamentList} apiBase="http://192.168.1.78:3000" rowKey="id" columns={columns} actionMenu={actionMenuOptions}/>
            </SplunkThemeProvider >
        </div>
    );
    
}

export default ImportPage;