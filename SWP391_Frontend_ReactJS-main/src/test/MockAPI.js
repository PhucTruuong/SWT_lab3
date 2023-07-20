export const postLogin = async (email, password) => {
    // Mock the API response based on your test scenarios
    // For example, for incorrect login, you can return:
    return {
      EC: 1,
      EM: 'Incorrect email or password.',
    };
  };