module.exports = {
  roots: ['<rootDir>'],
  bail: false,
  verbose: true,
  collectCoverage: true,
  coverageDirectory: '__tests__/coverage/',
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
