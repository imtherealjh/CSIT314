module.exports = {
  // "collectCoverageFrom": ["src/**/*.js", "!**/node_modules/**"],
  // "coverageReporters": ["html", "text", "text-summary", "cobertura"],
  testMatch: ["**/*.test.js"],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  }
};
