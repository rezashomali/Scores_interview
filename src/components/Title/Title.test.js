import React from "react";
import renderer from "react-test-renderer";
import Title from "./Title";

describe("Title", () => {
  test("renders properly", () => {
    const tree = renderer.create(<Title>title</Title>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
