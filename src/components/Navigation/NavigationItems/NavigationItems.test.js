import React from "react";

import { configure, shallow } from "enzyme";
import Adpater from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adpater() });

describe("<NavigationItems />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it("Should render two <NavigationItem /> elements if not authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("Should render two <NavigationItem /> elements if authenticated", () => {
    // wrapper = shallow(<NavigationItems  isAuthenticate/>);
    wrapper.setProps({ isAuthenticate: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("Should an exact logout button", () => {
    wrapper.setProps({ isAuthenticate: true });

    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
