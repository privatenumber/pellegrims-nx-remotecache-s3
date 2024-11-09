'use strict';

var require$$0$7 = require('nx/tasks-runners/default');
var require$$0$5 = require('fs/promises');
var require$$0$3 = require('path');
var require$$1 = require('stream');
var require$$3 = require('stream/promises');
var require$$0 = require('events');
var require$$2 = require('string_decoder');
var require$$0$2 = require('assert');
var require$$1$1 = require('buffer');
var require$$0$1 = require('zlib');
var require$$2$1 = require('fs');
var require$$7 = require('process');
var require$$0$4 = require('util');
var require$$12 = require('crypto');
var require$$0$6 = require('os');
var require$$1$2 = require('tty');
var libStorage = require('@aws-sdk/lib-storage');
var clientS3 = require('@aws-sdk/client-s3');
var matcher = require('matcher');
var credentialProviderNode = require('@aws-sdk/credential-provider-node');
var clientSts = require('@aws-sdk/client-sts');
var nodeHttpHandler = require('@smithy/node-http-handler');
var hpagent = require('hpagent');

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var nxRemotecacheCustom = {};

var createCustomRunner$1 = {};

var createRemoteCacheRetrieve$1 = {};

var tar = {};

// turn tar(1) style args like `C` into the more verbose things like `cwd`

const argmap = new Map([
  ['C', 'cwd'],
  ['f', 'file'],
  ['z', 'gzip'],
  ['P', 'preservePaths'],
  ['U', 'unlink'],
  ['strip-components', 'strip'],
  ['stripComponents', 'strip'],
  ['keep-newer', 'newer'],
  ['keepNewer', 'newer'],
  ['keep-newer-files', 'newer'],
  ['keepNewerFiles', 'newer'],
  ['k', 'keep'],
  ['keep-existing', 'keep'],
  ['keepExisting', 'keep'],
  ['m', 'noMtime'],
  ['no-mtime', 'noMtime'],
  ['p', 'preserveOwner'],
  ['L', 'follow'],
  ['h', 'follow'],
]);

var highLevelOpt = opt => opt ? Object.keys(opt).map(k => [
  argmap.has(k) ? argmap.get(k) : k, opt[k],
]).reduce((set, kv) => (set[kv[0]] = kv[1], set), Object.create(null)) : {};

var minipass$1 = {};

const proc$1 =
  typeof process === 'object' && process
    ? process
    : {
        stdout: null,
        stderr: null,
      };
const EE$3 = require$$0;
const Stream$1 = require$$1;
const stringdecoder = require$$2;
const SD$1 = stringdecoder.StringDecoder;

const EOF$2 = Symbol('EOF');
const MAYBE_EMIT_END$1 = Symbol('maybeEmitEnd');
const EMITTED_END$1 = Symbol('emittedEnd');
const EMITTING_END$1 = Symbol('emittingEnd');
const EMITTED_ERROR$1 = Symbol('emittedError');
const CLOSED$1 = Symbol('closed');
const READ$2 = Symbol('read');
const FLUSH$1 = Symbol('flush');
const FLUSHCHUNK$1 = Symbol('flushChunk');
const ENCODING$1 = Symbol('encoding');
const DECODER$1 = Symbol('decoder');
const FLOWING$1 = Symbol('flowing');
const PAUSED$1 = Symbol('paused');
const RESUME$1 = Symbol('resume');
const BUFFER$1 = Symbol('buffer');
const PIPES = Symbol('pipes');
const BUFFERLENGTH$1 = Symbol('bufferLength');
const BUFFERPUSH$1 = Symbol('bufferPush');
const BUFFERSHIFT$1 = Symbol('bufferShift');
const OBJECTMODE$1 = Symbol('objectMode');
// internal event when stream is destroyed
const DESTROYED$1 = Symbol('destroyed');
// internal event when stream has an error
const ERROR = Symbol('error');
const EMITDATA$1 = Symbol('emitData');
const EMITEND$1 = Symbol('emitEnd');
const EMITEND2$1 = Symbol('emitEnd2');
const ASYNC$1 = Symbol('async');
const ABORT = Symbol('abort');
const ABORTED$1 = Symbol('aborted');
const SIGNAL = Symbol('signal');

const defer$1 = fn => Promise.resolve().then(fn);

// TODO remove when Node v8 support drops
const doIter$1 = commonjsGlobal._MP_NO_ITERATOR_SYMBOLS_ !== '1';
const ASYNCITERATOR$1 =
  (doIter$1 && Symbol.asyncIterator) || Symbol('asyncIterator not implemented');
const ITERATOR$1 =
  (doIter$1 && Symbol.iterator) || Symbol('iterator not implemented');

// events that mean 'the stream is over'
// these are treated specially, and re-emitted
// if they are listened for after emitting.
const isEndish$1 = ev => ev === 'end' || ev === 'finish' || ev === 'prefinish';

const isArrayBuffer$1 = b =>
  b instanceof ArrayBuffer ||
  (typeof b === 'object' &&
    b.constructor &&
    b.constructor.name === 'ArrayBuffer' &&
    b.byteLength >= 0);

const isArrayBufferView$1 = b => !Buffer.isBuffer(b) && ArrayBuffer.isView(b);

let Pipe$1 = class Pipe {
  constructor(src, dest, opts) {
    this.src = src;
    this.dest = dest;
    this.opts = opts;
    this.ondrain = () => src[RESUME$1]();
    dest.on('drain', this.ondrain);
  }
  unpipe() {
    this.dest.removeListener('drain', this.ondrain);
  }
  // istanbul ignore next - only here for the prototype
  proxyErrors() {}
  end() {
    this.unpipe();
    if (this.opts.end) this.dest.end();
  }
};

let PipeProxyErrors$1 = class PipeProxyErrors extends Pipe$1 {
  unpipe() {
    this.src.removeListener('error', this.proxyErrors);
    super.unpipe();
  }
  constructor(src, dest, opts) {
    super(src, dest, opts);
    this.proxyErrors = er => dest.emit('error', er);
    src.on('error', this.proxyErrors);
  }
};

let Minipass$4 = class Minipass extends Stream$1 {
  constructor(options) {
    super();
    this[FLOWING$1] = false;
    // whether we're explicitly paused
    this[PAUSED$1] = false;
    this[PIPES] = [];
    this[BUFFER$1] = [];
    this[OBJECTMODE$1] = (options && options.objectMode) || false;
    if (this[OBJECTMODE$1]) this[ENCODING$1] = null;
    else this[ENCODING$1] = (options && options.encoding) || null;
    if (this[ENCODING$1] === 'buffer') this[ENCODING$1] = null;
    this[ASYNC$1] = (options && !!options.async) || false;
    this[DECODER$1] = this[ENCODING$1] ? new SD$1(this[ENCODING$1]) : null;
    this[EOF$2] = false;
    this[EMITTED_END$1] = false;
    this[EMITTING_END$1] = false;
    this[CLOSED$1] = false;
    this[EMITTED_ERROR$1] = null;
    this.writable = true;
    this.readable = true;
    this[BUFFERLENGTH$1] = 0;
    this[DESTROYED$1] = false;
    if (options && options.debugExposeBuffer === true) {
      Object.defineProperty(this, 'buffer', { get: () => this[BUFFER$1] });
    }
    if (options && options.debugExposePipes === true) {
      Object.defineProperty(this, 'pipes', { get: () => this[PIPES] });
    }
    this[SIGNAL] = options && options.signal;
    this[ABORTED$1] = false;
    if (this[SIGNAL]) {
      this[SIGNAL].addEventListener('abort', () => this[ABORT]());
      if (this[SIGNAL].aborted) {
        this[ABORT]();
      }
    }
  }

  get bufferLength() {
    return this[BUFFERLENGTH$1]
  }

  get encoding() {
    return this[ENCODING$1]
  }
  set encoding(enc) {
    if (this[OBJECTMODE$1]) throw new Error('cannot set encoding in objectMode')

    if (
      this[ENCODING$1] &&
      enc !== this[ENCODING$1] &&
      ((this[DECODER$1] && this[DECODER$1].lastNeed) || this[BUFFERLENGTH$1])
    )
      throw new Error('cannot change encoding')

    if (this[ENCODING$1] !== enc) {
      this[DECODER$1] = enc ? new SD$1(enc) : null;
      if (this[BUFFER$1].length)
        this[BUFFER$1] = this[BUFFER$1].map(chunk => this[DECODER$1].write(chunk));
    }

    this[ENCODING$1] = enc;
  }

  setEncoding(enc) {
    this.encoding = enc;
  }

  get objectMode() {
    return this[OBJECTMODE$1]
  }
  set objectMode(om) {
    this[OBJECTMODE$1] = this[OBJECTMODE$1] || !!om;
  }

  get ['async']() {
    return this[ASYNC$1]
  }
  set ['async'](a) {
    this[ASYNC$1] = this[ASYNC$1] || !!a;
  }

  // drop everything and get out of the flow completely
  [ABORT]() {
    this[ABORTED$1] = true;
    this.emit('abort', this[SIGNAL].reason);
    this.destroy(this[SIGNAL].reason);
  }

  get aborted() {
    return this[ABORTED$1]
  }
  set aborted(_) {}

  write(chunk, encoding, cb) {
    if (this[ABORTED$1]) return false
    if (this[EOF$2]) throw new Error('write after end')

    if (this[DESTROYED$1]) {
      this.emit(
        'error',
        Object.assign(
          new Error('Cannot call write after a stream was destroyed'),
          { code: 'ERR_STREAM_DESTROYED' }
        )
      );
      return true
    }

    if (typeof encoding === 'function') (cb = encoding), (encoding = 'utf8');

    if (!encoding) encoding = 'utf8';

    const fn = this[ASYNC$1] ? defer$1 : f => f();

    // convert array buffers and typed array views into buffers
    // at some point in the future, we may want to do the opposite!
    // leave strings and buffers as-is
    // anything else switches us into object mode
    if (!this[OBJECTMODE$1] && !Buffer.isBuffer(chunk)) {
      if (isArrayBufferView$1(chunk))
        chunk = Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
      else if (isArrayBuffer$1(chunk)) chunk = Buffer.from(chunk);
      else if (typeof chunk !== 'string')
        // use the setter so we throw if we have encoding set
        this.objectMode = true;
    }

    // handle object mode up front, since it's simpler
    // this yields better performance, fewer checks later.
    if (this[OBJECTMODE$1]) {
      /* istanbul ignore if - maybe impossible? */
      if (this.flowing && this[BUFFERLENGTH$1] !== 0) this[FLUSH$1](true);

      if (this.flowing) this.emit('data', chunk);
      else this[BUFFERPUSH$1](chunk);

      if (this[BUFFERLENGTH$1] !== 0) this.emit('readable');

      if (cb) fn(cb);

      return this.flowing
    }

    // at this point the chunk is a buffer or string
    // don't buffer it up or send it to the decoder
    if (!chunk.length) {
      if (this[BUFFERLENGTH$1] !== 0) this.emit('readable');
      if (cb) fn(cb);
      return this.flowing
    }

    // fast-path writing strings of same encoding to a stream with
    // an empty buffer, skipping the buffer/decoder dance
    if (
      typeof chunk === 'string' &&
      // unless it is a string already ready for us to use
      !(encoding === this[ENCODING$1] && !this[DECODER$1].lastNeed)
    ) {
      chunk = Buffer.from(chunk, encoding);
    }

    if (Buffer.isBuffer(chunk) && this[ENCODING$1])
      chunk = this[DECODER$1].write(chunk);

    // Note: flushing CAN potentially switch us into not-flowing mode
    if (this.flowing && this[BUFFERLENGTH$1] !== 0) this[FLUSH$1](true);

    if (this.flowing) this.emit('data', chunk);
    else this[BUFFERPUSH$1](chunk);

    if (this[BUFFERLENGTH$1] !== 0) this.emit('readable');

    if (cb) fn(cb);

    return this.flowing
  }

  read(n) {
    if (this[DESTROYED$1]) return null

    if (this[BUFFERLENGTH$1] === 0 || n === 0 || n > this[BUFFERLENGTH$1]) {
      this[MAYBE_EMIT_END$1]();
      return null
    }

    if (this[OBJECTMODE$1]) n = null;

    if (this[BUFFER$1].length > 1 && !this[OBJECTMODE$1]) {
      if (this.encoding) this[BUFFER$1] = [this[BUFFER$1].join('')];
      else this[BUFFER$1] = [Buffer.concat(this[BUFFER$1], this[BUFFERLENGTH$1])];
    }

    const ret = this[READ$2](n || null, this[BUFFER$1][0]);
    this[MAYBE_EMIT_END$1]();
    return ret
  }

  [READ$2](n, chunk) {
    if (n === chunk.length || n === null) this[BUFFERSHIFT$1]();
    else {
      this[BUFFER$1][0] = chunk.slice(n);
      chunk = chunk.slice(0, n);
      this[BUFFERLENGTH$1] -= n;
    }

    this.emit('data', chunk);

    if (!this[BUFFER$1].length && !this[EOF$2]) this.emit('drain');

    return chunk
  }

  end(chunk, encoding, cb) {
    if (typeof chunk === 'function') (cb = chunk), (chunk = null);
    if (typeof encoding === 'function') (cb = encoding), (encoding = 'utf8');
    if (chunk) this.write(chunk, encoding);
    if (cb) this.once('end', cb);
    this[EOF$2] = true;
    this.writable = false;

    // if we haven't written anything, then go ahead and emit,
    // even if we're not reading.
    // we'll re-emit if a new 'end' listener is added anyway.
    // This makes MP more suitable to write-only use cases.
    if (this.flowing || !this[PAUSED$1]) this[MAYBE_EMIT_END$1]();
    return this
  }

  // don't let the internal resume be overwritten
  [RESUME$1]() {
    if (this[DESTROYED$1]) return

    this[PAUSED$1] = false;
    this[FLOWING$1] = true;
    this.emit('resume');
    if (this[BUFFER$1].length) this[FLUSH$1]();
    else if (this[EOF$2]) this[MAYBE_EMIT_END$1]();
    else this.emit('drain');
  }

  resume() {
    return this[RESUME$1]()
  }

  pause() {
    this[FLOWING$1] = false;
    this[PAUSED$1] = true;
  }

  get destroyed() {
    return this[DESTROYED$1]
  }

  get flowing() {
    return this[FLOWING$1]
  }

  get paused() {
    return this[PAUSED$1]
  }

  [BUFFERPUSH$1](chunk) {
    if (this[OBJECTMODE$1]) this[BUFFERLENGTH$1] += 1;
    else this[BUFFERLENGTH$1] += chunk.length;
    this[BUFFER$1].push(chunk);
  }

  [BUFFERSHIFT$1]() {
    if (this[OBJECTMODE$1]) this[BUFFERLENGTH$1] -= 1;
    else this[BUFFERLENGTH$1] -= this[BUFFER$1][0].length;
    return this[BUFFER$1].shift()
  }

  [FLUSH$1](noDrain) {
    do {} while (this[FLUSHCHUNK$1](this[BUFFERSHIFT$1]()) && this[BUFFER$1].length)

    if (!noDrain && !this[BUFFER$1].length && !this[EOF$2]) this.emit('drain');
  }

  [FLUSHCHUNK$1](chunk) {
    this.emit('data', chunk);
    return this.flowing
  }

  pipe(dest, opts) {
    if (this[DESTROYED$1]) return

    const ended = this[EMITTED_END$1];
    opts = opts || {};
    if (dest === proc$1.stdout || dest === proc$1.stderr) opts.end = false;
    else opts.end = opts.end !== false;
    opts.proxyErrors = !!opts.proxyErrors;

    // piping an ended stream ends immediately
    if (ended) {
      if (opts.end) dest.end();
    } else {
      this[PIPES].push(
        !opts.proxyErrors
          ? new Pipe$1(this, dest, opts)
          : new PipeProxyErrors$1(this, dest, opts)
      );
      if (this[ASYNC$1]) defer$1(() => this[RESUME$1]());
      else this[RESUME$1]();
    }

    return dest
  }

  unpipe(dest) {
    const p = this[PIPES].find(p => p.dest === dest);
    if (p) {
      this[PIPES].splice(this[PIPES].indexOf(p), 1);
      p.unpipe();
    }
  }

  addListener(ev, fn) {
    return this.on(ev, fn)
  }

  on(ev, fn) {
    const ret = super.on(ev, fn);
    if (ev === 'data' && !this[PIPES].length && !this.flowing) this[RESUME$1]();
    else if (ev === 'readable' && this[BUFFERLENGTH$1] !== 0)
      super.emit('readable');
    else if (isEndish$1(ev) && this[EMITTED_END$1]) {
      super.emit(ev);
      this.removeAllListeners(ev);
    } else if (ev === 'error' && this[EMITTED_ERROR$1]) {
      if (this[ASYNC$1]) defer$1(() => fn.call(this, this[EMITTED_ERROR$1]));
      else fn.call(this, this[EMITTED_ERROR$1]);
    }
    return ret
  }

  get emittedEnd() {
    return this[EMITTED_END$1]
  }

  [MAYBE_EMIT_END$1]() {
    if (
      !this[EMITTING_END$1] &&
      !this[EMITTED_END$1] &&
      !this[DESTROYED$1] &&
      this[BUFFER$1].length === 0 &&
      this[EOF$2]
    ) {
      this[EMITTING_END$1] = true;
      this.emit('end');
      this.emit('prefinish');
      this.emit('finish');
      if (this[CLOSED$1]) this.emit('close');
      this[EMITTING_END$1] = false;
    }
  }

  emit(ev, data, ...extra) {
    // error and close are only events allowed after calling destroy()
    if (ev !== 'error' && ev !== 'close' && ev !== DESTROYED$1 && this[DESTROYED$1])
      return
    else if (ev === 'data') {
      return !this[OBJECTMODE$1] && !data
        ? false
        : this[ASYNC$1]
        ? defer$1(() => this[EMITDATA$1](data))
        : this[EMITDATA$1](data)
    } else if (ev === 'end') {
      return this[EMITEND$1]()
    } else if (ev === 'close') {
      this[CLOSED$1] = true;
      // don't emit close before 'end' and 'finish'
      if (!this[EMITTED_END$1] && !this[DESTROYED$1]) return
      const ret = super.emit('close');
      this.removeAllListeners('close');
      return ret
    } else if (ev === 'error') {
      this[EMITTED_ERROR$1] = data;
      super.emit(ERROR, data);
      const ret =
        !this[SIGNAL] || this.listeners('error').length
          ? super.emit('error', data)
          : false;
      this[MAYBE_EMIT_END$1]();
      return ret
    } else if (ev === 'resume') {
      const ret = super.emit('resume');
      this[MAYBE_EMIT_END$1]();
      return ret
    } else if (ev === 'finish' || ev === 'prefinish') {
      const ret = super.emit(ev);
      this.removeAllListeners(ev);
      return ret
    }

    // Some other unknown event
    const ret = super.emit(ev, data, ...extra);
    this[MAYBE_EMIT_END$1]();
    return ret
  }

  [EMITDATA$1](data) {
    for (const p of this[PIPES]) {
      if (p.dest.write(data) === false) this.pause();
    }
    const ret = super.emit('data', data);
    this[MAYBE_EMIT_END$1]();
    return ret
  }

  [EMITEND$1]() {
    if (this[EMITTED_END$1]) return

    this[EMITTED_END$1] = true;
    this.readable = false;
    if (this[ASYNC$1]) defer$1(() => this[EMITEND2$1]());
    else this[EMITEND2$1]();
  }

  [EMITEND2$1]() {
    if (this[DECODER$1]) {
      const data = this[DECODER$1].end();
      if (data) {
        for (const p of this[PIPES]) {
          p.dest.write(data);
        }
        super.emit('data', data);
      }
    }

    for (const p of this[PIPES]) {
      p.end();
    }
    const ret = super.emit('end');
    this.removeAllListeners('end');
    return ret
  }

  // const all = await stream.collect()
  collect() {
    const buf = [];
    if (!this[OBJECTMODE$1]) buf.dataLength = 0;
    // set the promise first, in case an error is raised
    // by triggering the flow here.
    const p = this.promise();
    this.on('data', c => {
      buf.push(c);
      if (!this[OBJECTMODE$1]) buf.dataLength += c.length;
    });
    return p.then(() => buf)
  }

  // const data = await stream.concat()
  concat() {
    return this[OBJECTMODE$1]
      ? Promise.reject(new Error('cannot concat in objectMode'))
      : this.collect().then(buf =>
          this[OBJECTMODE$1]
            ? Promise.reject(new Error('cannot concat in objectMode'))
            : this[ENCODING$1]
            ? buf.join('')
            : Buffer.concat(buf, buf.dataLength)
        )
  }

  // stream.promise().then(() => done, er => emitted error)
  promise() {
    return new Promise((resolve, reject) => {
      this.on(DESTROYED$1, () => reject(new Error('stream destroyed')));
      this.on('error', er => reject(er));
      this.on('end', () => resolve());
    })
  }

  // for await (let chunk of stream)
  [ASYNCITERATOR$1]() {
    let stopped = false;
    const stop = () => {
      this.pause();
      stopped = true;
      return Promise.resolve({ done: true })
    };
    const next = () => {
      if (stopped) return stop()
      const res = this.read();
      if (res !== null) return Promise.resolve({ done: false, value: res })

      if (this[EOF$2]) return stop()

      let resolve = null;
      let reject = null;
      const onerr = er => {
        this.removeListener('data', ondata);
        this.removeListener('end', onend);
        this.removeListener(DESTROYED$1, ondestroy);
        stop();
        reject(er);
      };
      const ondata = value => {
        this.removeListener('error', onerr);
        this.removeListener('end', onend);
        this.removeListener(DESTROYED$1, ondestroy);
        this.pause();
        resolve({ value: value, done: !!this[EOF$2] });
      };
      const onend = () => {
        this.removeListener('error', onerr);
        this.removeListener('data', ondata);
        this.removeListener(DESTROYED$1, ondestroy);
        stop();
        resolve({ done: true });
      };
      const ondestroy = () => onerr(new Error('stream destroyed'));
      return new Promise((res, rej) => {
        reject = rej;
        resolve = res;
        this.once(DESTROYED$1, ondestroy);
        this.once('error', onerr);
        this.once('end', onend);
        this.once('data', ondata);
      })
    };

    return {
      next,
      throw: stop,
      return: stop,
      [ASYNCITERATOR$1]() {
        return this
      },
    }
  }

  // for (let chunk of stream)
  [ITERATOR$1]() {
    let stopped = false;
    const stop = () => {
      this.pause();
      this.removeListener(ERROR, stop);
      this.removeListener(DESTROYED$1, stop);
      this.removeListener('end', stop);
      stopped = true;
      return { done: true }
    };

    const next = () => {
      if (stopped) return stop()
      const value = this.read();
      return value === null ? stop() : { value }
    };
    this.once('end', stop);
    this.once(ERROR, stop);
    this.once(DESTROYED$1, stop);

    return {
      next,
      throw: stop,
      return: stop,
      [ITERATOR$1]() {
        return this
      },
    }
  }

  destroy(er) {
    if (this[DESTROYED$1]) {
      if (er) this.emit('error', er);
      else this.emit(DESTROYED$1);
      return this
    }

    this[DESTROYED$1] = true;

    // throw away all buffered data, it's never coming out
    this[BUFFER$1].length = 0;
    this[BUFFERLENGTH$1] = 0;

    if (typeof this.close === 'function' && !this[CLOSED$1]) this.close();

    if (er) this.emit('error', er);
    // if no error to emit, still reject pending promises
    else this.emit(DESTROYED$1);

    return this
  }

  static isStream(s) {
    return (
      !!s &&
      (s instanceof Minipass ||
        s instanceof Stream$1 ||
        (s instanceof EE$3 &&
          // readable
          (typeof s.pipe === 'function' ||
            // writable
            (typeof s.write === 'function' && typeof s.end === 'function'))))
    )
  }
};

minipass$1.Minipass = Minipass$4;

var minizlib = {};

// Update with any zlib constants that are added or changed in the future.
// Node v6 didn't export this, so we just hard code the version and rely
// on all the other hard-coded values from zlib v4736.  When node v6
// support drops, we can just export the realZlibConstants object.
const realZlibConstants = require$$0$1.constants ||
  /* istanbul ignore next */ { ZLIB_VERNUM: 4736 };

var constants$1 = Object.freeze(Object.assign(Object.create(null), {
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  Z_VERSION_ERROR: -6,
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  DEFLATE: 1,
  INFLATE: 2,
  GZIP: 3,
  GUNZIP: 4,
  DEFLATERAW: 5,
  INFLATERAW: 6,
  UNZIP: 7,
  BROTLI_DECODE: 8,
  BROTLI_ENCODE: 9,
  Z_MIN_WINDOWBITS: 8,
  Z_MAX_WINDOWBITS: 15,
  Z_DEFAULT_WINDOWBITS: 15,
  Z_MIN_CHUNK: 64,
  Z_MAX_CHUNK: Infinity,
  Z_DEFAULT_CHUNK: 16384,
  Z_MIN_MEMLEVEL: 1,
  Z_MAX_MEMLEVEL: 9,
  Z_DEFAULT_MEMLEVEL: 8,
  Z_MIN_LEVEL: -1,
  Z_MAX_LEVEL: 9,
  Z_DEFAULT_LEVEL: -1,
  BROTLI_OPERATION_PROCESS: 0,
  BROTLI_OPERATION_FLUSH: 1,
  BROTLI_OPERATION_FINISH: 2,
  BROTLI_OPERATION_EMIT_METADATA: 3,
  BROTLI_MODE_GENERIC: 0,
  BROTLI_MODE_TEXT: 1,
  BROTLI_MODE_FONT: 2,
  BROTLI_DEFAULT_MODE: 0,
  BROTLI_MIN_QUALITY: 0,
  BROTLI_MAX_QUALITY: 11,
  BROTLI_DEFAULT_QUALITY: 11,
  BROTLI_MIN_WINDOW_BITS: 10,
  BROTLI_MAX_WINDOW_BITS: 24,
  BROTLI_LARGE_MAX_WINDOW_BITS: 30,
  BROTLI_DEFAULT_WINDOW: 22,
  BROTLI_MIN_INPUT_BLOCK_BITS: 16,
  BROTLI_MAX_INPUT_BLOCK_BITS: 24,
  BROTLI_PARAM_MODE: 0,
  BROTLI_PARAM_QUALITY: 1,
  BROTLI_PARAM_LGWIN: 2,
  BROTLI_PARAM_LGBLOCK: 3,
  BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING: 4,
  BROTLI_PARAM_SIZE_HINT: 5,
  BROTLI_PARAM_LARGE_WINDOW: 6,
  BROTLI_PARAM_NPOSTFIX: 7,
  BROTLI_PARAM_NDIRECT: 8,
  BROTLI_DECODER_RESULT_ERROR: 0,
  BROTLI_DECODER_RESULT_SUCCESS: 1,
  BROTLI_DECODER_RESULT_NEEDS_MORE_INPUT: 2,
  BROTLI_DECODER_RESULT_NEEDS_MORE_OUTPUT: 3,
  BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION: 0,
  BROTLI_DECODER_PARAM_LARGE_WINDOW: 1,
  BROTLI_DECODER_NO_ERROR: 0,
  BROTLI_DECODER_SUCCESS: 1,
  BROTLI_DECODER_NEEDS_MORE_INPUT: 2,
  BROTLI_DECODER_NEEDS_MORE_OUTPUT: 3,
  BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_NIBBLE: -1,
  BROTLI_DECODER_ERROR_FORMAT_RESERVED: -2,
  BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_META_NIBBLE: -3,
  BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_ALPHABET: -4,
  BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_SAME: -5,
  BROTLI_DECODER_ERROR_FORMAT_CL_SPACE: -6,
  BROTLI_DECODER_ERROR_FORMAT_HUFFMAN_SPACE: -7,
  BROTLI_DECODER_ERROR_FORMAT_CONTEXT_MAP_REPEAT: -8,
  BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_1: -9,
  BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_2: -10,
  BROTLI_DECODER_ERROR_FORMAT_TRANSFORM: -11,
  BROTLI_DECODER_ERROR_FORMAT_DICTIONARY: -12,
  BROTLI_DECODER_ERROR_FORMAT_WINDOW_BITS: -13,
  BROTLI_DECODER_ERROR_FORMAT_PADDING_1: -14,
  BROTLI_DECODER_ERROR_FORMAT_PADDING_2: -15,
  BROTLI_DECODER_ERROR_FORMAT_DISTANCE: -16,
  BROTLI_DECODER_ERROR_DICTIONARY_NOT_SET: -19,
  BROTLI_DECODER_ERROR_INVALID_ARGUMENTS: -20,
  BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MODES: -21,
  BROTLI_DECODER_ERROR_ALLOC_TREE_GROUPS: -22,
  BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MAP: -25,
  BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_1: -26,
  BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_2: -27,
  BROTLI_DECODER_ERROR_ALLOC_BLOCK_TYPE_TREES: -30,
  BROTLI_DECODER_ERROR_UNREACHABLE: -31,
}, realZlibConstants));

const proc = typeof process === 'object' && process ? process : {
  stdout: null,
  stderr: null,
};
const EE$2 = require$$0;
const Stream = require$$1;
const SD = require$$2.StringDecoder;

const EOF$1 = Symbol('EOF');
const MAYBE_EMIT_END = Symbol('maybeEmitEnd');
const EMITTED_END = Symbol('emittedEnd');
const EMITTING_END = Symbol('emittingEnd');
const EMITTED_ERROR = Symbol('emittedError');
const CLOSED = Symbol('closed');
const READ$1 = Symbol('read');
const FLUSH = Symbol('flush');
const FLUSHCHUNK = Symbol('flushChunk');
const ENCODING = Symbol('encoding');
const DECODER = Symbol('decoder');
const FLOWING = Symbol('flowing');
const PAUSED = Symbol('paused');
const RESUME = Symbol('resume');
const BUFFERLENGTH = Symbol('bufferLength');
const BUFFERPUSH = Symbol('bufferPush');
const BUFFERSHIFT = Symbol('bufferShift');
const OBJECTMODE = Symbol('objectMode');
const DESTROYED = Symbol('destroyed');
const EMITDATA = Symbol('emitData');
const EMITEND = Symbol('emitEnd');
const EMITEND2 = Symbol('emitEnd2');
const ASYNC = Symbol('async');

const defer = fn => Promise.resolve().then(fn);

// TODO remove when Node v8 support drops
const doIter = commonjsGlobal._MP_NO_ITERATOR_SYMBOLS_  !== '1';
const ASYNCITERATOR = doIter && Symbol.asyncIterator
  || Symbol('asyncIterator not implemented');
const ITERATOR = doIter && Symbol.iterator
  || Symbol('iterator not implemented');

// events that mean 'the stream is over'
// these are treated specially, and re-emitted
// if they are listened for after emitting.
const isEndish = ev =>
  ev === 'end' ||
  ev === 'finish' ||
  ev === 'prefinish';

const isArrayBuffer = b => b instanceof ArrayBuffer ||
  typeof b === 'object' &&
  b.constructor &&
  b.constructor.name === 'ArrayBuffer' &&
  b.byteLength >= 0;

const isArrayBufferView = b => !Buffer.isBuffer(b) && ArrayBuffer.isView(b);

class Pipe {
  constructor (src, dest, opts) {
    this.src = src;
    this.dest = dest;
    this.opts = opts;
    this.ondrain = () => src[RESUME]();
    dest.on('drain', this.ondrain);
  }
  unpipe () {
    this.dest.removeListener('drain', this.ondrain);
  }
  // istanbul ignore next - only here for the prototype
  proxyErrors () {}
  end () {
    this.unpipe();
    if (this.opts.end)
      this.dest.end();
  }
}

class PipeProxyErrors extends Pipe {
  unpipe () {
    this.src.removeListener('error', this.proxyErrors);
    super.unpipe();
  }
  constructor (src, dest, opts) {
    super(src, dest, opts);
    this.proxyErrors = er => dest.emit('error', er);
    src.on('error', this.proxyErrors);
  }
}

