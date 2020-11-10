import React from "react";
import renderer from "react-test-renderer";
import Chart from "./Chart";

function createNodeMock() {
  const doc = document.implementation.createHTMLDocument();
  return { parentElement: doc.body };
}

describe("Chart", () => {
  test("renders properly", () => {
    const data = [
      { country: "SE", score: 52.35 },
      { country: "US", score: 100 },
      { country: "EU", score: 100 },
    ];

    const tree = renderer
      .create(<Chart chartData={data} chartDataType="country" />, {
        createNodeMock,
      })
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
