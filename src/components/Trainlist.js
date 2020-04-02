import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import Button from '@material-ui/core/Button';
import 'react-table/react-table.css';
import moment from 'moment';

export default function Trainlist() {
    const [train, setTrain] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrain(data.content))
    }

    const handleCheck = () => {
        console.log(moment(train[0].date, moment.ISO_8601).format());
        console.log(train[0].date);
    }

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }

    const columns = [
        {
            Header: 'Activity',
            accessor: 'activity'
        }, {
            Header: 'Duration',
            accessor: 'duration'
        }, {
            Header: 'Date',
            accessor: 'date',
            Cell: (row) => Intl.DateTimeFormat('default', options).format(row.date)
        }
    ]

    return (
        <div>
            <Button onClick={handleCheck} >Check</Button>
            <ReactTable filterable={true} data={train} columns={columns} />
        </div>
    );
}