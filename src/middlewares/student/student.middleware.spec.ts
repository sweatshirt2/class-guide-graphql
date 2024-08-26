import StudentMiddleware from './student.middleware';

describe('StudentMiddleware', () => {
  it('should be defined', () => {
    expect(new StudentMiddleware()).toBeDefined();
  });
});
