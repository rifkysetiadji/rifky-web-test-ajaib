import React from 'react'
import SearchImg from 'assets/icon/Search.png'
import {FormControl,InputLabel,OutlinedInput,InputAdornment} from '@mui/material'
const SearchTable=React.memo((props)=>{
    let height=props.height?props.height:30
    let width=props.width?props.width:200
    let borderRadius=props.borderRadius?props.borderRadius:5
    return (
        <FormControl  variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
            <OutlinedInput
                size='small'
                {...props}
                style={{height:height,width:width,borderRadius:borderRadius}}
                id="input-with-icon-textfield"
                name='password'
                onChange={(e)=>props.onChange(e.target.value)}
                // onKeyPress={e =>props.handleKeyPress(e)}
                required
                placeholder="search..."
                startAdornment={
                <InputAdornment position="start">
                    <img alt="search" src={SearchImg} style={{width:15}}/>
                </InputAdornment>
                }
                label="Search"
            />
        </FormControl>
    )
})
export default SearchTable