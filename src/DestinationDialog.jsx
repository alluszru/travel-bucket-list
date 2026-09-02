import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import dayjs from 'dayjs';
import FormHelperText from '@mui/material/FormHelperText';
import { useEffect } from "react";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InputLabel from '@mui/material/InputLabel';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import WbCloudyOutlinedIcon from '@mui/icons-material/WbCloudyOutlined';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "var(--color-surface)",
    color: "var(--color-text-primary)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    width: "560px",
    maxWidth: "90vw",
  },

  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },

  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
    borderTop: "1px solid var(--color-border)",
  },

  "& .MuiInputBase-root": {
  color: "var(--color-text-primary)",
},

"& .MuiOutlinedInput-notchedOutline": {
  borderColor: "var(--color-border)",
},

"& .MuiOutlinedInput-root": {
  color: "var(--color-text-primary)",

  "& fieldset": {
    borderColor: "var(--color-border)",
  },

  "&:hover fieldset": {
    borderColor: "var(--color-primary)",
  },

  "&.Mui-focused fieldset": {
    borderColor: "var(--color-primary)",
  },
},

"& .MuiInputLabel-root": {
  color: "var(--color-text-secondary)",
},

"& .MuiInputLabel-root.Mui-focused": {
  color: "var(--color-primary)",
},
}));


function DestinationDialog(props) {

    const initialFormData = {
                    city: "",
                    country: "",
                    status: "",
                    priority: "",
                    date: null,
                    };

    const [formData, setFormData]= useState(initialFormData);

    useEffect(() => {
  
    if (props.selectedDestination) {
      setFormData({
        ...props.selectedDestination,
         date: props.selectedDestination.date
        ? dayjs(props.selectedDestination.date)
        : null,
      });
    }
  }, 
  [props.selectedDestination]);




    function handleChange(event) {
   
        const {name, value} = event.target;
         setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleDateChange(date) {
     setFormData((prev) => ({
            ...prev,
            date,
        }));
    }
    const [errors, setErrors] = useState({  
        city: "",
        country: "",
        priority: "",
    });



    function validateForm () {
        const newErrors = {};

        if(!formData.city) {
          newErrors.city = "City is required";
        }

        if(!formData.country) {
          newErrors.country = "Country is required";
        }

        if (!formData.priority) {
            newErrors.priority = "Priority is required";
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    
    function handleCloseDialog() {
      setFormData(initialFormData);
      props.closeDialog();
    }

  

    function handleSave() {
        if (!validateForm()) {
            return;
        }
      
         props.onSave(formData);
        
      handleCloseDialog();
    }

    function handleDelete() {
      props.onDelete(props.selectedDestination.id)
      handleCloseDialog();
      
    }

   
  return (
    <React.Fragment>
   
    
      <BootstrapDialog
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
        open={props.open}      
      >
        <DialogTitle sx={{ m: 0, p: 2, color:"var(--color-primary)"}} id="customized-dialog-title">
          <FlightTakeoffIcon sx={{
            mr: 1,
          color: "var(--color-primary)", 
           verticalAlign: "middle",
            }}/> Add destination
        </DialogTitle>
        <IconButton
          onClick={handleCloseDialog}
        
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color:("var(--color-text-primary)")
          })}
        >
          <CloseIcon />
        </IconButton>   
        
        <DialogContent dividers>
         <div className="dialogForm">
      
           
        
          <TextField  fullWidth
          value={formData.city}  
          onChange={handleChange} 
          name="city" 
          variant="outlined" 
          label="City" 
          className='formField' 
          error={Boolean(errors.city)} 
          helperText={errors.city}/>

            <TextField  fullWidth
          value={formData.country}  
          onChange={handleChange} 
          name="country" 
          variant="outlined" 
          label="Country" 
          className='formField' 
          error={Boolean(errors.country)} 
          helperText={errors.country}/>
       
        
        <FormControl fullWidth>
             <InputLabel id="status-label">Status</InputLabel>
  
                <Select value={formData.status}
    onChange={handleChange} label="Status" name="status" labelId="status-label">
                    <MenuItem value={"Dreaming"}>Dreaming</MenuItem>
                    <MenuItem value={"Planning"}>Planning</MenuItem>
                    <MenuItem value={"Booked"}>Booked</MenuItem>
                    <MenuItem value={"Visited"}>Visited</MenuItem>
                </Select>
        </FormControl>
        
        <FormControl fullWidth error={Boolean(errors.priority)} >
             <InputLabel>Priority</InputLabel>
  
            
                <Select value={formData.priority} name="priority" onChange={handleChange}  label="Priority"  >
                    <MenuItem value={"Low"} >Low</MenuItem>
                    <MenuItem value={"Medium"} >Medium</MenuItem>
                    <MenuItem value={"High"}>High</MenuItem>
                </Select>
                <FormHelperText>{errors.priority}</FormHelperText>
        </FormControl>    

         <FormControl fullWidth>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
    
                        <DatePicker  
                        value={formData.date} 
                        onChange={handleDateChange} 
                        name="date" label="Pick a date"
                          slotProps={{textField: {
                            fullWidth: true,},
                        }}/>
                    </LocalizationProvider>
        </FormControl>
              </div>
        {props.selectedDestination && props.weather && (
          <div>
             <p>Weather</p>
             {(props.weather.clouds.all > 30)? <WbCloudyOutlinedIcon/> : <WbSunnyOutlinedIcon/> }

             <p>{Math.floor(props.weather.main.temp)}</p>
             <p>Wind: {Math.floor(props.weather.wind.speed)} m/s</p>
          </div>
        )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", padding: 2, }}>
        <IconButton>
          <DeleteOutlineOutlinedIcon sx={{
        color: "var(--color-primary)"}} onClick={handleDelete} />
        </IconButton>
        <div>
        <Button autoFocus onClick={handleCloseDialog} variant="text" sx={{
        color: "var(--color-primary)"}}>
            Cancel 
          </Button>
          <Button autoFocus onClick={handleSave} variant="contained"  sx={{
        backgroundColor: "var(--color-primary)"
    }}  >
            Save 
          </Button>
          </div>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}

export default DestinationDialog;