var minipass = class Minipass extends Stream {
  constructor (options) {
    super();
    this[FLOWING] = false;
    // whether we're explicitly paused
    this[PAUSED] = false;
    this.pipes = [];
    this.buffer = [];
    this[OBJECTMODE] = options && options.objectMode || false;
    if (this[OBJECTMODE])
      this[ENCODING] = null;
    else
      this[ENCODING] = options && options.encoding || null;
    if (this[ENCODING] === 'buffer')
      this[ENCODING] = null;
    this[ASYNC] = options && !!options.async || false;
    this[DECODER] = this[ENCODING] ? new SD(this[ENCODING]) : null;
    this[EOF$1] = false;
    this[EMITTED_END] = false;
    this[EMITTING_END] = false;
    this[CLOSED] = false;
    this[EMITTED_ERROR] = null;
    this.writable = true;
    this.readable = true;
    this[BUFFERLENGTH] = 0;
    this[DESTROYED] = false;
  }

  get bufferLength () { return this[BUFFERLENGTH] }

  get encoding () { return this[ENCODING] }
  set encoding (enc) {
    if (this[OBJECTMODE])
      throw new Error('cannot set encoding in objectMode')

    if (this[ENCODING] && enc !== this[ENCODING] &&
        (this[DECODER] && this[DECODER].lastNeed || this[BUFFERLENGTH]))
      throw new Error('cannot change encoding')

    if (this[ENCODING] !== enc) {
      this[DECODER] = enc ? new SD(enc) : null;
      if (this.buffer.length)
        this.buffer = this.buffer.map(chunk => this[DECODER].write(chunk));
    }

    this[ENCODING] = enc;
  }

  setEncoding (enc) {
    this.encoding = enc;
  }

  get objectMode () { return this[OBJECTMODE] }
  set objectMode (om) { this[OBJECTMODE] = this[OBJECTMODE] || !!om; }

  get ['async'] () { return this[ASYNC] }
  set ['async'] (a) { this[ASYNC] = this[ASYNC] || !!a; }

  write (chunk, encoding, cb) {
    if (this[EOF$1])
      throw new Error('write after end')

    if (this[DESTROYED]) {
      this.emit('error', Object.assign(
        new Error('Cannot call write after a stream was destroyed'),
        { code: 'ERR_STREAM_DESTROYED' }
      ));
      return true
    }

    if (typeof encoding === 'function')
      cb = encoding, encoding = 'utf8';

    if (!encoding)
      encoding = 'utf8';

    const fn = this[ASYNC] ? defer : f => f();

    // convert array buffers and typed array views into buffers
    // at some point in the future, we may want to do the opposite!
    // leave strings and buffers as-is
    // anything else switches us into object mode
    if (!this[OBJECTMODE] && !Buffer.isBuffer(chunk)) {
      if (isArrayBufferView(chunk))
        chunk = Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
      else if (isArrayBuffer(chunk))
        chunk = Buffer.from(chunk);
      else if (typeof chunk !== 'string')
        // use the setter so we throw if we have encoding set
        this.objectMode = true;
    }

    // handle object mode up front, since it's simpler
    // this yields better performance, fewer checks later.
    if (this[OBJECTMODE]) {
      /* istanbul ignore if - maybe impossible? */
      if (this.flowing && this[BUFFERLENGTH] !== 0)
        this[FLUSH](true);

      if (this.flowing)
        this.emit('data', chunk);
      else
        this[BUFFERPUSH](chunk);

      if (this[BUFFERLENGTH] !== 0)
        this.emit('readable');

      if (cb)
        fn(cb);

      return this.flowing
    }

    // at this point the chunk is a buffer or string
    // don't buffer it up or send it to the decoder
    if (!chunk.length) {
      if (this[BUFFERLENGTH] !== 0)
        this.emit('readable');
      if (cb)
        fn(cb);
      return this.flowing
    }

    // fast-path writing strings of same encoding to a stream with
    // an empty buffer, skipping the buffer/decoder dance
    if (typeof chunk === 'string' &&
        // unless it is a string already ready for us to use
        !(encoding === this[ENCODING] && !this[DECODER].lastNeed)) {
      chunk = Buffer.from(chunk, encoding);
    }

    if (Buffer.isBuffer(chunk) && this[ENCODING])
      chunk = this[DECODER].write(chunk);

    // Note: flushing CAN potentially switch us into not-flowing mode
    if (this.flowing && this[BUFFERLENGTH] !== 0)
      this[FLUSH](true);

    if (this.flowing)
      this.emit('data', chunk);
    else
      this[BUFFERPUSH](chunk);

    if (this[BUFFERLENGTH] !== 0)
      this.emit('readable');

    if (cb)
      fn(cb);

    return this.flowing
  }

  read (n) {
    if (this[DESTROYED])
      return null

    if (this[BUFFERLENGTH] === 0 || n === 0 || n > this[BUFFERLENGTH]) {
      this[MAYBE_EMIT_END]();
      return null
    }

    if (this[OBJECTMODE])
      n = null;

    if (this.buffer.length > 1 && !this[OBJECTMODE]) {
      if (this.encoding)
        this.buffer = [this.buffer.join('')];
      else
        this.buffer = [Buffer.concat(this.buffer, this[BUFFERLENGTH])];
    }

    const ret = this[READ$1](n || null, this.buffer[0]);
    this[MAYBE_EMIT_END]();
    return ret
  }

  [READ$1] (n, chunk) {
    if (n === chunk.length || n === null)
      this[BUFFERSHIFT]();
    else {
      this.buffer[0] = chunk.slice(n);
      chunk = chunk.slice(0, n);
      this[BUFFERLENGTH] -= n;
    }

    this.emit('data', chunk);

    if (!this.buffer.length && !this[EOF$1])
      this.emit('drain');

    return chunk
  }

  end (chunk, encoding, cb) {
    if (typeof chunk === 'function')
      cb = chunk, chunk = null;
    if (typeof encoding === 'function')
      cb = encoding, encoding = 'utf8';
    if (chunk)
      this.write(chunk, encoding);
    if (cb)
      this.once('end', cb);
    this[EOF$1] = true;
    this.writable = false;

    // if we haven't written anything, then go ahead and emit,
    // even if we're not reading.
    // we'll re-emit if a new 'end' listener is added anyway.
    // This makes MP more suitable to write-only use cases.
    if (this.flowing || !this[PAUSED])
      this[MAYBE_EMIT_END]();
    return this
  }

  // don't let the internal resume be overwritten
  [RESUME] () {
    if (this[DESTROYED])
      return

    this[PAUSED] = false;
    this[FLOWING] = true;
    this.emit('resume');
    if (this.buffer.length)
      this[FLUSH]();
    else if (this[EOF$1])
      this[MAYBE_EMIT_END]();
    else
      this.emit('drain');
  }

  resume () {
    return this[RESUME]()
  }

  pause () {
    this[FLOWING] = false;
    this[PAUSED] = true;
  }

  get destroyed () {
    return this[DESTROYED]
  }

  get flowing () {
    return this[FLOWING]
  }

  get paused () {
    return this[PAUSED]
  }

  [BUFFERPUSH] (chunk) {
    if (this[OBJECTMODE])
      this[BUFFERLENGTH] += 1;
    else
      this[BUFFERLENGTH] += chunk.length;
    this.buffer.push(chunk);
  }

  [BUFFERSHIFT] () {
    if (this.buffer.length) {
      if (this[OBJECTMODE])
        this[BUFFERLENGTH] -= 1;
      else
        this[BUFFERLENGTH] -= this.buffer[0].length;
    }
    return this.buffer.shift()
  }

  [FLUSH] (noDrain) {
    do {} while (this[FLUSHCHUNK](this[BUFFERSHIFT]()))

    if (!noDrain && !this.buffer.length && !this[EOF$1])
      this.emit('drain');
  }

  [FLUSHCHUNK] (chunk) {
    return chunk ? (this.emit('data', chunk), this.flowing) : false
  }

  pipe (dest, opts) {
    if (this[DESTROYED])
      return

    const ended = this[EMITTED_END];
    opts = opts || {};
    if (dest === proc.stdout || dest === proc.stderr)
      opts.end = false;
    else
      opts.end = opts.end !== false;
    opts.proxyErrors = !!opts.proxyErrors;

    // piping an ended stream ends immediately
    if (ended) {
      if (opts.end)
        dest.end();
    } else {
      this.pipes.push(!opts.proxyErrors ? new Pipe(this, dest, opts)
        : new PipeProxyErrors(this, dest, opts));
      if (this[ASYNC])
        defer(() => this[RESUME]());
      else
        this[RESUME]();
    }

    return dest
  }

  unpipe (dest) {
    const p = this.pipes.find(p => p.dest === dest);
    if (p) {
      this.pipes.splice(this.pipes.indexOf(p), 1);
      p.unpipe();
    }
  }

  addListener (ev, fn) {
    return this.on(ev, fn)
  }

  on (ev, fn) {
    const ret = super.on(ev, fn);
    if (ev === 'data' && !this.pipes.length && !this.flowing)
      this[RESUME]();
    else if (ev === 'readable' && this[BUFFERLENGTH] !== 0)
      super.emit('readable');
    else if (isEndish(ev) && this[EMITTED_END]) {
      super.emit(ev);
      this.removeAllListeners(ev);
    } else if (ev === 'error' && this[EMITTED_ERROR]) {
      if (this[ASYNC])
        defer(() => fn.call(this, this[EMITTED_ERROR]));
      else
        fn.call(this, this[EMITTED_ERROR]);
    }
    return ret
  }

  get emittedEnd () {
    return this[EMITTED_END]
  }

  [MAYBE_EMIT_END] () {
    if (!this[EMITTING_END] &&
        !this[EMITTED_END] &&
        !this[DESTROYED] &&
        this.buffer.length === 0 &&
        this[EOF$1]) {
      this[EMITTING_END] = true;
      this.emit('end');
      this.emit('prefinish');
      this.emit('finish');
      if (this[CLOSED])
        this.emit('close');
      this[EMITTING_END] = false;
    }
  }

  emit (ev, data, ...extra) {
    // error and close are only events allowed after calling destroy()
    if (ev !== 'error' && ev !== 'close' && ev !== DESTROYED && this[DESTROYED])
      return
    else if (ev === 'data') {
      return !data ? false
        : this[ASYNC] ? defer(() => this[EMITDATA](data))
        : this[EMITDATA](data)
    } else if (ev === 'end') {
      return this[EMITEND]()
    } else if (ev === 'close') {
      this[CLOSED] = true;
      // don't emit close before 'end' and 'finish'
      if (!this[EMITTED_END] && !this[DESTROYED])
        return
      const ret = super.emit('close');
      this.removeAllListeners('close');
      return ret
    } else if (ev === 'error') {
      this[EMITTED_ERROR] = data;
      const ret = super.emit('error', data);
      this[MAYBE_EMIT_END]();
      return ret
    } else if (ev === 'resume') {
      const ret = super.emit('resume');
      this[MAYBE_EMIT_END]();
      return ret
    } else if (ev === 'finish' || ev === 'prefinish') {
      const ret = super.emit(ev);
      this.removeAllListeners(ev);
      return ret
    }

    // Some other unknown event
    const ret = super.emit(ev, data, ...extra);
    this[MAYBE_EMIT_END]();
    return ret
  }

  [EMITDATA] (data) {
    for (const p of this.pipes) {
      if (p.dest.write(data) === false)
        this.pause();
    }
    const ret = super.emit('data', data);
    this[MAYBE_EMIT_END]();
    return ret
  }

  [EMITEND] () {
    if (this[EMITTED_END])
      return

    this[EMITTED_END] = true;
    this.readable = false;
    if (this[ASYNC])
      defer(() => this[EMITEND2]());
    else
      this[EMITEND2]();
  }

  [EMITEND2] () {
    if (this[DECODER]) {
      const data = this[DECODER].end();
      if (data) {
        for (const p of this.pipes) {
          p.dest.write(data);
        }
        super.emit('data', data);
      }
    }

    for (const p of this.pipes) {
      p.end();
    }
    const ret = super.emit('end');
    this.removeAllListeners('end');
    return ret
  }

  // const all = await stream.collect()
  collect () {
    const buf = [];
    if (!this[OBJECTMODE])
      buf.dataLength = 0;
    // set the promise first, in case an error is raised
    // by triggering the flow here.
    const p = this.promise();
    this.on('data', c => {
      buf.push(c);
      if (!this[OBJECTMODE])
        buf.dataLength += c.length;
    });
    return p.then(() => buf)
  }

  // const data = await stream.concat()
  concat () {
    return this[OBJECTMODE]
      ? Promise.reject(new Error('cannot concat in objectMode'))
      : this.collect().then(buf =>
          this[OBJECTMODE]
            ? Promise.reject(new Error('cannot concat in objectMode'))
            : this[ENCODING] ? buf.join('') : Buffer.concat(buf, buf.dataLength))
  }

  // stream.promise().then(() => done, er => emitted error)
  promise () {
    return new Promise((resolve, reject) => {
      this.on(DESTROYED, () => reject(new Error('stream destroyed')));
      this.on('error', er => reject(er));
      this.on('end', () => resolve());
    })
  }

  // for await (let chunk of stream)
  [ASYNCITERATOR] () {
    const next = () => {
      const res = this.read();
      if (res !== null)
        return Promise.resolve({ done: false, value: res })

      if (this[EOF$1])
        return Promise.resolve({ done: true })

      let resolve = null;
      let reject = null;
      const onerr = er => {
        this.removeListener('data', ondata);
        this.removeListener('end', onend);
        reject(er);
      };
      const ondata = value => {
        this.removeListener('error', onerr);
        this.removeListener('end', onend);
        this.pause();
        resolve({ value: value, done: !!this[EOF$1] });
      };
      const onend = () => {
        this.removeListener('error', onerr);
        this.removeListener('data', ondata);
        resolve({ done: true });
      };
      const ondestroy = () => onerr(new Error('stream destroyed'));
      return new Promise((res, rej) => {
        reject = rej;
        resolve = res;
        this.once(DESTROYED, ondestroy);
        this.once('error', onerr);
        this.once('end', onend);
        this.once('data', ondata);
      })
    };

    return { next }
  }

  // for (let chunk of stream)
  [ITERATOR] () {
    const next = () => {
      const value = this.read();
      const done = value === null;
      return { value, done }
    };
    return { next }
  }

  destroy (er) {
    if (this[DESTROYED]) {
      if (er)
        this.emit('error', er);
      else
        this.emit(DESTROYED);
      return this
    }

    this[DESTROYED] = true;

    // throw away all buffered data, it's never coming out
    this.buffer.length = 0;
    this[BUFFERLENGTH] = 0;

    if (typeof this.close === 'function' && !this[CLOSED])
      this.close();

    if (er)
      this.emit('error', er);
    else // if no error to emit, still reject pending promises
      this.emit(DESTROYED);

    return this
  }

  static isStream (s) {
    return !!s && (s instanceof Minipass || s instanceof Stream ||
      s instanceof EE$2 && (
        typeof s.pipe === 'function' || // readable
        (typeof s.write === 'function' && typeof s.end === 'function') // writable
      ))
  }
};

const assert$2 = require$$0$2;
const Buffer$1 = require$$1$1.Buffer;
const realZlib = require$$0$1;

const constants = minizlib.constants = constants$1;
const Minipass$3 = minipass;

const OriginalBufferConcat = Buffer$1.concat;

const _superWrite = Symbol('_superWrite');
class ZlibError extends Error {
  constructor (err) {
    super('zlib: ' + err.message);
    this.code = err.code;
    this.errno = err.errno;
    /* istanbul ignore if */
    if (!this.code)
      this.code = 'ZLIB_ERROR';

    this.message = 'zlib: ' + err.message;
    Error.captureStackTrace(this, this.constructor);
  }

  get name () {
    return 'ZlibError'
  }
}

// the Zlib class they all inherit from
// This thing manages the queue of requests, and returns
// true or false if there is anything in the queue when
// you call the .write() method.
const _opts = Symbol('opts');
const _flushFlag = Symbol('flushFlag');
const _finishFlushFlag = Symbol('finishFlushFlag');
const _fullFlushFlag = Symbol('fullFlushFlag');
const _handle = Symbol('handle');
const _onError = Symbol('onError');
const _sawError = Symbol('sawError');
const _level = Symbol('level');
const _strategy = Symbol('strategy');
const _ended$1 = Symbol('ended');

class ZlibBase extends Minipass$3 {
  constructor (opts, mode) {
    if (!opts || typeof opts !== 'object')
      throw new TypeError('invalid options for ZlibBase constructor')

    super(opts);
    this[_sawError] = false;
    this[_ended$1] = false;
    this[_opts] = opts;

    this[_flushFlag] = opts.flush;
    this[_finishFlushFlag] = opts.finishFlush;
    // this will throw if any options are invalid for the class selected
    try {
      this[_handle] = new realZlib[mode](opts);
    } catch (er) {
      // make sure that all errors get decorated properly
      throw new ZlibError(er)
    }

    this[_onError] = (err) => {
      // no sense raising multiple errors, since we abort on the first one.
      if (this[_sawError])
        return

      this[_sawError] = true;

      // there is no way to cleanly recover.
      // continuing only obscures problems.
      this.close();
      this.emit('error', err);
    };

    this[_handle].on('error', er => this[_onError](new ZlibError(er)));
    this.once('end', () => this.close);
  }

  close () {
    if (this[_handle]) {
      this[_handle].close();
      this[_handle] = null;
      this.emit('close');
    }
  }

  reset () {
    if (!this[_sawError]) {
      assert$2(this[_handle], 'zlib binding closed');
      return this[_handle].reset()
    }
  }

  flush (flushFlag) {
    if (this.ended)
      return

    if (typeof flushFlag !== 'number')
      flushFlag = this[_fullFlushFlag];
    this.write(Object.assign(Buffer$1.alloc(0), { [_flushFlag]: flushFlag }));
  }

  end (chunk, encoding, cb) {
    if (chunk)
      this.write(chunk, encoding);
    this.flush(this[_finishFlushFlag]);
    this[_ended$1] = true;
    return super.end(null, null, cb)
  }

  get ended () {
    return this[_ended$1]
  }

  write (chunk, encoding, cb) {
    // process the chunk using the sync process
    // then super.write() all the outputted chunks
    if (typeof encoding === 'function')
      cb = encoding, encoding = 'utf8';

    if (typeof chunk === 'string')
      chunk = Buffer$1.from(chunk, encoding);

    if (this[_sawError])
      return
    assert$2(this[_handle], 'zlib binding closed');

    // _processChunk tries to .close() the native handle after it's done, so we
    // intercept that by temporarily making it a no-op.
    const nativeHandle = this[_handle]._handle;
    const originalNativeClose = nativeHandle.close;
    nativeHandle.close = () => {};
    const originalClose = this[_handle].close;
    this[_handle].close = () => {};
    // It also calls `Buffer.concat()` at the end, which may be convenient
    // for some, but which we are not interested in as it slows us down.
    Buffer$1.concat = (args) => args;
    let result;
    try {
      const flushFlag = typeof chunk[_flushFlag] === 'number'
        ? chunk[_flushFlag] : this[_flushFlag];
      result = this[_handle]._processChunk(chunk, flushFlag);
      // if we don't throw, reset it back how it was
      Buffer$1.concat = OriginalBufferConcat;
    } catch (err) {
      // or if we do, put Buffer.concat() back before we emit error
      // Error events call into user code, which may call Buffer.concat()
      Buffer$1.concat = OriginalBufferConcat;
      this[_onError](new ZlibError(err));
    } finally {
      if (this[_handle]) {
        // Core zlib resets `_handle` to null after attempting to close the
        // native handle. Our no-op handler prevented actual closure, but we
        // need to restore the `._handle` property.
        this[_handle]._handle = nativeHandle;
        nativeHandle.close = originalNativeClose;
        this[_handle].close = originalClose;
        // `_processChunk()` adds an 'error' listener. If we don't remove it
        // after each call, these handlers start piling up.
        this[_handle].removeAllListeners('error');
        // make sure OUR error listener is still attached tho
      }
    }

    if (this[_handle])
      this[_handle].on('error', er => this[_onError](new ZlibError(er)));

    let writeReturn;
    if (result) {
      if (Array.isArray(result) && result.length > 0) {
        // The first buffer is always `handle._outBuffer`, which would be
        // re-used for later invocations; so, we always have to copy that one.
        writeReturn = this[_superWrite](Buffer$1.from(result[0]));
        for (let i = 1; i < result.length; i++) {
          writeReturn = this[_superWrite](result[i]);
        }
      } else {
        writeReturn = this[_superWrite](Buffer$1.from(result));
      }
    }

    if (cb)
      cb();
    return writeReturn
  }

  [_superWrite] (data) {
    return super.write(data)
  }
}

class Zlib extends ZlibBase {
  constructor (opts, mode) {
    opts = opts || {};

    opts.flush = opts.flush || constants.Z_NO_FLUSH;
    opts.finishFlush = opts.finishFlush || constants.Z_FINISH;
    super(opts, mode);

    this[_fullFlushFlag] = constants.Z_FULL_FLUSH;
    this[_level] = opts.level;
    this[_strategy] = opts.strategy;
  }

  params (level, strategy) {
    if (this[_sawError])
      return

    if (!this[_handle])
      throw new Error('cannot switch params when binding is closed')

    // no way to test this without also not supporting params at all
    /* istanbul ignore if */
    if (!this[_handle].params)
      throw new Error('not supported in this implementation')

    if (this[_level] !== level || this[_strategy] !== strategy) {
      this.flush(constants.Z_SYNC_FLUSH);
      assert$2(this[_handle], 'zlib binding closed');
      // .params() calls .flush(), but the latter is always async in the
      // core zlib. We override .flush() temporarily to intercept that and
      // flush synchronously.
      const origFlush = this[_handle].flush;
      this[_handle].flush = (flushFlag, cb) => {
        this.flush(flushFlag);
        cb();
      };
      try {
        this[_handle].params(level, strategy);
      } finally {
        this[_handle].flush = origFlush;
      }
      /* istanbul ignore else */
      if (this[_handle]) {
        this[_level] = level;
        this[_strategy] = strategy;
      }
    }
  }
}

// minimal 2-byte header
class Deflate extends Zlib {
  constructor (opts) {
    super(opts, 'Deflate');
  }
}

class Inflate extends Zlib {
  constructor (opts) {
    super(opts, 'Inflate');
  }
}

// gzip - bigger header, same deflate compression
const _portable = Symbol('_portable');
class Gzip extends Zlib {
  constructor (opts) {
    super(opts, 'Gzip');
    this[_portable] = opts && !!opts.portable;
  }

  [_superWrite] (data) {
    if (!this[_portable])
      return super[_superWrite](data)

    // we'll always get the header emitted in one first chunk
    // overwrite the OS indicator byte with 0xFF
    this[_portable] = false;
    data[9] = 255;
    return super[_superWrite](data)
  }
}

class Gunzip extends Zlib {
  constructor (opts) {
    super(opts, 'Gunzip');
  }
}

// raw - no header
class DeflateRaw extends Zlib {
  constructor (opts) {
    super(opts, 'DeflateRaw');
  }
}

class InflateRaw extends Zlib {
  constructor (opts) {
    super(opts, 'InflateRaw');
  }
}

// auto-detect header.
class Unzip extends Zlib {
  constructor (opts) {
    super(opts, 'Unzip');
  }
}

class Brotli extends ZlibBase {
  constructor (opts, mode) {
    opts = opts || {};

    opts.flush = opts.flush || constants.BROTLI_OPERATION_PROCESS;
    opts.finishFlush = opts.finishFlush || constants.BROTLI_OPERATION_FINISH;

    super(opts, mode);

    this[_fullFlushFlag] = constants.BROTLI_OPERATION_FLUSH;
  }
}

class BrotliCompress extends Brotli {
  constructor (opts) {
    super(opts, 'BrotliCompress');
  }
}

class BrotliDecompress extends Brotli {
  constructor (opts) {
    super(opts, 'BrotliDecompress');
  }
}

minizlib.Deflate = Deflate;
minizlib.Inflate = Inflate;
minizlib.Gzip = Gzip;
minizlib.Gunzip = Gunzip;
minizlib.DeflateRaw = DeflateRaw;
minizlib.InflateRaw = InflateRaw;
minizlib.Unzip = Unzip;
/* istanbul ignore else */
if (typeof realZlib.BrotliCompress === 'function') {
  minizlib.BrotliCompress = BrotliCompress;
  minizlib.BrotliDecompress = BrotliDecompress;
} else {
  minizlib.BrotliCompress = minizlib.BrotliDecompress = class {
    constructor () {
      throw new Error('Brotli is not supported in this version of Node.js')
    }
  };
}

// on windows, either \ or / are valid directory separators.
// on unix, \ is a valid character in filenames.
// so, on windows, and only on windows, we replace all \ chars with /,
// so that we can use / as our one and only directory separator char.

const platform$4 = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform;
var normalizeWindowsPath = platform$4 !== 'win32' ? p => p
  : p => p && p.replace(/\\/g, '/');

const { Minipass: Minipass$2 } = minipass$1;
const normPath$4 = normalizeWindowsPath;

const SLURP$1 = Symbol('slurp');
var readEntry = class ReadEntry extends Minipass$2 {
  constructor (header, ex, gex) {
    super();
    // read entries always start life paused.  this is to avoid the
    // situation where Minipass's auto-ending empty streams results
    // in an entry ending before we're ready for it.
    this.pause();
    this.extended = ex;
    this.globalExtended = gex;
    this.header = header;
    this.startBlockSize = 512 * Math.ceil(header.size / 512);
    this.blockRemain = this.startBlockSize;
    this.remain = header.size;
    this.type = header.type;
    this.meta = false;
    this.ignore = false;
    switch (this.type) {
      case 'File':
      case 'OldFile':
      case 'Link':
      case 'SymbolicLink':
      case 'CharacterDevice':
      case 'BlockDevice':
      case 'Directory':
      case 'FIFO':
      case 'ContiguousFile':
      case 'GNUDumpDir':
        break

      case 'NextFileHasLongLinkpath':
      case 'NextFileHasLongPath':
      case 'OldGnuLongPath':
      case 'GlobalExtendedHeader':
      case 'ExtendedHeader':
      case 'OldExtendedHeader':
        this.meta = true;
        break

      // NOTE: gnutar and bsdtar treat unrecognized types as 'File'
      // it may be worth doing the same, but with a warning.
      default:
        this.ignore = true;
    }

    this.path = normPath$4(header.path);
    this.mode = header.mode;
    if (this.mode) {
      this.mode = this.mode & 0o7777;
    }
    this.uid = header.uid;
    this.gid = header.gid;
    this.uname = header.uname;
    this.gname = header.gname;
    this.size = header.size;
    this.mtime = header.mtime;
    this.atime = header.atime;
    this.ctime = header.ctime;
    this.linkpath = normPath$4(header.linkpath);
    this.uname = header.uname;
    this.gname = header.gname;

    if (ex) {
      this[SLURP$1](ex);
    }
    if (gex) {
      this[SLURP$1](gex, true);
    }
  }

  write (data) {
    const writeLen = data.length;
    if (writeLen > this.blockRemain) {
      throw new Error('writing more to entry than is appropriate')
    }

    const r = this.remain;
    const br = this.blockRemain;
    this.remain = Math.max(0, r - writeLen);
    this.blockRemain = Math.max(0, br - writeLen);
    if (this.ignore) {
      return true
    }

    if (r >= writeLen) {
      return super.write(data)
    }

    // r < writeLen
    return super.write(data.slice(0, r))
  }

  [SLURP$1] (ex, global) {
    for (const k in ex) {
      // we slurp in everything except for the path attribute in
      // a global extended header, because that's weird.
      if (ex[k] !== null && ex[k] !== undefined &&
          !(global && k === 'path')) {
        this[k] = k === 'path' || k === 'linkpath' ? normPath$4(ex[k]) : ex[k];
      }
    }
  }
};

var types$2 = {};

(function (exports) {
	// map types from key to human-friendly name
	exports.name = new Map([
	  ['0', 'File'],
	  // same as File
	  ['', 'OldFile'],
	  ['1', 'Link'],
	  ['2', 'SymbolicLink'],
	  // Devices and FIFOs aren't fully supported
	  // they are parsed, but skipped when unpacking
	  ['3', 'CharacterDevice'],
	  ['4', 'BlockDevice'],
	  ['5', 'Directory'],
	  ['6', 'FIFO'],
	  // same as File
	  ['7', 'ContiguousFile'],
	  // pax headers
	  ['g', 'GlobalExtendedHeader'],
	  ['x', 'ExtendedHeader'],
	  // vendor-specific stuff
	  // skip
	  ['A', 'SolarisACL'],
	  // like 5, but with data, which should be skipped
	  ['D', 'GNUDumpDir'],
	  // metadata only, skip
	  ['I', 'Inode'],
	  // data = link path of next file
	  ['K', 'NextFileHasLongLinkpath'],
	  // data = path of next file
	  ['L', 'NextFileHasLongPath'],
	  // skip
	  ['M', 'ContinuationFile'],
	  // like L
	  ['N', 'OldGnuLongPath'],
	  // skip
	  ['S', 'SparseFile'],
	  // skip
	  ['V', 'TapeVolumeHeader'],
	  // like x
	  ['X', 'OldExtendedHeader'],
	]);

	// map the other direction
	exports.code = new Map(Array.from(exports.name).map(kv => [kv[1], kv[0]])); 
} (types$2));

// Tar can encode large and negative numbers using a leading byte of
// 0xff for negative, and 0x80 for positive.

const encode = (num, buf) => {
  if (!Number.isSafeInteger(num)) {
  // The number is so large that javascript cannot represent it with integer
  // precision.
    throw Error('cannot encode number outside of javascript safe integer range')
  } else if (num < 0) {
    encodeNegative(num, buf);
  } else {
    encodePositive(num, buf);
  }
  return buf
};

const encodePositive = (num, buf) => {
  buf[0] = 0x80;

  for (var i = buf.length; i > 1; i--) {
    buf[i - 1] = num & 0xff;
    num = Math.floor(num / 0x100);
  }
};

const encodeNegative = (num, buf) => {
  buf[0] = 0xff;
  var flipped = false;
  num = num * -1;
  for (var i = buf.length; i > 1; i--) {
    var byte = num & 0xff;
    num = Math.floor(num / 0x100);
    if (flipped) {
      buf[i - 1] = onesComp(byte);
    } else if (byte === 0) {
      buf[i - 1] = 0;
    } else {
      flipped = true;
      buf[i - 1] = twosComp(byte);
    }
  }
};

const parse$4 = (buf) => {
  const pre = buf[0];
  const value = pre === 0x80 ? pos(buf.slice(1, buf.length))
    : pre === 0xff ? twos(buf)
    : null;
  if (value === null) {
    throw Error('invalid base256 encoding')
  }

  if (!Number.isSafeInteger(value)) {
  // The number is so large that javascript cannot represent it with integer
  // precision.
    throw Error('parsed number outside of javascript safe integer range')
  }

  return value
};

const twos = (buf) => {
  var len = buf.length;
  var sum = 0;
  var flipped = false;
  for (var i = len - 1; i > -1; i--) {
    var byte = buf[i];
    var f;
    if (flipped) {
      f = onesComp(byte);
    } else if (byte === 0) {
      f = byte;
    } else {
      flipped = true;
      f = twosComp(byte);
    }
    if (f !== 0) {
      sum -= f * Math.pow(256, len - i - 1);
    }
  }
  return sum
};

const pos = (buf) => {
  var len = buf.length;
  var sum = 0;
  for (var i = len - 1; i > -1; i--) {
    var byte = buf[i];
    if (byte !== 0) {
      sum += byte * Math.pow(256, len - i - 1);
    }
  }
  return sum
};

const onesComp = byte => (0xff ^ byte) & 0xff;

const twosComp = byte => ((0xff ^ byte) + 1) & 0xff;

var largeNumbers = {
  encode,
  parse: parse$4,
};

// parse a 512-byte header block to a data object, or vice-versa
// encode returns `true` if a pax extended header is needed, because
// the data could not be faithfully encoded in a simple header.
// (Also, check header.needPax to see if it needs a pax header.)

const types$1 = types$2;
const pathModule = require$$0$3.posix;
const large = largeNumbers;

const SLURP = Symbol('slurp');
const TYPE = Symbol('type');

let Header$4 = class Header {
  constructor (data, off, ex, gex) {
    this.cksumValid = false;
    this.needPax = false;
    this.nullBlock = false;

    this.block = null;
    this.path = null;
    this.mode = null;
    this.uid = null;
    this.gid = null;
    this.size = null;
    this.mtime = null;
    this.cksum = null;
    this[TYPE] = '0';
    this.linkpath = null;
    this.uname = null;
    this.gname = null;
    this.devmaj = 0;
    this.devmin = 0;
    this.atime = null;
    this.ctime = null;

    if (Buffer.isBuffer(data)) {
      this.decode(data, off || 0, ex, gex);
    } else if (data) {
      this.set(data);
    }
  }

  decode (buf, off, ex, gex) {
    if (!off) {
      off = 0;
    }

    if (!buf || !(buf.length >= off + 512)) {
      throw new Error('need 512 bytes for header')
    }

    this.path = decString(buf, off, 100);
    this.mode = decNumber(buf, off + 100, 8);
    this.uid = decNumber(buf, off + 108, 8);
    this.gid = decNumber(buf, off + 116, 8);
    this.size = decNumber(buf, off + 124, 12);
    this.mtime = decDate(buf, off + 136, 12);
    this.cksum = decNumber(buf, off + 148, 12);

    // if we have extended or global extended headers, apply them now
    // See https://github.com/npm/node-tar/pull/187
    this[SLURP](ex);
    this[SLURP](gex, true);

    // old tar versions marked dirs as a file with a trailing /
    this[TYPE] = decString(buf, off + 156, 1);
    if (this[TYPE] === '') {
      this[TYPE] = '0';
    }
    if (this[TYPE] === '0' && this.path.slice(-1) === '/') {
      this[TYPE] = '5';
    }

    // tar implementations sometimes incorrectly put the stat(dir).size
    // as the size in the tarball, even though Directory entries are
    // not able to have any body at all.  In the very rare chance that
    // it actually DOES have a body, we weren't going to do anything with
    // it anyway, and it'll just be a warning about an invalid header.
    if (this[TYPE] === '5') {
      this.size = 0;
    }

    this.linkpath = decString(buf, off + 157, 100);
    if (buf.slice(off + 257, off + 265).toString() === 'ustar\u000000') {
      this.uname = decString(buf, off + 265, 32);
      this.gname = decString(buf, off + 297, 32);
      this.devmaj = decNumber(buf, off + 329, 8);
      this.devmin = decNumber(buf, off + 337, 8);
      if (buf[off + 475] !== 0) {
        // definitely a prefix, definitely >130 chars.
        const prefix = decString(buf, off + 345, 155);
        this.path = prefix + '/' + this.path;
      } else {
        const prefix = decString(buf, off + 345, 130);
        if (prefix) {
          this.path = prefix + '/' + this.path;
        }
        this.atime = decDate(buf, off + 476, 12);
        this.ctime = decDate(buf, off + 488, 12);
      }
    }

    let sum = 8 * 0x20;
    for (let i = off; i < off + 148; i++) {
      sum += buf[i];
    }

    for (let i = off + 156; i < off + 512; i++) {
      sum += buf[i];
    }

    this.cksumValid = sum === this.cksum;
    if (this.cksum === null && sum === 8 * 0x20) {
      this.nullBlock = true;
    }
  }

  [SLURP] (ex, global) {
    for (const k in ex) {
      // we slurp in everything except for the path attribute in
      // a global extended header, because that's weird.
      if (ex[k] !== null && ex[k] !== undefined &&
          !(global && k === 'path')) {
        this[k] = ex[k];
      }
    }
  }

  encode (buf, off) {
    if (!buf) {
      buf = this.block = Buffer.alloc(512);
      off = 0;
    }

    if (!off) {
      off = 0;
    }

    if (!(buf.length >= off + 512)) {
      throw new Error('need 512 bytes for header')
    }

    const prefixSize = this.ctime || this.atime ? 130 : 155;
    const split = splitPrefix(this.path || '', prefixSize);
    const path = split[0];
    const prefix = split[1];
    this.needPax = split[2];

    this.needPax = encString(buf, off, 100, path) || this.needPax;
    this.needPax = encNumber(buf, off + 100, 8, this.mode) || this.needPax;
    this.needPax = encNumber(buf, off + 108, 8, this.uid) || this.needPax;
    this.needPax = encNumber(buf, off + 116, 8, this.gid) || this.needPax;
    this.needPax = encNumber(buf, off + 124, 12, this.size) || this.needPax;
    this.needPax = encDate(buf, off + 136, 12, this.mtime) || this.needPax;
    buf[off + 156] = this[TYPE].charCodeAt(0);
    this.needPax = encString(buf, off + 157, 100, this.linkpath) || this.needPax;
    buf.write('ustar\u000000', off + 257, 8);
    this.needPax = encString(buf, off + 265, 32, this.uname) || this.needPax;
    this.needPax = encString(buf, off + 297, 32, this.gname) || this.needPax;
    this.needPax = encNumber(buf, off + 329, 8, this.devmaj) || this.needPax;
    this.needPax = encNumber(buf, off + 337, 8, this.devmin) || this.needPax;
    this.needPax = encString(buf, off + 345, prefixSize, prefix) || this.needPax;
    if (buf[off + 475] !== 0) {
      this.needPax = encString(buf, off + 345, 155, prefix) || this.needPax;
    } else {
      this.needPax = encString(buf, off + 345, 130, prefix) || this.needPax;
      this.needPax = encDate(buf, off + 476, 12, this.atime) || this.needPax;
      this.needPax = encDate(buf, off + 488, 12, this.ctime) || this.needPax;
    }

    let sum = 8 * 0x20;
    for (let i = off; i < off + 148; i++) {
      sum += buf[i];
    }

    for (let i = off + 156; i < off + 512; i++) {
      sum += buf[i];
    }

    this.cksum = sum;
    encNumber(buf, off + 148, 8, this.cksum);
    this.cksumValid = true;

    return this.needPax
  }

  set (data) {
    for (const i in data) {
      if (data[i] !== null && data[i] !== undefined) {
        this[i] = data[i];
      }
    }
  }

  get type () {
    return types$1.name.get(this[TYPE]) || this[TYPE]
  }

  get typeKey () {
    return this[TYPE]
  }

  set type (type) {
    if (types$1.code.has(type)) {
      this[TYPE] = types$1.code.get(type);
    } else {
      this[TYPE] = type;
    }
  }
};

const splitPrefix = (p, prefixSize) => {
  const pathSize = 100;
  let pp = p;
  let prefix = '';
  let ret;
  const root = pathModule.parse(p).root || '.';

  if (Buffer.byteLength(pp) < pathSize) {
    ret = [pp, prefix, false];
  } else {
    // first set prefix to the dir, and path to the base
    prefix = pathModule.dirname(pp);
    pp = pathModule.basename(pp);

    do {
      if (Buffer.byteLength(pp) <= pathSize &&
          Buffer.byteLength(prefix) <= prefixSize) {
        // both fit!
        ret = [pp, prefix, false];
      } else if (Buffer.byteLength(pp) > pathSize &&
          Buffer.byteLength(prefix) <= prefixSize) {
        // prefix fits in prefix, but path doesn't fit in path
        ret = [pp.slice(0, pathSize - 1), prefix, true];
      } else {
        // make path take a bit from prefix
        pp = pathModule.join(pathModule.basename(prefix), pp);
        prefix = pathModule.dirname(prefix);
      }
    } while (prefix !== root && !ret)

    // at this point, found no resolution, just truncate
    if (!ret) {
      ret = [p.slice(0, pathSize - 1), '', true];
    }
  }
  return ret
};

