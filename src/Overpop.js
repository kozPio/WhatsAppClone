import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        border: '1px solid',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
}));

function SimplePopper({ poperContent, buttonImage }) {


    const [open, setOpen] = React.useState(false);
    // const props = [...child]

    const handleClickAway = () => {
        setOpen(false);
        setAnchorEl(null);
    };

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setOpen((prev) => !prev);
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const id = open ? 'simple-popper' : undefined;

    return (

        <ClickAwayListener onClickAway={handleClickAway}>
            <div>
                <Button
                    startIcon={buttonImage || null}
                    onClick={handleClick}
                ></Button>

                {open ? (<Popper id={id} open={open} anchorEl={anchorEl} >
                    <div className={classes.paper}>{poperContent}</div>
                </Popper>) : null}
            </div >
        </ClickAwayListener>


    );
}



export default SimplePopper;


///<button aria-describedby={id} type="button" onClick={handleClick}>
// Toggle Popper
// </button>