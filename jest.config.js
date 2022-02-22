module.exports = {
  name: "2D_Breakout",
  verbose: true,
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/public/css/__mocks__/styleMock.js"
  },
  setupFiles: ["./jest.setup.js"]
};
