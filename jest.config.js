module.exports = {
  preset: 'ts-jest',
  globals: {
    NODE_ENV: 'test',
  },
  verbose: true,
  rootDir: '',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testRegex: '.*_spec.tsx?$',
  moduleDirectories: ['node_modules', '<rootDir>/node_modules'],
  automock: false,
};
