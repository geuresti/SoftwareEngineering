import React from "react";
import renderer from "react-test-renderer";
import MatchEdit from "../MatchEdit";
import MatchView from "../MatchView";
import MatchCreate from "../CreateMatch";

    it("Matches View Snapshot", () => {
        const domTree = renderer.create(<MatchView />).toJSON();
        expect(domTree).toMatchSnapshot();
  });
  
  it("Matches Edit Snapshot", () => {
    const domTree = renderer.create(<MatchEdit />).toJSON();
    expect(domTree).toMatchSnapshot();
});

it("Matches Create Snapshot", () => {
    const domTree = renderer.create(<MatchCreate />).toJSON();
    expect(domTree).toMatchSnapshot();
});
