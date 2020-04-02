import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default function Customerlist() {
    const [customer, setCustomer] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomer(data.content))
    }

    const columns = [
        {
            Header: 'Firstname',
            accessor: 'firstname'
        }, {
            Header: 'Lastname',
            accessor: 'lastname'
        }, {
            Header: 'Address',
            accessor: 'streetaddress'
        }, {
            Header: 'Post code',
            accessor: 'postcode'
        }, {
            Header: 'City',
            accessor: 'city'
        }, {
            Header: 'Email',
            accessor: 'email'
        }, {
            Header: 'Phone',
            accessor: 'phone'
        }
    ]

    return (
        <div>
            <ReactTable filterable={true} data={customer} columns={columns} />
        </div>
    );
}