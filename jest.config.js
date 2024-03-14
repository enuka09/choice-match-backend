module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.js$",
  moduleFileExtensions: ["js", "json", "node"],
};
