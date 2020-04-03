import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
        setMessage('Customer saved')
        setOpen(true)
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
            setMessage('Customer deleted')
            setOpen(true)
        }
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
        setMessage('Customer updated');
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false)
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
        }, {
            sortable: false,
            filterable: false,
            width: 150,
            Cell: row => <Editcustomer updateCustomer={updateCustomer} customer={row.original} />
        }, {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links[0].href',
            Cell: row => <Button size='small' color='secondary' onClick={() => deleteCustomer(row.value)}>Delete</Button>
        }
    ]

    return (
        <div>
            <Addcustomer saveCustomer={saveCustomer} />
            <ReactTable filterable={true} data={customers} columns={columns} />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={
                    <Button color='secondary' size='small' onClick={handleClose}>Close</Button>
                }
            />
        </div>
    );
}