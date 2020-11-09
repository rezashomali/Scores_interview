/* eslint-disable no-script-url */

import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../Title/Title";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function ScoreTable({ userData }) {
  const classes = useStyles();
  const [readmore, setReadmore] = useState(false);

  return (
    <React.Fragment>
      <Title>Scores listing</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Last name</TableCell>
            <TableCell>First name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Country</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData
            .filter((_, index, array) => index < (readmore ? array.length : 10))
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
}