const decString = (buf, off, size) =>
  buf.slice(off, off + size).toString('utf8').replace(/\0.*/, '');

const decDate = (buf, off, size) =>
  numToDate(decNumber(buf, off, size));

const numToDate = num => num === null ? null : new Date(num * 1000);

const decNumber = (buf, off, size) =>
  buf[off] & 0x80 ? large.parse(buf.slice(off, off + size))
  : decSmallNumber(buf, off, size);

const nanNull = value => isNaN(value) ? null : value;

const decSmallNumber = (buf, off, size) =>
  nanNull(parseInt(
    buf.slice(off, off + size)
      .toString('utf8').replace(/\0.*$/, '').trim(), 8));

// the maximum encodable as a null-terminated octal, by field size
const MAXNUM = {
  12: 0o77777777777,
  8: 0o7777777,
};

const encNumber = (buf, off, size, number) =>
  number === null ? false :
  number > MAXNUM[size] || number < 0
    ? (large.encode(number, buf.slice(off, off + size)), true)
    : (encSmallNumber(buf, off, size, number), false);

const encSmallNumber = (buf, off, size, number) =>
  buf.write(octalString(number, size), off, size, 'ascii');

const octalString = (number, size) =>
  padOctal(Math.floor(number).toString(8), size);

const padOctal = (string, size) =>
  (string.length === size - 1 ? string
  : new Array(size - string.length - 1).join('0') + string + ' ') + '\0';

const encDate = (buf, off, size, date) =>
  date === null ? false :
  encNumber(buf, off, size, date.getTime() / 1000);

// enough to fill the longest string we've got
const NULLS = new Array(156).join('\0');
// pad with nulls, return true if it's longer or non-ascii
const encString = (buf, off, size, string) =>
  string === null ? false :
  (buf.write(string + NULLS, off, size, 'utf8'),
  string.length !== Buffer.byteLength(string) || string.length > size);

var header = Header$4;

const Header$3 = header;
const path$a = require$$0$3;

let Pax$2 = class Pax {
  constructor (obj, global) {
    this.atime = obj.atime || null;
    this.charset = obj.charset || null;
    this.comment = obj.comment || null;
    this.ctime = obj.ctime || null;
    this.gid = obj.gid || null;
    this.gname = obj.gname || null;
    this.linkpath = obj.linkpath || null;
    this.mtime = obj.mtime || null;
    this.path = obj.path || null;
    this.size = obj.size || null;
    this.uid = obj.uid || null;
    this.uname = obj.uname || null;
    this.dev = obj.dev || null;
    this.ino = obj.ino || null;
    this.nlink = obj.nlink || null;
    this.global = global || false;
  }

  encode () {
    const body = this.encodeBody();
    if (body === '') {
      return null
    }

    const bodyLen = Buffer.byteLength(body);
    // round up to 512 bytes
    // add 512 for header
    const bufLen = 512 * Math.ceil(1 + bodyLen / 512);
    const buf = Buffer.allocUnsafe(bufLen);

    // 0-fill the header section, it might not hit every field
    for (let i = 0; i < 512; i++) {
      buf[i] = 0;
    }

    new Header$3({
      // XXX split the path
      // then the path should be PaxHeader + basename, but less than 99,
      // prepend with the dirname
      path: ('PaxHeader/' + path$a.basename(this.path)).slice(0, 99),
      mode: this.mode || 0o644,
      uid: this.uid || null,
      gid: this.gid || null,
      size: bodyLen,
      mtime: this.mtime || null,
      type: this.global ? 'GlobalExtendedHeader' : 'ExtendedHeader',
      linkpath: '',
      uname: this.uname || '',
      gname: this.gname || '',
      devmaj: 0,
      devmin: 0,
      atime: this.atime || null,
      ctime: this.ctime || null,
    }).encode(buf);

    buf.write(body, 512, bodyLen, 'utf8');

    // null pad after the body
    for (let i = bodyLen + 512; i < buf.length; i++) {
      buf[i] = 0;
    }

    return buf
  }

  encodeBody () {
    return (
      this.encodeField('path') +
      this.encodeField('ctime') +
      this.encodeField('atime') +
      this.encodeField('dev') +
      this.encodeField('ino') +
      this.encodeField('nlink') +
      this.encodeField('charset') +
      this.encodeField('comment') +
      this.encodeField('gid') +
      this.encodeField('gname') +
      this.encodeField('linkpath') +
      this.encodeField('mtime') +
      this.encodeField('size') +
      this.encodeField('uid') +
      this.encodeField('uname')
    )
  }

  encodeField (field) {
    if (this[field] === null || this[field] === undefined) {
      return ''
    }
    const v = this[field] instanceof Date ? this[field].getTime() / 1000
      : this[field];
    const s = ' ' +
      (field === 'dev' || field === 'ino' || field === 'nlink'
        ? 'SCHILY.' : '') +
      field + '=' + v + '\n';
    const byteLen = Buffer.byteLength(s);
    // the digits includes the length of the digits in ascii base-10
    // so if it's 9 characters, then adding 1 for the 9 makes it 10
    // which makes it 11 chars.
    let digits = Math.floor(Math.log(byteLen) / Math.log(10)) + 1;
    if (byteLen + digits >= Math.pow(10, digits)) {
      digits += 1;
    }
    const len = digits + byteLen;
    return len + s
  }
};

Pax$2.parse = (string, ex, g) => new Pax$2(merge(parseKV(string), ex), g);

const merge = (a, b) =>
  b ? Object.keys(a).reduce((s, k) => (s[k] = a[k], s), b) : a;

const parseKV = string =>
  string
    .replace(/\n$/, '')
    .split('\n')
    .reduce(parseKVLine, Object.create(null));

const parseKVLine = (set, line) => {
  const n = parseInt(line, 10);

  // XXX Values with \n in them will fail this.
  // Refactor to not be a naive line-by-line parse.
  if (n !== Buffer.byteLength(line) + 1) {
    return set
  }

  line = line.slice((n + ' ').length);
  const kv = line.split('=');
  const k = kv.shift().replace(/^SCHILY\.(dev|ino|nlink)/, '$1');
  if (!k) {
    return set
  }

  const v = kv.join('=');
  set[k] = /^([A-Z]+\.)?([mac]|birth|creation)time$/.test(k)
    ? new Date(v * 1000)
    : /^[0-9]+$/.test(v) ? +v
    : v;
  return set
};

var pax = Pax$2;

// warning: extremely hot code path.
// This has been meticulously optimized for use
// within npm install on large package trees.
// Do not edit without careful benchmarking.
var stripTrailingSlashes = str => {
  let i = str.length - 1;
  let slashesStart = -1;
  while (i > -1 && str.charAt(i) === '/') {
    slashesStart = i;
    i--;
  }
  return slashesStart === -1 ? str : str.slice(0, slashesStart)
};

var warnMixin = Base => class extends Base {
  warn (code, message, data = {}) {
    if (this.file) {
      data.file = this.file;
    }
    if (this.cwd) {
      data.cwd = this.cwd;
    }
    data.code = message instanceof Error && message.code || code;
    data.tarCode = code;
    if (!this.strict && data.recoverable !== false) {
      if (message instanceof Error) {
        data = Object.assign(message, data);
        message = message.message;
      }
      this.emit('warn', data.tarCode, message, data);
    } else if (message instanceof Error) {
      this.emit('error', Object.assign(message, data));
    } else {
      this.emit('error', Object.assign(new Error(`${code}: ${message}`), data));
    }
  }
};

// When writing files on Windows, translate the characters to their
// 0xf000 higher-encoded versions.

const raw = [
  '|',
  '<',
  '>',
  '?',
  ':',
];

const win = raw.map(char =>
  String.fromCharCode(0xf000 + char.charCodeAt(0)));

const toWin = new Map(raw.map((char, i) => [char, win[i]]));
const toRaw = new Map(win.map((char, i) => [char, raw[i]]));

var winchars$1 = {
  encode: s => raw.reduce((s, c) => s.split(c).join(toWin.get(c)), s),
  decode: s => win.reduce((s, c) => s.split(c).join(toRaw.get(c)), s),
};

// unix absolute paths are also absolute on win32, so we use this for both
const { isAbsolute, parse: parse$3 } = require$$0$3.win32;

// returns [root, stripped]
// Note that windows will think that //x/y/z/a has a "root" of //x/y, and in
// those cases, we want to sanitize it to x/y/z/a, not z/a, so we strip /
// explicitly if it's the first character.
// drive-specific relative paths on Windows get their root stripped off even
// though they are not absolute, so `c:../foo` becomes ['c:', '../foo']
var stripAbsolutePath$2 = path => {
  let r = '';

  let parsed = parse$3(path);
  while (isAbsolute(path) || parsed.root) {
    // windows will think that //x/y/z has a "root" of //x/y/
    // but strip the //?/C:/ off of //?/C:/path
    const root = path.charAt(0) === '/' && path.slice(0, 4) !== '//?/' ? '/'
      : parsed.root;
    path = path.slice(root.length);
    r += root;
    parsed = parse$3(path);
  }
  return [r, path]
};

var modeFix$1;
var hasRequiredModeFix;

function requireModeFix () {
	if (hasRequiredModeFix) return modeFix$1;
	hasRequiredModeFix = 1;
	modeFix$1 = (mode, isDir, portable) => {
	  mode &= 0o7777;

	  // in portable mode, use the minimum reasonable umask
	  // if this system creates files with 0o664 by default
	  // (as some linux distros do), then we'll write the
	  // archive with 0o644 instead.  Also, don't ever create
	  // a file that is not readable/writable by the owner.
	  if (portable) {
	    mode = (mode | 0o600) & ~0o22;
	  }

	  // if dirs are readable, then they should be listable
	  if (isDir) {
	    if (mode & 0o400) {
	      mode |= 0o100;
	    }
	    if (mode & 0o40) {
	      mode |= 0o10;
	    }
	    if (mode & 0o4) {
	      mode |= 0o1;
	    }
	  }
	  return mode
	};
	return modeFix$1;
}

const { Minipass: Minipass$1 } = minipass$1;
const Pax$1 = pax;
const Header$2 = header;
const fs$c = require$$2$1;
const path$9 = require$$0$3;
const normPath$3 = normalizeWindowsPath;
const stripSlash$3 = stripTrailingSlashes;

const prefixPath = (path, prefix) => {
  if (!prefix) {
    return normPath$3(path)
  }
  path = normPath$3(path).replace(/^\.(\/|$)/, '');
  return stripSlash$3(prefix) + '/' + path
};

const maxReadSize = 16 * 1024 * 1024;
const PROCESS$1 = Symbol('process');
const FILE$1 = Symbol('file');
const DIRECTORY$1 = Symbol('directory');
const SYMLINK$1 = Symbol('symlink');
const HARDLINK$1 = Symbol('hardlink');
const HEADER = Symbol('header');
const READ = Symbol('read');
const LSTAT = Symbol('lstat');
const ONLSTAT = Symbol('onlstat');
const ONREAD = Symbol('onread');
const ONREADLINK = Symbol('onreadlink');
const OPENFILE = Symbol('openfile');
const ONOPENFILE = Symbol('onopenfile');
const CLOSE = Symbol('close');
const MODE = Symbol('mode');
const AWAITDRAIN = Symbol('awaitDrain');
const ONDRAIN$1 = Symbol('ondrain');
const PREFIX = Symbol('prefix');
const HAD_ERROR = Symbol('hadError');
const warner$2 = warnMixin;
const winchars = winchars$1;
const stripAbsolutePath$1 = stripAbsolutePath$2;

const modeFix = requireModeFix();

const WriteEntry$1 = warner$2(class WriteEntry extends Minipass$1 {
  constructor (p, opt) {
    opt = opt || {};
    super(opt);
    if (typeof p !== 'string') {
      throw new TypeError('path is required')
    }
    this.path = normPath$3(p);
    // suppress atime, ctime, uid, gid, uname, gname
    this.portable = !!opt.portable;
    // until node has builtin pwnam functions, this'll have to do
    this.myuid = process.getuid && process.getuid() || 0;
    this.myuser = process.env.USER || '';
    this.maxReadSize = opt.maxReadSize || maxReadSize;
    this.linkCache = opt.linkCache || new Map();
    this.statCache = opt.statCache || new Map();
    this.preservePaths = !!opt.preservePaths;
    this.cwd = normPath$3(opt.cwd || process.cwd());
    this.strict = !!opt.strict;
    this.noPax = !!opt.noPax;
    this.noMtime = !!opt.noMtime;
    this.mtime = opt.mtime || null;
    this.prefix = opt.prefix ? normPath$3(opt.prefix) : null;

    this.fd = null;
    this.blockLen = null;
    this.blockRemain = null;
    this.buf = null;
    this.offset = null;
    this.length = null;
    this.pos = null;
    this.remain = null;

    if (typeof opt.onwarn === 'function') {
      this.on('warn', opt.onwarn);
    }

    let pathWarn = false;
    if (!this.preservePaths) {
      const [root, stripped] = stripAbsolutePath$1(this.path);
      if (root) {
        this.path = stripped;
        pathWarn = root;
      }
    }

    this.win32 = !!opt.win32 || process.platform === 'win32';
    if (this.win32) {
      // force the \ to / normalization, since we might not *actually*
      // be on windows, but want \ to be considered a path separator.
      this.path = winchars.decode(this.path.replace(/\\/g, '/'));
      p = p.replace(/\\/g, '/');
    }

    this.absolute = normPath$3(opt.absolute || path$9.resolve(this.cwd, p));

    if (this.path === '') {
      this.path = './';
    }

    if (pathWarn) {
      this.warn('TAR_ENTRY_INFO', `stripping ${pathWarn} from absolute path`, {
        entry: this,
        path: pathWarn + this.path,
      });
    }

    if (this.statCache.has(this.absolute)) {
      this[ONLSTAT](this.statCache.get(this.absolute));
    } else {
      this[LSTAT]();
    }
  }

  emit (ev, ...data) {
    if (ev === 'error') {
      this[HAD_ERROR] = true;
    }
    return super.emit(ev, ...data)
  }

  [LSTAT] () {
    fs$c.lstat(this.absolute, (er, stat) => {
      if (er) {
        return this.emit('error', er)
      }
      this[ONLSTAT](stat);
    });
  }

  [ONLSTAT] (stat) {
    this.statCache.set(this.absolute, stat);
    this.stat = stat;
    if (!stat.isFile()) {
      stat.size = 0;
    }
    this.type = getType(stat);
    this.emit('stat', stat);
    this[PROCESS$1]();
  }

  [PROCESS$1] () {
    switch (this.type) {
      case 'File': return this[FILE$1]()
      case 'Directory': return this[DIRECTORY$1]()
      case 'SymbolicLink': return this[SYMLINK$1]()
      // unsupported types are ignored.
      default: return this.end()
    }
  }

  [MODE] (mode) {
    return modeFix(mode, this.type === 'Directory', this.portable)
  }

  [PREFIX] (path) {
    return prefixPath(path, this.prefix)
  }

  [HEADER] () {
    if (this.type === 'Directory' && this.portable) {
      this.noMtime = true;
    }

    this.header = new Header$2({
      path: this[PREFIX](this.path),
      // only apply the prefix to hard links.
      linkpath: this.type === 'Link' ? this[PREFIX](this.linkpath)
      : this.linkpath,
      // only the permissions and setuid/setgid/sticky bitflags
      // not the higher-order bits that specify file type
      mode: this[MODE](this.stat.mode),
      uid: this.portable ? null : this.stat.uid,
      gid: this.portable ? null : this.stat.gid,
      size: this.stat.size,
      mtime: this.noMtime ? null : this.mtime || this.stat.mtime,
      type: this.type,
      uname: this.portable ? null :
      this.stat.uid === this.myuid ? this.myuser : '',
      atime: this.portable ? null : this.stat.atime,
      ctime: this.portable ? null : this.stat.ctime,
    });

    if (this.header.encode() && !this.noPax) {
      super.write(new Pax$1({
        atime: this.portable ? null : this.header.atime,
        ctime: this.portable ? null : this.header.ctime,
        gid: this.portable ? null : this.header.gid,
        mtime: this.noMtime ? null : this.mtime || this.header.mtime,
        path: this[PREFIX](this.path),
        linkpath: this.type === 'Link' ? this[PREFIX](this.linkpath)
        : this.linkpath,
        size: this.header.size,
        uid: this.portable ? null : this.header.uid,
        uname: this.portable ? null : this.header.uname,
        dev: this.portable ? null : this.stat.dev,
        ino: this.portable ? null : this.stat.ino,
        nlink: this.portable ? null : this.stat.nlink,
      }).encode());
    }
    super.write(this.header.block);
  }

  [DIRECTORY$1] () {
    if (this.path.slice(-1) !== '/') {
      this.path += '/';
    }
    this.stat.size = 0;
    this[HEADER]();
    this.end();
  }

  [SYMLINK$1] () {
    fs$c.readlink(this.absolute, (er, linkpath) => {
      if (er) {
        return this.emit('error', er)
      }
      this[ONREADLINK](linkpath);
    });
  }

  [ONREADLINK] (linkpath) {
    this.linkpath = normPath$3(linkpath);
    this[HEADER]();
    this.end();
  }

  [HARDLINK$1] (linkpath) {
    this.type = 'Link';
    this.linkpath = normPath$3(path$9.relative(this.cwd, linkpath));
    this.stat.size = 0;
    this[HEADER]();
    this.end();
  }

  [FILE$1] () {
    if (this.stat.nlink > 1) {
      const linkKey = this.stat.dev + ':' + this.stat.ino;
      if (this.linkCache.has(linkKey)) {
        const linkpath = this.linkCache.get(linkKey);
        if (linkpath.indexOf(this.cwd) === 0) {
          return this[HARDLINK$1](linkpath)
        }
      }
      this.linkCache.set(linkKey, this.absolute);
    }

    this[HEADER]();
    if (this.stat.size === 0) {
      return this.end()
    }

    this[OPENFILE]();
  }

  [OPENFILE] () {
    fs$c.open(this.absolute, 'r', (er, fd) => {
      if (er) {
        return this.emit('error', er)
      }
      this[ONOPENFILE](fd);
    });
  }

  [ONOPENFILE] (fd) {
    this.fd = fd;
    if (this[HAD_ERROR]) {
      return this[CLOSE]()
    }

    this.blockLen = 512 * Math.ceil(this.stat.size / 512);
    this.blockRemain = this.blockLen;
    const bufLen = Math.min(this.blockLen, this.maxReadSize);
    this.buf = Buffer.allocUnsafe(bufLen);
    this.offset = 0;
    this.pos = 0;
    this.remain = this.stat.size;
    this.length = this.buf.length;
    this[READ]();
  }

  [READ] () {
    const { fd, buf, offset, length, pos } = this;
    fs$c.read(fd, buf, offset, length, pos, (er, bytesRead) => {
      if (er) {
        // ignoring the error from close(2) is a bad practice, but at
        // this point we already have an error, don't need another one
        return this[CLOSE](() => this.emit('error', er))
      }
      this[ONREAD](bytesRead);
    });
  }

  [CLOSE] (cb) {
    fs$c.close(this.fd, cb);
  }

  [ONREAD] (bytesRead) {
    if (bytesRead <= 0 && this.remain > 0) {
      const er = new Error('encountered unexpected EOF');
      er.path = this.absolute;
      er.syscall = 'read';
      er.code = 'EOF';
      return this[CLOSE](() => this.emit('error', er))
    }

    if (bytesRead > this.remain) {
      const er = new Error('did not encounter expected EOF');
      er.path = this.absolute;
      er.syscall = 'read';
      er.code = 'EOF';
      return this[CLOSE](() => this.emit('error', er))
    }

    // null out the rest of the buffer, if we could fit the block padding
    // at the end of this loop, we've incremented bytesRead and this.remain
    // to be incremented up to the blockRemain level, as if we had expected
    // to get a null-padded file, and read it until the end.  then we will
    // decrement both remain and blockRemain by bytesRead, and know that we
    // reached the expected EOF, without any null buffer to append.
    if (bytesRead === this.remain) {
      for (let i = bytesRead; i < this.length && bytesRead < this.blockRemain; i++) {
        this.buf[i + this.offset] = 0;
        bytesRead++;
        this.remain++;
      }
    }

    const writeBuf = this.offset === 0 && bytesRead === this.buf.length ?
      this.buf : this.buf.slice(this.offset, this.offset + bytesRead);

    const flushed = this.write(writeBuf);
    if (!flushed) {
      this[AWAITDRAIN](() => this[ONDRAIN$1]());
    } else {
      this[ONDRAIN$1]();
    }
  }

  [AWAITDRAIN] (cb) {
    this.once('drain', cb);
  }

  write (writeBuf) {
    if (this.blockRemain < writeBuf.length) {
      const er = new Error('writing more data than expected');
      er.path = this.absolute;
      return this.emit('error', er)
    }
    this.remain -= writeBuf.length;
    this.blockRemain -= writeBuf.length;
    this.pos += writeBuf.length;
    this.offset += writeBuf.length;
    return super.write(writeBuf)
  }

  [ONDRAIN$1] () {
    if (!this.remain) {
      if (this.blockRemain) {
        super.write(Buffer.alloc(this.blockRemain));
      }
      return this[CLOSE](er => er ? this.emit('error', er) : this.end())
    }

    if (this.offset >= this.length) {
      // if we only have a smaller bit left to read, alloc a smaller buffer
      // otherwise, keep it the same length it was before.
      this.buf = Buffer.allocUnsafe(Math.min(this.blockRemain, this.buf.length));
      this.offset = 0;
    }
    this.length = this.buf.length - this.offset;
    this[READ]();
  }
});

let WriteEntrySync$1 = class WriteEntrySync extends WriteEntry$1 {
  [LSTAT] () {
    this[ONLSTAT](fs$c.lstatSync(this.absolute));
  }

  [SYMLINK$1] () {
    this[ONREADLINK](fs$c.readlinkSync(this.absolute));
  }

  [OPENFILE] () {
    this[ONOPENFILE](fs$c.openSync(this.absolute, 'r'));
  }

  [READ] () {
    let threw = true;
    try {
      const { fd, buf, offset, length, pos } = this;
      const bytesRead = fs$c.readSync(fd, buf, offset, length, pos);
      this[ONREAD](bytesRead);
      threw = false;
    } finally {
      // ignoring the error from close(2) is a bad practice, but at
      // this point we already have an error, don't need another one
      if (threw) {
        try {
          this[CLOSE](() => {});
        } catch (er) {}
      }
    }
  }

  [AWAITDRAIN] (cb) {
    cb();
  }

  [CLOSE] (cb) {
    fs$c.closeSync(this.fd);
    cb();
  }
};

const WriteEntryTar$1 = warner$2(class WriteEntryTar extends Minipass$1 {
  constructor (readEntry, opt) {
    opt = opt || {};
    super(opt);
    this.preservePaths = !!opt.preservePaths;
    this.portable = !!opt.portable;
    this.strict = !!opt.strict;
    this.noPax = !!opt.noPax;
    this.noMtime = !!opt.noMtime;

    this.readEntry = readEntry;
    this.type = readEntry.type;
    if (this.type === 'Directory' && this.portable) {
      this.noMtime = true;
    }

    this.prefix = opt.prefix || null;

    this.path = normPath$3(readEntry.path);
    this.mode = this[MODE](readEntry.mode);
    this.uid = this.portable ? null : readEntry.uid;
    this.gid = this.portable ? null : readEntry.gid;
    this.uname = this.portable ? null : readEntry.uname;
    this.gname = this.portable ? null : readEntry.gname;
    this.size = readEntry.size;
    this.mtime = this.noMtime ? null : opt.mtime || readEntry.mtime;
    this.atime = this.portable ? null : readEntry.atime;
    this.ctime = this.portable ? null : readEntry.ctime;
    this.linkpath = normPath$3(readEntry.linkpath);

    if (typeof opt.onwarn === 'function') {
      this.on('warn', opt.onwarn);
    }

    let pathWarn = false;
    if (!this.preservePaths) {
      const [root, stripped] = stripAbsolutePath$1(this.path);
      if (root) {
        this.path = stripped;
        pathWarn = root;
      }
    }

    this.remain = readEntry.size;
    this.blockRemain = readEntry.startBlockSize;

    this.header = new Header$2({
      path: this[PREFIX](this.path),
      linkpath: this.type === 'Link' ? this[PREFIX](this.linkpath)
      : this.linkpath,
      // only the permissions and setuid/setgid/sticky bitflags
      // not the higher-order bits that specify file type
      mode: this.mode,
      uid: this.portable ? null : this.uid,
      gid: this.portable ? null : this.gid,
      size: this.size,
      mtime: this.noMtime ? null : this.mtime,
      type: this.type,
      uname: this.portable ? null : this.uname,
      atime: this.portable ? null : this.atime,
      ctime: this.portable ? null : this.ctime,
    });

    if (pathWarn) {
      this.warn('TAR_ENTRY_INFO', `stripping ${pathWarn} from absolute path`, {
        entry: this,
        path: pathWarn + this.path,
      });
    }

    if (this.header.encode() && !this.noPax) {
      super.write(new Pax$1({
        atime: this.portable ? null : this.atime,
        ctime: this.portable ? null : this.ctime,
        gid: this.portable ? null : this.gid,
        mtime: this.noMtime ? null : this.mtime,
        path: this[PREFIX](this.path),
        linkpath: this.type === 'Link' ? this[PREFIX](this.linkpath)
        : this.linkpath,
        size: this.size,
        uid: this.portable ? null : this.uid,
        uname: this.portable ? null : this.uname,
        dev: this.portable ? null : this.readEntry.dev,
        ino: this.portable ? null : this.readEntry.ino,
        nlink: this.portable ? null : this.readEntry.nlink,
      }).encode());
    }

    super.write(this.header.block);
    readEntry.pipe(this);
  }

  [PREFIX] (path) {
    return prefixPath(path, this.prefix)
  }

  [MODE] (mode) {
    return modeFix(mode, this.type === 'Directory', this.portable)
  }

  write (data) {
    const writeLen = data.length;
    if (writeLen > this.blockRemain) {
      throw new Error('writing more to entry than is appropriate')
    }
    this.blockRemain -= writeLen;
    return super.write(data)
  }

  end () {
    if (this.blockRemain) {
      super.write(Buffer.alloc(this.blockRemain));
    }
    return super.end()
  }
});

WriteEntry$1.Sync = WriteEntrySync$1;
WriteEntry$1.Tar = WriteEntryTar$1;

const getType = stat =>
  stat.isFile() ? 'File'
  : stat.isDirectory() ? 'Directory'
  : stat.isSymbolicLink() ? 'SymbolicLink'
  : 'Unsupported';

var writeEntry = WriteEntry$1;

var iterator;
var hasRequiredIterator;

function requireIterator () {
	if (hasRequiredIterator) return iterator;
	hasRequiredIterator = 1;
	iterator = function (Yallist) {
	  Yallist.prototype[Symbol.iterator] = function* () {
	    for (let walker = this.head; walker; walker = walker.next) {
	      yield walker.value;
	    }
	  };
	};
	return iterator;
}

var yallist = Yallist$2;

Yallist$2.Node = Node;
Yallist$2.create = Yallist$2;

function Yallist$2 (list) {
  var self = this;
  if (!(self instanceof Yallist$2)) {
    self = new Yallist$2();
  }

  self.tail = null;
  self.head = null;
  self.length = 0;

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i]);
    }
  }

  return self
}

Yallist$2.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list')
  }

  var next = node.next;
  var prev = node.prev;

  if (next) {
    next.prev = prev;
  }

  if (prev) {
    prev.next = next;
  }

  if (node === this.head) {
    this.head = next;
  }
  if (node === this.tail) {
    this.tail = prev;
  }

  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;

  return next
};

Yallist$2.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var head = this.head;
  node.list = this;
  node.next = head;
  if (head) {
    head.prev = node;
  }

  this.head = node;
  if (!this.tail) {
    this.tail = node;
  }
  this.length++;
};

Yallist$2.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var tail = this.tail;
  node.list = this;
  node.prev = tail;
  if (tail) {
    tail.next = node;
  }

  this.tail = node;
  if (!this.head) {
    this.head = node;
  }
  this.length++;
};

Yallist$2.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i]);
  }
  return this.length
};

Yallist$2.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i]);
  }
  return this.length
};

Yallist$2.prototype.pop = function () {
  if (!this.tail) {
    return undefined
  }

  var res = this.tail.value;
  this.tail = this.tail.prev;
  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }
  this.length--;
  return res
};

Yallist$2.prototype.shift = function () {
  if (!this.head) {
    return undefined
  }

  var res = this.head.value;
  this.head = this.head.next;
  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }
  this.length--;
  return res
};

Yallist$2.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};

Yallist$2.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};

Yallist$2.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next;
  }
  if (i === n && walker !== null) {
    return walker.value
  }
};

Yallist$2.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev;
  }
  if (i === n && walker !== null) {
    return walker.value
  }
};

Yallist$2.prototype.map = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$2();
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }
  return res
};

Yallist$2.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$2();
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }
  return res
};

Yallist$2.prototype.reduce = function (fn, initial) {
  var acc;
  var walker = this.head;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }

  return acc
};

Yallist$2.prototype.reduceReverse = function (fn, initial) {
  var acc;
  var walker = this.tail;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }

  return acc
};

Yallist$2.prototype.toArray = function () {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }
  return arr
};

Yallist$2.prototype.toArrayReverse = function () {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }
  return arr
};

Yallist$2.prototype.slice = function (from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist$2();
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next;
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value);
  }
  return ret
};

Yallist$2.prototype.sliceReverse = function (from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist$2();
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev;
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value);
  }
  return ret
};

Yallist$2.prototype.splice = function (start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1;
  }
  if (start < 0) {
    start = this.length + start;
  }

  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next;
  }

  var ret = [];
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value);
    walker = this.removeNode(walker);
  }
  if (walker === null) {
    walker = this.tail;
  }

  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev;
  }

  for (var i = 0; i < nodes.length; i++) {
    walker = insert(this, walker, nodes[i]);
  }
  return ret;
};

Yallist$2.prototype.reverse = function () {
  var head = this.head;
  var tail = this.tail;
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }
  this.head = tail;
  this.tail = head;
  return this
};

function insert (self, node, value) {
  var inserted = node === self.head ?
    new Node(value, null, node, self) :
    new Node(value, node, node.next, self);

  if (inserted.next === null) {
    self.tail = inserted;
  }
  if (inserted.prev === null) {
    self.head = inserted;
  }

  self.length++;

  return inserted
}

function push (self, item) {
  self.tail = new Node(item, self.tail, null, self);
  if (!self.head) {
    self.head = self.tail;
  }
  self.length++;
}

function unshift (self, item) {
  self.head = new Node(item, null, self.head, self);
  if (!self.tail) {
    self.tail = self.head;
  }
  self.length++;
}

function Node (value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list)
  }

  this.list = list;
  this.value = value;

  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }

  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}

try {
  // add if support for Symbol.iterator is present
  requireIterator()(Yallist$2);
} catch (er) {}

// A readable tar stream creator
// Technically, this is a transform stream that you write paths into,
// and tar format comes out of.
// The `add()` method is like `write()` but returns this,
// and end() return `this` as well, so you can
// do `new Pack(opt).add('files').add('dir').end().pipe(output)
// You could also do something like:
// streamOfPaths().pipe(new Pack()).pipe(new fs.WriteStream('out.tar'))

class PackJob {
  constructor (path, absolute) {
    this.path = path || './';
    this.absolute = absolute;
    this.entry = null;
    this.stat = null;
    this.readdir = null;
    this.pending = false;
    this.ignore = false;
    this.piped = false;
  }
}

const { Minipass } = minipass$1;
const zlib$1 = minizlib;
const ReadEntry = readEntry;
const WriteEntry = writeEntry;
const WriteEntrySync = WriteEntry.Sync;
const WriteEntryTar = WriteEntry.Tar;
const Yallist$1 = yallist;
const EOF = Buffer.alloc(1024);
const ONSTAT = Symbol('onStat');
const ENDED$2 = Symbol('ended');
const QUEUE$1 = Symbol('queue');
const CURRENT = Symbol('current');
const PROCESS = Symbol('process');
const PROCESSING = Symbol('processing');
const PROCESSJOB = Symbol('processJob');
const JOBS = Symbol('jobs');
const JOBDONE = Symbol('jobDone');
const ADDFSENTRY = Symbol('addFSEntry');
const ADDTARENTRY = Symbol('addTarEntry');
const STAT = Symbol('stat');
const READDIR = Symbol('readdir');
const ONREADDIR = Symbol('onreaddir');
const PIPE = Symbol('pipe');
const ENTRY = Symbol('entry');
const ENTRYOPT = Symbol('entryOpt');
const WRITEENTRYCLASS = Symbol('writeEntryClass');
const WRITE = Symbol('write');
const ONDRAIN = Symbol('ondrain');

const fs$b = require$$2$1;
const path$8 = require$$0$3;
const warner$1 = warnMixin;
const normPath$2 = normalizeWindowsPath;

