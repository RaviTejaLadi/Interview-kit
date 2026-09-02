# 8. Streams & File Processing Coding

### Must Implement

1. Process a multi-gigabyte log or CSV file line-by-line using `Transform` stream and `readline` with constant $O(1)$ memory usage.
2. Implement custom Writable stream that respects backpressure by returning `false` and emitting `'drain'`.
3. Implement file compression utility using `zlib.createGzip()` and `pipeline()`.
