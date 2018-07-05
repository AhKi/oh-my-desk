export default {
  readFileSync: jest.fn(() => JSON.stringify('{}')),
  writeFileSync: jest.fn(() => {}),
  existsSync: jest.fn(),
};
