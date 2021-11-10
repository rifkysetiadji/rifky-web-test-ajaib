import React,{useEffect,useState} from 'react'
import SearchTable from 'components/SearchTable'
import style from './User.module.css'
import { makeStyles } from '@mui/styles'
import { FormControl,InputLabel,Select,MenuItem,Button } from '@mui/material'
import DataTable from './DataTable'
import { useDispatch,useSelector } from 'react-redux'
import { fetchUser } from './UserSlice'
import { debounce } from 'lodash'
const useStyles = makeStyles(theme => ({
    textField: {
      [`& fieldset`]: {
        borderRadius: 5,
 
      },
      width:'100%',
      marginBottom:15,
      
  },
  
}));
export default function User() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [filterbygender, setFilterbygender] = useState('all')
    useEffect(() => {
        dispatch(fetchUser(`?page=${page}&results=10`))
    }, [])  
    const onChange=(value)=>{
        setSearch(value)
    }
    const onClickSearch=()=>{
        if(search!==''){
            dispatch(fetchUser(`?page=${page}&results=10&keyword=${search}${filterbygender!=='all'?`&gender=${filterbygender}`:''}`))
        }
    }
    const onChangeGender=(value)=>{
        setFilterbygender(value)
        dispatch(fetchUser(`?page=${page}&results=10${search!==''?`&keyword=${search}`:''}${value!=='all'?`&gender=${value}`:''}`))
    }
    const onChangePagination=(page)=>{
        setPage(page)
        dispatch(fetchUser(`?page=${page}&results=10${search!==''?`&keyword=${search}`:''}${filterbygender!=='all'?`&gender=${filterbygender}`:''}`))
    }
    const resetFilter=()=>{
        setSearch('')
        setPage(1)
        setFilterbygender('all')
        dispatch(fetchUser(`?page=${1}&results=10`))
    }
    return (
        <div>
            <div data-testid="user-container" className={style['user-container']}>
                <form>
                <div style={{display:'flex'}}>
                <div style={{display:'flex'}}>
                    <SearchTable inputProps={{ "data-testid": "field-search" }} value={search}  onChange={onChange} height={40}/>
                    &nbsp;&nbsp;
                    <Button data-testid="btn-search" onClick={onClickSearch}  variant="outlined" className={style['btn-remove-capital']}>Search</Button>
                    
                </div>
                &nbsp;&nbsp;
                <div style={{width:'30%'}}>
                    <FormControl   size='small' variant='outlined' className={classes.textField}>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filterbygender}
                            onChange={(e)=>onChangeGender(e.target.value)}
                            label="gender"
                            inputProps={{ "data-testid": "field-gender" }}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                &nbsp;&nbsp;
                <Button type="reset" onClick={resetFilter} variant="outlined" className={style['btn-remove-capital']}>Reset Filter</Button>
                </div>
                </form>
                <br/>
                <DataTable   onChangePagination={onChangePagination} page={page} setPage={setPage} users={user.users} loading={user.status==="loading"}/> 
            </div>
        </div>
    )
}
