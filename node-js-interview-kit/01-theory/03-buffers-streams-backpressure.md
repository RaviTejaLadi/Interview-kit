# 3. Buffers, Streams & Backpressure



### Must Know

1. What is a Buffer in Node.js?
2. Why are Buffers allocated outside the V8 heap in raw C++ memory?
3. What is a Stream and why are streams critical for handling large files?
4. What are the 4 types of Streams (`Readable`, `Writable`, `Duplex`, `Transform`)?
5. What is the Backpressure problem?
6. What happens when data is read faster than it can be written?
7. What do `highWaterMark`, `pause()`, `resume()`, and the `'drain'` event do?
8. Why should you always use `stream.pipeline()` instead of `.pipe()`?
