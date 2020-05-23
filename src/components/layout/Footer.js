import React from 'react';
import { Paper } from '@material-ui/core';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import { makeStyles } from '@material-ui/core/styles';
import styles from './../../assets/jss/reportStyle';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email'
const useStyles = makeStyles(styles);
const Footer = ()=>{
const classes = useStyles();
    return (
       <Paper container className={classes.footer}>
        <div className={classes.footerContent}>
        <pre>
        <span style={{color:'#fff'}}>Sources: <a href='https://www.worldometers.info/'>Worldometers.info</a></span>
        <p style={{color:'#fff', fontWeight:'bold'}}>Develped with <span><FavoriteRoundedIcon  fontSize='default' htmlColor='red'/></span> by Manoj Verma. 
     
        <span>
            Connect Me: <a  href='https://www.linkedin.com/in/manoj-verma-43035361/' alt='Manoj Verma'><LinkedInIcon color='inhrit'fontSize='default' /> </a>
         </span>
       
        <EmailIcon  color='inhrit'fontSize='default' /> : manojkumarhverma@gmail.com
       
        </p>
        </pre>
        </div>
       </Paper>
    );
}

export default Footer;