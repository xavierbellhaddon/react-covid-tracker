import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import styles from "./Cards.module.css";

const useStyles = makeStyles({
  root: {
    padding: 16,
    "&:last-child": {
      paddingBottom: 16,
    },
  },
});

const Cards = ({ data: { cases, recovered, deaths } }) => {
  const cardContent = useStyles();

  if (!cases) {
    return "Loading...";
  }
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent className={cardContent.root}>
            <Typography color="textSecondary" align="center" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5" align="center">
              <CountUp start={0} end={cases} duration={2.5} separator="," />
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography color="textSecondary" align="center" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5" align="center">
              <CountUp start={0} end={recovered} duration={2.5} separator="," />
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent>
            <Typography color="textSecondary" align="center" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5" align="center">
              <CountUp start={0} end={deaths} duration={2.5} separator="," />
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
