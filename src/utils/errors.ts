// src/utils/errors.ts
export class EmailDeliveryError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'EmailDeliveryError';
    }
  }
  
  export class SMSDeliveryError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'SMSDeliveryError';
    }
  }
  