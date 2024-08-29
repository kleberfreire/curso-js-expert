import { expect, describe, test, jest, beforeEach } from '@jest/globals';

import { InjectHttpInterceptor } from '../src/agent.js';
import { Server } from 'http';

const originalHttp = jest.createMockFromModule('http');
// const originalHttp = jest.createMockFromModule('http').Server.prototype.emit;

describe('HTTP Interceptor Agent', () => {
  const eventName = 'request';
  const request = null

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('should not change header', () => {
    const response = {
      setHeader: jest.fn().mockReturnThis(),
    }
    const serverInstance = new originalHttp.Server();
    serverInstance.emit(eventName, request, response)
    expect(response.setHeader).not.toHaveBeenCalled();
  });
  test('should activate header interceptor', () => {
    const response = {
      setHeader: jest.fn().mockReturnThis(),
    }
    const serverInstance = new Server();
    InjectHttpInterceptor(request, response);
    serverInstance.emit(eventName, request, response)
    expect(response.setHeader).toHaveBeenCalledWith('X-Instrumented-By', 'KleberFreire');
  });
})
