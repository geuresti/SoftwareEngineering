import React from "react";
import renderer from "react-test-renderer";
// import UserList from "../UserList";
// import PlayerList from "../PlayerList";
import AdminPage from "../AdminPage";
import CreateTeam from "../CreateTeam";
 
   
it("Admin Snapshot", () => {
    const domTree = renderer.create(<AdminPage />).toJSON();
    expect(domTree).toMatchSnapshot();
});

it("Create team Snapshot", () => {
    const domTree = renderer.create(<CreateTeam />).toJSON();
    expect(domTree).toMatchSnapshot();
});


/*
it("Create season Snapshot", () => {
    const domTree = renderer.create(<SeasonView />).toJSON();
    expect(domTree).toMatchSnapshot();
});

/*
it("Edit team Snapshot", () => {
    const domTree = renderer.create(<TeamEdit />).toJSON();
    expect(domTree).toMatchSnapshot();
});

it("inbox Snapshot", () => {
    const domTree = renderer.create(<Inbox />).toJSON();
    expect(domTree).toMatchSnapshot();
}); */
