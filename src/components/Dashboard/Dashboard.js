import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Grid,
  Paper,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, SecondaryListItems } from "../ListItems/ListItems";
import Chart from "../Chart/Chart";
import ScoreTable from "../ScoreTable/ScoreTable";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [scoresListing, setScoresListing] = useState([]);
  const [countryAverageData, setCountryAverageData] = useState([]);
  const [genderAverageData, setGenderAverageData] = useState([]);
  const [chartDataType, setChartDataType] = useState("country");

  useEffect(() => {
    fetch("http://localhost:3000/api/people.json")
      .then((response) => response.json())
      .then((data) => {
        setScoresListing(data);
        setCountryAverageData(generateCountryData(data));
        setGenderAverageData(generateGenderData(data));
      })
      .catch((error) => console.log(error));
  }, []);

  const generateCountryData = (data) => {
    const countryObj = {};
    const countryAverageArray = [];

    data.map((item) => {
      if (countryObj[item.country]) {
        countryObj[item.country].score += item.score;
        countryObj[item.country].count += 1;
      } else {
        countryObj[item.country] = { score: 0, count: 1 };
      }
    });

    Object.keys(countryObj).map((item) => {
      countryAverageArray.push({
        country: item,
        score: countryObj[item].score / countryObj[item].count,
      });
    });

    return countryAverageArray;
  };

  const generateGenderData = (data) => {
    const genderObj = {};
    const genderAverageArray = [];

    data.map((item) => {
      if (genderObj[item.gender]) {
        genderObj[item.gender].score += item.score;
        genderObj[item.gender].count += 1;
      } else {
        genderObj[item.gender] = { score: 0, count: 1 };
      }
    });

    Object.keys(genderObj).map((item) => {
      genderAverageArray.push({
        gender: item,
        score: genderObj[item].score / genderObj[item].count,
      });
    });

    return genderAverageArray;
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Holidu Interview Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>
          <SecondaryListItems
            chartDataType={chartDataType}
            selectChartDataType={setChartDataType}
          />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <Chart
                  chartDataType={chartDataType}
                  chartData={
                    chartDataType === "country"
                      ? countryAverageData
                      : genderAverageData
                  }
                />
              </Paper>
            </Grid>
            {/* Recent scores */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {scoresListing && <ScoreTable userData={scoresListing} />}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
