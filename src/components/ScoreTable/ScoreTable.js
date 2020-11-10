/* eslint-disable no-script-url */

import React, { useState, useMemo } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Title from "../Title/Title";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function ScoreTable({ userData }) {
  const classes = useStyles();
  const [readmore, setReadmore] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  let sortedData = userData;
  useMemo(() => {
    if (sortConfig.key !== null) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortedData;
  }, [sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <React.Fragment>
      <Title>Scores listing</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell size="small" padding="none">
              <Button
                type="button"
                size="small"
                endIcon={
                  sortConfig.key === "last_name" ? (
                    sortConfig.direction === "ascending" ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )
                  ) : (
                    ""
                  )
                }
                onClick={() => requestSort("last_name")}
              >
                Last name
              </Button>
            </TableCell>
            <TableCell size="small" padding="none">
              <Button
                type="button"
                size="small"
                endIcon={
                  sortConfig.key === "first_name" ? (
                    sortConfig.direction === "ascending" ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )
                  ) : (
                    ""
                  )
                }
                onClick={() => requestSort("first_name")}
              >
                First name
              </Button>
            </TableCell>
            <TableCell size="small" padding="none">
              <Button
                size="small"
                type="button"
                endIcon={
                  sortConfig.key === "gender" ? (
                    sortConfig.direction === "ascending" ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )
                  ) : (
                    ""
                  )
                }
                onClick={() => requestSort("gender")}
              >
                Gender
              </Button>
            </TableCell>
            <TableCell size="small" padding="none">
              <Button
                size="small"
                type="button"
                endIcon={
                  sortConfig.key === "city" ? (
                    sortConfig.direction === "ascending" ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )
                  ) : (
                    ""
                  )
                }
                onClick={() => requestSort("city")}
              >
                City
              </Button>
            </TableCell>
            <TableCell size="small" padding="none">
              <Button
                size="small"
                type="button"
                endIcon={
                  sortConfig.key === "country" ? (
                    sortConfig.direction === "ascending" ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )
                  ) : (
                    ""
                  )
                }
                onClick={() => requestSort("country")}
              >
                Country
              </Button>
            </TableCell>
            <TableCell align="right" size="small" padding="none">
              <Button
                size="small"
                type="button"
                endIcon={
                  sortConfig.key === "score" ? (
                    sortConfig.direction === "ascending" ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )
                  ) : (
                    ""
                  )
                }
                onClick={() => requestSort("score")}
              >
                Score
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.slice(0, readmore ? -1 : 10).map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.country}</TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link onClick={() => setReadmore(!readmore)} color="primary" href="#">
          {readmore ? "See less scores" : "see more scores"}
        </Link>
      </div>
    </React.Fragment>
  );
}
