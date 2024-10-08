
import { Component } from 'react';
//components
import Button from '@splunk/react-ui/Button';
import Table from '@splunk/react-ui/Table';
import Tooltip from '@splunk/react-ui/Tooltip';
//assets
import TrashCanCross from '@splunk/react-icons/TrashCanCross';

//todo, change primary action to menu button with options to support edit/delete/view via naming convention/props


class ActionTable extends Component {
    
    constructor(props) {
        super(props);        
        
        this.state = {
            data: [],
            columns: [],
            rowKey: null
        };        
    }

    componentDidMount() {        
        this.setState({
            data: 
                [
                    { name: 'Rylan', email: 'Angelita_Weimann42@gmail.com' },
                    { name: 'Amelia', email: 'Dexter.Trantow57@hotmail.com' },
                    { name: 'Estevan', email: 'Aimee7@hotmail.com' },
                    { name: 'Florence', email: 'Jarrod.Bernier13@yahoo.com' },
                    { name: 'Tressa', email: 'Yadira1@hotmail.com' },
                    { name: 'Bernice', email: 'bernice.Gilbert@gmail.com' },
                    { name: 'Adrian', email: 'adrian7456@gmail.com' },
                    { name: 'Ester', email: 'esternyc@gmail.com' },
                    { name: 'Andrew', email: 'andrew.fillmore2@gmail.com' },
                    { name: 'Felix', email: 'felixfelix@hotmail.com' },
                ]
            , columns:
                [
                    { name: 'name', label: 'Name'},
                    { name: 'email', label: 'Email'}
                ]
            , rowKey: 'email'
        });
    }
    
    render() {


        const rowActionPrimaryButton = (
            <Button icon={<TrashCanCross />} appearance="destructive" label="Delete" />
        );        
        console.log(this.state.columns);
        return (
            <Table stripeRows headType="fixed" innerStyle={{ maxHeight: 300 }} actionsColumnWidth={150}>
                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>                    
                </Table.Head>
                <Table.Body>
                    {this.state.data.map((row) => (
                        <Table.Row data={row} key={row[this.state.rowkey]} actionPrimary={rowActionPrimaryButton}>
                            {this.state.columns.map( 
                                (c) => {                                    
                                   return (<Table.Cell key={c.name}>{row[c.name]}</Table.Cell>)
                                }
                            )}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    }
}
 
export default ActionTable;