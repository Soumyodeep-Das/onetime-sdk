# OneTime SDK

Easily send and verify OTPs via email or SMS using OneTime's secure and pluggable SDK.

## 🚀 Features

- 📧 Email-based OTP delivery (powered by Nodemailer)
- 📲 SMS-based OTP delivery (powered by Twilio)
- 🔐 Secure OTP generation with `crypto`
- 📦 Easily embeddable in any Node.js backend
- 🔄 Pluggable token storage (in-memory, Redis coming soon)
- 📜 Winston-based logging and custom error classes
- ✅ Unit-test ready (Jest setup included)

## 📦 Installation

```bash
npm install onetime-sdk
```

## ⚙️ Usage

```typescript
import { sendOTPViaEmail, sendOTPViaSMS, TokenManager } from 'onetime-sdk';

// Email
await sendOTPViaEmail('hello@example.com');

// SMS
await sendOTPViaSMS('+1234567890');

// Token Management (optional usage if you're handling verification)
TokenManager.storeToken('user@example.com', '123456');
const isValid = TokenManager.verifyToken('user@example.com', '123456');
```

## 🛠️ Environment Setup

Create a `.env` file in your root:

```env
# Email credentials
ONETIME_EMAIL_SENDER=your_email@example.com
ONETIME_EMAIL_PASSWORD=your_email_password

# Twilio credentials
ONETIME_TWILIO_ACCOUNT_SID=your_twilio_sid
ONETIME_TWILIO_AUTH_TOKEN=your_twilio_auth_token
ONETIME_TWILIO_PHONE_NUMBER=+1234567890
```

Use `.env.example` as a reference.

## 🧪 Unit Testing with Jest

1. Install Jest tooling
```bash
npm install --save-dev jest ts-jest @types/jest
npx ts-jest config:init
```

2. Example test
Create `test/client.test.ts`:

```typescript
import { generateSecureOTP } from '../src/utils/helpers';

describe('OTP Generator', () => {
  it('should generate a 6-digit string', () => {
    const otp = generateSecureOTP();
    expect(otp).toMatch(/^\d{6}$/);
  });
});
```

3. Add test script in `package.json`:
```json
{
  "scripts": {
    "build": "tsc",
    "dev": "ts-node src/index.ts",
    "test": "jest"
  }
}
```

## 📘 Documentation (Coming Soon)
- API Docs
- Get API Key

## 📄 License
MIT License © OneTime Team
