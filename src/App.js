import React from 'react';
import './App.css';

import CoronaAppBar from './components/header/HeaderSection';
import Dashboard from './components/layout/Dashboard';

import { makeStyles } from '@material-ui/core';

import styles from './assets/jss/reportStyle';
import Footer from './components/layout/Footer';
const useStyles = makeStyles(styles);
const App = ()=>{
  
  const classes = useStyles();
  return (
    <div className={classes.stats}>
    <div className={"container"}>
       <CoronaAppBar />
       
       <Dashboard  className = {classes.stats}/>
      <Footer className ={classes.footerContainer}/>
        
      </div>
      </div>
  );
}


export default App;
