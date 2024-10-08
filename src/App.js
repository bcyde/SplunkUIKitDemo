import React, { useState, Component } from 'react';


//import page
import { StyledContainer, StyledGreeting } from './global/ThemeStyles';
import ControlGroup from '@splunk/react-ui/ControlGroup';
import Text from '@splunk/react-ui/Text';
import Button from '@splunk/react-ui/Button';

import ActionTable from './components/ActionTable/ActionTable';


import TourneyTree from './components/TourneyTree'


//import layout from '@splunk/react-page';
import SingleValueRadial from '@splunk/visualizations/SingleValueRadial';


import './App.css';

class App extends Component {
  //const [openPanelId, setOpenPanelId] = useState(2);

  constructor(props) {
    super(props) 
    this.state = {
        openPanelId: 3
    };
    
  }

  render() {    

    /**
     * todo:
     * do all layouts in one page,
     * theme
     * custom font
     * route to different pages
     * get form working
     * hook up to data
     * 
     */

    return (
        <div>
            <StyledContainer>
                <ControlGroup label="Tournament ID:" labelPosition="top" tooltip="The numerical id of the tournament">
                    <Text canClear autoFocus name="tournament_id" />
                    <Button label="Import" appearance="primary" />
                </ControlGroup> 
                
            </StyledContainer>        
            <ActionTable />           
            <TourneyTree />
        </div>
    );

    /*
    return(
        <SingleValueRadial
        options={{trendValue: 5, majorValue: 25, minValue: 0, maxValue: 500}}
        dataSources={{
            primary: {
                data: {
                    columns: [
                        ['2000', '123', '46', '23', '51', '115', '63', '88'],
                        [
                            '2018-06-19T00:00:00.000+00:00',
                            '2018-08-20T00:00:00.000+00:00',
                            '2018-08-21T00:00:00.000+00:00',
                            '2018-08-22T00:00:00.000+00:00',
                            '2018-08-23T00:00:00.000+00:00',
                            '2018-08-24T00:00:00.000+00:00',
                            '2018-08-25T00:00:00.000+00:00',
                            '2018-10-26T00:00:00.000+00:00',
                        ],
                    ],
                    fields: [
                        {
                            name: 'foo',
                        },
                        {
                            name: 'stime',
                        },
                    ],
                },
                meta: {},
            },
        }}
    />
    );
    */

  }

}

export default App;
