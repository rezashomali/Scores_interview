import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Link,
  Table,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  TextField,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Title from "../Title/Title";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const ScoreTable = ({ userData }) => {
  const classes = useStyles();
  const [readmore, setReadmore] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  let sortedData = userData;
  useMemo(() => {
    if (sortConfig.key !== null) {
      sortedData.sort((a, b) => {
        if (
          a[sortConfig.key]?.toLowerCase() < b[sortConfig.key]?.toLowerCase()
        ) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (
          a[sortConfig.key]?.toLowerCase() > b[sortConfig.key]?.toLowerCase()
        ) {
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
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Title>Scores listing</Title>
        </Grid>
        <Grid item xs={6} align="right">
          <TextField
            label="search..."
            variant="outlined"
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
          />
        </Grid>
      </Grid>

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
              Gender
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
              Score
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData
            .filter(
              (item) =>
                searchValue === "" ||
                item.last_name?.toLowerCase().includes(searchValue) ||
                item.first_name?.toLowerCase().includes(searchValue) ||
                item.city?.toLowerCase().includes(searchValue) ||
                item.country?.toLowerCase().includes(searchValue)
            )
            .slice(0, readmore ? -1 : 10)
            .map((row) => (
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
};

export default ScoreTable;

ScoreTable.propTypes = {
  userData: PropTypes.array.isRequired,
};
