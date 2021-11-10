import React,{useState,useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import moment from 'moment'
const columns = [
    { field: 'id', headerName: 'No',width:100 },
    { field: 'username', headerName: 'Username',width:200 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'gender', headerName: 'Gender', width: 150,},
    { field: 'register', headerName: 'Registered Date', width: 250,},
    
];
  

export default function DataTable(props) {
    
    const [rows, setrows] = useState([])
    let {loading,users,onChangePagination,page}=props
    useEffect(() => {
        let new_rows=[]
        users.map((d,i)=>{
            return new_rows.push({
                id:i+1,
                username:d.login.username,
                name:`${d.name.first} ${d.name.last}`,
                email: d.email,
                gender: d.gender,
                register:moment(d.registered.date).format('DD-MM-YYYY HH:mm')
            })
        })
        setrows(new_rows)
    }, [users])
    return (
        <div data-testid="data-table" style={{ width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowCount={100}
                loading={loading}
                autoHeight
                density="comfortable"
                hideFooter
            />
            <br/>
            <div style={{display:'flex',justifyContent:'flex-end',}}>
            <Pagination  data-testid="pagination" onChange={(e,p)=>onChangePagination(p)} count={100} shape="rounded" />
            </div>
        </div>
    )
}
