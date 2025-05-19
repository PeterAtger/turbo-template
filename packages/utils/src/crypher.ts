import { createCipheriv, createDecipheriv } from 'crypto';
import ShortUniqueId from 'short-unique-id';

const HEX = 'hex';
const UTF8 = 'utf8';

export function encryptData(input: string): string {
  const { CRYPTO_SECRET_KEY, CRYPTO_SECRET_IV, CRYPTO_ECNRYPTION_METHOD } = process.env;

  if (!(CRYPTO_SECRET_KEY && CRYPTO_SECRET_IV && CRYPTO_ECNRYPTION_METHOD)) {
    throw new Error('CRYPT KEYS are not defined');
  }

  // Retrieve key and IV from environment variables
  const key = new Uint8Array(Buffer.from(CRYPTO_SECRET_KEY, HEX));
  const iv = new Uint8Array(Buffer.from(CRYPTO_SECRET_IV, HEX));
  const method = CRYPTO_ECNRYPTION_METHOD;

  // Create a cipher object
  const cipher = createCipheriv(method, key, iv);
  let encrypted = cipher.update(input, UTF8, HEX);
  encrypted += cipher.final(HEX);

  return encrypted;
}

export function decrytpData(input: string): string {
  const { CRYPTO_SECRET_KEY, CRYPTO_SECRET_IV, CRYPTO_ECNRYPTION_METHOD } = process.env;

  if (!(CRYPTO_SECRET_KEY && CRYPTO_SECRET_IV && CRYPTO_ECNRYPTION_METHOD)) {
    throw new Error('CRYPT KEYS are not defined');
  }

  // Retrieve key and IV from environment variables
  const key = new Uint8Array(Buffer.from(CRYPTO_SECRET_KEY, HEX));
  const iv = new Uint8Array(Buffer.from(CRYPTO_SECRET_IV, HEX));
  const method = CRYPTO_ECNRYPTION_METHOD;

  // Create a cipher object
  const decipher = createDecipheriv(method, key, iv);
  let decrypted = decipher.update(input, HEX, UTF8);
  decrypted += decipher.final(UTF8);

  return decrypted;
}

export function isUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export function generateShortUID(): string {
  return new ShortUniqueId({ length: 8 }).rnd();
}
