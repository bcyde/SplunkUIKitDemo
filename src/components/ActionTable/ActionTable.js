import { useEffect, useState } from 'react';
//components
import Menu from '@splunk/react-ui/Menu';
import Table from '@splunk/react-ui/Table';


const ActionTable = (props) => {
    
    const handleDelete = (event, data) => {
        if (props.hasOwnProperty('apiBase') && props.hasOwnProperty('rowKey') ) {
            console.log(props.apiBase + `/delete/${data[props.rowKey]}`);
        } else {
            console.log('API Base not set cannot process delete request');
        }
    };

    const handleView = (event, data) => {
        if (props.hasOwnProperty('apiBase') && props.hasOwnProperty('rowKey') ) {
            console.log(props.apiBase + `/view/${data[props.rowKey]}`)
        } else {
            console.log('API Base not set cannot process view request');
        }
    }   

    const rowActionSecondaryMenu = (
        <Menu style={{ minWidth: 100 }}>
            {props.actionMenu.map(
                (menuItem) => {
                    return(<Menu.Item onClick={menuItem.eventHandler}>{menuItem.label}</Menu.Item>)
                }
            )};            
        </Menu>
    );
    
    return (
        <Table stripeRows headType="fixed" innerStyle={{ maxHeight: 300 }} actionsColumnWidth={25}>
            <Table.Head>
                {props.columns.map( 
                    (c) => {
                        return (<Table.HeadCell>{c.label}</Table.HeadCell>)
                    }
                )}                  
            </Table.Head>
            <Table.Body>
                {props.data.map((row) => (
                    <Table.Row style={{background: '#ff0000'}} data={row} key={row[props.rowkey]} actionsSecondary={rowActionSecondaryMenu}>
                        {props.columns.map( 
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
 
export default ActionTable;