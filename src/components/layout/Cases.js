import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
const useStyles = makeStyles(() =>
    createStyles({
        root: {
            height: 100,
        },
        title: {
            fontSize: "1.3em"
        },
        newValue: {
            fontSize: "1.3em"
        }
    }),
);
const CasesReport = props => {
    const { title, value, newValue, valueStyle } = props;
    const styles = useStyles();
    return (
        <div className={styles.root} >
            <div className={styles.title}>{title}</div>
            <div className={valueStyle}>
                <NumberFormat value={value} displayType={'text'} thousandSeparator={true} />
            </div>
            {
                Number(newValue) !== 0 ? (
                    <div className={styles.newValue}>+
                        <NumberFormat value={newValue} displayType={'text'} thousandSeparator={true} />
                    </div>
                ) : (<></>)
            }

        </div>
    );
}

export default CasesReport;