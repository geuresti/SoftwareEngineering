import React from "react";
import renderer from "react-test-renderer";
import LoginScreen from "../LoginScreen";


    it("Login Snapshot", () => {
        const domTree = renderer.create(<LoginScreen />).toJSON();

        // Looks very different than the snapshot file
       // console.log(domTree)
        expect(domTree).toMatchSnapshot();
  });
  
