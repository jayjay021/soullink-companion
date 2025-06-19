const fakePino = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  child: jest.fn(() => ({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    child: jest.fn(() => ({
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      child: jest.fn(),
    })),
  })),
};

const fakePinoFunc = () => {
  return fakePino;
};

// Add static methods that the logger might use
fakePinoFunc.destination = jest.fn();
fakePinoFunc.stdTimeFunctions = {
  isoTime: jest.fn(() => new Date().toISOString()),
};
fakePinoFunc.stdSerializers = {};

module.exports = fakePinoFunc;
