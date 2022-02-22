global.$ = jest.fn().mockImplementation(() => {
  return {
    modal: jest.fn(),
    on: jest.fn()
  };
});
