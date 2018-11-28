import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import RequestReset, {
  REQUEST_RESET_MUTATION
} from "../components/RequestReset";

const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: {
        email: "test@test.com"
      }
    },
    result: {
      data: {
        requestReset: {
          __typename: "message",
          message: "success"
        }
      }
    }
  }
];

describe("<RequestReset/>", () => {
  it("renders and matches snapshop", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    );

    const form = wrapper.find('[data-test="form"]');
    expect(toJSON(form)).toMatchSnapshot();
  });

  it("calls the mutation", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    );

    // simulate typing an email, pass in a mock event
    wrapper.find("input").simulate("change", {
      target: { name: "email", value: "test@test.com" }
    });
    wrapper.find("form").simulate("submit");
    await wait();
    wrapper.update();
    expect(wrapper.find("p").text()).toContain(
      "Success! Check your email for a reset link!"
    );

  });
});
