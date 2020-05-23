import React from 'react';

import {
    Chart,
    Legend,
    Title,
} from '@devexpress/dx-react-chart-material-ui';
import { curveCatmullRom, area, line } from 'd3-shape';
import {  ArgumentScale, ValueAxis, BarSeries, LineSeries } from '@devexpress/dx-react-chart';
import { scaleBand } from '@devexpress/dx-chart-core';
import { makeStyles } from '@material-ui/core/styles';
import styles from './../../assets/jss/reportStyle';

const Area = props => {
    const {
        coordinates,
        color
    } = props;

    return (
        <path
            fill={color}
            d={area()
                .x(({ arg }) => arg)
                .y1(({ val }) => val)
                .y0(({ startVal }) => startVal)
                .curve(curveCatmullRom)(coordinates)}
            opacity={0.5}
        />
    );

}



const Line = props => (
    <LineSeries.Path
      {...props}
      path={line()
        .x(({ arg }) => arg)
        .y(({ val }) => val)
        .curve(curveCatmullRom)}
    />
  );

const useStyles = makeStyles(styles);
const DisplayChart = props => {
    const title = 'Corona Cases in ' + props.countryData.name;
    const classes = useStyles();
    return (
        <>{
            props.chartData != null ? (
                    <Chart data={props.chartData} >
                        {/* <ArgumentAxis tickFormat={() => tick => tick} /> */}
                        <ArgumentScale factory={scaleBand} />
                        <ValueAxis />
                      
                        <BarSeries
                            name="Cases"
                            valueField="cases"
                            color="orange"
                            argumentField="date"
                           seriesComponent={Line}
                        />
                         <BarSeries
                            name="Recovered"
                            valueField="recovered"
                            color="green"
                            argumentField="date"
                            seriesComponent={Line}
                        />

                            <BarSeries
                            name="Deaths"
                            valueField="deaths"
                            color="black"
                            argumentField="date"
                          seriesComponent={Line}
                        />
                       
                       
                        <Legend />
                        <Title
                            text={title} 
                        /> 
                        {/* <Stack
                            stacks={[
                                { series: ['Total Cases', 'Total Recovered', 'Daily New Cases', 'Total Deaths', 'New Daily Deaths'] },
                            ]}
                            offset={stackOffsetWiggle}
                            order={stackOrderInsideOut}
                        /> */}

                    </Chart>
               
            ) : (
                    <h1>loading data...</h1>
                )
        }
        </>

    );
}


export default DisplayChart;