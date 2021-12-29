import { registerAs } from '@nestjs/config';

export default registerAs('firebase', () => ({
  key: process.env.FIREBASE_KEY,
}));
