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
import FlightTakeoffTwoToneIcon from '@mui/icons-material/FlightTakeoffTwoTone';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import dayjs from 'dayjs';
import FormHelperText from '@mui/material/FormHelperText';
import { useEffect } from 'react';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));


function DestinationDialog(props) {

    const initialFormData = {
                    place: "",
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
        place: "",
        priority: "",
        
    });



    function validateForm () {
        const newErrors = {};

        if(!formData.place) {
            newErrors.place = "Place is required";
        }

        if (!formData.priority) {
            newErrors.priority = "Priority is required";
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSave() {
        if (!validateForm()) {
            return;
        }
      
         props.onSave(formData);
        
      setFormData(initialFormData);
      props.closeDialog();
    }

  
  return (
    <React.Fragment>
    
      <BootstrapDialog
        onClose={props.closeDialog}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        className='dialog'
        
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <FlightTakeoffTwoToneIcon/> Add destination
        </DialogTitle>
        <IconButton
          onClick={props.closeDialog}
        
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
           
         <FormControl fullWidth>
            <Typography>Place</Typography>
            <TextField  value={formData.place}  onChange={handleChange} name="place" className='formField' error={Boolean(errors.place)} helperText={errors.place}/>
        </FormControl>
        
        <FormControl fullWidth>
             <TextField  id="standard-basic" name="status" label="Status" variant="standard"  
   />
                <Select value={formData.status}
    onChange={handleChange} className='formField' name="status">
                    <MenuItem value={"Dreaming"}>Dreaming</MenuItem>
                    <MenuItem value={"Planning"}>Planning</MenuItem>
                    <MenuItem value={"Booked"}>Booked</MenuItem>
                    <MenuItem value={"Visited"}>Visited</MenuItem>
                </Select>
        </FormControl>
        
        <FormControl fullWidth error={Boolean(errors.priority)} >
            <TextField  id="standard-basic"  label="Priority" variant="standard" />
            
                <Select value={formData.priority} name="priority" onChange={handleChange} className='formField'  >
                    <MenuItem value={"Low"} >Low</MenuItem>
                    <MenuItem value={"Medium"} >Medium</MenuItem>
                    <MenuItem value={"High"}>High</MenuItem>
                </Select>
                <FormHelperText>{errors.priority}</FormHelperText>
        </FormControl>    

         <FormControl fullWidth>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker  value={formData.date} onChange={handleDateChange} name="date" label="Pick a date" />
                    </DemoContainer>
                    </LocalizationProvider>
        </FormControl>
                
        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={props.closeDialog}>
            Cancel 
          </Button>
          <Button autoFocus onClick={handleSave}>
            Save 
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}

export default DestinationDialog;