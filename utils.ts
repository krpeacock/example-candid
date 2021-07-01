import { Principal } from "@dfinity/principal";

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
  _raw: number[];
  constructor(source?: ArrayLike<number>) {
    this._raw = [];
    for (let index = 0; index < source.length; index++) {
      this._raw.push(source[index]);
    }
  }
  /**
   * toUint8Array
   */
  public toUint8Array() {
    return Uint8Array.from(this._raw);
  }
  /**
   * toArray
   */
  public toArray() {
    return this._raw;
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
    return Uint8Array.from(this._raw).buffer;
  }

  /**
   * toPrincipal
   */
  public toPrincipal() {
    return Principal.from(this.toString());
  }

  /**
   * toString
   */
  public toString(): string {
    // Implement toString
    return "";
  }
}
