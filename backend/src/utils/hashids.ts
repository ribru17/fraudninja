import Hashids from 'hashids';
import { InsertOneResult, ObjectId } from 'mongodb';
import { HASH_ID_SALT } from '../settings';

const hashids = new Hashids(HASH_ID_SALT);

export function encodeHex(hex: ObjectId): string {
  return hashids.encodeHex(hex.toHexString());
}

export function decodeHex(hex: string): ObjectId | undefined {
  const decoded = hashids.decodeHex(hex);

  if (decoded !== undefined) {
    return new ObjectId(decoded);
  }

  return undefined;
}

export type InsertOneResultWithoutId = Omit<InsertOneResult, 'insertedId'> & {
  insertedId: string;
};
