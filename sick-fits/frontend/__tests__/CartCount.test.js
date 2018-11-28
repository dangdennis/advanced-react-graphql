import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import CartCount from "../components/CartCount";

describe("<CartCount/>", () => {
  it("renders properly", () => {
    shallow(<CartCount count={12} />);
  });

  it("matches the snapshot", () => {
    const wrapper = shallow(<CartCount count={12} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("updates via props", () => {
    const wrapper = shallow(<CartCount count={50} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.setProps({ count: 10 });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