const Pack$2 = warner$1(class Pack extends Minipass {
  constructor (opt) {
    super(opt);
    opt = opt || Object.create(null);
    this.opt = opt;
    this.file = opt.file || '';
    this.cwd = opt.cwd || process.cwd();
    this.maxReadSize = opt.maxReadSize;
    this.preservePaths = !!opt.preservePaths;
    this.strict = !!opt.strict;
    this.noPax = !!opt.noPax;
    this.prefix = normPath$2(opt.prefix || '');
    this.linkCache = opt.linkCache || new Map();
    this.statCache = opt.statCache || new Map();
    this.readdirCache = opt.readdirCache || new Map();

    this[WRITEENTRYCLASS] = WriteEntry;
    if (typeof opt.onwarn === 'function') {
      this.on('warn', opt.onwarn);
    }

    this.portable = !!opt.portable;
    this.zip = null;

    if (opt.gzip || opt.brotli) {
      if (opt.gzip && opt.brotli) {
        throw new TypeError('gzip and brotli are mutually exclusive')
      }
      if (opt.gzip) {
        if (typeof opt.gzip !== 'object') {
          opt.gzip = {};
        }
        if (this.portable) {
          opt.gzip.portable = true;
        }
        this.zip = new zlib$1.Gzip(opt.gzip);
      }
      if (opt.brotli) {
        if (typeof opt.brotli !== 'object') {
          opt.brotli = {};
        }
        this.zip = new zlib$1.BrotliCompress(opt.brotli);
      }
      this.zip.on('data', chunk => super.write(chunk));
      this.zip.on('end', _ => super.end());
      this.zip.on('drain', _ => this[ONDRAIN]());
      this.on('resume', _ => this.zip.resume());
    } else {
      this.on('drain', this[ONDRAIN]);
    }

    this.noDirRecurse = !!opt.noDirRecurse;
    this.follow = !!opt.follow;
    this.noMtime = !!opt.noMtime;
    this.mtime = opt.mtime || null;

    this.filter = typeof opt.filter === 'function' ? opt.filter : _ => true;

    this[QUEUE$1] = new Yallist$1();
    this[JOBS] = 0;
    this.jobs = +opt.jobs || 4;
    this[PROCESSING] = false;
    this[ENDED$2] = false;
  }

  [WRITE] (chunk) {
    return super.write(chunk)
  }

  add (path) {
    this.write(path);
    return this
  }

  end (path) {
    if (path) {
      this.write(path);
    }
    this[ENDED$2] = true;
    this[PROCESS]();
    return this
  }

  write (path) {
    if (this[ENDED$2]) {
      throw new Error('write after end')
    }

    if (path instanceof ReadEntry) {
      this[ADDTARENTRY](path);
    } else {
      this[ADDFSENTRY](path);
    }
    return this.flowing
  }

  [ADDTARENTRY] (p) {
    const absolute = normPath$2(path$8.resolve(this.cwd, p.path));
    // in this case, we don't have to wait for the stat
    if (!this.filter(p.path, p)) {
      p.resume();
    } else {
      const job = new PackJob(p.path, absolute, false);
      job.entry = new WriteEntryTar(p, this[ENTRYOPT](job));
      job.entry.on('end', _ => this[JOBDONE](job));
      this[JOBS] += 1;
      this[QUEUE$1].push(job);
    }

    this[PROCESS]();
  }

  [ADDFSENTRY] (p) {
    const absolute = normPath$2(path$8.resolve(this.cwd, p));
    this[QUEUE$1].push(new PackJob(p, absolute));
    this[PROCESS]();
  }

  [STAT] (job) {
    job.pending = true;
    this[JOBS] += 1;
    const stat = this.follow ? 'stat' : 'lstat';
    fs$b[stat](job.absolute, (er, stat) => {
      job.pending = false;
      this[JOBS] -= 1;
      if (er) {
        this.emit('error', er);
      } else {
        this[ONSTAT](job, stat);
      }
    });
  }

  [ONSTAT] (job, stat) {
    this.statCache.set(job.absolute, stat);
    job.stat = stat;

    // now we have the stat, we can filter it.
    if (!this.filter(job.path, stat)) {
      job.ignore = true;
    }

    this[PROCESS]();
  }

  [READDIR] (job) {
    job.pending = true;
    this[JOBS] += 1;
    fs$b.readdir(job.absolute, (er, entries) => {
      job.pending = false;
      this[JOBS] -= 1;
      if (er) {
        return this.emit('error', er)
      }
      this[ONREADDIR](job, entries);
    });
  }

  [ONREADDIR] (job, entries) {
    this.readdirCache.set(job.absolute, entries);
    job.readdir = entries;
    this[PROCESS]();
  }

  [PROCESS] () {
    if (this[PROCESSING]) {
      return
    }

    this[PROCESSING] = true;
    for (let w = this[QUEUE$1].head;
      w !== null && this[JOBS] < this.jobs;
      w = w.next) {
      this[PROCESSJOB](w.value);
      if (w.value.ignore) {
        const p = w.next;
        this[QUEUE$1].removeNode(w);
        w.next = p;
      }
    }

    this[PROCESSING] = false;

    if (this[ENDED$2] && !this[QUEUE$1].length && this[JOBS] === 0) {
      if (this.zip) {
        this.zip.end(EOF);
      } else {
        super.write(EOF);
        super.end();
      }
    }
  }

  get [CURRENT] () {
    return this[QUEUE$1] && this[QUEUE$1].head && this[QUEUE$1].head.value
  }

  [JOBDONE] (job) {
    this[QUEUE$1].shift();
    this[JOBS] -= 1;
    this[PROCESS]();
  }

  [PROCESSJOB] (job) {
    if (job.pending) {
      return
    }

    if (job.entry) {
      if (job === this[CURRENT] && !job.piped) {
        this[PIPE](job);
      }
      return
    }

    if (!job.stat) {
      if (this.statCache.has(job.absolute)) {
        this[ONSTAT](job, this.statCache.get(job.absolute));
      } else {
        this[STAT](job);
      }
    }
    if (!job.stat) {
      return
    }

    // filtered out!
    if (job.ignore) {
      return
    }

    if (!this.noDirRecurse && job.stat.isDirectory() && !job.readdir) {
      if (this.readdirCache.has(job.absolute)) {
        this[ONREADDIR](job, this.readdirCache.get(job.absolute));
      } else {
        this[READDIR](job);
      }
      if (!job.readdir) {
        return
      }
    }

    // we know it doesn't have an entry, because that got checked above
    job.entry = this[ENTRY](job);
    if (!job.entry) {
      job.ignore = true;
      return
    }

    if (job === this[CURRENT] && !job.piped) {
      this[PIPE](job);
    }
  }

  [ENTRYOPT] (job) {
    return {
      onwarn: (code, msg, data) => this.warn(code, msg, data),
      noPax: this.noPax,
      cwd: this.cwd,
      absolute: job.absolute,
      preservePaths: this.preservePaths,
      maxReadSize: this.maxReadSize,
      strict: this.strict,
      portable: this.portable,
      linkCache: this.linkCache,
      statCache: this.statCache,
      noMtime: this.noMtime,
      mtime: this.mtime,
      prefix: this.prefix,
    }
  }

  [ENTRY] (job) {
    this[JOBS] += 1;
    try {
      return new this[WRITEENTRYCLASS](job.path, this[ENTRYOPT](job))
        .on('end', () => this[JOBDONE](job))
        .on('error', er => this.emit('error', er))
    } catch (er) {
      this.emit('error', er);
    }
  }

  [ONDRAIN] () {
    if (this[CURRENT] && this[CURRENT].entry) {
      this[CURRENT].entry.resume();
    }
  }

  // like .pipe() but using super, because our write() is special
  [PIPE] (job) {
    job.piped = true;

    if (job.readdir) {
      job.readdir.forEach(entry => {
        const p = job.path;
        const base = p === './' ? '' : p.replace(/\/*$/, '/');
        this[ADDFSENTRY](base + entry);
      });
    }

    const source = job.entry;
    const zip = this.zip;

    if (zip) {
      source.on('data', chunk => {
        if (!zip.write(chunk)) {
          source.pause();
        }
      });
    } else {
      source.on('data', chunk => {
        if (!super.write(chunk)) {
          source.pause();
        }
      });
    }
  }

  pause () {
    if (this.zip) {
      this.zip.pause();
    }
    return super.pause()
  }
});

class PackSync extends Pack$2 {
  constructor (opt) {
    super(opt);
    this[WRITEENTRYCLASS] = WriteEntrySync;
  }

  // pause/resume are no-ops in sync streams.
  pause () {}
  resume () {}

  [STAT] (job) {
    const stat = this.follow ? 'statSync' : 'lstatSync';
    this[ONSTAT](job, fs$b[stat](job.absolute));
  }

  [READDIR] (job, stat) {
    this[ONREADDIR](job, fs$b.readdirSync(job.absolute));
  }

  // gotta get it all in this tick
  [PIPE] (job) {
    const source = job.entry;
    const zip = this.zip;

    if (job.readdir) {
      job.readdir.forEach(entry => {
        const p = job.path;
        const base = p === './' ? '' : p.replace(/\/*$/, '/');
        this[ADDFSENTRY](base + entry);
      });
    }

    if (zip) {
      source.on('data', chunk => {
        zip.write(chunk);
      });
    } else {
      source.on('data', chunk => {
        super[WRITE](chunk);
      });
    }
  }
}

Pack$2.Sync = PackSync;

var pack = Pack$2;

var fsMinipass = {};

const MiniPass = minipass;
const EE$1 = require$$0.EventEmitter;
const fs$a = require$$2$1;

let writev = fs$a.writev;
/* istanbul ignore next */
if (!writev) {
  // This entire block can be removed if support for earlier than Node.js
  // 12.9.0 is not needed.
  const binding = process.binding('fs');
  const FSReqWrap = binding.FSReqWrap || binding.FSReqCallback;

  writev = (fd, iovec, pos, cb) => {
    const done = (er, bw) => cb(er, bw, iovec);
    const req = new FSReqWrap();
    req.oncomplete = done;
    binding.writeBuffers(fd, iovec, pos, req);
  };
}

const _autoClose = Symbol('_autoClose');
const _close = Symbol('_close');
const _ended = Symbol('_ended');
const _fd = Symbol('_fd');
const _finished = Symbol('_finished');
const _flags = Symbol('_flags');
const _flush = Symbol('_flush');
const _handleChunk = Symbol('_handleChunk');
const _makeBuf = Symbol('_makeBuf');
const _mode = Symbol('_mode');
const _needDrain = Symbol('_needDrain');
const _onerror = Symbol('_onerror');
const _onopen = Symbol('_onopen');
const _onread = Symbol('_onread');
const _onwrite = Symbol('_onwrite');
const _open = Symbol('_open');
const _path = Symbol('_path');
const _pos = Symbol('_pos');
const _queue = Symbol('_queue');
const _read = Symbol('_read');
const _readSize = Symbol('_readSize');
const _reading = Symbol('_reading');
const _remain = Symbol('_remain');
const _size = Symbol('_size');
const _write = Symbol('_write');
const _writing = Symbol('_writing');
const _defaultFlag = Symbol('_defaultFlag');
const _errored = Symbol('_errored');

class ReadStream extends MiniPass {
  constructor (path, opt) {
    opt = opt || {};
    super(opt);

    this.readable = true;
    this.writable = false;

    if (typeof path !== 'string')
      throw new TypeError('path must be a string')

    this[_errored] = false;
    this[_fd] = typeof opt.fd === 'number' ? opt.fd : null;
    this[_path] = path;
    this[_readSize] = opt.readSize || 16*1024*1024;
    this[_reading] = false;
    this[_size] = typeof opt.size === 'number' ? opt.size : Infinity;
    this[_remain] = this[_size];
    this[_autoClose] = typeof opt.autoClose === 'boolean' ?
      opt.autoClose : true;

    if (typeof this[_fd] === 'number')
      this[_read]();
    else
      this[_open]();
  }

  get fd () { return this[_fd] }
  get path () { return this[_path] }

  write () {
    throw new TypeError('this is a readable stream')
  }

  end () {
    throw new TypeError('this is a readable stream')
  }

  [_open] () {
    fs$a.open(this[_path], 'r', (er, fd) => this[_onopen](er, fd));
  }

  [_onopen] (er, fd) {
    if (er)
      this[_onerror](er);
    else {
      this[_fd] = fd;
      this.emit('open', fd);
      this[_read]();
    }
  }

  [_makeBuf] () {
    return Buffer.allocUnsafe(Math.min(this[_readSize], this[_remain]))
  }

  [_read] () {
    if (!this[_reading]) {
      this[_reading] = true;
      const buf = this[_makeBuf]();
      /* istanbul ignore if */
      if (buf.length === 0)
        return process.nextTick(() => this[_onread](null, 0, buf))
      fs$a.read(this[_fd], buf, 0, buf.length, null, (er, br, buf) =>
        this[_onread](er, br, buf));
    }
  }

  [_onread] (er, br, buf) {
    this[_reading] = false;
    if (er)
      this[_onerror](er);
    else if (this[_handleChunk](br, buf))
      this[_read]();
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      const fd = this[_fd];
      this[_fd] = null;
      fs$a.close(fd, er => er ? this.emit('error', er) : this.emit('close'));
    }
  }

  [_onerror] (er) {
    this[_reading] = true;
    this[_close]();
    this.emit('error', er);
  }

  [_handleChunk] (br, buf) {
    let ret = false;
    // no effect if infinite
    this[_remain] -= br;
    if (br > 0)
      ret = super.write(br < buf.length ? buf.slice(0, br) : buf);

    if (br === 0 || this[_remain] <= 0) {
      ret = false;
      this[_close]();
      super.end();
    }

    return ret
  }

  emit (ev, data) {
    switch (ev) {
      case 'prefinish':
      case 'finish':
        break

      case 'drain':
        if (typeof this[_fd] === 'number')
          this[_read]();
        break

      case 'error':
        if (this[_errored])
          return
        this[_errored] = true;
        return super.emit(ev, data)

      default:
        return super.emit(ev, data)
    }
  }
}

class ReadStreamSync extends ReadStream {
  [_open] () {
    let threw = true;
    try {
      this[_onopen](null, fs$a.openSync(this[_path], 'r'));
      threw = false;
    } finally {
      if (threw)
        this[_close]();
    }
  }

  [_read] () {
    let threw = true;
    try {
      if (!this[_reading]) {
        this[_reading] = true;
        do {
          const buf = this[_makeBuf]();
          /* istanbul ignore next */
          const br = buf.length === 0 ? 0
            : fs$a.readSync(this[_fd], buf, 0, buf.length, null);
          if (!this[_handleChunk](br, buf))
            break
        } while (true)
        this[_reading] = false;
      }
      threw = false;
    } finally {
      if (threw)
        this[_close]();
    }
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      const fd = this[_fd];
      this[_fd] = null;
      fs$a.closeSync(fd);
      this.emit('close');
    }
  }
}

class WriteStream extends EE$1 {
  constructor (path, opt) {
    opt = opt || {};
    super(opt);
    this.readable = false;
    this.writable = true;
    this[_errored] = false;
    this[_writing] = false;
    this[_ended] = false;
    this[_needDrain] = false;
    this[_queue] = [];
    this[_path] = path;
    this[_fd] = typeof opt.fd === 'number' ? opt.fd : null;
    this[_mode] = opt.mode === undefined ? 0o666 : opt.mode;
    this[_pos] = typeof opt.start === 'number' ? opt.start : null;
    this[_autoClose] = typeof opt.autoClose === 'boolean' ?
      opt.autoClose : true;

    // truncating makes no sense when writing into the middle
    const defaultFlag = this[_pos] !== null ? 'r+' : 'w';
    this[_defaultFlag] = opt.flags === undefined;
    this[_flags] = this[_defaultFlag] ? defaultFlag : opt.flags;

    if (this[_fd] === null)
      this[_open]();
  }

  emit (ev, data) {
    if (ev === 'error') {
      if (this[_errored])
        return
      this[_errored] = true;
    }
    return super.emit(ev, data)
  }


  get fd () { return this[_fd] }
  get path () { return this[_path] }

  [_onerror] (er) {
    this[_close]();
    this[_writing] = true;
    this.emit('error', er);
  }

  [_open] () {
    fs$a.open(this[_path], this[_flags], this[_mode],
      (er, fd) => this[_onopen](er, fd));
  }

  [_onopen] (er, fd) {
    if (this[_defaultFlag] &&
        this[_flags] === 'r+' &&
        er && er.code === 'ENOENT') {
      this[_flags] = 'w';
      this[_open]();
    } else if (er)
      this[_onerror](er);
    else {
      this[_fd] = fd;
      this.emit('open', fd);
      this[_flush]();
    }
  }

  end (buf, enc) {
    if (buf)
      this.write(buf, enc);

    this[_ended] = true;

    // synthetic after-write logic, where drain/finish live
    if (!this[_writing] && !this[_queue].length &&
        typeof this[_fd] === 'number')
      this[_onwrite](null, 0);
    return this
  }

  write (buf, enc) {
    if (typeof buf === 'string')
      buf = Buffer.from(buf, enc);

    if (this[_ended]) {
      this.emit('error', new Error('write() after end()'));
      return false
    }

    if (this[_fd] === null || this[_writing] || this[_queue].length) {
      this[_queue].push(buf);
      this[_needDrain] = true;
      return false
    }

    this[_writing] = true;
    this[_write](buf);
    return true
  }

  [_write] (buf) {
    fs$a.write(this[_fd], buf, 0, buf.length, this[_pos], (er, bw) =>
      this[_onwrite](er, bw));
  }

  [_onwrite] (er, bw) {
    if (er)
      this[_onerror](er);
    else {
      if (this[_pos] !== null)
        this[_pos] += bw;
      if (this[_queue].length)
        this[_flush]();
      else {
        this[_writing] = false;

        if (this[_ended] && !this[_finished]) {
          this[_finished] = true;
          this[_close]();
          this.emit('finish');
        } else if (this[_needDrain]) {
          this[_needDrain] = false;
          this.emit('drain');
        }
      }
    }
  }

  [_flush] () {
    if (this[_queue].length === 0) {
      if (this[_ended])
        this[_onwrite](null, 0);
    } else if (this[_queue].length === 1)
      this[_write](this[_queue].pop());
    else {
      const iovec = this[_queue];
      this[_queue] = [];
      writev(this[_fd], iovec, this[_pos],
        (er, bw) => this[_onwrite](er, bw));
    }
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      const fd = this[_fd];
      this[_fd] = null;
      fs$a.close(fd, er => er ? this.emit('error', er) : this.emit('close'));
    }
  }
}

class WriteStreamSync extends WriteStream {
  [_open] () {
    let fd;
    // only wrap in a try{} block if we know we'll retry, to avoid
    // the rethrow obscuring the error's source frame in most cases.
    if (this[_defaultFlag] && this[_flags] === 'r+') {
      try {
        fd = fs$a.openSync(this[_path], this[_flags], this[_mode]);
      } catch (er) {
        if (er.code === 'ENOENT') {
          this[_flags] = 'w';
          return this[_open]()
        } else
          throw er
      }
    } else
      fd = fs$a.openSync(this[_path], this[_flags], this[_mode]);

    this[_onopen](null, fd);
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      const fd = this[_fd];
      this[_fd] = null;
      fs$a.closeSync(fd);
      this.emit('close');
    }
  }

  [_write] (buf) {
    // throw the original, but try to close if it fails
    let threw = true;
    try {
      this[_onwrite](null,
        fs$a.writeSync(this[_fd], buf, 0, buf.length, this[_pos]));
      threw = false;
    } finally {
      if (threw)
        try { this[_close](); } catch (_) {}
    }
  }
}

fsMinipass.ReadStream = ReadStream;
fsMinipass.ReadStreamSync = ReadStreamSync;

fsMinipass.WriteStream = WriteStream;
fsMinipass.WriteStreamSync = WriteStreamSync;

// this[BUFFER] is the remainder of a chunk if we're waiting for
// the full 512 bytes of a header to come in.  We will Buffer.concat()
// it to the next write(), which is a mem copy, but a small one.
//
// this[QUEUE] is a Yallist of entries that haven't been emitted
// yet this can only get filled up if the user keeps write()ing after
// a write() returns false, or does a write() with more than one entry
//
// We don't buffer chunks, we always parse them and either create an
// entry, or push it into the active entry.  The ReadEntry class knows
// to throw data away if .ignore=true
//
// Shift entry off the buffer when it emits 'end', and emit 'entry' for
// the next one in the list.
//
// At any time, we're pushing body chunks into the entry at WRITEENTRY,
// and waiting for 'end' on the entry at READENTRY
//
// ignored entries get .resume() called on them straight away

const warner = warnMixin;
const Header$1 = header;
const EE = require$$0;
const Yallist = yallist;
const maxMetaEntrySize = 1024 * 1024;
const Entry = readEntry;
const Pax = pax;
const zlib = minizlib;
const { nextTick } = require$$7;

const gzipHeader = Buffer.from([0x1f, 0x8b]);
const STATE = Symbol('state');
const WRITEENTRY = Symbol('writeEntry');
const READENTRY = Symbol('readEntry');
const NEXTENTRY = Symbol('nextEntry');
const PROCESSENTRY = Symbol('processEntry');
const EX = Symbol('extendedHeader');
const GEX = Symbol('globalExtendedHeader');
const META = Symbol('meta');
const EMITMETA = Symbol('emitMeta');
const BUFFER = Symbol('buffer');
const QUEUE = Symbol('queue');
const ENDED$1 = Symbol('ended');
const EMITTEDEND = Symbol('emittedEnd');
const EMIT = Symbol('emit');
const UNZIP = Symbol('unzip');
const CONSUMECHUNK = Symbol('consumeChunk');
const CONSUMECHUNKSUB = Symbol('consumeChunkSub');
const CONSUMEBODY = Symbol('consumeBody');
const CONSUMEMETA = Symbol('consumeMeta');
const CONSUMEHEADER = Symbol('consumeHeader');
const CONSUMING = Symbol('consuming');
const BUFFERCONCAT = Symbol('bufferConcat');
const MAYBEEND = Symbol('maybeEnd');
const WRITING = Symbol('writing');
const ABORTED = Symbol('aborted');
const DONE = Symbol('onDone');
const SAW_VALID_ENTRY = Symbol('sawValidEntry');
const SAW_NULL_BLOCK = Symbol('sawNullBlock');
const SAW_EOF = Symbol('sawEOF');
const CLOSESTREAM = Symbol('closeStream');

const noop = _ => true;

var parse$2 = warner(class Parser extends EE {
  constructor (opt) {
    opt = opt || {};
    super(opt);

    this.file = opt.file || '';

    // set to boolean false when an entry starts.  1024 bytes of \0
    // is technically a valid tarball, albeit a boring one.
    this[SAW_VALID_ENTRY] = null;

    // these BADARCHIVE errors can't be detected early. listen on DONE.
    this.on(DONE, _ => {
      if (this[STATE] === 'begin' || this[SAW_VALID_ENTRY] === false) {
        // either less than 1 block of data, or all entries were invalid.
        // Either way, probably not even a tarball.
        this.warn('TAR_BAD_ARCHIVE', 'Unrecognized archive format');
      }
    });

    if (opt.ondone) {
      this.on(DONE, opt.ondone);
    } else {
      this.on(DONE, _ => {
        this.emit('prefinish');
        this.emit('finish');
        this.emit('end');
      });
    }

    this.strict = !!opt.strict;
    this.maxMetaEntrySize = opt.maxMetaEntrySize || maxMetaEntrySize;
    this.filter = typeof opt.filter === 'function' ? opt.filter : noop;
    // Unlike gzip, brotli doesn't have any magic bytes to identify it
    // Users need to explicitly tell us they're extracting a brotli file
    // Or we infer from the file extension
    const isTBR = (opt.file && (
        opt.file.endsWith('.tar.br') || opt.file.endsWith('.tbr')));
    // if it's a tbr file it MIGHT be brotli, but we don't know until
    // we look at it and verify it's not a valid tar file.
    this.brotli = !opt.gzip && opt.brotli !== undefined ? opt.brotli
      : isTBR ? undefined
      : false;

    // have to set this so that streams are ok piping into it
    this.writable = true;
    this.readable = false;

    this[QUEUE] = new Yallist();
    this[BUFFER] = null;
    this[READENTRY] = null;
    this[WRITEENTRY] = null;
    this[STATE] = 'begin';
    this[META] = '';
    this[EX] = null;
    this[GEX] = null;
    this[ENDED$1] = false;
    this[UNZIP] = null;
    this[ABORTED] = false;
    this[SAW_NULL_BLOCK] = false;
    this[SAW_EOF] = false;

    this.on('end', () => this[CLOSESTREAM]());

    if (typeof opt.onwarn === 'function') {
      this.on('warn', opt.onwarn);
    }
    if (typeof opt.onentry === 'function') {
      this.on('entry', opt.onentry);
    }
  }

  [CONSUMEHEADER] (chunk, position) {
    if (this[SAW_VALID_ENTRY] === null) {
      this[SAW_VALID_ENTRY] = false;
    }
    let header;
    try {
      header = new Header$1(chunk, position, this[EX], this[GEX]);
    } catch (er) {
      return this.warn('TAR_ENTRY_INVALID', er)
    }

    if (header.nullBlock) {
      if (this[SAW_NULL_BLOCK]) {
        this[SAW_EOF] = true;
        // ending an archive with no entries.  pointless, but legal.
        if (this[STATE] === 'begin') {
          this[STATE] = 'header';
        }
        this[EMIT]('eof');
      } else {
        this[SAW_NULL_BLOCK] = true;
        this[EMIT]('nullBlock');
      }
    } else {
      this[SAW_NULL_BLOCK] = false;
      if (!header.cksumValid) {
        this.warn('TAR_ENTRY_INVALID', 'checksum failure', { header });
      } else if (!header.path) {
        this.warn('TAR_ENTRY_INVALID', 'path is required', { header });
      } else {
        const type = header.type;
        if (/^(Symbolic)?Link$/.test(type) && !header.linkpath) {
          this.warn('TAR_ENTRY_INVALID', 'linkpath required', { header });
        } else if (!/^(Symbolic)?Link$/.test(type) && header.linkpath) {
          this.warn('TAR_ENTRY_INVALID', 'linkpath forbidden', { header });
        } else {
          const entry = this[WRITEENTRY] = new Entry(header, this[EX], this[GEX]);

          // we do this for meta & ignored entries as well, because they
          // are still valid tar, or else we wouldn't know to ignore them
          if (!this[SAW_VALID_ENTRY]) {
            if (entry.remain) {
              // this might be the one!
              const onend = () => {
                if (!entry.invalid) {
                  this[SAW_VALID_ENTRY] = true;
                }
              };
              entry.on('end', onend);
            } else {
              this[SAW_VALID_ENTRY] = true;
            }
          }

          if (entry.meta) {
            if (entry.size > this.maxMetaEntrySize) {
              entry.ignore = true;
              this[EMIT]('ignoredEntry', entry);
              this[STATE] = 'ignore';
              entry.resume();
            } else if (entry.size > 0) {
              this[META] = '';
              entry.on('data', c => this[META] += c);
              this[STATE] = 'meta';
            }
          } else {
            this[EX] = null;
            entry.ignore = entry.ignore || !this.filter(entry.path, entry);

            if (entry.ignore) {
              // probably valid, just not something we care about
              this[EMIT]('ignoredEntry', entry);
              this[STATE] = entry.remain ? 'ignore' : 'header';
              entry.resume();
            } else {
              if (entry.remain) {
                this[STATE] = 'body';
              } else {
                this[STATE] = 'header';
                entry.end();
              }

              if (!this[READENTRY]) {
                this[QUEUE].push(entry);
                this[NEXTENTRY]();
              } else {
                this[QUEUE].push(entry);
              }
            }
          }
        }
      }
    }
  }

  [CLOSESTREAM] () {
    nextTick(() => this.emit('close'));
  }

  [PROCESSENTRY] (entry) {
    let go = true;

    if (!entry) {
      this[READENTRY] = null;
      go = false;
    } else if (Array.isArray(entry)) {
      this.emit.apply(this, entry);
    } else {
      this[READENTRY] = entry;
      this.emit('entry', entry);
      if (!entry.emittedEnd) {
        entry.on('end', _ => this[NEXTENTRY]());
        go = false;
      }
    }

    return go
  }

  [NEXTENTRY] () {
    do {} while (this[PROCESSENTRY](this[QUEUE].shift()))

    if (!this[QUEUE].length) {
      // At this point, there's nothing in the queue, but we may have an
      // entry which is being consumed (readEntry).
      // If we don't, then we definitely can handle more data.
      // If we do, and either it's flowing, or it has never had any data
      // written to it, then it needs more.
      // The only other possibility is that it has returned false from a
      // write() call, so we wait for the next drain to continue.
      const re = this[READENTRY];
      const drainNow = !re || re.flowing || re.size === re.remain;
      if (drainNow) {
        if (!this[WRITING]) {
          this.emit('drain');
        }
      } else {
        re.once('drain', _ => this.emit('drain'));
      }
    }
  }

  [CONSUMEBODY] (chunk, position) {
    // write up to but no  more than writeEntry.blockRemain
    const entry = this[WRITEENTRY];
    const br = entry.blockRemain;
    const c = (br >= chunk.length && position === 0) ? chunk
      : chunk.slice(position, position + br);

    entry.write(c);

    if (!entry.blockRemain) {
      this[STATE] = 'header';
      this[WRITEENTRY] = null;
      entry.end();
    }

    return c.length
  }

  [CONSUMEMETA] (chunk, position) {
    const entry = this[WRITEENTRY];
    const ret = this[CONSUMEBODY](chunk, position);

    // if we finished, then the entry is reset
    if (!this[WRITEENTRY]) {
      this[EMITMETA](entry);
    }

    return ret
  }

  [EMIT] (ev, data, extra) {
    if (!this[QUEUE].length && !this[READENTRY]) {
      this.emit(ev, data, extra);
    } else {
      this[QUEUE].push([ev, data, extra]);
    }
  }

  [EMITMETA] (entry) {
    this[EMIT]('meta', this[META]);
    switch (entry.type) {
      case 'ExtendedHeader':
      case 'OldExtendedHeader':
        this[EX] = Pax.parse(this[META], this[EX], false);
        break

      case 'GlobalExtendedHeader':
        this[GEX] = Pax.parse(this[META], this[GEX], true);
        break

      case 'NextFileHasLongPath':
      case 'OldGnuLongPath':
        this[EX] = this[EX] || Object.create(null);
        this[EX].path = this[META].replace(/\0.*/, '');
        break

      case 'NextFileHasLongLinkpath':
        this[EX] = this[EX] || Object.create(null);
        this[EX].linkpath = this[META].replace(/\0.*/, '');
        break

      /* istanbul ignore next */
      default: throw new Error('unknown meta: ' + entry.type)
    }
  }

  abort (error) {
    this[ABORTED] = true;
    this.emit('abort', error);
    // always throws, even in non-strict mode
    this.warn('TAR_ABORT', error, { recoverable: false });
  }

  write (chunk) {
    if (this[ABORTED]) {
      return
    }

    // first write, might be gzipped
    const needSniff = this[UNZIP] === null ||
      this.brotli === undefined && this[UNZIP] === false;
    if (needSniff && chunk) {
      if (this[BUFFER]) {
        chunk = Buffer.concat([this[BUFFER], chunk]);
        this[BUFFER] = null;
      }
      if (chunk.length < gzipHeader.length) {
        this[BUFFER] = chunk;
        return true
      }

      // look for gzip header
      for (let i = 0; this[UNZIP] === null && i < gzipHeader.length; i++) {
        if (chunk[i] !== gzipHeader[i]) {
          this[UNZIP] = false;
        }
      }

      const maybeBrotli = this.brotli === undefined;
      if (this[UNZIP] === false && maybeBrotli) {
        // read the first header to see if it's a valid tar file. If so,
        // we can safely assume that it's not actually brotli, despite the
        // .tbr or .tar.br file extension.
        // if we ended before getting a full chunk, yes, def brotli
        if (chunk.length < 512) {
          if (this[ENDED$1]) {
            this.brotli = true;
          } else {
            this[BUFFER] = chunk;
            return true
          }
        } else {
          // if it's tar, it's pretty reliably not brotli, chances of
          // that happening are astronomical.
          try {
            new Header$1(chunk.slice(0, 512));
            this.brotli = false;
          } catch (_) {
            this.brotli = true;
          }
        }
      }

      if (this[UNZIP] === null || (this[UNZIP] === false && this.brotli)) {
        const ended = this[ENDED$1];
        this[ENDED$1] = false;
        this[UNZIP] = this[UNZIP] === null
          ? new zlib.Unzip()
          : new zlib.BrotliDecompress();
        this[UNZIP].on('data', chunk => this[CONSUMECHUNK](chunk));
        this[UNZIP].on('error', er => this.abort(er));
        this[UNZIP].on('end', _ => {
          this[ENDED$1] = true;
          this[CONSUMECHUNK]();
        });
        this[WRITING] = true;
        const ret = this[UNZIP][ended ? 'end' : 'write'](chunk);
        this[WRITING] = false;
        return ret
      }
    }

    this[WRITING] = true;
    if (this[UNZIP]) {
      this[UNZIP].write(chunk);
    } else {
      this[CONSUMECHUNK](chunk);
    }
    this[WRITING] = false;

    // return false if there's a queue, or if the current entry isn't flowing
    const ret =
      this[QUEUE].length ? false :
      this[READENTRY] ? this[READENTRY].flowing :
      true;

    // if we have no queue, then that means a clogged READENTRY
    if (!ret && !this[QUEUE].length) {
      this[READENTRY].once('drain', _ => this.emit('drain'));
    }

    return ret
  }

  [BUFFERCONCAT] (c) {
    if (c && !this[ABORTED]) {
      this[BUFFER] = this[BUFFER] ? Buffer.concat([this[BUFFER], c]) : c;
    }
  }

  [MAYBEEND] () {
    if (this[ENDED$1] &&
        !this[EMITTEDEND] &&
        !this[ABORTED] &&
        !this[CONSUMING]) {
      this[EMITTEDEND] = true;
      const entry = this[WRITEENTRY];
      if (entry && entry.blockRemain) {
        // truncated, likely a damaged file
        const have = this[BUFFER] ? this[BUFFER].length : 0;
        this.warn('TAR_BAD_ARCHIVE', `Truncated input (needed ${
          entry.blockRemain} more bytes, only ${have} available)`, { entry });
        if (this[BUFFER]) {
          entry.write(this[BUFFER]);
        }
        entry.end();
      }
      this[EMIT](DONE);
    }
  }

  [CONSUMECHUNK] (chunk) {
    if (this[CONSUMING]) {
      this[BUFFERCONCAT](chunk);
    } else if (!chunk && !this[BUFFER]) {
      this[MAYBEEND]();
    } else {
      this[CONSUMING] = true;
      if (this[BUFFER]) {
        this[BUFFERCONCAT](chunk);
        const c = this[BUFFER];
        this[BUFFER] = null;
        this[CONSUMECHUNKSUB](c);
      } else {
        this[CONSUMECHUNKSUB](chunk);
      }

      while (this[BUFFER] &&
          this[BUFFER].length >= 512 &&
          !this[ABORTED] &&
          !this[SAW_EOF]) {
        const c = this[BUFFER];
        this[BUFFER] = null;
        this[CONSUMECHUNKSUB](c);
      }
      this[CONSUMING] = false;
    }

    if (!this[BUFFER] || this[ENDED$1]) {
      this[MAYBEEND]();
    }
  }

  [CONSUMECHUNKSUB] (chunk) {
    // we know that we are in CONSUMING mode, so anything written goes into
    // the buffer.  Advance the position and put any remainder in the buffer.
    let position = 0;
    const length = chunk.length;
    while (position + 512 <= length && !this[ABORTED] && !this[SAW_EOF]) {
      switch (this[STATE]) {
        case 'begin':
        case 'header':
          this[CONSUMEHEADER](chunk, position);
          position += 512;
          break

        case 'ignore':
        case 'body':
          position += this[CONSUMEBODY](chunk, position);
          break

        case 'meta':
          position += this[CONSUMEMETA](chunk, position);
          break

        /* istanbul ignore next */
        default:
          throw new Error('invalid state: ' + this[STATE])
      }
    }

    if (position < length) {
      if (this[BUFFER]) {
        this[BUFFER] = Buffer.concat([chunk.slice(position), this[BUFFER]]);
      } else {
        this[BUFFER] = chunk.slice(position);
      }
    }
  }

  end (chunk) {
    if (!this[ABORTED]) {
      if (this[UNZIP]) {
        this[UNZIP].end(chunk);
      } else {
        this[ENDED$1] = true;
        if (this.brotli === undefined) chunk = chunk || Buffer.alloc(0);
        this.write(chunk);
      }
    }
  }
});

// XXX: This shares a lot in common with extract.js
// maybe some DRY opportunity here?

// tar -t
const hlo$4 = highLevelOpt;
const Parser$1 = parse$2;
const fs$9 = require$$2$1;
const fsm$4 = fsMinipass;
const path$7 = require$$0$3;
const stripSlash$2 = stripTrailingSlashes;

var list_1 = (opt_, files, cb) => {
  if (typeof opt_ === 'function') {
    cb = opt_, files = null, opt_ = {};
  } else if (Array.isArray(opt_)) {
    files = opt_, opt_ = {};
  }

  if (typeof files === 'function') {
    cb = files, files = null;
  }

  if (!files) {
    files = [];
  } else {
    files = Array.from(files);
  }

  const opt = hlo$4(opt_);

  if (opt.sync && typeof cb === 'function') {
    throw new TypeError('callback not supported for sync tar functions')
  }

  if (!opt.file && typeof cb === 'function') {
    throw new TypeError('callback only supported with file option')
  }

  if (files.length) {
    filesFilter$1(opt, files);
  }

  if (!opt.noResume) {
    onentryFunction(opt);
  }

  return opt.file && opt.sync ? listFileSync(opt)
    : opt.file ? listFile(opt, cb)
    : list(opt)
};

const onentryFunction = opt => {
  const onentry = opt.onentry;
  opt.onentry = onentry ? e => {
    onentry(e);
    e.resume();
  } : e => e.resume();
};

// construct a filter that limits the file entries listed
// include child entries if a dir is included
const filesFilter$1 = (opt, files) => {
  const map = new Map(files.map(f => [stripSlash$2(f), true]));
  const filter = opt.filter;

  const mapHas = (file, r) => {
    const root = r || path$7.parse(file).root || '.';
    const ret = file === root ? false
      : map.has(file) ? map.get(file)
      : mapHas(path$7.dirname(file), root);

    map.set(file, ret);
    return ret
  };

  opt.filter = filter
    ? (file, entry) => filter(file, entry) && mapHas(stripSlash$2(file))
    : file => mapHas(stripSlash$2(file));
};

const listFileSync = opt => {
  const p = list(opt);
  const file = opt.file;
  let threw = true;
  let fd;
  try {
    const stat = fs$9.statSync(file);
    const readSize = opt.maxReadSize || 16 * 1024 * 1024;
    if (stat.size < readSize) {
      p.end(fs$9.readFileSync(file));
    } else {
      let pos = 0;
      const buf = Buffer.allocUnsafe(readSize);
      fd = fs$9.openSync(file, 'r');
      while (pos < stat.size) {
        const bytesRead = fs$9.readSync(fd, buf, 0, readSize, pos);
        pos += bytesRead;
        p.write(buf.slice(0, bytesRead));
      }
      p.end();
    }
    threw = false;
  } finally {
    if (threw && fd) {
      try {
        fs$9.closeSync(fd);
      } catch (er) {}
    }
  }
};

const listFile = (opt, cb) => {
  const parse = new Parser$1(opt);
  const readSize = opt.maxReadSize || 16 * 1024 * 1024;

  const file = opt.file;
  const p = new Promise((resolve, reject) => {
    parse.on('error', reject);
    parse.on('end', resolve);

    fs$9.stat(file, (er, stat) => {
      if (er) {
        reject(er);
      } else {
        const stream = new fsm$4.ReadStream(file, {
          readSize: readSize,
          size: stat.size,
        });
        stream.on('error', reject);
        stream.pipe(parse);
      }
    });
  });
  return cb ? p.then(cb, cb) : p
};

const list = opt => new Parser$1(opt);

// tar -c
const hlo$3 = highLevelOpt;

const Pack$1 = pack;
const fsm$3 = fsMinipass;
const t$1 = list_1;
const path$6 = require$$0$3;

var create_1 = (opt_, files, cb) => {
  if (typeof files === 'function') {
    cb = files;
  }

  if (Array.isArray(opt_)) {
    files = opt_, opt_ = {};
  }

  if (!files || !Array.isArray(files) || !files.length) {
    throw new TypeError('no files or directories specified')
  }

  files = Array.from(files);

  const opt = hlo$3(opt_);

  if (opt.sync && typeof cb === 'function') {
    throw new TypeError('callback not supported for sync tar functions')
  }

  if (!opt.file && typeof cb === 'function') {
    throw new TypeError('callback only supported with file option')
  }

  return opt.file && opt.sync ? createFileSync(opt, files)
    : opt.file ? createFile(opt, files, cb)
    : opt.sync ? createSync(opt, files)
    : create(opt, files)
};

const createFileSync = (opt, files) => {
  const p = new Pack$1.Sync(opt);
  const stream = new fsm$3.WriteStreamSync(opt.file, {
    mode: opt.mode || 0o666,
  });
  p.pipe(stream);
  addFilesSync$1(p, files);
};

const createFile = (opt, files, cb) => {
  const p = new Pack$1(opt);
  const stream = new fsm$3.WriteStream(opt.file, {
    mode: opt.mode || 0o666,
  });
  p.pipe(stream);

  const promise = new Promise((res, rej) => {
    stream.on('error', rej);
    stream.on('close', res);
    p.on('error', rej);
  });

  addFilesAsync$1(p, files);

  return cb ? promise.then(cb, cb) : promise
};

const addFilesSync$1 = (p, files) => {
  files.forEach(file => {
    if (file.charAt(0) === '@') {
      t$1({
        file: path$6.resolve(p.cwd, file.slice(1)),
        sync: true,
        noResume: true,
        onentry: entry => p.add(entry),
      });
    } else {
      p.add(file);
    }
  });
  p.end();
};

const addFilesAsync$1 = (p, files) => {
  while (files.length) {
    const file = files.shift();
    if (file.charAt(0) === '@') {
      return t$1({
        file: path$6.resolve(p.cwd, file.slice(1)),
        noResume: true,
        onentry: entry => p.add(entry),
      }).then(_ => addFilesAsync$1(p, files))
    } else {
      p.add(file);
    }
  }
  p.end();
};

const createSync = (opt, files) => {
  const p = new Pack$1.Sync(opt);
  addFilesSync$1(p, files);
  return p
};

const create = (opt, files) => {
  const p = new Pack$1(opt);
  addFilesAsync$1(p, files);
  return p
};

// tar -r
const hlo$2 = highLevelOpt;
const Pack = pack;
const fs$8 = require$$2$1;
const fsm$2 = fsMinipass;
const t = list_1;
const path$5 = require$$0$3;

// starting at the head of the file, read a Header
// If the checksum is invalid, that's our position to start writing
// If it is, jump forward by the specified size (round up to 512)
// and try again.
// Write the new Pack stream starting there.

const Header = header;

var replace_1 = (opt_, files, cb) => {
  const opt = hlo$2(opt_);

  if (!opt.file) {
    throw new TypeError('file is required')
  }

  if (opt.gzip || opt.brotli || opt.file.endsWith('.br') || opt.file.endsWith('.tbr')) {
    throw new TypeError('cannot append to compressed archives')
  }

  if (!files || !Array.isArray(files) || !files.length) {
    throw new TypeError('no files or directories specified')
  }

  files = Array.from(files);

  return opt.sync ? replaceSync(opt, files)
    : replace(opt, files, cb)
};

const replaceSync = (opt, files) => {
  const p = new Pack.Sync(opt);

  let threw = true;
  let fd;
  let position;

  try {
    try {
      fd = fs$8.openSync(opt.file, 'r+');
    } catch (er) {
      if (er.code === 'ENOENT') {
        fd = fs$8.openSync(opt.file, 'w+');
      } else {
        throw er
      }
    }

    const st = fs$8.fstatSync(fd);
    const headBuf = Buffer.alloc(512);

    POSITION: for (position = 0; position < st.size; position += 512) {
      for (let bufPos = 0, bytes = 0; bufPos < 512; bufPos += bytes) {
        bytes = fs$8.readSync(
          fd, headBuf, bufPos, headBuf.length - bufPos, position + bufPos
        );

        if (position === 0 && headBuf[0] === 0x1f && headBuf[1] === 0x8b) {
          throw new Error('cannot append to compressed archives')
        }

        if (!bytes) {
          break POSITION
        }
      }

      const h = new Header(headBuf);
      if (!h.cksumValid) {
        break
      }
      const entryBlockSize = 512 * Math.ceil(h.size / 512);
      if (position + entryBlockSize + 512 > st.size) {
        break
      }
      // the 512 for the header we just parsed will be added as well
      // also jump ahead all the blocks for the body
      position += entryBlockSize;
      if (opt.mtimeCache) {
        opt.mtimeCache.set(h.path, h.mtime);
      }
    }
    threw = false;

    streamSync(opt, p, position, fd, files);
  } finally {
    if (threw) {
      try {
        fs$8.closeSync(fd);
      } catch (er) {}
    }
  }
};

const streamSync = (opt, p, position, fd, files) => {
  const stream = new fsm$2.WriteStreamSync(opt.file, {
    fd: fd,
    start: position,
  });
  p.pipe(stream);
  addFilesSync(p, files);
};

const replace = (opt, files, cb) => {
  files = Array.from(files);
  const p = new Pack(opt);

  const getPos = (fd, size, cb_) => {
    const cb = (er, pos) => {
      if (er) {
        fs$8.close(fd, _ => cb_(er));
      } else {
        cb_(null, pos);
      }
    };

    let position = 0;
    if (size === 0) {
      return cb(null, 0)
    }

    let bufPos = 0;
    const headBuf = Buffer.alloc(512);
    const onread = (er, bytes) => {
      if (er) {
        return cb(er)
      }
      bufPos += bytes;
      if (bufPos < 512 && bytes) {
        return fs$8.read(
          fd, headBuf, bufPos, headBuf.length - bufPos,
          position + bufPos, onread
        )
      }

      if (position === 0 && headBuf[0] === 0x1f && headBuf[1] === 0x8b) {
        return cb(new Error('cannot append to compressed archives'))
      }

      // truncated header
      if (bufPos < 512) {
        return cb(null, position)
      }

      const h = new Header(headBuf);
      if (!h.cksumValid) {
        return cb(null, position)
      }

      const entryBlockSize = 512 * Math.ceil(h.size / 512);
      if (position + entryBlockSize + 512 > size) {
        return cb(null, position)
      }

      position += entryBlockSize + 512;
      if (position >= size) {
        return cb(null, position)
      }

      if (opt.mtimeCache) {
        opt.mtimeCache.set(h.path, h.mtime);
      }
      bufPos = 0;
      fs$8.read(fd, headBuf, 0, 512, position, onread);
    };
    fs$8.read(fd, headBuf, 0, 512, position, onread);
  };

  const promise = new Promise((resolve, reject) => {
    p.on('error', reject);
    let flag = 'r+';
    const onopen = (er, fd) => {
      if (er && er.code === 'ENOENT' && flag === 'r+') {
        flag = 'w+';
        return fs$8.open(opt.file, flag, onopen)
      }

      if (er) {
        return reject(er)
      }

      fs$8.fstat(fd, (er, st) => {
        if (er) {
          return fs$8.close(fd, () => reject(er))
        }

        getPos(fd, st.size, (er, position) => {
          if (er) {
            return reject(er)
          }
          const stream = new fsm$2.WriteStream(opt.file, {
            fd: fd,
            start: position,
          });
          p.pipe(stream);
          stream.on('error', reject);
          stream.on('close', resolve);
          addFilesAsync(p, files);
        });
      });
    };
    fs$8.open(opt.file, flag, onopen);
  });

  return cb ? promise.then(cb, cb) : promise
};

const addFilesSync = (p, files) => {
  files.forEach(file => {
    if (file.charAt(0) === '@') {
      t({
        file: path$5.resolve(p.cwd, file.slice(1)),
        sync: true,
        noResume: true,
        onentry: entry => p.add(entry),
      });
    } else {
      p.add(file);
    }
  });
  p.end();
};

const addFilesAsync = (p, files) => {
  while (files.length) {
    const file = files.shift();
    if (file.charAt(0) === '@') {
      return t({
        file: path$5.resolve(p.cwd, file.slice(1)),
        noResume: true,
        onentry: entry => p.add(entry),
      }).then(_ => addFilesAsync(p, files))
    } else {
      p.add(file);
    }
  }
  p.end();
};

// tar -u

const hlo$1 = highLevelOpt;
const r = replace_1;
// just call tar.r with the filter and mtimeCache

var update = (opt_, files, cb) => {
  const opt = hlo$1(opt_);

  if (!opt.file) {
    throw new TypeError('file is required')
  }

  if (opt.gzip || opt.brotli || opt.file.endsWith('.br') || opt.file.endsWith('.tbr')) {
    throw new TypeError('cannot append to compressed archives')
  }

  if (!files || !Array.isArray(files) || !files.length) {
    throw new TypeError('no files or directories specified')
  }

  files = Array.from(files);

  mtimeFilter(opt);
  return r(opt, files, cb)
};

const mtimeFilter = opt => {
  const filter = opt.filter;

  if (!opt.mtimeCache) {
    opt.mtimeCache = new Map();
  }

  opt.filter = filter ? (path, stat) =>
    filter(path, stat) && !(opt.mtimeCache.get(path) > stat.mtime)
    : (path, stat) => !(opt.mtimeCache.get(path) > stat.mtime);
};

var mkdir$1 = {exports: {}};

const { promisify } = require$$0$4;
const fs$7 = require$$2$1;
const optsArg$1 = opts => {
  if (!opts)
    opts = { mode: 0o777, fs: fs$7 };
  else if (typeof opts === 'object')
    opts = { mode: 0o777, fs: fs$7, ...opts };
  else if (typeof opts === 'number')
    opts = { mode: opts, fs: fs$7 };
  else if (typeof opts === 'string')
    opts = { mode: parseInt(opts, 8), fs: fs$7 };
  else
    throw new TypeError('invalid options argument')

  opts.mkdir = opts.mkdir || opts.fs.mkdir || fs$7.mkdir;
  opts.mkdirAsync = promisify(opts.mkdir);
  opts.stat = opts.stat || opts.fs.stat || fs$7.stat;
  opts.statAsync = promisify(opts.stat);
  opts.statSync = opts.statSync || opts.fs.statSync || fs$7.statSync;
  opts.mkdirSync = opts.mkdirSync || opts.fs.mkdirSync || fs$7.mkdirSync;
  return opts
};
var optsArg_1 = optsArg$1;

const platform$3 = process.env.__TESTING_MKDIRP_PLATFORM__ || process.platform;
const { resolve, parse: parse$1 } = require$$0$3;
const pathArg$1 = path => {
  if (/\0/.test(path)) {
    // simulate same failure that node raises
    throw Object.assign(
      new TypeError('path must be a string without null bytes'),
      {
        path,
        code: 'ERR_INVALID_ARG_VALUE',
      }
    )
  }

  path = resolve(path);
  if (platform$3 === 'win32') {
    const badWinChars = /[*|"<>?:]/;
    const {root} = parse$1(path);
    if (badWinChars.test(path.substr(root.length))) {
      throw Object.assign(new Error('Illegal characters in path.'), {
        path,
        code: 'EINVAL',
      })
    }
  }

  return path
};
var pathArg_1 = pathArg$1;

const {dirname: dirname$2} = require$$0$3;

const findMade$1 = (opts, parent, path = undefined) => {
  // we never want the 'made' return value to be a root directory
  if (path === parent)
    return Promise.resolve()

  return opts.statAsync(parent).then(
    st => st.isDirectory() ? path : undefined, // will fail later
    er => er.code === 'ENOENT'
      ? findMade$1(opts, dirname$2(parent), parent)
      : undefined
  )
};

const findMadeSync$1 = (opts, parent, path = undefined) => {
  if (path === parent)
    return undefined

  try {
    return opts.statSync(parent).isDirectory() ? path : undefined
  } catch (er) {
    return er.code === 'ENOENT'
      ? findMadeSync$1(opts, dirname$2(parent), parent)
      : undefined
  }
};

var findMade_1 = {findMade: findMade$1, findMadeSync: findMadeSync$1};

const {dirname: dirname$1} = require$$0$3;

const mkdirpManual$2 = (path, opts, made) => {
  opts.recursive = false;
  const parent = dirname$1(path);
  if (parent === path) {
    return opts.mkdirAsync(path, opts).catch(er => {
      // swallowed by recursive implementation on posix systems
      // any other error is a failure
      if (er.code !== 'EISDIR')
        throw er
    })
  }

  return opts.mkdirAsync(path, opts).then(() => made || path, er => {
    if (er.code === 'ENOENT')
      return mkdirpManual$2(parent, opts)
        .then(made => mkdirpManual$2(path, opts, made))
    if (er.code !== 'EEXIST' && er.code !== 'EROFS')
      throw er
    return opts.statAsync(path).then(st => {
      if (st.isDirectory())
        return made
      else
        throw er
    }, () => { throw er })
  })
};

const mkdirpManualSync$2 = (path, opts, made) => {
  const parent = dirname$1(path);
  opts.recursive = false;

  if (parent === path) {
    try {
      return opts.mkdirSync(path, opts)
    } catch (er) {
      // swallowed by recursive implementation on posix systems
      // any other error is a failure
      if (er.code !== 'EISDIR')
        throw er
      else
        return
    }
  }

  try {
    opts.mkdirSync(path, opts);
    return made || path
  } catch (er) {
    if (er.code === 'ENOENT')
      return mkdirpManualSync$2(path, opts, mkdirpManualSync$2(parent, opts, made))
    if (er.code !== 'EEXIST' && er.code !== 'EROFS')
      throw er
    try {
      if (!opts.statSync(path).isDirectory())
        throw er
    } catch (_) {
      throw er
    }
  }
};

var mkdirpManual_1 = {mkdirpManual: mkdirpManual$2, mkdirpManualSync: mkdirpManualSync$2};

const {dirname} = require$$0$3;
const {findMade, findMadeSync} = findMade_1;
const {mkdirpManual: mkdirpManual$1, mkdirpManualSync: mkdirpManualSync$1} = mkdirpManual_1;

const mkdirpNative$1 = (path, opts) => {
  opts.recursive = true;
  const parent = dirname(path);
  if (parent === path)
    return opts.mkdirAsync(path, opts)

  return findMade(opts, path).then(made =>
    opts.mkdirAsync(path, opts).then(() => made)
    .catch(er => {
      if (er.code === 'ENOENT')
        return mkdirpManual$1(path, opts)
      else
        throw er
    }))
};

const mkdirpNativeSync$1 = (path, opts) => {
  opts.recursive = true;
  const parent = dirname(path);
  if (parent === path)
    return opts.mkdirSync(path, opts)

  const made = findMadeSync(opts, path);
  try {
    opts.mkdirSync(path, opts);
    return made
  } catch (er) {
    if (er.code === 'ENOENT')
      return mkdirpManualSync$1(path, opts)
    else
      throw er
  }
};

var mkdirpNative_1 = {mkdirpNative: mkdirpNative$1, mkdirpNativeSync: mkdirpNativeSync$1};

const fs$6 = require$$2$1;

const version$2 = process.env.__TESTING_MKDIRP_NODE_VERSION__ || process.version;
const versArr = version$2.replace(/^v/, '').split('.');
const hasNative = +versArr[0] > 10 || +versArr[0] === 10 && +versArr[1] >= 12;

const useNative$1 = !hasNative ? () => false : opts => opts.mkdir === fs$6.mkdir;
const useNativeSync$1 = !hasNative ? () => false : opts => opts.mkdirSync === fs$6.mkdirSync;

var useNative_1 = {useNative: useNative$1, useNativeSync: useNativeSync$1};

const optsArg = optsArg_1;
const pathArg = pathArg_1;

const {mkdirpNative, mkdirpNativeSync} = mkdirpNative_1;
const {mkdirpManual, mkdirpManualSync} = mkdirpManual_1;
const {useNative, useNativeSync} = useNative_1;


const mkdirp$1 = (path, opts) => {
  path = pathArg(path);
  opts = optsArg(opts);
  return useNative(opts)
    ? mkdirpNative(path, opts)
    : mkdirpManual(path, opts)
};

const mkdirpSync = (path, opts) => {
  path = pathArg(path);
  opts = optsArg(opts);
  return useNativeSync(opts)
    ? mkdirpNativeSync(path, opts)
    : mkdirpManualSync(path, opts)
};

mkdirp$1.sync = mkdirpSync;
mkdirp$1.native = (path, opts) => mkdirpNative(pathArg(path), optsArg(opts));
mkdirp$1.manual = (path, opts) => mkdirpManual(pathArg(path), optsArg(opts));
mkdirp$1.nativeSync = (path, opts) => mkdirpNativeSync(pathArg(path), optsArg(opts));
mkdirp$1.manualSync = (path, opts) => mkdirpManualSync(pathArg(path), optsArg(opts));

var mkdirp_1 = mkdirp$1;

const fs$5 = require$$2$1;
const path$4 = require$$0$3;

/* istanbul ignore next */
const LCHOWN = fs$5.lchown ? 'lchown' : 'chown';
/* istanbul ignore next */
const LCHOWNSYNC = fs$5.lchownSync ? 'lchownSync' : 'chownSync';

/* istanbul ignore next */
const needEISDIRHandled = fs$5.lchown &&
  !process.version.match(/v1[1-9]+\./) &&
  !process.version.match(/v10\.[6-9]/);

const lchownSync = (path, uid, gid) => {
  try {
    return fs$5[LCHOWNSYNC](path, uid, gid)
  } catch (er) {
    if (er.code !== 'ENOENT')
      throw er
  }
};

/* istanbul ignore next */
const chownSync = (path, uid, gid) => {
  try {
    return fs$5.chownSync(path, uid, gid)
  } catch (er) {
    if (er.code !== 'ENOENT')
      throw er
  }
};

/* istanbul ignore next */
const handleEISDIR =
  needEISDIRHandled ? (path, uid, gid, cb) => er => {
    // Node prior to v10 had a very questionable implementation of
    // fs.lchown, which would always try to call fs.open on a directory
    // Fall back to fs.chown in those cases.
    if (!er || er.code !== 'EISDIR')
      cb(er);
    else
      fs$5.chown(path, uid, gid, cb);
  }
  : (_, __, ___, cb) => cb;

/* istanbul ignore next */
const handleEISDirSync =
  needEISDIRHandled ? (path, uid, gid) => {
    try {
      return lchownSync(path, uid, gid)
    } catch (er) {
      if (er.code !== 'EISDIR')
        throw er
      chownSync(path, uid, gid);
    }
  }
  : (path, uid, gid) => lchownSync(path, uid, gid);

// fs.readdir could only accept an options object as of node v6
const nodeVersion = process.version;
let readdir = (path, options, cb) => fs$5.readdir(path, options, cb);
let readdirSync = (path, options) => fs$5.readdirSync(path, options);
/* istanbul ignore next */
if (/^v4\./.test(nodeVersion))
  readdir = (path, options, cb) => fs$5.readdir(path, cb);

const chown = (cpath, uid, gid, cb) => {
  fs$5[LCHOWN](cpath, uid, gid, handleEISDIR(cpath, uid, gid, er => {
    // Skip ENOENT error
    cb(er && er.code !== 'ENOENT' ? er : null);
  }));
};

const chownrKid = (p, child, uid, gid, cb) => {
  if (typeof child === 'string')
    return fs$5.lstat(path$4.resolve(p, child), (er, stats) => {
      // Skip ENOENT error
      if (er)
        return cb(er.code !== 'ENOENT' ? er : null)
      stats.name = child;
      chownrKid(p, stats, uid, gid, cb);
    })

  if (child.isDirectory()) {
    chownr$1(path$4.resolve(p, child.name), uid, gid, er => {
      if (er)
        return cb(er)
      const cpath = path$4.resolve(p, child.name);
      chown(cpath, uid, gid, cb);
    });
  } else {
    const cpath = path$4.resolve(p, child.name);
    chown(cpath, uid, gid, cb);
  }
};


const chownr$1 = (p, uid, gid, cb) => {
  readdir(p, { withFileTypes: true }, (er, children) => {
    // any error other than ENOTDIR or ENOTSUP means it's not readable,
    // or doesn't exist.  give up.
    if (er) {
      if (er.code === 'ENOENT')
        return cb()
      else if (er.code !== 'ENOTDIR' && er.code !== 'ENOTSUP')
        return cb(er)
    }
    if (er || !children.length)
      return chown(p, uid, gid, cb)

    let len = children.length;
    let errState = null;
    const then = er => {
      if (errState)
        return
      if (er)
        return cb(errState = er)
      if (-- len === 0)
        return chown(p, uid, gid, cb)
    };

    children.forEach(child => chownrKid(p, child, uid, gid, then));
  });
};

const chownrKidSync = (p, child, uid, gid) => {
  if (typeof child === 'string') {
    try {
      const stats = fs$5.lstatSync(path$4.resolve(p, child));
      stats.name = child;
      child = stats;
    } catch (er) {
      if (er.code === 'ENOENT')
        return
      else
        throw er
    }
  }

  if (child.isDirectory())
    chownrSync(path$4.resolve(p, child.name), uid, gid);

  handleEISDirSync(path$4.resolve(p, child.name), uid, gid);
};

const chownrSync = (p, uid, gid) => {
  let children;
  try {
    children = readdirSync(p, { withFileTypes: true });
  } catch (er) {
    if (er.code === 'ENOENT')
      return
    else if (er.code === 'ENOTDIR' || er.code === 'ENOTSUP')
      return handleEISDirSync(p, uid, gid)
    else
      throw er
  }

  if (children && children.length)
    children.forEach(child => chownrKidSync(p, child, uid, gid));

  return handleEISDirSync(p, uid, gid)
};

var chownr_1 = chownr$1;
chownr$1.sync = chownrSync;

// wrapper around mkdirp for tar's needs.

// TODO: This should probably be a class, not functionally
// passing around state in a gazillion args.

const mkdirp = mkdirp_1;
const fs$4 = require$$2$1;
const path$3 = require$$0$3;
const chownr = chownr_1;
const normPath$1 = normalizeWindowsPath;

class SymlinkError extends Error {
  constructor (symlink, path) {
    super('Cannot extract through symbolic link');
    this.path = path;
    this.symlink = symlink;
  }

  get name () {
    return 'SylinkError'
  }
}

class CwdError extends Error {
  constructor (path, code) {
    super(code + ': Cannot cd into \'' + path + '\'');
    this.path = path;
    this.code = code;
  }

  get name () {
    return 'CwdError'
  }
}

const cGet = (cache, key) => cache.get(normPath$1(key));
const cSet = (cache, key, val) => cache.set(normPath$1(key), val);

const checkCwd = (dir, cb) => {
  fs$4.stat(dir, (er, st) => {
    if (er || !st.isDirectory()) {
      er = new CwdError(dir, er && er.code || 'ENOTDIR');
    }
    cb(er);
  });
};

mkdir$1.exports = (dir, opt, cb) => {
  dir = normPath$1(dir);

  // if there's any overlap between mask and mode,
  // then we'll need an explicit chmod
  const umask = opt.umask;
  const mode = opt.mode | 0o0700;
  const needChmod = (mode & umask) !== 0;

  const uid = opt.uid;
  const gid = opt.gid;
  const doChown = typeof uid === 'number' &&
    typeof gid === 'number' &&
    (uid !== opt.processUid || gid !== opt.processGid);

  const preserve = opt.preserve;
  const unlink = opt.unlink;
  const cache = opt.cache;
  const cwd = normPath$1(opt.cwd);

  const done = (er, created) => {
    if (er) {
      cb(er);
    } else {
      cSet(cache, dir, true);
      if (created && doChown) {
        chownr(created, uid, gid, er => done(er));
      } else if (needChmod) {
        fs$4.chmod(dir, mode, cb);
      } else {
        cb();
      }
    }
  };

  if (cache && cGet(cache, dir) === true) {
    return done()
  }

  if (dir === cwd) {
    return checkCwd(dir, done)
  }

  if (preserve) {
    return mkdirp(dir, { mode }).then(made => done(null, made), done)
  }

  const sub = normPath$1(path$3.relative(cwd, dir));
  const parts = sub.split('/');
  mkdir_(cwd, parts, mode, cache, unlink, cwd, null, done);
};

const mkdir_ = (base, parts, mode, cache, unlink, cwd, created, cb) => {
  if (!parts.length) {
    return cb(null, created)
  }
  const p = parts.shift();
  const part = normPath$1(path$3.resolve(base + '/' + p));
  if (cGet(cache, part)) {
    return mkdir_(part, parts, mode, cache, unlink, cwd, created, cb)
  }
  fs$4.mkdir(part, mode, onmkdir(part, parts, mode, cache, unlink, cwd, created, cb));
};

const onmkdir = (part, parts, mode, cache, unlink, cwd, created, cb) => er => {
  if (er) {
    fs$4.lstat(part, (statEr, st) => {
      if (statEr) {
        statEr.path = statEr.path && normPath$1(statEr.path);
        cb(statEr);
      } else if (st.isDirectory()) {
        mkdir_(part, parts, mode, cache, unlink, cwd, created, cb);
      } else if (unlink) {
        fs$4.unlink(part, er => {
          if (er) {
            return cb(er)
          }
          fs$4.mkdir(part, mode, onmkdir(part, parts, mode, cache, unlink, cwd, created, cb));
        });
      } else if (st.isSymbolicLink()) {
        return cb(new SymlinkError(part, part + '/' + parts.join('/')))
      } else {
        cb(er);
      }
    });
  } else {
    created = created || part;
    mkdir_(part, parts, mode, cache, unlink, cwd, created, cb);
  }
};

const checkCwdSync = dir => {
  let ok = false;
  let code = 'ENOTDIR';
  try {
    ok = fs$4.statSync(dir).isDirectory();
  } catch (er) {
    code = er.code;
  } finally {
    if (!ok) {
      throw new CwdError(dir, code)
    }
  }
};

mkdir$1.exports.sync = (dir, opt) => {
  dir = normPath$1(dir);
  // if there's any overlap between mask and mode,
  // then we'll need an explicit chmod
  const umask = opt.umask;
  const mode = opt.mode | 0o0700;
  const needChmod = (mode & umask) !== 0;

  const uid = opt.uid;
  const gid = opt.gid;
  const doChown = typeof uid === 'number' &&
    typeof gid === 'number' &&
    (uid !== opt.processUid || gid !== opt.processGid);

  const preserve = opt.preserve;
  const unlink = opt.unlink;
  const cache = opt.cache;
  const cwd = normPath$1(opt.cwd);

  const done = (created) => {
    cSet(cache, dir, true);
    if (created && doChown) {
      chownr.sync(created, uid, gid);
    }
    if (needChmod) {
      fs$4.chmodSync(dir, mode);
    }
  };

  if (cache && cGet(cache, dir) === true) {
    return done()
  }

  if (dir === cwd) {
    checkCwdSync(cwd);
    return done()
  }

  if (preserve) {
    return done(mkdirp.sync(dir, mode))
  }

  const sub = normPath$1(path$3.relative(cwd, dir));
  const parts = sub.split('/');
  let created = null;
  for (let p = parts.shift(), part = cwd;
    p && (part += '/' + p);
    p = parts.shift()) {
    part = normPath$1(path$3.resolve(part));
    if (cGet(cache, part)) {
      continue
    }

    try {
      fs$4.mkdirSync(part, mode);
      created = created || part;
      cSet(cache, part, true);
    } catch (er) {
      const st = fs$4.lstatSync(part);
      if (st.isDirectory()) {
        cSet(cache, part, true);
        continue
      } else if (unlink) {
        fs$4.unlinkSync(part);
        fs$4.mkdirSync(part, mode);
        created = created || part;
        cSet(cache, part, true);
        continue
      } else if (st.isSymbolicLink()) {
        return new SymlinkError(part, part + '/' + parts.join('/'))
      }
    }
  }

  return done(created)
};

var mkdirExports = mkdir$1.exports;

// warning: extremely hot code path.
// This has been meticulously optimized for use
// within npm install on large package trees.
// Do not edit without careful benchmarking.
const normalizeCache = Object.create(null);
const { hasOwnProperty } = Object.prototype;
var normalizeUnicode = s => {
  if (!hasOwnProperty.call(normalizeCache, s)) {
    normalizeCache[s] = s.normalize('NFD');
  }
  return normalizeCache[s]
};

// A path exclusive reservation system
// reserve([list, of, paths], fn)
// When the fn is first in line for all its paths, it
// is called with a cb that clears the reservation.
//
// Used by async unpack to avoid clobbering paths in use,
// while still allowing maximal safe parallelization.

const assert$1 = require$$0$2;
const normalize$1 = normalizeUnicode;
const stripSlashes = stripTrailingSlashes;
const { join } = require$$0$3;

const platform$2 = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform;
const isWindows$2 = platform$2 === 'win32';

var pathReservations$1 = () => {
  // path => [function or Set]
  // A Set object means a directory reservation
  // A fn is a direct reservation on that path
  const queues = new Map();

  // fn => {paths:[path,...], dirs:[path, ...]}
  const reservations = new Map();

  // return a set of parent dirs for a given path
  // '/a/b/c/d' -> ['/', '/a', '/a/b', '/a/b/c', '/a/b/c/d']
  const getDirs = path => {
    const dirs = path.split('/').slice(0, -1).reduce((set, path) => {
      if (set.length) {
        path = join(set[set.length - 1], path);
      }
      set.push(path || '/');
      return set
    }, []);
    return dirs
  };

  // functions currently running
  const running = new Set();

  // return the queues for each path the function cares about
  // fn => {paths, dirs}
  const getQueues = fn => {
    const res = reservations.get(fn);
    /* istanbul ignore if - unpossible */
    if (!res) {
      throw new Error('function does not have any path reservations')
    }
    return {
      paths: res.paths.map(path => queues.get(path)),
      dirs: [...res.dirs].map(path => queues.get(path)),
    }
  };

  // check if fn is first in line for all its paths, and is
  // included in the first set for all its dir queues
  const check = fn => {
    const { paths, dirs } = getQueues(fn);
    return paths.every(q => q[0] === fn) &&
      dirs.every(q => q[0] instanceof Set && q[0].has(fn))
  };

  // run the function if it's first in line and not already running
  const run = fn => {
    if (running.has(fn) || !check(fn)) {
      return false
    }
    running.add(fn);
    fn(() => clear(fn));
    return true
  };

  const clear = fn => {
    if (!running.has(fn)) {
      return false
    }

    const { paths, dirs } = reservations.get(fn);
    const next = new Set();

    paths.forEach(path => {
      const q = queues.get(path);
      assert$1.equal(q[0], fn);
      if (q.length === 1) {
        queues.delete(path);
      } else {
        q.shift();
        if (typeof q[0] === 'function') {
          next.add(q[0]);
        } else {
          q[0].forEach(fn => next.add(fn));
        }
      }
    });

    dirs.forEach(dir => {
      const q = queues.get(dir);
      assert$1(q[0] instanceof Set);
      if (q[0].size === 1 && q.length === 1) {
        queues.delete(dir);
      } else if (q[0].size === 1) {
        q.shift();

        // must be a function or else the Set would've been reused
        next.add(q[0]);
      } else {
        q[0].delete(fn);
      }
    });
    running.delete(fn);

    next.forEach(fn => run(fn));
    return true
  };

  const reserve = (paths, fn) => {
    // collide on matches across case and unicode normalization
    // On windows, thanks to the magic of 8.3 shortnames, it is fundamentally
    // impossible to determine whether two paths refer to the same thing on
    // disk, without asking the kernel for a shortname.
    // So, we just pretend that every path matches every other path here,
    // effectively removing all parallelization on windows.
    paths = isWindows$2 ? ['win32 parallelization disabled'] : paths.map(p => {
      // don't need normPath, because we skip this entirely for windows
      return stripSlashes(join(normalize$1(p))).toLowerCase()
    });

    const dirs = new Set(
      paths.map(path => getDirs(path)).reduce((a, b) => a.concat(b))
    );
    reservations.set(fn, { dirs, paths });
    paths.forEach(path => {
      const q = queues.get(path);
      if (!q) {
        queues.set(path, [fn]);
      } else {
        q.push(fn);
      }
    });
    dirs.forEach(dir => {
      const q = queues.get(dir);
      if (!q) {
        queues.set(dir, [new Set([fn])]);
      } else if (q[q.length - 1] instanceof Set) {
        q[q.length - 1].add(fn);
      } else {
        q.push(new Set([fn]));
      }
    });

    return run(fn)
  };

  return { check, reserve }
};

// Get the appropriate flag to use for creating files
// We use fmap on Windows platforms for files less than
// 512kb.  This is a fairly low limit, but avoids making
// things slower in some cases.  Since most of what this
// library is used for is extracting tarballs of many
// relatively small files in npm packages and the like,
// it can be a big boost on Windows platforms.
// Only supported in Node v12.9.0 and above.
const platform$1 = process.env.__FAKE_PLATFORM__ || process.platform;
const isWindows$1 = platform$1 === 'win32';
const fs$3 = commonjsGlobal.__FAKE_TESTING_FS__ || require$$2$1;

/* istanbul ignore next */
const { O_CREAT, O_TRUNC, O_WRONLY, UV_FS_O_FILEMAP = 0 } = fs$3.constants;

const fMapEnabled = isWindows$1 && !!UV_FS_O_FILEMAP;
const fMapLimit = 512 * 1024;
const fMapFlag = UV_FS_O_FILEMAP | O_TRUNC | O_CREAT | O_WRONLY;
var getWriteFlag = !fMapEnabled ? () => 'w'
  : size => size < fMapLimit ? fMapFlag : 'w';

// the PEND/UNPEND stuff tracks whether we're ready to emit end/close yet.
// but the path reservations are required to avoid race conditions where
// parallelized unpack ops may mess with one another, due to dependencies
// (like a Link depending on its target) or destructive operations (like
// clobbering an fs object to create one of a different type.)

const assert = require$$0$2;
const Parser = parse$2;
const fs$2 = require$$2$1;
const fsm$1 = fsMinipass;
const path$2 = require$$0$3;
const mkdir = mkdirExports;
const wc = winchars$1;
const pathReservations = pathReservations$1;
const stripAbsolutePath = stripAbsolutePath$2;
const normPath = normalizeWindowsPath;
const stripSlash$1 = stripTrailingSlashes;
const normalize = normalizeUnicode;

const ONENTRY = Symbol('onEntry');
const CHECKFS = Symbol('checkFs');
const CHECKFS2 = Symbol('checkFs2');
const PRUNECACHE = Symbol('pruneCache');
const ISREUSABLE = Symbol('isReusable');
const MAKEFS = Symbol('makeFs');
const FILE = Symbol('file');
const DIRECTORY = Symbol('directory');
const LINK = Symbol('link');
const SYMLINK = Symbol('symlink');
const HARDLINK = Symbol('hardlink');
const UNSUPPORTED = Symbol('unsupported');
const CHECKPATH = Symbol('checkPath');
const MKDIR = Symbol('mkdir');
const ONERROR = Symbol('onError');
const PENDING = Symbol('pending');
const PEND = Symbol('pend');
const UNPEND = Symbol('unpend');
const ENDED = Symbol('ended');
const MAYBECLOSE = Symbol('maybeClose');
const SKIP = Symbol('skip');
const DOCHOWN = Symbol('doChown');
const UID = Symbol('uid');
const GID = Symbol('gid');
const CHECKED_CWD = Symbol('checkedCwd');
const crypto$1 = require$$12;
const getFlag = getWriteFlag;
const platform = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform;
const isWindows = platform === 'win32';
const DEFAULT_MAX_DEPTH = 1024;

// Unlinks on Windows are not atomic.
//
// This means that if you have a file entry, followed by another
// file entry with an identical name, and you cannot re-use the file
// (because it's a hardlink, or because unlink:true is set, or it's
// Windows, which does not have useful nlink values), then the unlink
// will be committed to the disk AFTER the new file has been written
// over the old one, deleting the new file.
//
// To work around this, on Windows systems, we rename the file and then
// delete the renamed file.  It's a sloppy kludge, but frankly, I do not
// know of a better way to do this, given windows' non-atomic unlink
// semantics.
//
// See: https://github.com/npm/node-tar/issues/183
/* istanbul ignore next */
const unlinkFile = (path, cb) => {
  if (!isWindows) {
    return fs$2.unlink(path, cb)
  }

  const name = path + '.DELETE.' + crypto$1.randomBytes(16).toString('hex');
  fs$2.rename(path, name, er => {
    if (er) {
      return cb(er)
    }
    fs$2.unlink(name, cb);
  });
};

/* istanbul ignore next */
const unlinkFileSync = path => {
  if (!isWindows) {
    return fs$2.unlinkSync(path)
  }

  const name = path + '.DELETE.' + crypto$1.randomBytes(16).toString('hex');
  fs$2.renameSync(path, name);
  fs$2.unlinkSync(name);
};

// this.gid, entry.gid, this.processUid
const uint32 = (a, b, c) =>
  a === a >>> 0 ? a
  : b === b >>> 0 ? b
  : c;

// clear the cache if it's a case-insensitive unicode-squashing match.
// we can't know if the current file system is case-sensitive or supports
// unicode fully, so we check for similarity on the maximally compatible
// representation.  Err on the side of pruning, since all it's doing is
// preventing lstats, and it's not the end of the world if we get a false
// positive.
// Note that on windows, we always drop the entire cache whenever a
// symbolic link is encountered, because 8.3 filenames are impossible
// to reason about, and collisions are hazards rather than just failures.
const cacheKeyNormalize = path => stripSlash$1(normPath(normalize(path)))
  .toLowerCase();

const pruneCache = (cache, abs) => {
  abs = cacheKeyNormalize(abs);
  for (const path of cache.keys()) {
    const pnorm = cacheKeyNormalize(path);
    if (pnorm === abs || pnorm.indexOf(abs + '/') === 0) {
      cache.delete(path);
    }
  }
};

const dropCache = cache => {
  for (const key of cache.keys()) {
    cache.delete(key);
  }
};

let Unpack$1 = class Unpack extends Parser {
  constructor (opt) {
    if (!opt) {
      opt = {};
    }

    opt.ondone = _ => {
      this[ENDED] = true;
      this[MAYBECLOSE]();
    };

    super(opt);

    this[CHECKED_CWD] = false;

    this.reservations = pathReservations();

    this.transform = typeof opt.transform === 'function' ? opt.transform : null;

    this.writable = true;
    this.readable = false;

    this[PENDING] = 0;
    this[ENDED] = false;

    this.dirCache = opt.dirCache || new Map();

    if (typeof opt.uid === 'number' || typeof opt.gid === 'number') {
      // need both or neither
      if (typeof opt.uid !== 'number' || typeof opt.gid !== 'number') {
        throw new TypeError('cannot set owner without number uid and gid')
      }
      if (opt.preserveOwner) {
        throw new TypeError(
          'cannot preserve owner in archive and also set owner explicitly')
      }
      this.uid = opt.uid;
      this.gid = opt.gid;
      this.setOwner = true;
    } else {
      this.uid = null;
      this.gid = null;
      this.setOwner = false;
    }

    // default true for root
    if (opt.preserveOwner === undefined && typeof opt.uid !== 'number') {
      this.preserveOwner = process.getuid && process.getuid() === 0;
    } else {
      this.preserveOwner = !!opt.preserveOwner;
    }

    this.processUid = (this.preserveOwner || this.setOwner) && process.getuid ?
      process.getuid() : null;
    this.processGid = (this.preserveOwner || this.setOwner) && process.getgid ?
      process.getgid() : null;

    // prevent excessively deep nesting of subfolders
    // set to `Infinity` to remove this restriction
    this.maxDepth = typeof opt.maxDepth === 'number'
      ? opt.maxDepth
      : DEFAULT_MAX_DEPTH;

    // mostly just for testing, but useful in some cases.
    // Forcibly trigger a chown on every entry, no matter what
    this.forceChown = opt.forceChown === true;

    // turn ><?| in filenames into 0xf000-higher encoded forms
    this.win32 = !!opt.win32 || isWindows;

    // do not unpack over files that are newer than what's in the archive
    this.newer = !!opt.newer;

    // do not unpack over ANY files
    this.keep = !!opt.keep;

    // do not set mtime/atime of extracted entries
    this.noMtime = !!opt.noMtime;

    // allow .., absolute path entries, and unpacking through symlinks
    // without this, warn and skip .., relativize absolutes, and error
    // on symlinks in extraction path
    this.preservePaths = !!opt.preservePaths;

    // unlink files and links before writing. This breaks existing hard
    // links, and removes symlink directories rather than erroring
    this.unlink = !!opt.unlink;

    this.cwd = normPath(path$2.resolve(opt.cwd || process.cwd()));
    this.strip = +opt.strip || 0;
    // if we're not chmodding, then we don't need the process umask
    this.processUmask = opt.noChmod ? 0 : process.umask();
    this.umask = typeof opt.umask === 'number' ? opt.umask : this.processUmask;

    // default mode for dirs created as parents
    this.dmode = opt.dmode || (0o0777 & (~this.umask));
    this.fmode = opt.fmode || (0o0666 & (~this.umask));

    this.on('entry', entry => this[ONENTRY](entry));
  }

  // a bad or damaged archive is a warning for Parser, but an error
  // when extracting.  Mark those errors as unrecoverable, because
  // the Unpack contract cannot be met.
  warn (code, msg, data = {}) {
    if (code === 'TAR_BAD_ARCHIVE' || code === 'TAR_ABORT') {
      data.recoverable = false;
    }
    return super.warn(code, msg, data)
  }

  [MAYBECLOSE] () {
    if (this[ENDED] && this[PENDING] === 0) {
      this.emit('prefinish');
      this.emit('finish');
      this.emit('end');
    }
  }

  [CHECKPATH] (entry) {
    const p = normPath(entry.path);
    const parts = p.split('/');

    if (this.strip) {
      if (parts.length < this.strip) {
        return false
      }
      if (entry.type === 'Link') {
        const linkparts = normPath(entry.linkpath).split('/');
        if (linkparts.length >= this.strip) {
          entry.linkpath = linkparts.slice(this.strip).join('/');
        } else {
          return false
        }
      }
      parts.splice(0, this.strip);
      entry.path = parts.join('/');
    }

    if (isFinite(this.maxDepth) && parts.length > this.maxDepth) {
      this.warn('TAR_ENTRY_ERROR', 'path excessively deep', {
        entry,
        path: p,
        depth: parts.length,
        maxDepth: this.maxDepth,
      });
      return false
    }

    if (!this.preservePaths) {
      if (parts.includes('..') || isWindows && /^[a-z]:\.\.$/i.test(parts[0])) {
        this.warn('TAR_ENTRY_ERROR', `path contains '..'`, {
          entry,
          path: p,
        });
        return false
      }

      // strip off the root
      const [root, stripped] = stripAbsolutePath(p);
      if (root) {
        entry.path = stripped;
        this.warn('TAR_ENTRY_INFO', `stripping ${root} from absolute path`, {
          entry,
          path: p,
        });
      }
    }

    if (path$2.isAbsolute(entry.path)) {
      entry.absolute = normPath(path$2.resolve(entry.path));
    } else {
      entry.absolute = normPath(path$2.resolve(this.cwd, entry.path));
    }

    // if we somehow ended up with a path that escapes the cwd, and we are
    // not in preservePaths mode, then something is fishy!  This should have
    // been prevented above, so ignore this for coverage.
    /* istanbul ignore if - defense in depth */
    if (!this.preservePaths &&
        entry.absolute.indexOf(this.cwd + '/') !== 0 &&
        entry.absolute !== this.cwd) {
      this.warn('TAR_ENTRY_ERROR', 'path escaped extraction target', {
        entry,
        path: normPath(entry.path),
        resolvedPath: entry.absolute,
        cwd: this.cwd,
      });
      return false
    }

    // an archive can set properties on the extraction directory, but it
    // may not replace the cwd with a different kind of thing entirely.
    if (entry.absolute === this.cwd &&
        entry.type !== 'Directory' &&
        entry.type !== 'GNUDumpDir') {
      return false
    }

    // only encode : chars that aren't drive letter indicators
    if (this.win32) {
      const { root: aRoot } = path$2.win32.parse(entry.absolute);
      entry.absolute = aRoot + wc.encode(entry.absolute.slice(aRoot.length));
      const { root: pRoot } = path$2.win32.parse(entry.path);
      entry.path = pRoot + wc.encode(entry.path.slice(pRoot.length));
    }

    return true
  }

  [ONENTRY] (entry) {
    if (!this[CHECKPATH](entry)) {
      return entry.resume()
    }

    assert.equal(typeof entry.absolute, 'string');

    switch (entry.type) {
      case 'Directory':
      case 'GNUDumpDir':
        if (entry.mode) {
          entry.mode = entry.mode | 0o700;
        }

      // eslint-disable-next-line no-fallthrough
      case 'File':
      case 'OldFile':
      case 'ContiguousFile':
      case 'Link':
      case 'SymbolicLink':
        return this[CHECKFS](entry)

      case 'CharacterDevice':
      case 'BlockDevice':
      case 'FIFO':
      default:
        return this[UNSUPPORTED](entry)
    }
  }

  [ONERROR] (er, entry) {
    // Cwd has to exist, or else nothing works. That's serious.
    // Other errors are warnings, which raise the error in strict
    // mode, but otherwise continue on.
    if (er.name === 'CwdError') {
      this.emit('error', er);
    } else {
      this.warn('TAR_ENTRY_ERROR', er, { entry });
      this[UNPEND]();
      entry.resume();
    }
  }

  [MKDIR] (dir, mode, cb) {
    mkdir(normPath(dir), {
      uid: this.uid,
      gid: this.gid,
      processUid: this.processUid,
      processGid: this.processGid,
      umask: this.processUmask,
      preserve: this.preservePaths,
      unlink: this.unlink,
      cache: this.dirCache,
      cwd: this.cwd,
      mode: mode,
      noChmod: this.noChmod,
    }, cb);
  }

  [DOCHOWN] (entry) {
    // in preserve owner mode, chown if the entry doesn't match process
    // in set owner mode, chown if setting doesn't match process
    return this.forceChown ||
      this.preserveOwner &&
      (typeof entry.uid === 'number' && entry.uid !== this.processUid ||
        typeof entry.gid === 'number' && entry.gid !== this.processGid)
      ||
      (typeof this.uid === 'number' && this.uid !== this.processUid ||
        typeof this.gid === 'number' && this.gid !== this.processGid)
  }

  [UID] (entry) {
    return uint32(this.uid, entry.uid, this.processUid)
  }

  [GID] (entry) {
    return uint32(this.gid, entry.gid, this.processGid)
  }

  [FILE] (entry, fullyDone) {
    const mode = entry.mode & 0o7777 || this.fmode;
    const stream = new fsm$1.WriteStream(entry.absolute, {
      flags: getFlag(entry.size),
      mode: mode,
      autoClose: false,
    });
    stream.on('error', er => {
      if (stream.fd) {
        fs$2.close(stream.fd, () => {});
      }

      // flush all the data out so that we aren't left hanging
      // if the error wasn't actually fatal.  otherwise the parse
      // is blocked, and we never proceed.
      stream.write = () => true;
      this[ONERROR](er, entry);
      fullyDone();
    });

    let actions = 1;
    const done = er => {
      if (er) {
        /* istanbul ignore else - we should always have a fd by now */
        if (stream.fd) {
          fs$2.close(stream.fd, () => {});
        }

        this[ONERROR](er, entry);
        fullyDone();
        return
      }

      if (--actions === 0) {
        fs$2.close(stream.fd, er => {
          if (er) {
            this[ONERROR](er, entry);
          } else {
            this[UNPEND]();
          }
          fullyDone();
        });
      }
    };

    stream.on('finish', _ => {
      // if futimes fails, try utimes
      // if utimes fails, fail with the original error
      // same for fchown/chown
      const abs = entry.absolute;
      const fd = stream.fd;

      if (entry.mtime && !this.noMtime) {
        actions++;
        const atime = entry.atime || new Date();
        const mtime = entry.mtime;
        fs$2.futimes(fd, atime, mtime, er =>
          er ? fs$2.utimes(abs, atime, mtime, er2 => done(er2 && er))
          : done());
      }

      if (this[DOCHOWN](entry)) {
        actions++;
        const uid = this[UID](entry);
        const gid = this[GID](entry);
        fs$2.fchown(fd, uid, gid, er =>
          er ? fs$2.chown(abs, uid, gid, er2 => done(er2 && er))
          : done());
      }

      done();
    });

    const tx = this.transform ? this.transform(entry) || entry : entry;
    if (tx !== entry) {
      tx.on('error', er => {
        this[ONERROR](er, entry);
        fullyDone();
      });
      entry.pipe(tx);
    }
    tx.pipe(stream);
  }

  [DIRECTORY] (entry, fullyDone) {
    const mode = entry.mode & 0o7777 || this.dmode;
    this[MKDIR](entry.absolute, mode, er => {
      if (er) {
        this[ONERROR](er, entry);
        fullyDone();
        return
      }

      let actions = 1;
      const done = _ => {
        if (--actions === 0) {
          fullyDone();
          this[UNPEND]();
          entry.resume();
        }
      };

      if (entry.mtime && !this.noMtime) {
        actions++;
        fs$2.utimes(entry.absolute, entry.atime || new Date(), entry.mtime, done);
      }

      if (this[DOCHOWN](entry)) {
        actions++;
        fs$2.chown(entry.absolute, this[UID](entry), this[GID](entry), done);
      }

      done();
    });
  }

  [UNSUPPORTED] (entry) {
    entry.unsupported = true;
    this.warn('TAR_ENTRY_UNSUPPORTED',
      `unsupported entry type: ${entry.type}`, { entry });
    entry.resume();
  }

  [SYMLINK] (entry, done) {
    this[LINK](entry, entry.linkpath, 'symlink', done);
  }

  [HARDLINK] (entry, done) {
    const linkpath = normPath(path$2.resolve(this.cwd, entry.linkpath));
    this[LINK](entry, linkpath, 'link', done);
  }

  [PEND] () {
    this[PENDING]++;
  }

  [UNPEND] () {
    this[PENDING]--;
    this[MAYBECLOSE]();
  }

  [SKIP] (entry) {
    this[UNPEND]();
    entry.resume();
  }

  // Check if we can reuse an existing filesystem entry safely and
  // overwrite it, rather than unlinking and recreating
  // Windows doesn't report a useful nlink, so we just never reuse entries
  [ISREUSABLE] (entry, st) {
    return entry.type === 'File' &&
      !this.unlink &&
      st.isFile() &&
      st.nlink <= 1 &&
      !isWindows
  }

  // check if a thing is there, and if so, try to clobber it
  [CHECKFS] (entry) {
    this[PEND]();
    const paths = [entry.path];
    if (entry.linkpath) {
      paths.push(entry.linkpath);
    }
    this.reservations.reserve(paths, done => this[CHECKFS2](entry, done));
  }

  [PRUNECACHE] (entry) {
    // if we are not creating a directory, and the path is in the dirCache,
    // then that means we are about to delete the directory we created
    // previously, and it is no longer going to be a directory, and neither
    // is any of its children.
    // If a symbolic link is encountered, all bets are off.  There is no
    // reasonable way to sanitize the cache in such a way we will be able to
    // avoid having filesystem collisions.  If this happens with a non-symlink
    // entry, it'll just fail to unpack, but a symlink to a directory, using an
    // 8.3 shortname or certain unicode attacks, can evade detection and lead
    // to arbitrary writes to anywhere on the system.
    if (entry.type === 'SymbolicLink') {
      dropCache(this.dirCache);
    } else if (entry.type !== 'Directory') {
      pruneCache(this.dirCache, entry.absolute);
    }
  }

  [CHECKFS2] (entry, fullyDone) {
    this[PRUNECACHE](entry);

    const done = er => {
      this[PRUNECACHE](entry);
      fullyDone(er);
    };

    const checkCwd = () => {
      this[MKDIR](this.cwd, this.dmode, er => {
        if (er) {
          this[ONERROR](er, entry);
          done();
          return
        }
        this[CHECKED_CWD] = true;
        start();
      });
    };

    const start = () => {
      if (entry.absolute !== this.cwd) {
        const parent = normPath(path$2.dirname(entry.absolute));
        if (parent !== this.cwd) {
          return this[MKDIR](parent, this.dmode, er => {
            if (er) {
              this[ONERROR](er, entry);
              done();
              return
            }
            afterMakeParent();
          })
        }
      }
      afterMakeParent();
    };

    const afterMakeParent = () => {
      fs$2.lstat(entry.absolute, (lstatEr, st) => {
        if (st && (this.keep || this.newer && st.mtime > entry.mtime)) {
          this[SKIP](entry);
          done();
          return
        }
        if (lstatEr || this[ISREUSABLE](entry, st)) {
          return this[MAKEFS](null, entry, done)
        }

        if (st.isDirectory()) {
          if (entry.type === 'Directory') {
            const needChmod = !this.noChmod &&
              entry.mode &&
              (st.mode & 0o7777) !== entry.mode;
            const afterChmod = er => this[MAKEFS](er, entry, done);
            if (!needChmod) {
              return afterChmod()
            }
            return fs$2.chmod(entry.absolute, entry.mode, afterChmod)
          }
          // Not a dir entry, have to remove it.
          // NB: the only way to end up with an entry that is the cwd
          // itself, in such a way that == does not detect, is a
          // tricky windows absolute path with UNC or 8.3 parts (and
          // preservePaths:true, or else it will have been stripped).
          // In that case, the user has opted out of path protections
          // explicitly, so if they blow away the cwd, c'est la vie.
          if (entry.absolute !== this.cwd) {
            return fs$2.rmdir(entry.absolute, er =>
              this[MAKEFS](er, entry, done))
          }
        }

        // not a dir, and not reusable
        // don't remove if the cwd, we want that error
        if (entry.absolute === this.cwd) {
          return this[MAKEFS](null, entry, done)
        }

        unlinkFile(entry.absolute, er =>
          this[MAKEFS](er, entry, done));
      });
    };

    if (this[CHECKED_CWD]) {
      start();
    } else {
      checkCwd();
    }
  }

  [MAKEFS] (er, entry, done) {
    if (er) {
      this[ONERROR](er, entry);
      done();
      return
    }

    switch (entry.type) {
      case 'File':
      case 'OldFile':
      case 'ContiguousFile':
        return this[FILE](entry, done)

      case 'Link':
        return this[HARDLINK](entry, done)

      case 'SymbolicLink':
        return this[SYMLINK](entry, done)

      case 'Directory':
      case 'GNUDumpDir':
        return this[DIRECTORY](entry, done)
    }
  }

  [LINK] (entry, linkpath, link, done) {
    // XXX: get the type ('symlink' or 'junction') for windows
    fs$2[link](linkpath, entry.absolute, er => {
      if (er) {
        this[ONERROR](er, entry);
      } else {
        this[UNPEND]();
        entry.resume();
      }
      done();
    });
  }
};

const callSync = fn => {
  try {
    return [null, fn()]
  } catch (er) {
    return [er, null]
  }
};
class UnpackSync extends Unpack$1 {
  [MAKEFS] (er, entry) {
    return super[MAKEFS](er, entry, () => {})
  }

  [CHECKFS] (entry) {
    this[PRUNECACHE](entry);

    if (!this[CHECKED_CWD]) {
      const er = this[MKDIR](this.cwd, this.dmode);
      if (er) {
        return this[ONERROR](er, entry)
      }
      this[CHECKED_CWD] = true;
    }

    // don't bother to make the parent if the current entry is the cwd,
    // we've already checked it.
    if (entry.absolute !== this.cwd) {
      const parent = normPath(path$2.dirname(entry.absolute));
      if (parent !== this.cwd) {
        const mkParent = this[MKDIR](parent, this.dmode);
        if (mkParent) {
          return this[ONERROR](mkParent, entry)
        }
      }
    }

    const [lstatEr, st] = callSync(() => fs$2.lstatSync(entry.absolute));
    if (st && (this.keep || this.newer && st.mtime > entry.mtime)) {
      return this[SKIP](entry)
    }

    if (lstatEr || this[ISREUSABLE](entry, st)) {
      return this[MAKEFS](null, entry)
    }

    if (st.isDirectory()) {
      if (entry.type === 'Directory') {
        const needChmod = !this.noChmod &&
          entry.mode &&
          (st.mode & 0o7777) !== entry.mode;
        const [er] = needChmod ? callSync(() => {
          fs$2.chmodSync(entry.absolute, entry.mode);
        }) : [];
        return this[MAKEFS](er, entry)
      }
      // not a dir entry, have to remove it
      const [er] = callSync(() => fs$2.rmdirSync(entry.absolute));
      this[MAKEFS](er, entry);
    }

    // not a dir, and not reusable.
    // don't remove if it's the cwd, since we want that error.
    const [er] = entry.absolute === this.cwd ? []
      : callSync(() => unlinkFileSync(entry.absolute));
    this[MAKEFS](er, entry);
  }

  [FILE] (entry, done) {
    const mode = entry.mode & 0o7777 || this.fmode;

    const oner = er => {
      let closeError;
      try {
        fs$2.closeSync(fd);
      } catch (e) {
        closeError = e;
      }
      if (er || closeError) {
        this[ONERROR](er || closeError, entry);
      }
      done();
    };

    let fd;
    try {
      fd = fs$2.openSync(entry.absolute, getFlag(entry.size), mode);
    } catch (er) {
      return oner(er)
    }
    const tx = this.transform ? this.transform(entry) || entry : entry;
    if (tx !== entry) {
      tx.on('error', er => this[ONERROR](er, entry));
      entry.pipe(tx);
    }

    tx.on('data', chunk => {
      try {
        fs$2.writeSync(fd, chunk, 0, chunk.length);
      } catch (er) {
        oner(er);
      }
    });

    tx.on('end', _ => {
      let er = null;
      // try both, falling futimes back to utimes
      // if either fails, handle the first error
      if (entry.mtime && !this.noMtime) {
        const atime = entry.atime || new Date();
        const mtime = entry.mtime;
        try {
          fs$2.futimesSync(fd, atime, mtime);
        } catch (futimeser) {
          try {
            fs$2.utimesSync(entry.absolute, atime, mtime);
          } catch (utimeser) {
            er = futimeser;
          }
        }
      }

      if (this[DOCHOWN](entry)) {
        const uid = this[UID](entry);
        const gid = this[GID](entry);

        try {
          fs$2.fchownSync(fd, uid, gid);
        } catch (fchowner) {
          try {
            fs$2.chownSync(entry.absolute, uid, gid);
          } catch (chowner) {
            er = er || fchowner;
          }
        }
      }

      oner(er);
    });
  }

  [DIRECTORY] (entry, done) {
    const mode = entry.mode & 0o7777 || this.dmode;
    const er = this[MKDIR](entry.absolute, mode);
    if (er) {
      this[ONERROR](er, entry);
      done();
      return
    }
    if (entry.mtime && !this.noMtime) {
      try {
        fs$2.utimesSync(entry.absolute, entry.atime || new Date(), entry.mtime);
      } catch (er) {}
    }
    if (this[DOCHOWN](entry)) {
      try {
        fs$2.chownSync(entry.absolute, this[UID](entry), this[GID](entry));
      } catch (er) {}
    }
    done();
    entry.resume();
  }

  [MKDIR] (dir, mode) {
    try {
      return mkdir.sync(normPath(dir), {
        uid: this.uid,
        gid: this.gid,
        processUid: this.processUid,
        processGid: this.processGid,
        umask: this.processUmask,
        preserve: this.preservePaths,
        unlink: this.unlink,
        cache: this.dirCache,
        cwd: this.cwd,
        mode: mode,
      })
    } catch (er) {
      return er
    }
  }

  [LINK] (entry, linkpath, link, done) {
    try {
      fs$2[link + 'Sync'](linkpath, entry.absolute);
      done();
      entry.resume();
    } catch (er) {
      return this[ONERROR](er, entry)
    }
  }
}

Unpack$1.Sync = UnpackSync;
var unpack = Unpack$1;

// tar -x
const hlo = highLevelOpt;
const Unpack = unpack;
const fs$1 = require$$2$1;
const fsm = fsMinipass;
const path$1 = require$$0$3;
const stripSlash = stripTrailingSlashes;

var extract_1 = (opt_, files, cb) => {
  if (typeof opt_ === 'function') {
    cb = opt_, files = null, opt_ = {};
  } else if (Array.isArray(opt_)) {
    files = opt_, opt_ = {};
  }

  if (typeof files === 'function') {
    cb = files, files = null;
  }

  if (!files) {
    files = [];
  } else {
    files = Array.from(files);
  }

  const opt = hlo(opt_);

  if (opt.sync && typeof cb === 'function') {
    throw new TypeError('callback not supported for sync tar functions')
  }

  if (!opt.file && typeof cb === 'function') {
    throw new TypeError('callback only supported with file option')
  }

  if (files.length) {
    filesFilter(opt, files);
  }

  return opt.file && opt.sync ? extractFileSync(opt)
    : opt.file ? extractFile(opt, cb)
    : opt.sync ? extractSync(opt)
    : extract(opt)
};

// construct a filter that limits the file entries listed
// include child entries if a dir is included
const filesFilter = (opt, files) => {
  const map = new Map(files.map(f => [stripSlash(f), true]));
  const filter = opt.filter;

  const mapHas = (file, r) => {
    const root = r || path$1.parse(file).root || '.';
    const ret = file === root ? false
      : map.has(file) ? map.get(file)
      : mapHas(path$1.dirname(file), root);

    map.set(file, ret);
    return ret
  };

  opt.filter = filter
    ? (file, entry) => filter(file, entry) && mapHas(stripSlash(file))
    : file => mapHas(stripSlash(file));
};

const extractFileSync = opt => {
  const u = new Unpack.Sync(opt);

  const file = opt.file;
  const stat = fs$1.statSync(file);
  // This trades a zero-byte read() syscall for a stat
  // However, it will usually result in less memory allocation
  const readSize = opt.maxReadSize || 16 * 1024 * 1024;
  const stream = new fsm.ReadStreamSync(file, {
    readSize: readSize,
    size: stat.size,
  });
  stream.pipe(u);
};

const extractFile = (opt, cb) => {
  const u = new Unpack(opt);
  const readSize = opt.maxReadSize || 16 * 1024 * 1024;

  const file = opt.file;
  const p = new Promise((resolve, reject) => {
    u.on('error', reject);
    u.on('close', resolve);

    // This trades a zero-byte read() syscall for a stat
    // However, it will usually result in less memory allocation
    fs$1.stat(file, (er, stat) => {
      if (er) {
        reject(er);
      } else {
        const stream = new fsm.ReadStream(file, {
          readSize: readSize,
          size: stat.size,
        });
        stream.on('error', reject);
        stream.pipe(u);
      }
    });
  });
  return cb ? p.then(cb, cb) : p
};

const extractSync = opt => new Unpack.Sync(opt);

const extract = opt => new Unpack(opt);

// high-level commands
tar.c = tar.create = create_1;
tar.r = tar.replace = replace_1;
tar.t = tar.list = list_1;
tar.u = tar.update = update;
tar.x = tar.extract = extract_1;

// classes
tar.Pack = pack;
tar.Unpack = unpack;
tar.Parse = parse$2;
tar.ReadEntry = readEntry;
tar.WriteEntry = writeEntry;
tar.Header = header;
tar.Pax = pax;
tar.types = types$2;

var createFilterSourceFile$1 = {};

Object.defineProperty(createFilterSourceFile$1, "__esModule", { value: true });
createFilterSourceFile$1.createFilterSourceFile = void 0;
const path_1$1 = require$$0$3;
function createFilterSourceFile(hash) {
    return (path) => (0, path_1$1.normalize)(path) !== (0, path_1$1.join)(hash, "source");
}
createFilterSourceFile$1.createFilterSourceFile = createFilterSourceFile;

var getFileNameFromHash$1 = {};

var hashSuffix = {};

Object.defineProperty(hashSuffix, "__esModule", { value: true });
hashSuffix.HASH_SUFFIX = void 0;
/**
 * Hash suffix will be modified whenever the archiving method is beeing updated.
 * This will prevent incorrect cache-hits with older versions.
 *
 * Examples:
 * - .zip
 * - .tar.gz
 * - -v2.tar.gz
 */
hashSuffix.HASH_SUFFIX = ".tar.gz";

Object.defineProperty(getFileNameFromHash$1, "__esModule", { value: true });
getFileNameFromHash$1.getFileNameFromHash = void 0;
const hash_suffix_1 = hashSuffix;
function getFileNameFromHash(hash) {
    return hash + hash_suffix_1.HASH_SUFFIX;
}
getFileNameFromHash$1.getFileNameFromHash = getFileNameFromHash;

Object.defineProperty(createRemoteCacheRetrieve$1, "__esModule", { value: true });
createRemoteCacheRetrieve$1.createRemoteCacheRetrieve = void 0;
const promises_1 = require$$0$5;
const path_1 = require$$0$3;
const stream_1$1 = require$$1;
const promises_2 = require$$3;
const tar_1$1 = tar;
const create_filter_source_file_1$1 = createFilterSourceFile$1;
const get_file_name_from_hash_1$1 = getFileNameFromHash$1;
const COMMIT_FILE_EXTENSION = ".commit";
const COMMIT_FILE_CONTENT = "true";
const extractFolder = async (stream, destination, hash) => {
    await (0, promises_1.mkdir)(destination, { recursive: true });
    return await (0, promises_2.pipeline)(stream_1$1.Readable.from(stream), (0, tar_1$1.extract)({
        C: destination,
        strip: 1,
        filter: (0, create_filter_source_file_1$1.createFilterSourceFile)(hash),
    }));
};
const writeCommitFile = (destination) => {
    const commitFilePath = destination + COMMIT_FILE_EXTENSION;
    return (0, promises_1.writeFile)(commitFilePath, COMMIT_FILE_CONTENT);
};
const createRemoteCacheRetrieve = (safeImplementation) => async (hash, cacheDirectory) => {
    const implementation = await safeImplementation;
    if (!implementation) {
        return false;
    }
    const file = (0, get_file_name_from_hash_1$1.getFileNameFromHash)(hash);
    const { fileExists, retrieveFile } = implementation;
    const isFileCached = await fileExists(file);
    console.log('createRemoteCacheRetrieve', {
      hash,
      cacheDirectory,
      file,
      isFileCached,
    });
    if (!isFileCached) {
        return false;
    }
    const stream = await retrieveFile(file);
    const destination = (0, path_1.join)(cacheDirectory, hash);
    if (!stream) {
        return false;
    }
    await extractFolder(stream, destination, hash);
    await writeCommitFile(destination);
    return true;
};
createRemoteCacheRetrieve$1.createRemoteCacheRetrieve = createRemoteCacheRetrieve;

var createRemoteCacheStore$1 = {};

Object.defineProperty(createRemoteCacheStore$1, "__esModule", { value: true });
createRemoteCacheStore$1.createRemoteCacheStore = void 0;
const stream_1 = require$$1;
const tar_1 = tar;
const create_filter_source_file_1 = createFilterSourceFile$1;
const get_file_name_from_hash_1 = getFileNameFromHash$1;
const archiveFolder = (cwd, hash) => stream_1.Readable.from((0, tar_1.create)({ gzip: true, C: cwd, filter: (0, create_filter_source_file_1.createFilterSourceFile)(hash) }, [hash]));
const createRemoteCacheStore = (safeImplementation) => async (hash, cacheDirectory) => {
    const implementation = await safeImplementation;
    if (!implementation) {
        return false;
    }
    const file = (0, get_file_name_from_hash_1.getFileNameFromHash)(hash);
    const { storeFile } = implementation;
    const stream = archiveFolder(cacheDirectory, hash);
    await storeFile(file, stream);
    return true;
};
createRemoteCacheStore$1.createRemoteCacheStore = createRemoteCacheStore;

var getSafeRemoteCacheImplementation$1 = {};

var log$3 = {};

var ansiStyles$1 = {exports: {}};

var colorName;
var hasRequiredColorName;

function requireColorName () {
	if (hasRequiredColorName) return colorName;
	hasRequiredColorName = 1;

	colorName = {
		"aliceblue": [240, 248, 255],
		"antiquewhite": [250, 235, 215],
		"aqua": [0, 255, 255],
		"aquamarine": [127, 255, 212],
		"azure": [240, 255, 255],
		"beige": [245, 245, 220],
		"bisque": [255, 228, 196],
		"black": [0, 0, 0],
		"blanchedalmond": [255, 235, 205],
		"blue": [0, 0, 255],
		"blueviolet": [138, 43, 226],
		"brown": [165, 42, 42],
		"burlywood": [222, 184, 135],
		"cadetblue": [95, 158, 160],
		"chartreuse": [127, 255, 0],
		"chocolate": [210, 105, 30],
		"coral": [255, 127, 80],
		"cornflowerblue": [100, 149, 237],
		"cornsilk": [255, 248, 220],
		"crimson": [220, 20, 60],
		"cyan": [0, 255, 255],
		"darkblue": [0, 0, 139],
		"darkcyan": [0, 139, 139],
		"darkgoldenrod": [184, 134, 11],
		"darkgray": [169, 169, 169],
		"darkgreen": [0, 100, 0],
		"darkgrey": [169, 169, 169],
		"darkkhaki": [189, 183, 107],
		"darkmagenta": [139, 0, 139],
		"darkolivegreen": [85, 107, 47],
		"darkorange": [255, 140, 0],
		"darkorchid": [153, 50, 204],
		"darkred": [139, 0, 0],
		"darksalmon": [233, 150, 122],
		"darkseagreen": [143, 188, 143],
		"darkslateblue": [72, 61, 139],
		"darkslategray": [47, 79, 79],
		"darkslategrey": [47, 79, 79],
		"darkturquoise": [0, 206, 209],
		"darkviolet": [148, 0, 211],
		"deeppink": [255, 20, 147],
		"deepskyblue": [0, 191, 255],
		"dimgray": [105, 105, 105],
		"dimgrey": [105, 105, 105],
		"dodgerblue": [30, 144, 255],
		"firebrick": [178, 34, 34],
		"floralwhite": [255, 250, 240],
		"forestgreen": [34, 139, 34],
		"fuchsia": [255, 0, 255],
		"gainsboro": [220, 220, 220],
		"ghostwhite": [248, 248, 255],
		"gold": [255, 215, 0],
		"goldenrod": [218, 165, 32],
		"gray": [128, 128, 128],
		"green": [0, 128, 0],
		"greenyellow": [173, 255, 47],
		"grey": [128, 128, 128],
		"honeydew": [240, 255, 240],
		"hotpink": [255, 105, 180],
		"indianred": [205, 92, 92],
		"indigo": [75, 0, 130],
		"ivory": [255, 255, 240],
		"khaki": [240, 230, 140],
		"lavender": [230, 230, 250],
		"lavenderblush": [255, 240, 245],
		"lawngreen": [124, 252, 0],
		"lemonchiffon": [255, 250, 205],
		"lightblue": [173, 216, 230],
		"lightcoral": [240, 128, 128],
		"lightcyan": [224, 255, 255],
		"lightgoldenrodyellow": [250, 250, 210],
		"lightgray": [211, 211, 211],
		"lightgreen": [144, 238, 144],
		"lightgrey": [211, 211, 211],
		"lightpink": [255, 182, 193],
		"lightsalmon": [255, 160, 122],
		"lightseagreen": [32, 178, 170],
		"lightskyblue": [135, 206, 250],
		"lightslategray": [119, 136, 153],
		"lightslategrey": [119, 136, 153],
		"lightsteelblue": [176, 196, 222],
		"lightyellow": [255, 255, 224],
		"lime": [0, 255, 0],
		"limegreen": [50, 205, 50],
		"linen": [250, 240, 230],
		"magenta": [255, 0, 255],
		"maroon": [128, 0, 0],
		"mediumaquamarine": [102, 205, 170],
		"mediumblue": [0, 0, 205],
		"mediumorchid": [186, 85, 211],
		"mediumpurple": [147, 112, 219],
		"mediumseagreen": [60, 179, 113],
		"mediumslateblue": [123, 104, 238],
		"mediumspringgreen": [0, 250, 154],
		"mediumturquoise": [72, 209, 204],
		"mediumvioletred": [199, 21, 133],
		"midnightblue": [25, 25, 112],
		"mintcream": [245, 255, 250],
		"mistyrose": [255, 228, 225],
		"moccasin": [255, 228, 181],
		"navajowhite": [255, 222, 173],
		"navy": [0, 0, 128],
		"oldlace": [253, 245, 230],
		"olive": [128, 128, 0],
		"olivedrab": [107, 142, 35],
		"orange": [255, 165, 0],
		"orangered": [255, 69, 0],
		"orchid": [218, 112, 214],
		"palegoldenrod": [238, 232, 170],
		"palegreen": [152, 251, 152],
		"paleturquoise": [175, 238, 238],
		"palevioletred": [219, 112, 147],
		"papayawhip": [255, 239, 213],
		"peachpuff": [255, 218, 185],
		"peru": [205, 133, 63],
		"pink": [255, 192, 203],
		"plum": [221, 160, 221],
		"powderblue": [176, 224, 230],
		"purple": [128, 0, 128],
		"rebeccapurple": [102, 51, 153],
		"red": [255, 0, 0],
		"rosybrown": [188, 143, 143],
		"royalblue": [65, 105, 225],
		"saddlebrown": [139, 69, 19],
		"salmon": [250, 128, 114],
		"sandybrown": [244, 164, 96],
		"seagreen": [46, 139, 87],
		"seashell": [255, 245, 238],
		"sienna": [160, 82, 45],
		"silver": [192, 192, 192],
		"skyblue": [135, 206, 235],
		"slateblue": [106, 90, 205],
		"slategray": [112, 128, 144],
		"slategrey": [112, 128, 144],
		"snow": [255, 250, 250],
		"springgreen": [0, 255, 127],
		"steelblue": [70, 130, 180],
		"tan": [210, 180, 140],
		"teal": [0, 128, 128],
		"thistle": [216, 191, 216],
		"tomato": [255, 99, 71],
		"turquoise": [64, 224, 208],
		"violet": [238, 130, 238],
		"wheat": [245, 222, 179],
		"white": [255, 255, 255],
		"whitesmoke": [245, 245, 245],
		"yellow": [255, 255, 0],
		"yellowgreen": [154, 205, 50]
	};
	return colorName;
}

/* MIT license */

var conversions;
var hasRequiredConversions;

function requireConversions () {
	if (hasRequiredConversions) return conversions;
	hasRequiredConversions = 1;
	/* eslint-disable no-mixed-operators */
	const cssKeywords = requireColorName();

	// NOTE: conversions should only return primitive values (i.e. arrays, or
	//       values that give correct `typeof` results).
	//       do not use box values types (i.e. Number(), String(), etc.)

	const reverseKeywords = {};
	for (const key of Object.keys(cssKeywords)) {
		reverseKeywords[cssKeywords[key]] = key;
	}

	const convert = {
		rgb: {channels: 3, labels: 'rgb'},
		hsl: {channels: 3, labels: 'hsl'},
		hsv: {channels: 3, labels: 'hsv'},
		hwb: {channels: 3, labels: 'hwb'},
		cmyk: {channels: 4, labels: 'cmyk'},
		xyz: {channels: 3, labels: 'xyz'},
		lab: {channels: 3, labels: 'lab'},
		lch: {channels: 3, labels: 'lch'},
		hex: {channels: 1, labels: ['hex']},
		keyword: {channels: 1, labels: ['keyword']},
		ansi16: {channels: 1, labels: ['ansi16']},
		ansi256: {channels: 1, labels: ['ansi256']},
		hcg: {channels: 3, labels: ['h', 'c', 'g']},
		apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
		gray: {channels: 1, labels: ['gray']}
	};

	conversions = convert;

	// Hide .channels and .labels properties
	for (const model of Object.keys(convert)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		const {channels, labels} = convert[model];
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}

	convert.rgb.hsl = function (rgb) {
		const r = rgb[0] / 255;
		const g = rgb[1] / 255;
		const b = rgb[2] / 255;
		const min = Math.min(r, g, b);
		const max = Math.max(r, g, b);
		const delta = max - min;
		let h;
		let s;

		if (max === min) {
			h = 0;
		} else if (r === max) {
			h = (g - b) / delta;
		} else if (g === max) {
			h = 2 + (b - r) / delta;
		} else if (b === max) {
			h = 4 + (r - g) / delta;
		}

		h = Math.min(h * 60, 360);

		if (h < 0) {
			h += 360;
		}

		const l = (min + max) / 2;

		if (max === min) {
			s = 0;
		} else if (l <= 0.5) {
			s = delta / (max + min);
		} else {
			s = delta / (2 - max - min);
		}

		return [h, s * 100, l * 100];
	};

	convert.rgb.hsv = function (rgb) {
		let rdif;
		let gdif;
		let bdif;
		let h;
		let s;

		const r = rgb[0] / 255;
		const g = rgb[1] / 255;
		const b = rgb[2] / 255;
		const v = Math.max(r, g, b);
		const diff = v - Math.min(r, g, b);
		const diffc = function (c) {
			return (v - c) / 6 / diff + 1 / 2;
		};

		if (diff === 0) {
			h = 0;
			s = 0;
		} else {
			s = diff / v;
			rdif = diffc(r);
			gdif = diffc(g);
			bdif = diffc(b);

			if (r === v) {
				h = bdif - gdif;
			} else if (g === v) {
				h = (1 / 3) + rdif - bdif;
			} else if (b === v) {
				h = (2 / 3) + gdif - rdif;
			}

			if (h < 0) {
				h += 1;
			} else if (h > 1) {
				h -= 1;
			}
		}

		return [
			h * 360,
			s * 100,
			v * 100
		];
	};

	convert.rgb.hwb = function (rgb) {
		const r = rgb[0];
		const g = rgb[1];
		let b = rgb[2];
		const h = convert.rgb.hsl(rgb)[0];
		const w = 1 / 255 * Math.min(r, Math.min(g, b));

		b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

		return [h, w * 100, b * 100];
	};

	convert.rgb.cmyk = function (rgb) {
		const r = rgb[0] / 255;
		const g = rgb[1] / 255;
		const b = rgb[2] / 255;

		const k = Math.min(1 - r, 1 - g, 1 - b);
		const c = (1 - r - k) / (1 - k) || 0;
		const m = (1 - g - k) / (1 - k) || 0;
		const y = (1 - b - k) / (1 - k) || 0;

		return [c * 100, m * 100, y * 100, k * 100];
	};

	function comparativeDistance(x, y) {
		/*
			See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
		*/
		return (
			((x[0] - y[0]) ** 2) +
			((x[1] - y[1]) ** 2) +
			((x[2] - y[2]) ** 2)
		);
	}

	convert.rgb.keyword = function (rgb) {
		const reversed = reverseKeywords[rgb];
		if (reversed) {
			return reversed;
		}

		let currentClosestDistance = Infinity;
		let currentClosestKeyword;

		for (const keyword of Object.keys(cssKeywords)) {
			const value = cssKeywords[keyword];

			// Compute comparative distance
			const distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}

		return currentClosestKeyword;
	};

	convert.keyword.rgb = function (keyword) {
		return cssKeywords[keyword];
	};

	convert.rgb.xyz = function (rgb) {
		let r = rgb[0] / 255;
		let g = rgb[1] / 255;
		let b = rgb[2] / 255;

		// Assume sRGB
		r = r > 0.04045 ? (((r + 0.055) / 1.055) ** 2.4) : (r / 12.92);
		g = g > 0.04045 ? (((g + 0.055) / 1.055) ** 2.4) : (g / 12.92);
		b = b > 0.04045 ? (((b + 0.055) / 1.055) ** 2.4) : (b / 12.92);

		const x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
		const y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
		const z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

		return [x * 100, y * 100, z * 100];
	};

	convert.rgb.lab = function (rgb) {
		const xyz = convert.rgb.xyz(rgb);
		let x = xyz[0];
		let y = xyz[1];
		let z = xyz[2];

		x /= 95.047;
		y /= 100;
		z /= 108.883;

		x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
		y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
		z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

		const l = (116 * y) - 16;
		const a = 500 * (x - y);
		const b = 200 * (y - z);

		return [l, a, b];
	};

	convert.hsl.rgb = function (hsl) {
		const h = hsl[0] / 360;
		const s = hsl[1] / 100;
		const l = hsl[2] / 100;
		let t2;
		let t3;
		let val;

		if (s === 0) {
			val = l * 255;
			return [val, val, val];
		}

		if (l < 0.5) {
			t2 = l * (1 + s);
		} else {
			t2 = l + s - l * s;
		}

		const t1 = 2 * l - t2;

		const rgb = [0, 0, 0];
		for (let i = 0; i < 3; i++) {
			t3 = h + 1 / 3 * -(i - 1);
			if (t3 < 0) {
				t3++;
			}

			if (t3 > 1) {
				t3--;
			}

			if (6 * t3 < 1) {
				val = t1 + (t2 - t1) * 6 * t3;
			} else if (2 * t3 < 1) {
				val = t2;
			} else if (3 * t3 < 2) {
				val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
			} else {
				val = t1;
			}

			rgb[i] = val * 255;
		}

		return rgb;
	};

	convert.hsl.hsv = function (hsl) {
		const h = hsl[0];
		let s = hsl[1] / 100;
		let l = hsl[2] / 100;
		let smin = s;
		const lmin = Math.max(l, 0.01);

		l *= 2;
		s *= (l <= 1) ? l : 2 - l;
		smin *= lmin <= 1 ? lmin : 2 - lmin;
		const v = (l + s) / 2;
		const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

		return [h, sv * 100, v * 100];
	};

	convert.hsv.rgb = function (hsv) {
		const h = hsv[0] / 60;
		const s = hsv[1] / 100;
		let v = hsv[2] / 100;
		const hi = Math.floor(h) % 6;

		const f = h - Math.floor(h);
		const p = 255 * v * (1 - s);
		const q = 255 * v * (1 - (s * f));
		const t = 255 * v * (1 - (s * (1 - f)));
		v *= 255;

		switch (hi) {
			case 0:
				return [v, t, p];
			case 1:
				return [q, v, p];
			case 2:
				return [p, v, t];
			case 3:
				return [p, q, v];
			case 4:
				return [t, p, v];
			case 5:
				return [v, p, q];
		}
	};

	convert.hsv.hsl = function (hsv) {
		const h = hsv[0];
		const s = hsv[1] / 100;
		const v = hsv[2] / 100;
		const vmin = Math.max(v, 0.01);
		let sl;
		let l;

		l = (2 - s) * v;
		const lmin = (2 - s) * vmin;
		sl = s * vmin;
		sl /= (lmin <= 1) ? lmin : 2 - lmin;
		sl = sl || 0;
		l /= 2;

		return [h, sl * 100, l * 100];
	};

	// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
	convert.hwb.rgb = function (hwb) {
		const h = hwb[0] / 360;
		let wh = hwb[1] / 100;
		let bl = hwb[2] / 100;
		const ratio = wh + bl;
		let f;

		// Wh + bl cant be > 1
		if (ratio > 1) {
			wh /= ratio;
			bl /= ratio;
		}

		const i = Math.floor(6 * h);
		const v = 1 - bl;
		f = 6 * h - i;

		if ((i & 0x01) !== 0) {
			f = 1 - f;
		}

		const n = wh + f * (v - wh); // Linear interpolation

		let r;
		let g;
		let b;
		/* eslint-disable max-statements-per-line,no-multi-spaces */
		switch (i) {
			default:
			case 6:
			case 0: r = v;  g = n;  b = wh; break;
			case 1: r = n;  g = v;  b = wh; break;
			case 2: r = wh; g = v;  b = n; break;
			case 3: r = wh; g = n;  b = v; break;
			case 4: r = n;  g = wh; b = v; break;
			case 5: r = v;  g = wh; b = n; break;
		}
		/* eslint-enable max-statements-per-line,no-multi-spaces */

		return [r * 255, g * 255, b * 255];
	};

	convert.cmyk.rgb = function (cmyk) {
		const c = cmyk[0] / 100;
		const m = cmyk[1] / 100;
		const y = cmyk[2] / 100;
		const k = cmyk[3] / 100;

		const r = 1 - Math.min(1, c * (1 - k) + k);
		const g = 1 - Math.min(1, m * (1 - k) + k);
		const b = 1 - Math.min(1, y * (1 - k) + k);

		return [r * 255, g * 255, b * 255];
	};

	convert.xyz.rgb = function (xyz) {
		const x = xyz[0] / 100;
		const y = xyz[1] / 100;
		const z = xyz[2] / 100;
		let r;
		let g;
		let b;

		r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
		g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
		b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

		// Assume sRGB
		r = r > 0.0031308
			? ((1.055 * (r ** (1.0 / 2.4))) - 0.055)
			: r * 12.92;

		g = g > 0.0031308
			? ((1.055 * (g ** (1.0 / 2.4))) - 0.055)
			: g * 12.92;

		b = b > 0.0031308
			? ((1.055 * (b ** (1.0 / 2.4))) - 0.055)
			: b * 12.92;

		r = Math.min(Math.max(0, r), 1);
		g = Math.min(Math.max(0, g), 1);
		b = Math.min(Math.max(0, b), 1);

		return [r * 255, g * 255, b * 255];
	};

	convert.xyz.lab = function (xyz) {
		let x = xyz[0];
		let y = xyz[1];
		let z = xyz[2];

		x /= 95.047;
		y /= 100;
		z /= 108.883;

		x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
		y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
		z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

		const l = (116 * y) - 16;
		const a = 500 * (x - y);
		const b = 200 * (y - z);

		return [l, a, b];
	};

	convert.lab.xyz = function (lab) {
		const l = lab[0];
		const a = lab[1];
		const b = lab[2];
		let x;
		let y;
		let z;

		y = (l + 16) / 116;
		x = a / 500 + y;
		z = y - b / 200;

		const y2 = y ** 3;
		const x2 = x ** 3;
		const z2 = z ** 3;
		y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
		x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
		z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

		x *= 95.047;
		y *= 100;
		z *= 108.883;

		return [x, y, z];
	};

	convert.lab.lch = function (lab) {
		const l = lab[0];
		const a = lab[1];
		const b = lab[2];
		let h;

		const hr = Math.atan2(b, a);
		h = hr * 360 / 2 / Math.PI;

		if (h < 0) {
			h += 360;
		}

		const c = Math.sqrt(a * a + b * b);

		return [l, c, h];
	};

	convert.lch.lab = function (lch) {
		const l = lch[0];
		const c = lch[1];
		const h = lch[2];

		const hr = h / 360 * 2 * Math.PI;
		const a = c * Math.cos(hr);
		const b = c * Math.sin(hr);

		return [l, a, b];
	};

	convert.rgb.ansi16 = function (args, saturation = null) {
		const [r, g, b] = args;
		let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization

		value = Math.round(value / 50);

		if (value === 0) {
			return 30;
		}

		let ansi = 30
			+ ((Math.round(b / 255) << 2)
			| (Math.round(g / 255) << 1)
			| Math.round(r / 255));

		if (value === 2) {
			ansi += 60;
		}

		return ansi;
	};

	convert.hsv.ansi16 = function (args) {
		// Optimization here; we already know the value and don't need to get
		// it converted for us.
		return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
	};

	convert.rgb.ansi256 = function (args) {
		const r = args[0];
		const g = args[1];
		const b = args[2];

		// We use the extended greyscale palette here, with the exception of
		// black and white. normal palette only has 4 greyscale shades.
		if (r === g && g === b) {
			if (r < 8) {
				return 16;
			}

			if (r > 248) {
				return 231;
			}

			return Math.round(((r - 8) / 247) * 24) + 232;
		}

		const ansi = 16
			+ (36 * Math.round(r / 255 * 5))
			+ (6 * Math.round(g / 255 * 5))
			+ Math.round(b / 255 * 5);

		return ansi;
	};

	convert.ansi16.rgb = function (args) {
		let color = args % 10;

		// Handle greyscale
		if (color === 0 || color === 7) {
			if (args > 50) {
				color += 3.5;
			}

			color = color / 10.5 * 255;

			return [color, color, color];
		}

		const mult = (~~(args > 50) + 1) * 0.5;
		const r = ((color & 1) * mult) * 255;
		const g = (((color >> 1) & 1) * mult) * 255;
		const b = (((color >> 2) & 1) * mult) * 255;

		return [r, g, b];
	};

	convert.ansi256.rgb = function (args) {
		// Handle greyscale
		if (args >= 232) {
			const c = (args - 232) * 10 + 8;
			return [c, c, c];
		}

		args -= 16;

		let rem;
		const r = Math.floor(args / 36) / 5 * 255;
		const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
		const b = (rem % 6) / 5 * 255;

		return [r, g, b];
	};

	convert.rgb.hex = function (args) {
		const integer = ((Math.round(args[0]) & 0xFF) << 16)
			+ ((Math.round(args[1]) & 0xFF) << 8)
			+ (Math.round(args[2]) & 0xFF);

		const string = integer.toString(16).toUpperCase();
		return '000000'.substring(string.length) + string;
	};

	convert.hex.rgb = function (args) {
		const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
		if (!match) {
			return [0, 0, 0];
		}

		let colorString = match[0];

		if (match[0].length === 3) {
			colorString = colorString.split('').map(char => {
				return char + char;
			}).join('');
		}

		const integer = parseInt(colorString, 16);
		const r = (integer >> 16) & 0xFF;
		const g = (integer >> 8) & 0xFF;
		const b = integer & 0xFF;

		return [r, g, b];
	};

	convert.rgb.hcg = function (rgb) {
		const r = rgb[0] / 255;
		const g = rgb[1] / 255;
		const b = rgb[2] / 255;
		const max = Math.max(Math.max(r, g), b);
		const min = Math.min(Math.min(r, g), b);
		const chroma = (max - min);
		let grayscale;
		let hue;

		if (chroma < 1) {
			grayscale = min / (1 - chroma);
		} else {
			grayscale = 0;
		}

		if (chroma <= 0) {
			hue = 0;
		} else
		if (max === r) {
			hue = ((g - b) / chroma) % 6;
		} else
		if (max === g) {
			hue = 2 + (b - r) / chroma;
		} else {
			hue = 4 + (r - g) / chroma;
		}

		hue /= 6;
		hue %= 1;

		return [hue * 360, chroma * 100, grayscale * 100];
	};

	convert.hsl.hcg = function (hsl) {
		const s = hsl[1] / 100;
		const l = hsl[2] / 100;

		const c = l < 0.5 ? (2.0 * s * l) : (2.0 * s * (1.0 - l));

		let f = 0;
		if (c < 1.0) {
			f = (l - 0.5 * c) / (1.0 - c);
		}

		return [hsl[0], c * 100, f * 100];
	};

	convert.hsv.hcg = function (hsv) {
		const s = hsv[1] / 100;
		const v = hsv[2] / 100;

		const c = s * v;
		let f = 0;

		if (c < 1.0) {
			f = (v - c) / (1 - c);
		}

		return [hsv[0], c * 100, f * 100];
	};

	convert.hcg.rgb = function (hcg) {
		const h = hcg[0] / 360;
		const c = hcg[1] / 100;
		const g = hcg[2] / 100;

		if (c === 0.0) {
			return [g * 255, g * 255, g * 255];
		}

		const pure = [0, 0, 0];
		const hi = (h % 1) * 6;
		const v = hi % 1;
		const w = 1 - v;
		let mg = 0;

		/* eslint-disable max-statements-per-line */
		switch (Math.floor(hi)) {
			case 0:
				pure[0] = 1; pure[1] = v; pure[2] = 0; break;
			case 1:
				pure[0] = w; pure[1] = 1; pure[2] = 0; break;
			case 2:
				pure[0] = 0; pure[1] = 1; pure[2] = v; break;
			case 3:
				pure[0] = 0; pure[1] = w; pure[2] = 1; break;
			case 4:
				pure[0] = v; pure[1] = 0; pure[2] = 1; break;
			default:
				pure[0] = 1; pure[1] = 0; pure[2] = w;
		}
		/* eslint-enable max-statements-per-line */

		mg = (1.0 - c) * g;

		return [
			(c * pure[0] + mg) * 255,
			(c * pure[1] + mg) * 255,
			(c * pure[2] + mg) * 255
		];
	};

	convert.hcg.hsv = function (hcg) {
		const c = hcg[1] / 100;
		const g = hcg[2] / 100;

		const v = c + g * (1.0 - c);
		let f = 0;

		if (v > 0.0) {
			f = c / v;
		}

		return [hcg[0], f * 100, v * 100];
	};

	convert.hcg.hsl = function (hcg) {
		const c = hcg[1] / 100;
		const g = hcg[2] / 100;

		const l = g * (1.0 - c) + 0.5 * c;
		let s = 0;

		if (l > 0.0 && l < 0.5) {
			s = c / (2 * l);
		} else
		if (l >= 0.5 && l < 1.0) {
			s = c / (2 * (1 - l));
		}

		return [hcg[0], s * 100, l * 100];
	};

	convert.hcg.hwb = function (hcg) {
		const c = hcg[1] / 100;
		const g = hcg[2] / 100;
		const v = c + g * (1.0 - c);
		return [hcg[0], (v - c) * 100, (1 - v) * 100];
	};

	convert.hwb.hcg = function (hwb) {
		const w = hwb[1] / 100;
		const b = hwb[2] / 100;
		const v = 1 - b;
		const c = v - w;
		let g = 0;

		if (c < 1) {
			g = (v - c) / (1 - c);
		}

		return [hwb[0], c * 100, g * 100];
	};

	convert.apple.rgb = function (apple) {
		return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
	};

	convert.rgb.apple = function (rgb) {
		return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
	};

	convert.gray.rgb = function (args) {
		return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
	};

	convert.gray.hsl = function (args) {
		return [0, 0, args[0]];
	};

	convert.gray.hsv = convert.gray.hsl;

	convert.gray.hwb = function (gray) {
		return [0, 100, gray[0]];
	};

	convert.gray.cmyk = function (gray) {
		return [0, 0, 0, gray[0]];
	};

	convert.gray.lab = function (gray) {
		return [gray[0], 0, 0];
	};

	convert.gray.hex = function (gray) {
		const val = Math.round(gray[0] / 100 * 255) & 0xFF;
		const integer = (val << 16) + (val << 8) + val;

		const string = integer.toString(16).toUpperCase();
		return '000000'.substring(string.length) + string;
	};

	convert.rgb.gray = function (rgb) {
		const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
		return [val / 255 * 100];
	};
	return conversions;
}

var route;
var hasRequiredRoute;

function requireRoute () {
	if (hasRequiredRoute) return route;
	hasRequiredRoute = 1;
	const conversions = requireConversions();

	/*
		This function routes a model to all other models.

		all functions that are routed have a property `.conversion` attached
		to the returned synthetic function. This property is an array
		of strings, each with the steps in between the 'from' and 'to'
		color models (inclusive).

		conversions that are not possible simply are not included.
	*/

	function buildGraph() {
		const graph = {};
		// https://jsperf.com/object-keys-vs-for-in-with-closure/3
		const models = Object.keys(conversions);

		for (let len = models.length, i = 0; i < len; i++) {
			graph[models[i]] = {
				// http://jsperf.com/1-vs-infinity
				// micro-opt, but this is simple.
				distance: -1,
				parent: null
			};
		}

		return graph;
	}

	// https://en.wikipedia.org/wiki/Breadth-first_search
	function deriveBFS(fromModel) {
		const graph = buildGraph();
		const queue = [fromModel]; // Unshift -> queue -> pop

		graph[fromModel].distance = 0;

		while (queue.length) {
			const current = queue.pop();
			const adjacents = Object.keys(conversions[current]);

			for (let len = adjacents.length, i = 0; i < len; i++) {
				const adjacent = adjacents[i];
				const node = graph[adjacent];

				if (node.distance === -1) {
					node.distance = graph[current].distance + 1;
					node.parent = current;
					queue.unshift(adjacent);
				}
			}
		}

		return graph;
	}

	function link(from, to) {
		return function (args) {
			return to(from(args));
		};
	}

	function wrapConversion(toModel, graph) {
		const path = [graph[toModel].parent, toModel];
		let fn = conversions[graph[toModel].parent][toModel];

		let cur = graph[toModel].parent;
		while (graph[cur].parent) {
			path.unshift(graph[cur].parent);
			fn = link(conversions[graph[cur].parent][cur], fn);
			cur = graph[cur].parent;
		}

		fn.conversion = path;
		return fn;
	}

	route = function (fromModel) {
		const graph = deriveBFS(fromModel);
		const conversion = {};

		const models = Object.keys(graph);
		for (let len = models.length, i = 0; i < len; i++) {
			const toModel = models[i];
			const node = graph[toModel];

			if (node.parent === null) {
				// No possible conversion, or this node is the source model.
				continue;
			}

			conversion[toModel] = wrapConversion(toModel, graph);
		}

		return conversion;
	};
	return route;
}

var colorConvert;
var hasRequiredColorConvert;

function requireColorConvert () {
	if (hasRequiredColorConvert) return colorConvert;
	hasRequiredColorConvert = 1;
	const conversions = requireConversions();
	const route = requireRoute();

	const convert = {};

	const models = Object.keys(conversions);

	function wrapRaw(fn) {
		const wrappedFn = function (...args) {
			const arg0 = args[0];
			if (arg0 === undefined || arg0 === null) {
				return arg0;
			}

			if (arg0.length > 1) {
				args = arg0;
			}

			return fn(args);
		};

		// Preserve .conversion property if there is one
		if ('conversion' in fn) {
			wrappedFn.conversion = fn.conversion;
		}

		return wrappedFn;
	}

	function wrapRounded(fn) {
		const wrappedFn = function (...args) {
			const arg0 = args[0];

			if (arg0 === undefined || arg0 === null) {
				return arg0;
			}

			if (arg0.length > 1) {
				args = arg0;
			}

			const result = fn(args);

			// We're assuming the result is an array here.
			// see notice in conversions.js; don't use box types
			// in conversion functions.
			if (typeof result === 'object') {
				for (let len = result.length, i = 0; i < len; i++) {
					result[i] = Math.round(result[i]);
				}
			}

			return result;
		};

		// Preserve .conversion property if there is one
		if ('conversion' in fn) {
			wrappedFn.conversion = fn.conversion;
		}

		return wrappedFn;
	}

	models.forEach(fromModel => {
		convert[fromModel] = {};

		Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
		Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

		const routes = route(fromModel);
		const routeModels = Object.keys(routes);

		routeModels.forEach(toModel => {
			const fn = routes[toModel];

			convert[fromModel][toModel] = wrapRounded(fn);
			convert[fromModel][toModel].raw = wrapRaw(fn);
		});
	});

	colorConvert = convert;
	return colorConvert;
}

ansiStyles$1.exports;

(function (module) {

	const wrapAnsi16 = (fn, offset) => (...args) => {
		const code = fn(...args);
		return `\u001B[${code + offset}m`;
	};

	const wrapAnsi256 = (fn, offset) => (...args) => {
		const code = fn(...args);
		return `\u001B[${38 + offset};5;${code}m`;
	};

	const wrapAnsi16m = (fn, offset) => (...args) => {
		const rgb = fn(...args);
		return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
	};

	const ansi2ansi = n => n;
	const rgb2rgb = (r, g, b) => [r, g, b];

	const setLazyProperty = (object, property, get) => {
		Object.defineProperty(object, property, {
			get: () => {
				const value = get();

				Object.defineProperty(object, property, {
					value,
					enumerable: true,
					configurable: true
				});

				return value;
			},
			enumerable: true,
			configurable: true
		});
	};

	/** @type {typeof import('color-convert')} */
	let colorConvert;
	const makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
		if (colorConvert === undefined) {
			colorConvert = requireColorConvert();
		}

		const offset = isBackground ? 10 : 0;
		const styles = {};

		for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
			const name = sourceSpace === 'ansi16' ? 'ansi' : sourceSpace;
			if (sourceSpace === targetSpace) {
				styles[name] = wrap(identity, offset);
			} else if (typeof suite === 'object') {
				styles[name] = wrap(suite[targetSpace], offset);
			}
		}

		return styles;
	};

	function assembleStyles() {
		const codes = new Map();
		const styles = {
			modifier: {
				reset: [0, 0],
				// 21 isn't widely supported and 22 does the same thing
				bold: [1, 22],
				dim: [2, 22],
				italic: [3, 23],
				underline: [4, 24],
				inverse: [7, 27],
				hidden: [8, 28],
				strikethrough: [9, 29]
			},
			color: {
				black: [30, 39],
				red: [31, 39],
				green: [32, 39],
				yellow: [33, 39],
				blue: [34, 39],
				magenta: [35, 39],
				cyan: [36, 39],
				white: [37, 39],

				// Bright color
				blackBright: [90, 39],
				redBright: [91, 39],
				greenBright: [92, 39],
				yellowBright: [93, 39],
				blueBright: [94, 39],
				magentaBright: [95, 39],
				cyanBright: [96, 39],
				whiteBright: [97, 39]
			},
			bgColor: {
				bgBlack: [40, 49],
				bgRed: [41, 49],
				bgGreen: [42, 49],
				bgYellow: [43, 49],
				bgBlue: [44, 49],
				bgMagenta: [45, 49],
				bgCyan: [46, 49],
				bgWhite: [47, 49],

				// Bright color
				bgBlackBright: [100, 49],
				bgRedBright: [101, 49],
				bgGreenBright: [102, 49],
				bgYellowBright: [103, 49],
				bgBlueBright: [104, 49],
				bgMagentaBright: [105, 49],
				bgCyanBright: [106, 49],
				bgWhiteBright: [107, 49]
			}
		};

		// Alias bright black as gray (and grey)
		styles.color.gray = styles.color.blackBright;
		styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
		styles.color.grey = styles.color.blackBright;
		styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;

		for (const [groupName, group] of Object.entries(styles)) {
			for (const [styleName, style] of Object.entries(group)) {
				styles[styleName] = {
					open: `\u001B[${style[0]}m`,
					close: `\u001B[${style[1]}m`
				};

				group[styleName] = styles[styleName];

				codes.set(style[0], style[1]);
			}

			Object.defineProperty(styles, groupName, {
				value: group,
				enumerable: false
			});
		}

		Object.defineProperty(styles, 'codes', {
			value: codes,
			enumerable: false
		});

		styles.color.close = '\u001B[39m';
		styles.bgColor.close = '\u001B[49m';

		setLazyProperty(styles.color, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, false));
		setLazyProperty(styles.color, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, false));
		setLazyProperty(styles.color, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, false));
		setLazyProperty(styles.bgColor, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, true));
		setLazyProperty(styles.bgColor, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, true));
		setLazyProperty(styles.bgColor, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, true));

		return styles;
	}

	// Make the export immutable
	Object.defineProperty(module, 'exports', {
		enumerable: true,
		get: assembleStyles
	}); 
} (ansiStyles$1));

