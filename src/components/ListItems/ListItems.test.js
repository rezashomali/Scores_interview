import React from "react";
import renderer from "react-test-renderer";
import { SecondaryListItems } from "./ListItems";

describe("ListItems", () => {
  test("renders properly", () => {
    const tree = renderer
      .create(
        <SecondaryListItems
          chartDataType="country"
          selectChartDataType={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
