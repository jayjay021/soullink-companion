import { createHelperLogger } from '../logger-helpers';

describe('logger-helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createHelperLogger', () => {
    it('should create a logger with context', () => {
      const context = { component: 'test', sessionId: 'session-1' };

      const helperLogger = createHelperLogger(context);

      expect(helperLogger).toBeDefined();
      expect(typeof helperLogger.info).toBe('function');
      expect(typeof helperLogger.error).toBe('function');
      expect(typeof helperLogger.warn).toBe('function');
      expect(typeof helperLogger.debug).toBe('function');
    });

    it('should not throw when called multiple times', () => {
      const context = { component: 'test', sessionId: 'session-1' };

      expect(() => {
        createHelperLogger(context);
        createHelperLogger(context);
        createHelperLogger({ component: 'other' });
      }).not.toThrow();
    });
  });
});
