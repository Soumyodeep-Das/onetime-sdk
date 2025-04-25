// src/errors.ts

export class OnetimeClientError extends Error {
    statusCode: number;
    constructor(message: string, statusCode = 400) {
      super(message);
      this.name = 'OnetimeClientError';
      this.statusCode = statusCode;
    }
  }
  
  export class OnetimeServerError extends Error {
    statusCode: number;
    constructor(message: string, statusCode = 500) {
      super(message);
      this.name = 'OnetimeServerError';
      this.statusCode = statusCode;
    }
  }
  
  export class OnetimeNetworkError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'OnetimeNetworkError';
    }
  }
  