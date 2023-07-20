import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../components/guestAndCustomer/auth/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { FindByText } from "@testing-library/react";
import { toast } from "react-toastify";
import Home from "../components/guestAndCustomer/home/Home";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import Booking from "../components/guestAndCustomer/booking/Booking";

describe("Login", () => {
  test("email test null", async () => {
    const toastErrorMock = jest.fn();
    toast.error = toastErrorMock;
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const signInButton = await screen.findByRole("button", {
      name: "Login",
    });

    const emailInput = screen.getByPlaceholderText("Enter email");
    await userEvent.type(emailInput, "");

    userEvent.click(signInButton);

    expect(toastErrorMock).toHaveBeenCalledWith("Email must not be empty.");
    toast.error.mockRestore();
  });

  test("password test null", async () => {
    const toastErrorMock = jest.fn();
    toast.error = toastErrorMock;
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const signInButton = await screen.findByRole("button", {
      name: "Login",
    });

    const emailInput = screen.getByPlaceholderText("Enter email");
    await userEvent.type(emailInput, "sdjhwj@gmail.com");

    const passwordInput = screen.getByPlaceholderText("Password");
    await userEvent.type(passwordInput, "");

    userEvent.click(signInButton);

    expect(toastErrorMock).toHaveBeenCalledWith("Password must not be empty");
    toast.error.mockRestore();
  });

  test("email test false format", async () => {
    const toastErrorMock = jest.fn();
    toast.error = toastErrorMock;
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const signInButton = await screen.findByRole("button", {
      name: "Login",
    });

    const emailInput = screen.getByPlaceholderText("Enter email");
    await userEvent.type(emailInput, "invalidemai@a");

    const passwordInput = screen.getByPlaceholderText("Password");
    await userEvent.type(passwordInput, "fsdfdwe");

    userEvent.click(signInButton);

    expect(toastErrorMock).toHaveBeenCalledWith("Invalid email format.");
    toast.error.mockRestore();
  });

  // test("password incorrect", async () => {
  //   const toastErrorMock = jest.fn();
  //   toast.error = toastErrorMock;

  //   // Create a new instance of axios mock adapter
  //   const mock = new MockAdapter(axios);

  //   // Mock the postLogin endpoint with different responses
  //   mock.onPost('/api/v1/login').reply((config) => {
  //     const { email, password } = JSON.parse(config.data);
  //     if (email === 'customer@gmail.com' && password === '32443') {
  //       // If the email and password match, return a success response
  //       return [200, { EC: 0, DT: { userId: 123, username: 'customer' }, EM: 'Login successful.' }];
  //     } else {
  //       // If the email and password do not match, return an error response
  //       return [200, { EC: 1, EM: 'Incorrect email or password.' }];
  //     }
  //   });

  //   render(
  //     <Provider store={store}>
  //       <Router>
  //         <Login />
  //       </Router>
  //     </Provider>
  //   );

  //   const signInButton = await screen.findByRole("button", {
  //     name: "Login",
  //   });

  //   const emailInput = screen.getByPlaceholderText("Enter email");
  //   await userEvent.type(emailInput, "customer@gmail.com");

  //   const passwordInput = screen.getByPlaceholderText("Password");
  //   await userEvent.type(passwordInput, "32443");

  //   userEvent.click(signInButton);

  //   await waitFor(() => {
  //     expect(toastErrorMock).toHaveBeenCalledWith('Incorrect email or password.');
  //   }, { timeout: 3000 });

  //   toast.error.mockRestore();
  // })
});

describe("Booking", () => {
  test("sender not selected", async () => {
    const toastErrorMock = jest.fn();
    toast.error = toastErrorMock;
    render(
      <Provider store={store}>
        <Router>
          <Booking/>
        </Router>
      </Provider>
    );

    const selectSenderOption = screen.getByRole("combobox", {
      name: "Select sender",
    });
    userEvent.selectOptions(selectSenderOption, "");

    const nextButton = await screen.findByRole("button", {
      name: "Next",
    });
    userEvent.click(nextButton);

    expect(toastErrorMock).toHaveBeenCalledWith("Must select bird's gender.");
    toast.error.mockRestore();
  });
});
