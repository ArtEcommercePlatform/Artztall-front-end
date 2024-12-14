module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom', // Specify the test environment explicitly
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  
  moduleDirectories: ['node_modules', 'src'],
};
