import React from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentIcon from "@material-ui/icons/Assignment";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
  </div>
);

export const SecondaryListItems = ({ selectChartDataType, chartDataType }) => (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem
      selected={chartDataType === "gender"}
      button
      onClick={() => selectChartDataType("gender")}
    >
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Scores by gender" />
    </ListItem>
    <ListItem
      selected={chartDataType === "country"}
      button
      onClick={() => selectChartDataType("country")}
    >
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Scores by country" />
    </ListItem>
  </div>
);

SecondaryListItems.propTypes = {
  selectChartDataType: PropTypes.func.isRequired,
  chartDataType: PropTypes.string.isRequired,
};
