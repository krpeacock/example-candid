// important escape hatch for where bigint can't be polyfilled
export interface Nat64Handler {
  toString: () => string;
  from: () => Nat64Handler;
  // etc
}

export type Nat64 = bigint | Nat64Handler;

export type CallResponseDefault = {
  message: "success";
  code: 200;
};

export class CandidBlob {
  _content: number[];
  constructor(source?: ArrayLike<number>) {
    this._content = [];
    for (let index = 0; index < source.length; index++) {
      this._content.push(source[index]);
    }
  }
  /**
   * toUint8Array
   */
  public toUint8Array() {
    return Uint8Array.from(this._content);
  }
  /**
   * toArray
   */
  public toArray() {
    return this._content;
  }
  /**
   * toHex
   */
  public toHex() {
    // hex encoded string
  }
  /**
   * toArrayBuffer
   */
  public toArrayBuffer() {
    return Uint8Array.from(this._content).buffer;
  }
}
