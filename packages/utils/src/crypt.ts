import { createHash, BinaryToTextEncoding } from 'crypto';

export const HEX = 'hex';
export const SHA_256 = 'sha256';

export const DEFAULT_HASH_CODE = SHA_256;
export const DEFAULT_DIGEST = HEX;

export function hashString(
  word: string = '',
  hashCode: string = DEFAULT_HASH_CODE,
  digest: BinaryToTextEncoding = DEFAULT_DIGEST,
  shouldHashEmptyWord = false,
) :string {
  if (!word && !shouldHashEmptyWord) {
    return '';
  }

  return createHash(hashCode).update(word).digest(digest);
}