var ansiStylesExports = ansiStyles$1.exports;

var hasFlag$1 = (flag, argv = process.argv) => {
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const position = argv.indexOf(prefix + flag);
	const terminatorPosition = argv.indexOf('--');
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};

const os$1 = require$$0$6;
const tty = require$$1$2;
const hasFlag = hasFlag$1;

const {env} = process;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false') ||
	hasFlag('color=never')) {
	forceColor = 0;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = 1;
}

if ('FORCE_COLOR' in env) {
	if (env.FORCE_COLOR === 'true') {
		forceColor = 1;
	} else if (env.FORCE_COLOR === 'false') {
		forceColor = 0;
	} else {
		forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(haveStream, streamIsTTY) {
	if (forceColor === 0) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (haveStream && !streamIsTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process.platform === 'win32') {
		// Windows 10 build 10586 is the first Windows release that supports 256 colors.
		// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
		const osRelease = os$1.release().split('.');
		if (
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream, stream && stream.isTTY);
	return translateLevel(level);
}

var supportsColor_1 = {
	supportsColor: getSupportLevel,
	stdout: translateLevel(supportsColor(true, tty.isatty(1))),
	stderr: translateLevel(supportsColor(true, tty.isatty(2)))
};

const stringReplaceAll$1 = (string, substring, replacer) => {
	let index = string.indexOf(substring);
	if (index === -1) {
		return string;
	}

	const substringLength = substring.length;
	let endIndex = 0;
	let returnValue = '';
	do {
		returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
		endIndex = index + substringLength;
		index = string.indexOf(substring, endIndex);
	} while (index !== -1);

	returnValue += string.substr(endIndex);
	return returnValue;
};

const stringEncaseCRLFWithFirstIndex$1 = (string, prefix, postfix, index) => {
	let endIndex = 0;
	let returnValue = '';
	do {
		const gotCR = string[index - 1] === '\r';
		returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? '\r\n' : '\n') + postfix;
		endIndex = index + 1;
		index = string.indexOf('\n', endIndex);
	} while (index !== -1);

	returnValue += string.substr(endIndex);
	return returnValue;
};

var util = {
	stringReplaceAll: stringReplaceAll$1,
	stringEncaseCRLFWithFirstIndex: stringEncaseCRLFWithFirstIndex$1
};

var templates;
var hasRequiredTemplates;

function requireTemplates () {
	if (hasRequiredTemplates) return templates;
	hasRequiredTemplates = 1;
	const TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
	const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
	const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
	const ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;

	const ESCAPES = new Map([
		['n', '\n'],
		['r', '\r'],
		['t', '\t'],
		['b', '\b'],
		['f', '\f'],
		['v', '\v'],
		['0', '\0'],
		['\\', '\\'],
		['e', '\u001B'],
		['a', '\u0007']
	]);

	function unescape(c) {
		const u = c[0] === 'u';
		const bracket = c[1] === '{';

		if ((u && !bracket && c.length === 5) || (c[0] === 'x' && c.length === 3)) {
			return String.fromCharCode(parseInt(c.slice(1), 16));
		}

		if (u && bracket) {
			return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
		}

		return ESCAPES.get(c) || c;
	}

	function parseArguments(name, arguments_) {
		const results = [];
		const chunks = arguments_.trim().split(/\s*,\s*/g);
		let matches;

		for (const chunk of chunks) {
			const number = Number(chunk);
			if (!Number.isNaN(number)) {
				results.push(number);
			} else if ((matches = chunk.match(STRING_REGEX))) {
				results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape(escape) : character));
			} else {
				throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
			}
		}

		return results;
	}

	function parseStyle(style) {
		STYLE_REGEX.lastIndex = 0;

		const results = [];
		let matches;

		while ((matches = STYLE_REGEX.exec(style)) !== null) {
			const name = matches[1];

			if (matches[2]) {
				const args = parseArguments(name, matches[2]);
				results.push([name].concat(args));
			} else {
				results.push([name]);
			}
		}

		return results;
	}

	function buildStyle(chalk, styles) {
		const enabled = {};

		for (const layer of styles) {
			for (const style of layer.styles) {
				enabled[style[0]] = layer.inverse ? null : style.slice(1);
			}
		}

		let current = chalk;
		for (const [styleName, styles] of Object.entries(enabled)) {
			if (!Array.isArray(styles)) {
				continue;
			}

			if (!(styleName in current)) {
				throw new Error(`Unknown Chalk style: ${styleName}`);
			}

			current = styles.length > 0 ? current[styleName](...styles) : current[styleName];
		}

		return current;
	}

	templates = (chalk, temporary) => {
		const styles = [];
		const chunks = [];
		let chunk = [];

		// eslint-disable-next-line max-params
		temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
			if (escapeCharacter) {
				chunk.push(unescape(escapeCharacter));
			} else if (style) {
				const string = chunk.join('');
				chunk = [];
				chunks.push(styles.length === 0 ? string : buildStyle(chalk, styles)(string));
				styles.push({inverse, styles: parseStyle(style)});
			} else if (close) {
				if (styles.length === 0) {
					throw new Error('Found extraneous } in Chalk template literal');
				}

				chunks.push(buildStyle(chalk, styles)(chunk.join('')));
				chunk = [];
				styles.pop();
			} else {
				chunk.push(character);
			}
		});

		chunks.push(chunk.join(''));

		if (styles.length > 0) {
			const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
			throw new Error(errMessage);
		}

		return chunks.join('');
	};
	return templates;
}

