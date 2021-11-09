import React from 'react'
import {TextField,CircularProgress} from '@mui/material'
import {Autocomplete} from '@mui/material';
import { MuiThemeProvider, createTheme,withStyles,makeStyles } from '@mui/styles'
const themeField = createTheme({ 
    palette: { 
        primary: {
            main:'#afe597',
            contrastText: '#FFFFFF',

        },
        secondary:{
            main:'#65b7ff',
            contrastText: '#FFFFFF',

        }
    } 
})
const useStyles = makeStyles(theme => ({
    textField: {
      [`& fieldset`]: {
        borderRadius: 10,

      },
      width:'100%',
      marginBottom:15,
  },
  noBorder: {
    border: "none",
  },
  
}));
export default function Index(props) {
    const classes=useStyles()
    return (
            <Autocomplete
                {...props}
                size='small'
                options={props.options}
                getOptionLabel={props.getOptionLabel}
                onInputChange={props.onInputChange}
                loading={props.loading}
                loadingText='Loading...'
                onChange={props.onChange}
                renderInput={(params) => 
                
                <TextField  className={classes.textField} 
                    {...params} 
                    label={props.label} 
                    variant="outlined" 
                    propsTextField={props.propsTextField}
                   
                />
            }
            />
    )
}
