import Column from '@splunk/visualizations/Column';
import Table from '@splunk/react-ui/Table';
import TourneyTree from '../components/TourneyTree';

const DetailsPage = (props) => {
    
    const data = [
        { name: 'Rylan', age: 42, email: 'Angelita_Weimann42@gmail.com' },
        { name: 'Amelia', age: 24, email: 'Dexter.Trantow57@hotmail.com' },
        { name: 'Estevan', age: 56, email: 'Aimee7@hotmail.com' },
        { name: 'Florence', age: 71, email: 'Jarrod.Bernier13@yahoo.com' },
        { name: 'Tressa', age: 38, email: 'Yadira1@hotmail.com' },
    ];

    return (
        <div>
            View Functionality
            <br/>
            Winnner Summary
            <br/>
            Table list users and their record
            <br/>
            Bar
            <Column
                options={{
                    annotationLabel: '> annotation|seriesByIndex(1)',
                    annotationColor: '> annotation|seriesByIndex(2)',
                    annotationX: '> annotation|seriesByIndex(0)',
                }}
                dataSources={{
                    primary: {
                        requestParams: { offset: 0, count: 20 },
                        data: {
                            fields: [{ name: '_time', groupby_rank: '0' }, { name: 'count' }, { name: '_span' }],
                            columns: [
                                [
                                    '2018-05-02T18:10:46.000-07:00',
                                    '2018-05-02T18:11:47.000-07:00',
                                    '2018-05-02T18:12:48.000-07:00',
                                    '2018-05-02T18:13:49.000-07:00',
                                    '2018-05-02T18:15:50.000-07:00',
                                    '2018-05-02T18:17:30.000-07:00',
                                ],
                                ['2', '10', '13', '60', '43', '85'],
                                ['1', '1', '1', '1', '1', '1'],
                            ],
                        },
                        meta: { totalCount: 20 },
                    },
                    annotation: {
                        requestParams: { offset: 0, count: 20 },
                        data: {
                            fields: [
                                { name: '_time', groupby_rank: '0' },
                                { name: 'annotation_label' },
                                { name: 'annotation_color' },
                            ],
                            columns: [
                                [
                                    '2018-05-02T18:11:50.000-07:00',
                                    '2018-05-02T18:13:25.000-07:00',
                                    '2018-05-02T18:14:30.000-07:00',
                                ],
                                ['houston, we have a problem', 'just close the jira', 'looking good now'],
                                ['#f44271', '#f4a941', '#41f49a'],
                            ],
                        },
                        meta: { totalCount: 20 },
                    },
                }}
            />
            <Table>
                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Age</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {data.map((row) => (
                        <Table.Row key={row.email}>
                            <Table.Cell>{row.name}</Table.Cell>
                            <Table.Cell>{row.age}</Table.Cell>
                            <Table.Cell>{row.email}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <TourneyTree />
        </div>
    );
}

export default DetailsPage;