const ansiStyles = ansiStylesExports;
const {stdout: stdoutColor, stderr: stderrColor} = supportsColor_1;
const {
	stringReplaceAll,
	stringEncaseCRLFWithFirstIndex
} = util;

const {isArray} = Array;

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = [
	'ansi',
	'ansi',
	'ansi256',
	'ansi16m'
];

const styles = Object.create(null);

const applyOptions = (object, options = {}) => {
	if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
		throw new Error('The `level` option should be an integer from 0 to 3');
	}

	// Detect level if not set manually
	const colorLevel = stdoutColor ? stdoutColor.level : 0;
	object.level = options.level === undefined ? colorLevel : options.level;
};

class ChalkClass {
	constructor(options) {
		// eslint-disable-next-line no-constructor-return
		return chalkFactory(options);
	}
}

const chalkFactory = options => {
	const chalk = {};
	applyOptions(chalk, options);

	chalk.template = (...arguments_) => chalkTag(chalk.template, ...arguments_);

	Object.setPrototypeOf(chalk, Chalk.prototype);
	Object.setPrototypeOf(chalk.template, chalk);

	chalk.template.constructor = () => {
		throw new Error('`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.');
	};

	chalk.template.Instance = ChalkClass;

	return chalk.template;
};

function Chalk(options) {
	return chalkFactory(options);
}

