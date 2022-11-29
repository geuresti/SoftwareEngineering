import React from "react";
import renderer from "react-test-renderer";
import MatchView from "../MatchView";

    it("Matches Snapshot", () => {
        const domTree = renderer.create(<MatchView />).toJSON();
        expect(domTree).toMatchSnapshot();
  });
  
