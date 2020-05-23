import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import countryUtil from './../util/country-list'
import Grid from '@material-ui/core/Grid';
import styles from './../../assets/jss/reportStyle';
import { CardContent, Typography, CardHeader, Card } from '@material-ui/core';
import DisplayChart from './DisplayChart';
const useStyles = makeStyles(styles);


const CountriWiseStats = props => {
    const classes = useStyles();
    const [countryStats, setCountryStats] = useState({});
    const [country, setCountry] = useState({ name: 'Singapore', code: 'SG' });
    const [timeLineChart, setTimeLineChart] = useState([]);

    useEffect(() => {
        countrywiseCases(props.countryCode);
        loadChartData(props.countryCode)
    }, [props.countryCode]);

    const countrywiseCases = (user_country) => {
        fetch(`https://covid19-monitor-pro.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=${user_country}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid19-monitor-pro.p.rapidapi.com",
                "x-rapidapi-key": "7e269ec140msh8a5df9cfc21b4b4p1c1e3ejsn9aba26afc6e0"
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                let keys = Object.keys(data);
                let country = data[keys[0]];
                let statsData = data[keys[1]][0];
                console.log(statsData);
                const countryStats = {
                    countryName: country,
                    activeCases: statsData.active_cases ? statsData.active_cases : 0,
                    newCases: statsData.new_cases ? statsData.new_cases : 0,
                    newDeath: statsData.new_deaths ? statsData.new_deaths : 0,
                    critical: statsData.serious_critical ? statsData.serious_critical : 0,
                    totalCases: statsData.total_cases ? statsData.total_cases : 0,
                    totalDeaths: statsData.total_deaths ? statsData.total_deaths : 0,
                    totalRecovered: statsData.total_recovered ? statsData.total_recovered : 0,
                    totalTest: statsData.total_tests ? statsData.total_tests : 0,
                    lastUpdate: statsData.record_date ? convertUTCDateToLocalDate(new Date(statsData.record_date)) : ''
                }
                return countryStats;

            }).then(data => {
                console.log(data);
                setCountryStats(data);
            })

            .catch(error => {
                console.log(error)
            });
    }

    const loadChartData = (user_country) => {
        fetch(`https://covid19-monitor-pro.p.rapidapi.com/coronavirus/cases_by_days_by_country.php?country=${user_country}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid19-monitor-pro.p.rapidapi.com",
                "x-rapidapi-key": "7e269ec140msh8a5df9cfc21b4b4p1c1e3ejsn9aba26afc6e0"
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                let dates = Object.keys(data);
                const dataList = [];
                dates
                    //.slice(dates.length-20, dates.length)
                    .map(date => {
                        let DATA = data[date];
                        let stats = {
                            date: formatDate(date),
                            data: DATA,
                            cases: DATA.total_cases ? parseInt(DATA.total_cases.replace(/,/g, "")) : 0,
                            recovered: DATA.total_recovered ? parseInt(DATA.total_recovered.replace(/,/g, "")) : 0,
                            deaths: DATA.total_deaths ? parseInt(DATA.total_deaths.replace(/,/g, "")) : 0,
                            newCases: DATA.new_cases ? parseInt(DATA.new_cases.replace(/,/g, "")) : 0
                        }
                        dataList.push(stats);
                    })
                return dataList;
            }).then(data => {
                setTimeLineChart(data);
            })

            .catch(error => {
                console.log(error)
            });
    }


    const convertUTCDateToLocalDate = (date) => {
        var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();

        newDate.setHours(hours - offset);

        return newDate;
    }



    function countryToFlag(isoCode) {
        return typeof String.fromCodePoint !== 'undefined'
            ? isoCode
                .toUpperCase()
                .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
            : isoCode;
    }

    const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formatDate = (dateString) => {
        let date = new Date(dateString);
        return `${date.getDate()} ${monthsNames[date.getMonth()]}`;
    }

    const handleConutrySelect = (value) => {
        if (value) {
            setCountry(value);
            countrywiseCases(value.code);
            loadChartData(value.code);
        }
    }

    return (
        <div>
            <Grid item xs={12}>
                <Card className={classes.card}>
                    <CardHeader
                        title={<React.Fragment >
                            <span >{countryToFlag(country.code)} </span>
                            {country.name}
                        </React.Fragment>}
                        subheader={'Last Update: ' + countryStats.lastUpdate}
                        className={classes.title} />

                    <CardContent>
                        <Grid container spacing={1} className={classes.casesPosition}>
                            <Grid item xs={4}>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={countryUtil.country_list}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(e, v) => handleConutrySelect(v)}
                                    autoHighlight
                                    classes={{
                                        option: classes.option,
                                    }}
                                    style={{ width: 300 }}
                                    renderOption={(option) => (
                                        <React.Fragment>
                                            <span>{countryToFlag(option.code)}</span>
                                            {option.name} ({option.code})
                                        </React.Fragment>
                                    )}
                                    renderInput={(params) => <TextField {...params} label="Search Country..." variant="outlined" />
                                    }
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container spacing={1}>
                                    <Grid item xs={3}>
                                        <StatsCard title="Total cases" count={countryStats.totalCases} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <StatsCard title="Active" count={countryStats.activeCases} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <StatsCard title="Recovered" count={countryStats.totalRecovered} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <StatsCard title="Deaths" count={countryStats.totalDeaths} />
                                    </Grid>
                                </Grid>

                            </Grid>

                            <Grid container spacing={1}>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={8}>
                                <Grid container spacing={1}>
                                    <Grid item xs={3}>
                                        <StatsCard title="New Cases" count={countryStats.newCases} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <StatsCard title="New Deaths" count={countryStats.newDeath} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <StatsCard title="Critical Cases" count={countryStats.critical} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <StatsCard title="Total tests" count={countryStats.totalTest} />
                                    </Grid>
                                </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <DisplayChart chartData={timeLineChart} countryData={country} />
                            </Grid>
                        </Grid>
                    </CardContent>

                </Card>
            </Grid>

        </div>

    );
}


const StatsCard = props => {
    const classes = useStyles();
    return (
        <Card >
            <CardContent className={classes.card}>
                <Typography variant="body2"  component="p"  >
                    {props.title}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2" >
                    {props.count}
                </Typography>
            </CardContent>
        </Card>
    );

}

export default CountriWiseStats;