for (const [styleName, style] of Object.entries(ansiStyles)) {
	styles[styleName] = {
		get() {
			const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
			Object.defineProperty(this, styleName, {value: builder});
			return builder;
		}
	};
}

styles.visible = {
	get() {
		const builder = createBuilder(this, this._styler, true);
		Object.defineProperty(this, 'visible', {value: builder});
		return builder;
	}
};

const usedModels = ['rgb', 'hex', 'keyword', 'hsl', 'hsv', 'hwb', 'ansi', 'ansi256'];

for (const model of usedModels) {
	styles[model] = {
		get() {
			const {level} = this;
			return function (...arguments_) {
				const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
				return createBuilder(this, styler, this._isEmpty);
			};
		}
	};
}

for (const model of usedModels) {
	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const {level} = this;
			return function (...arguments_) {
				const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
				return createBuilder(this, styler, this._isEmpty);
			};
		}
	};
}

const proto = Object.defineProperties(() => {}, {
	...styles,
	level: {
		enumerable: true,
		get() {
			return this._generator.level;
		},
		set(level) {
			this._generator.level = level;
		}
	}
});

const createStyler = (open, close, parent) => {
	let openAll;
	let closeAll;
	if (parent === undefined) {
		openAll = open;
		closeAll = close;
	} else {
		openAll = parent.openAll + open;
		closeAll = close + parent.closeAll;
	}

	return {
		open,
		close,
		openAll,
		closeAll,
		parent
	};
};

