import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './../../assets/jss/reportStyle';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { CardContent, Typography, CardHeader, Card } from '@material-ui/core';
import CountriWiseStats from './CountryWiseStats';
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles(styles);


const CasesCount = props=>{
const classes = useStyles();
    return (
        <Grid item xs={3} className={classes.grid}>
                               
        <Typography variant="body2" color="textSecondary" component="p" className={classes.caseHeading}>
            {props.title}
        </Typography>
        <Typography gutterBottom variant="h4" component="h2" className ={classes.count}>
             {props.count}
        </Typography>
        
    </Grid>
    );
}

const Dashboard = props => {
    const classes = useStyles();
    
    const [stats, setStats] = useState({
        stats: {
            lastUpdate:'',
            confirmed: '',
            confirmed_diff: '',
            deaths: '',
            deaths_diff: '',
            recovered: '',
            recovered_diff: '',
            active: '',
            active_diff: ''
        }
    });

    useEffect(() => {
        loadWorldWideStats()
      
    }, [])

    const handleTotalCount = (count) => {
        setStats(count);

    }

    const {lastUpdate, confirmed,  deaths, recovered } = stats;



    const loadWorldWideStats = () => {
        fetch(`https://covid19-monitor-pro.p.rapidapi.com/coronavirus/worldstat.php`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid19-monitor-pro.p.rapidapi.com",
                "x-rapidapi-key": "7e269ec140msh8a5df9cfc21b4b4p1c1e3ejsn9aba26afc6e0"
            }
        })
            .then(response => {
                return response.json();
            }).then(data => {
                
                const stats = {
                    lastUpdate:convertUTCDateToLocalDate(new Date(data.statistic_taken_at)),
                    confirmed: data.total_cases,
                    confirmed_diff: data.new_cases,
                    deaths: data.total_deaths,
                    deaths_diff: data.new_deaths,
                    active: data.active_cases,
                    active_diff: data.active_diff,
                    recovered: data.total_recovered,
                    recovered_diff: data.recovered_diff
                }
                console.log(stats);
                return stats;
            })
            .then((data) => setStats(data))
            .catch(error => {
                console.log(error);
            });
    }

   
 
    const  convertUTCDateToLocalDate=(date)=> {
        var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    
        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();
    
        newDate.setHours(hours - offset);
    
        return newDate;   
    }


    const Statsistics = props =>{
        const {lastUpdate,
            confirmed,
            deaths,
            active,
            recovered} = props;
        const classes = useStyles()
        return (
            <Grid item xs={12}>
                    
                    <Card className={classes.card}>
                      
                        <CardHeader
                            title={ <React.Fragment >
                                <span><PublicIcon /> </span>
                               Worldwide
                            </React.Fragment>}
                            subheader={'Last Update: '+lastUpdate}
                            className={classes.title}/>
                        
                        <CardContent>
                        <Grid container spacing={1} className={classes.casesPosition}>
                            <CasesCount title="Coronavirus Cases" count= {confirmed} />
                            <CasesCount title="Active" count= {active} />
                            <CasesCount title="Recovered" count= {recovered} color/>
                            <CasesCount title="Deaths" count= {deaths} />
                            
                            </Grid>
                        </CardContent>
                        
                    </Card>
                </Grid>

        );

    }

    return (
    
            <Grid container spacing={2}>
        
                <Statsistics 
                    lastUpdate={lastUpdate}
                    confirmed={confirmed}
                    deaths={deaths}
                    active={deaths}
                    recovered={recovered}
                />
                <Grid item xs={12} className={classes.stats}>
                    <Paper >
                        <CountriWiseStats countryCode={'SG'}/>
                    </Paper>
                </Grid>
            </Grid>
      

    );
}



export default Dashboard;