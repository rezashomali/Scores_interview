import React from "react";
import renderer from "react-test-renderer";
import ScoreTable from "./ScoreTable";

describe("ScoreTable", () => {
  test("renders properly", () => {
    const data = [
      {
        city: "Olofström",
        country: "SE",
        created_at: "2017-04-05T02:28:37Z",
        email: "mledstone0@mayoclinic.com",
        first_name: "Murdock",
        gender: "Male",
        id: "a67e6828-99d9-4d8d-9cd7-8aff12e95973",
        last_name: "Ledstone",
        score: 100,
      },
    ];
    const tree = renderer.create(<ScoreTable userData={data} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