const createBuilder = (self, _styler, _isEmpty) => {
	const builder = (...arguments_) => {
		if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
			// Called as a template literal, for example: chalk.red`2 + 3 = {bold ${2+3}}`
			return applyStyle(builder, chalkTag(builder, ...arguments_));
		}

		// Single argument is hot path, implicit coercion is faster than anything
		// eslint-disable-next-line no-implicit-coercion
		return applyStyle(builder, (arguments_.length === 1) ? ('' + arguments_[0]) : arguments_.join(' '));
	};

	// We alter the prototype because we must return a function, but there is
	// no way to create a function with a different prototype
	Object.setPrototypeOf(builder, proto);

	builder._generator = self;
	builder._styler = _styler;
	builder._isEmpty = _isEmpty;

	return builder;
};

const applyStyle = (self, string) => {
	if (self.level <= 0 || !string) {
		return self._isEmpty ? '' : string;
	}

	let styler = self._styler;

	if (styler === undefined) {
		return string;
	}

	const {openAll, closeAll} = styler;
	if (string.indexOf('\u001B') !== -1) {
		while (styler !== undefined) {
			// Replace any instances already present with a re-opening code
			// otherwise only the part of the string until said closing code
			// will be colored, and the rest will simply be 'plain'.
			string = stringReplaceAll(string, styler.close, styler.open);

			styler = styler.parent;
		}
	}

	// We can move both next actions out of loop, because remaining actions in loop won't have
	// any/visible effect on parts we add here. Close the styling before a linebreak and reopen
	// after next line to fix a bleed issue on macOS: https://github.com/chalk/chalk/pull/92
	const lfIndex = string.indexOf('\n');
	if (lfIndex !== -1) {
		string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
	}

	return openAll + string + closeAll;
};

let template;
const chalkTag = (chalk, ...strings) => {
	const [firstString] = strings;

	if (!isArray(firstString) || !isArray(firstString.raw)) {
		// If chalk() was called by itself or with a string,
		// return the string itself as a string.
		return strings.join(' ');
	}

	const arguments_ = strings.slice(1);
	const parts = [firstString.raw[0]];

	for (let i = 1; i < firstString.length; i++) {
		parts.push(
			String(arguments_[i - 1]).replace(/[{}\\]/g, '\\$&'),
			String(firstString.raw[i])
		);
	}

	if (template === undefined) {
		template = requireTemplates();
	}

	return template(chalk, parts.join(''));
};

Object.defineProperties(Chalk.prototype, styles);

const chalk = Chalk(); // eslint-disable-line new-cap
chalk.supportsColor = stdoutColor;
chalk.stderr = Chalk({level: stderrColor ? stderrColor.level : 0}); // eslint-disable-line new-cap
chalk.stderr.supportsColor = stderrColor;

var source = chalk;

Object.defineProperty(log$3, "__esModule", { value: true });
log$3.cacheCreated = log$3.checkFailure = log$3.storeFailure = log$3.storeSuccess = log$3.setupFailure = log$3.retrieveFailure = log$3.retrieveSuccess = void 0;
const chalk_1 = source;
const DELIMITER_LENGTH = 78;
const DELIMITER = Array.from({ length: DELIMITER_LENGTH }, () => "-").join("");
const log$2 = console.log;
const formatSection = (...content) => (0, chalk_1.grey)([DELIMITER, ...content, DELIMITER].join("\n"));
const retrieveSuccess = ({ name }, file) => log$2(formatSection(`Remote cache hit: ${(0, chalk_1.green)(name)}`, `File: ${file}`));
log$3.retrieveSuccess = retrieveSuccess;
const retrieveFailure = ({ name }, file, error) => log$2(formatSection(`${(0, chalk_1.yellow)(`Warning`)}: Failed to retrieve cache from ${(0, chalk_1.red)(name)}`, `File: ${file}`, `Error: ${error === null || error === void 0 ? void 0 : error.message}`));
log$3.retrieveFailure = retrieveFailure;
const setupFailure = (error) => {
    var _a;
    return log$2(formatSection(`${(0, chalk_1.yellow)(`Warning`)}: Failed to setup remote cache. Check your nx.json.`, `Error: ${(_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error}`));
};
log$3.setupFailure = setupFailure;
const storeSuccess = ({ name }, file) => log$2(formatSection(`Stored output to remote cache: ${(0, chalk_1.green)(name)}`, `File: ${file}`));
log$3.storeSuccess = storeSuccess;
const storeFailure = ({ name }, file, error) => log$2(formatSection(`${(0, chalk_1.yellow)(`Warning`)}: Failed to store cache to ${(0, chalk_1.red)(name)}`, `File: ${file}`, `Error: ${error === null || error === void 0 ? void 0 : error.message}`));
log$3.storeFailure = storeFailure;
const checkFailure = ({ name }, file, error) => log$2(formatSection(`${(0, chalk_1.yellow)(`Warning`)}: Failed to check if cache file exists in ${(0, chalk_1.red)(name)}`, `File: ${file}`, `Error: ${error === null || error === void 0 ? void 0 : error.message}`));
log$3.checkFailure = checkFailure;
const cacheCreated = ({ read, write, }) => log$2((0, chalk_1.grey)(`Remote cache created. Read: ${read}. Write: ${write}.`));
log$3.cacheCreated = cacheCreated;

var __createBinding$1 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault$1 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$1 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$1(result, mod, k);
    __setModuleDefault$1(result, mod);
    return result;
};
Object.defineProperty(getSafeRemoteCacheImplementation$1, "__esModule", { value: true });
getSafeRemoteCacheImplementation$1.getSafeRemoteCacheImplementation = void 0;
const log$1 = __importStar$1(log$3);
const attachLogsToFileOperation = ({ operation, success, failure, verbose, silent, }) => async (filename, ...args) => {
    try {
        const result = await operation(filename, ...args);
        if (!silent) {
            success === null || success === void 0 ? void 0 : success(filename);
        }
        return result;
    }
    catch (error) {
        failure(filename, error);
        if (verbose) {
            console.error(error);
        }
        return null;
    }
};
const getSafeRemoteCacheImplementation = async (implementationPromise, options) => {
    const verbose = !!options.verbose;
    const silent = !!options.silent;
    try {
        const implementation = await implementationPromise;
        const { fileExists, storeFile, retrieveFile } = implementation;
        const name = process.env.NXCACHE_NAME || options.name || implementation.name;
        return {
            name,
            retrieveFile: attachLogsToFileOperation({
                operation: retrieveFile,
                success: (filename) => log$1.retrieveSuccess(implementation, filename),
                failure: (filename, error) => log$1.retrieveFailure(implementation, filename, error),
                verbose,
                silent,
            }),
            storeFile: attachLogsToFileOperation({
                operation: storeFile,
                success: (filename) => log$1.storeSuccess(implementation, filename),
                failure: (filename, error) => log$1.storeFailure(implementation, filename, error),
                verbose,
                silent,
            }),
            fileExists: attachLogsToFileOperation({
                operation: fileExists,
                failure: (filename, error) => log$1.checkFailure(implementation, filename, error),
                verbose,
                silent,
            }),
        };
    }
    catch (error) {
        log$1.setupFailure(error);
        if (verbose) {
            console.error(error);
        }
        return null;
    }
};
getSafeRemoteCacheImplementation$1.getSafeRemoteCacheImplementation = getSafeRemoteCacheImplementation;

var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault$1 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(createCustomRunner$1, "__esModule", { value: true });
createCustomRunner$1.createCustomRunner = void 0;
const default_1 = __importDefault$1(require$$0$7);
const create_remote_cache_retrieve_1 = createRemoteCacheRetrieve$1;
const create_remote_cache_store_1 = createRemoteCacheStore$1;
const get_safe_remote_cache_implementation_1 = getSafeRemoteCacheImplementation$1;
const log = __importStar(log$3);
const cacheNoop = async () => false;
const createRemoteCache = (implementation, options) => {
    var _a, _b;
    const read = process.env.NXCACHE_READ
        ? process.env.NXCACHE_READ !== "false"
        : (_a = options.read) !== null && _a !== void 0 ? _a : true;
    const write = process.env.NXCACHE_WRITE
        ? process.env.NXCACHE_WRITE !== "false"
        : (_b = options.write) !== null && _b !== void 0 ? _b : true;

    console.log('createRemoteCache', {
      implementation,
      options,
      read,
      write,
    });

    // Do not even create the cache if both read and write are disabled
    if (!read && !write) {
        return {
            retrieve: cacheNoop,
            store: cacheNoop,
        };
    }
    const safeImplementation = (0, get_safe_remote_cache_implementation_1.getSafeRemoteCacheImplementation)(implementation, options);
    if (options.verbose) {
        log.cacheCreated({ read, write });
    }
    return {
        retrieve: read ? (0, create_remote_cache_retrieve_1.createRemoteCacheRetrieve)(safeImplementation) : cacheNoop,
        store: write ? (0, create_remote_cache_store_1.createRemoteCacheStore)(safeImplementation) : cacheNoop,
    };
};
const createCustomRunner = (setup) => {
  console.log('createCustomRunner', {setup});
  return (tasks, options, context) => {
    console.log('createCustomRunner created');
    console.dir({
      tasks,
      options,
      context,
    }, { colors: true, depth: null, maxArrayLength: null });

    return (0, default_1.default)(tasks, {
      ...options,
      remoteCache: createRemoteCache(setup(options, tasks), options),
    }, context)
  }
};
createCustomRunner$1.createCustomRunner = createCustomRunner;

var customRunnerOptions = {};

Object.defineProperty(customRunnerOptions, "__esModule", { value: true });

var remoteCacheImplementation = {};

Object.defineProperty(remoteCacheImplementation, "__esModule", { value: true });

var initEnv$1 = {};

var main$1 = {exports: {}};

var name = "dotenv";
var version$1 = "16.4.5";
var description = "Loads environment variables from .env file";
var main = "lib/main.js";
var types = "lib/main.d.ts";
var exports$1 = {
	".": {
		types: "./lib/main.d.ts",
		require: "./lib/main.js",
		"default": "./lib/main.js"
	},
	"./config": "./config.js",
	"./config.js": "./config.js",
	"./lib/env-options": "./lib/env-options.js",
	"./lib/env-options.js": "./lib/env-options.js",
	"./lib/cli-options": "./lib/cli-options.js",
	"./lib/cli-options.js": "./lib/cli-options.js",
	"./package.json": "./package.json"
};
var scripts = {
	"dts-check": "tsc --project tests/types/tsconfig.json",
	lint: "standard",
	"lint-readme": "standard-markdown",
	pretest: "npm run lint && npm run dts-check",
	test: "tap tests/*.js --100 -Rspec",
	"test:coverage": "tap --coverage-report=lcov",
	prerelease: "npm test",
	release: "standard-version"
};
var repository = {
	type: "git",
	url: "git://github.com/motdotla/dotenv.git"
};
var funding = "https://dotenvx.com";
var keywords = [
	"dotenv",
	"env",
	".env",
	"environment",
	"variables",
	"config",
	"settings"
];
var readmeFilename = "README.md";
var license = "BSD-2-Clause";
var devDependencies = {
	"@definitelytyped/dtslint": "^0.0.133",
	"@types/node": "^18.11.3",
	decache: "^4.6.1",
	sinon: "^14.0.1",
	standard: "^17.0.0",
	"standard-markdown": "^7.1.0",
	"standard-version": "^9.5.0",
	tap: "^16.3.0",
	tar: "^6.1.11",
	typescript: "^4.8.4"
};
var engines = {
	node: ">=12"
};
var browser = {
	fs: false
};
var require$$4 = {
	name: name,
	version: version$1,
	description: description,
	main: main,
	types: types,
	exports: exports$1,
	scripts: scripts,
	repository: repository,
	funding: funding,
	keywords: keywords,
	readmeFilename: readmeFilename,
	license: license,
	devDependencies: devDependencies,
	engines: engines,
	browser: browser
};

const fs = require$$2$1;
const path = require$$0$3;
const os = require$$0$6;
const crypto = require$$12;
const packageJson = require$$4;

const version = packageJson.version;

const LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;

// Parse src into an Object
function parse (src) {
  const obj = {};

  // Convert buffer to string
  let lines = src.toString();

  // Convert line breaks to same format
  lines = lines.replace(/\r\n?/mg, '\n');

  let match;
  while ((match = LINE.exec(lines)) != null) {
    const key = match[1];

    // Default undefined or null to empty string
    let value = (match[2] || '');

    // Remove whitespace
    value = value.trim();

    // Check if double quoted
    const maybeQuote = value[0];

    // Remove surrounding quotes
    value = value.replace(/^(['"`])([\s\S]*)\1$/mg, '$2');

    // Expand newlines if double quoted
    if (maybeQuote === '"') {
      value = value.replace(/\\n/g, '\n');
      value = value.replace(/\\r/g, '\r');
    }

    // Add to object
    obj[key] = value;
  }

  return obj
}

function _parseVault (options) {
  const vaultPath = _vaultPath(options);

  // Parse .env.vault
  const result = DotenvModule.configDotenv({ path: vaultPath });
  if (!result.parsed) {
    const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
    err.code = 'MISSING_DATA';
    throw err
  }

  // handle scenario for comma separated keys - for use with key rotation
  // example: DOTENV_KEY="dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=prod,dotenv://:key_7890@dotenvx.com/vault/.env.vault?environment=prod"
  const keys = _dotenvKey(options).split(',');
  const length = keys.length;

  let decrypted;
  for (let i = 0; i < length; i++) {
    try {
      // Get full key
      const key = keys[i].trim();

      // Get instructions for decrypt
      const attrs = _instructions(result, key);

      // Decrypt
      decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);

      break
    } catch (error) {
      // last key
      if (i + 1 >= length) {
        throw error
      }
      // try next key
    }
  }

  // Parse decrypted .env string
  return DotenvModule.parse(decrypted)
}

function _log (message) {
  console.log(`[dotenv@${version}][INFO] ${message}`);
}

function _warn (message) {
  console.log(`[dotenv@${version}][WARN] ${message}`);
}

function _debug (message) {
  console.log(`[dotenv@${version}][DEBUG] ${message}`);
}

function _dotenvKey (options) {
  // prioritize developer directly setting options.DOTENV_KEY
  if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
    return options.DOTENV_KEY
  }

  // secondary infra already contains a DOTENV_KEY environment variable
  if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
    return process.env.DOTENV_KEY
  }

  // fallback to empty string
  return ''
}

function _instructions (result, dotenvKey) {
  // Parse DOTENV_KEY. Format is a URI
  let uri;
  try {
    uri = new URL(dotenvKey);
  } catch (error) {
    if (error.code === 'ERR_INVALID_URL') {
      const err = new Error('INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development');
      err.code = 'INVALID_DOTENV_KEY';
      throw err
    }

    throw error
  }

  // Get decrypt key
  const key = uri.password;
  if (!key) {
    const err = new Error('INVALID_DOTENV_KEY: Missing key part');
    err.code = 'INVALID_DOTENV_KEY';
    throw err
  }

  // Get environment
  const environment = uri.searchParams.get('environment');
  if (!environment) {
    const err = new Error('INVALID_DOTENV_KEY: Missing environment part');
    err.code = 'INVALID_DOTENV_KEY';
    throw err
  }

  // Get ciphertext payload
  const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
  const ciphertext = result.parsed[environmentKey]; // DOTENV_VAULT_PRODUCTION
  if (!ciphertext) {
    const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
    err.code = 'NOT_FOUND_DOTENV_ENVIRONMENT';
    throw err
  }

  return { ciphertext, key }
}

function _vaultPath (options) {
  let possibleVaultPath = null;

  if (options && options.path && options.path.length > 0) {
    if (Array.isArray(options.path)) {
      for (const filepath of options.path) {
        if (fs.existsSync(filepath)) {
          possibleVaultPath = filepath.endsWith('.vault') ? filepath : `${filepath}.vault`;
        }
      }
    } else {
      possibleVaultPath = options.path.endsWith('.vault') ? options.path : `${options.path}.vault`;
    }
  } else {
    possibleVaultPath = path.resolve(process.cwd(), '.env.vault');
  }

  if (fs.existsSync(possibleVaultPath)) {
    return possibleVaultPath
  }

  return null
}

function _resolveHome (envPath) {
  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath
}

function _configVault (options) {
  _log('Loading env from encrypted .env.vault');

  const parsed = DotenvModule._parseVault(options);

  let processEnv = process.env;
  if (options && options.processEnv != null) {
    processEnv = options.processEnv;
  }

  DotenvModule.populate(processEnv, parsed, options);

  return { parsed }
}

function configDotenv (options) {
  const dotenvPath = path.resolve(process.cwd(), '.env');
  let encoding = 'utf8';
  const debug = Boolean(options && options.debug);

  if (options && options.encoding) {
    encoding = options.encoding;
  } else {
    if (debug) {
      _debug('No encoding is specified. UTF-8 is used by default');
    }
  }

  let optionPaths = [dotenvPath]; // default, look for .env
  if (options && options.path) {
    if (!Array.isArray(options.path)) {
      optionPaths = [_resolveHome(options.path)];
    } else {
      optionPaths = []; // reset default
      for (const filepath of options.path) {
        optionPaths.push(_resolveHome(filepath));
      }
    }
  }

  // Build the parsed data in a temporary object (because we need to return it).  Once we have the final
  // parsed data, we will combine it with process.env (or options.processEnv if provided).
  let lastError;
  const parsedAll = {};
  for (const path of optionPaths) {
    try {
      // Specifying an encoding returns a string instead of a buffer
      const parsed = DotenvModule.parse(fs.readFileSync(path, { encoding }));

      DotenvModule.populate(parsedAll, parsed, options);
    } catch (e) {
      if (debug) {
        _debug(`Failed to load ${path} ${e.message}`);
      }
      lastError = e;
    }
  }

  let processEnv = process.env;
  if (options && options.processEnv != null) {
    processEnv = options.processEnv;
  }

  DotenvModule.populate(processEnv, parsedAll, options);

  if (lastError) {
    return { parsed: parsedAll, error: lastError }
  } else {
    return { parsed: parsedAll }
  }
}

// Populates process.env from .env file
function config (options) {
  // fallback to original dotenv if DOTENV_KEY is not set
  if (_dotenvKey(options).length === 0) {
    return DotenvModule.configDotenv(options)
  }

  const vaultPath = _vaultPath(options);

  // dotenvKey exists but .env.vault file does not exist
  if (!vaultPath) {
    _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);

    return DotenvModule.configDotenv(options)
  }

  return DotenvModule._configVault(options)
}

function decrypt (encrypted, keyStr) {
  const key = Buffer.from(keyStr.slice(-64), 'hex');
  let ciphertext = Buffer.from(encrypted, 'base64');

  const nonce = ciphertext.subarray(0, 12);
  const authTag = ciphertext.subarray(-16);
  ciphertext = ciphertext.subarray(12, -16);

  try {
    const aesgcm = crypto.createDecipheriv('aes-256-gcm', key, nonce);
    aesgcm.setAuthTag(authTag);
    return `${aesgcm.update(ciphertext)}${aesgcm.final()}`
  } catch (error) {
    const isRange = error instanceof RangeError;
    const invalidKeyLength = error.message === 'Invalid key length';
    const decryptionFailed = error.message === 'Unsupported state or unable to authenticate data';

    if (isRange || invalidKeyLength) {
      const err = new Error('INVALID_DOTENV_KEY: It must be 64 characters long (or more)');
      err.code = 'INVALID_DOTENV_KEY';
      throw err
    } else if (decryptionFailed) {
      const err = new Error('DECRYPTION_FAILED: Please check your DOTENV_KEY');
      err.code = 'DECRYPTION_FAILED';
      throw err
    } else {
      throw error
    }
  }
}

// Populate process.env with parsed values
function populate (processEnv, parsed, options = {}) {
  const debug = Boolean(options && options.debug);
  const override = Boolean(options && options.override);

  if (typeof parsed !== 'object') {
    const err = new Error('OBJECT_REQUIRED: Please check the processEnv argument being passed to populate');
    err.code = 'OBJECT_REQUIRED';
    throw err
  }

  // Set process.env
  for (const key of Object.keys(parsed)) {
    if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
      if (override === true) {
        processEnv[key] = parsed[key];
      }

      if (debug) {
        if (override === true) {
          _debug(`"${key}" is already defined and WAS overwritten`);
        } else {
          _debug(`"${key}" is already defined and was NOT overwritten`);
        }
      }
    } else {
      processEnv[key] = parsed[key];
    }
  }
}

const DotenvModule = {
  configDotenv,
  _configVault,
  _parseVault,
  config,
  decrypt,
  parse,
  populate
};

main$1.exports.configDotenv = DotenvModule.configDotenv;
main$1.exports._configVault = DotenvModule._configVault;
main$1.exports._parseVault = DotenvModule._parseVault;
main$1.exports.config = DotenvModule.config;
main$1.exports.decrypt = DotenvModule.decrypt;
main$1.exports.parse = DotenvModule.parse;
main$1.exports.populate = DotenvModule.populate;

main$1.exports = DotenvModule;

var mainExports = main$1.exports;

var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(initEnv$1, "__esModule", { value: true });
initEnv$1.initEnv = void 0;
const dotenv_1 = __importDefault(mainExports);
/**
 * Initializes the environment variables.
 */
const initEnv = (options) => {
    if (options.dotenv !== false) {
        dotenv_1.default.config({ path: options.dotenvPath });
    }
};
initEnv$1.initEnv = initEnv;

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(createCustomRunner$1, exports);
	__exportStar(customRunnerOptions, exports);
	__exportStar(remoteCacheImplementation, exports);
	__exportStar(initEnv$1, exports);
	__exportStar(hashSuffix, exports);
	__exportStar(getFileNameFromHash$1, exports); 
} (nxRemotecacheCustom));

const HTTP_PROXY = "HTTP_PROXY";
const HTTPS_PROXY = "HTTPS_PROXY";
const NO_PROXY = "NO_PROXY";
const getEnv = (key) => process.env[key];
const buildCommonCommandInput = (bucket, prefix, filename) => ({
  /* eslint-disable @typescript-eslint/naming-convention */
  Bucket: bucket,
  Key: `${prefix}${filename}`
  /* eslint-enable @typescript-eslint/naming-convention */
});
const getHttpProxy = () => getEnv(HTTP_PROXY.toLowerCase()) || getEnv(HTTP_PROXY) || void 0;
const getHttpsProxy = () => getEnv(HTTPS_PROXY.toLowerCase()) || getEnv(HTTPS_PROXY) || void 0;
const getNoProxy = () => getEnv(NO_PROXY.toLowerCase()) || getEnv(NO_PROXY) || void 0;
const matchesNoProxy = (subjectUrl, noProxy) => {
  if (!noProxy) return false;
  const subjectUrlTokens = new URL(subjectUrl);
  const rules = noProxy.split(/[\s,]+/);
  for (const rule of rules) {
    const ruleMatch = rule.replace(/^(?<leadingDot>\.)/, "*").match(/^(?<hostname>.+?)(?::(?<port>\d+))?$/);
    if (!ruleMatch || !ruleMatch.groups) {
      throw new Error("Invalid NO_PROXY pattern.");
    }
    if (!ruleMatch.groups.hostname) {
      throw new Error(
        "NO_PROXY entry pattern must include hostname. Use * to match any hostname."
      );
    }
    const hostnameIsMatch = matcher.isMatch(
      subjectUrlTokens.hostname,
      ruleMatch.groups.hostname
    );
    if (hostnameIsMatch && (!ruleMatch.groups || !ruleMatch.groups.port || subjectUrlTokens.port && subjectUrlTokens.port === ruleMatch.groups.port)) {
      return true;
    }
  }
  return false;
};

const ENV_ENDPOINT = "NXCACHE_S3_ENDPOINT";
const ENV_PROFILE = "NXCACHE_S3_PROFILE";
const ENV_FORCE_PATH_STYLE = "NXCACHE_S3_FORCE_PATH_STYLE";
const ENV_REGION = "NXCACHE_S3_REGION";
const ENV_ACCESS_KEY_ID = "NXCACHE_S3_ACCESS_KEY_ID";
const ENV_SECRET_ACCESS_KEY = "NXCACHE_S3_SECRET_ACCESS_KEY";
const DEFAULT_S3_ENDPOINT = "https://s3.amazonaws.com";
function getHttpAgent() {
  return new hpagent.HttpsProxyAgent({ proxy: getHttpProxy() });
}
function getHttpsAgent() {
  return new hpagent.HttpsProxyAgent({ proxy: getHttpsProxy() });
}
const getProxyConfig = (s3Endpoint = DEFAULT_S3_ENDPOINT) => ({
  ...!matchesNoProxy(s3Endpoint, getNoProxy()) && (getHttpProxy() || getHttpsProxy()) && {
    requestHandler: new nodeHttpHandler.NodeHttpHandler({
      ...getHttpProxy() && { httpAgent: getHttpAgent() },
      ...getHttpsProxy() && { httpsAgent: getHttpsAgent() }
    })
  }
});
const buildS3Client = (options) => {
  const provider = getCredentialsProvider(options);
  return new clientS3.S3({
    endpoint: getEnv(ENV_ENDPOINT) ?? options.endpoint,
    region: getEnv(ENV_REGION) ?? options.region,
    credentials: provider,
    forcePathStyle: getEnv(ENV_FORCE_PATH_STYLE) === "true" || options.forcePathStyle,
    ...getProxyConfig(
      getEnv(ENV_ENDPOINT) ?? options.endpoint ?? DEFAULT_S3_ENDPOINT
    )
  });
};
const getCredentialsProvider = (options) => {
  const awsAccessKeyIdOverride = getEnv(ENV_ACCESS_KEY_ID);
  const awsSecretAccessKeyOverride = getEnv(ENV_SECRET_ACCESS_KEY);
  if (awsAccessKeyIdOverride?.length && awsSecretAccessKeyOverride?.length) {
    return {
      accessKeyId: awsAccessKeyIdOverride,
      secretAccessKey: awsSecretAccessKeyOverride
    };
  } else {
    return credentialProviderNode.defaultProvider({
      profile: getEnv(ENV_PROFILE) ?? options.profile,
      roleAssumerWithWebIdentity: clientSts.getDefaultRoleAssumerWithWebIdentity(),
      roleAssumer: clientSts.getDefaultRoleAssumer()
    });
  }
};

const ENV_BUCKET = "NXCACHE_S3_BUCKET";
const ENV_PREFIX = "NXCACHE_S3_PREFIX";
const setupS3TaskRunner = async (options) => {
  nxRemotecacheCustom.initEnv(options);
  const s3Storage = buildS3Client(options);
  const bucket = getEnv(ENV_BUCKET) ?? options.bucket;
  const prefix = getEnv(ENV_PREFIX) ?? options.prefix ?? "";

  console.trace('setupS3TaskRunner');
  console.log('setupS3TaskRunner', {
    options,
    s3Storage,
    bucket,
    prefix,
  });

  return {
    name: "S3",
    fileExists: async (filename) => {
      console.log('setupS3TaskRunner:fileExists', {
        filename,
      });
      try {
        console.log('setupS3TaskRunner:fileExists', {
          buildCommonCommandInput: buildCommonCommandInput(bucket, prefix, filename),
        });

        const result = await s3Storage.headObject(
          buildCommonCommandInput(bucket, prefix, filename)
        );
        return !!result;
      } catch (error) {
        console.log('setupS3TaskRunner:fileExists', {
          error,
        });
        if (error.name === "403" || error.name === "NotFound") {
          return false;
        } else {
          throw error;
        }
      }
    },
    retrieveFile: async (filename) => {
      console.log('setupS3TaskRunner:retrieveFile', {
        filename,
        buildCommonCommandInput: buildCommonCommandInput(bucket, prefix, filename),
      });

      const result = await s3Storage.getObject(
        buildCommonCommandInput(bucket, prefix, filename)
      );
      console.log('setupS3TaskRunner:retrieveFile', {
        result
      });

      return result.Body;
    },
    storeFile: (filename, stream) => {
      const asdf = buildCommonCommandInput(bucket, prefix, filename);
      console.log('setupS3TaskRunner:storeFile', {
        buildCommonCommandInput: asdf,
        stream,
      });
      const upload = new libStorage.Upload({
        client: s3Storage,
        params: {
          ...asdf,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Body: stream
        }
      });
      return upload.done();
    }
  };
};

const runner = nxRemotecacheCustom.createCustomRunner(setupS3TaskRunner);

module.exports = runner;
