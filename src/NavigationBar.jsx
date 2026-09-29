import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

    const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
            width: '20ch',
        },
        },
    },
    }));

   

function NavigationBar(props) {
     console.log(props.search);
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar className="appBar" position="static"   
        sx={{
        backgroundColor: "var(--color-surface)",
        color: "var(--color-text-primary)",
        boxShadow: "var(--shadow-sm)",
    }}> 
            <Toolbar>
            <IconButton className="themeButton"
                
                size="large"
                edge="start"
                aria-label="open drawer"
                sx={{ mr: 2,
                    color: "var(--color-text-primary)"
                }}
            >
                <MenuIcon />
            </IconButton>
            <Typography 
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: "var(--color-text-primary)" }}
            >
                Travel <span className="accentText">Bucket</span> List
            </Typography>
              <IconButton   onClick={() => props.toggleShowFavorite()}>
                {props.showFavoriteOnly ? <StarOutlinedIcon className="themeButton favIcon"/> : <StarBorderPurple500OutlinedIcon className="themeButton favIcon" />}
                <Typography className='favOnly'>Favorites only</Typography>
            </IconButton>
            <Button className="addButton" onClick={props.openDialog}>
                  <AddIcon />
            </Button>
          
            <Search>
                <SearchIconWrapper>
                <SearchIcon sx={{color:"var(--color-text-secondary)" }} />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search destination, status or priority..."
                sx={{color:"var(--color-text-secondary)" }}
                value={props.search}
                onChange={(event) => props.setSearch(event.target.value)}
                inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            <IconButton className="themeButton" onClick={() => props.toggleDarkMode()}>
                {props.isDarkMode ? <LightModeIcon/> : <DarkModeIcon/>}
            </IconButton>
            </Toolbar>
        </AppBar>
        </Box>
    );
};


export default NavigationBar;

