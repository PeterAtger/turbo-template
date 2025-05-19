import { Readable } from 'node:stream';

export class SSet<T> extends Set<T> {
  toJSON() {
    return Array.from(this);
  }
}

export function nodeStreamToWebStream(readable: Readable) {
  return new ReadableStream({
    start(controller) {
      readable.on('data', (chunk) => controller.enqueue(chunk));
      readable.on('end', () => controller.close());
      readable.on('error', (err) => controller.error(err));
    },

    cancel() {
      readable.destroy();
    },
  });
}
