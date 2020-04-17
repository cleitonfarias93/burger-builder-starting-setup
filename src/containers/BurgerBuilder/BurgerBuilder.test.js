import React from "react";
import { configure, shallow } from "enzyme";
import Adpater from "enzyme-adapter-react-16";

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

configure({ adapter: new Adpater() });

describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {} } price={1.99}/>)
  });

  it("should render <BuildControls /> when receiving ingredients", () => {
    wrapper.setProps({ings: {salad: 0}})
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  })
  
})
