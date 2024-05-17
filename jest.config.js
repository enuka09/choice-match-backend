module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.js$",
  moduleFileExtensions: ["js", "json", "node"],
  globalSetup: "./jest.setup.js",
  globalTeardown: "./globalTeardown.js",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest-mongodb-config.js"],
};
