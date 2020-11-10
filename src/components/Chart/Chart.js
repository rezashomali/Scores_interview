import React from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Title from "../Title/Title";

const Chart = ({ chartData, chartDataType }) => (
  <React.Fragment>
    <Title>Score statistics</Title>
    <ResponsiveContainer>
      <BarChart
        data={chartData}
        margin={{
          top: 16,
          right: 16,
          bottom: 0,
          left: 24,
        }}
      >
        <Tooltip />
        <XAxis dataKey={chartDataType} />
        <YAxis>
          <Label angle={270} position="left" style={{ textAnchor: "middle" }}>
            Average score
          </Label>
        </YAxis>
        <Bar type="monotone" dataKey="score" fill="#556CD6" />
      </BarChart>
    </ResponsiveContainer>
  </React.Fragment>
);

export default Chart;

Chart.propTypes = {
  chartData: PropTypes.array.isRequired,
  chartDataType: PropTypes.string.isRequired,
};
