/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { splitArrayIntoChunks } from '@repo/utils';
import mongoose from 'mongoose';

const localDb = 'mongodb://mongo:localpass@localhost:27017/';

// eslint-disable-next-line no-undef
export async function migrate(remoteDb: string, stream?: NodeJS.WritableStream): Promise<boolean> {
  const localConnection = await mongoose.createConnection(localDb).asPromise();
  const remoteConnection = await mongoose.createConnection(remoteDb).asPromise();

  const databaseList = await remoteConnection.listDatabases();

  for (const db of databaseList.databases) {
    const collections = await remoteConnection.useDb(db.name).listCollections();

    for (const collection of collections) {
      const data = await remoteConnection
        .useDb(db.name)
        .collection(collection.name)
        .find({})
        .toArray();

      const chunks = splitArrayIntoChunks(data, 10);

      const insertPromises = chunks.map(async (chunk) => {
        const localCollection = localConnection.useDb(db.name).collection(collection.name);
        await localCollection.insertMany(chunk);
      });

      await Promise.all(insertPromises);
      stream?.write(`Migrated documents from ${db.name}.${collection.name}\n`);
    }
  }

  return true;
}
