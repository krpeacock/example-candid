import type { Principal } from "@dfinity/principal";
import { Nat64, CandidBlob, CallResponseDefault } from "./utils";

// Nat64 should allow option to not use bigint
export type UserNumber = Nat64;

/* 
   We should provide a utility Blob that supports 
   creation from and casting to hex, uint8Array, ArrayLike, and ArrayBuffer
*/
export type PublicKey = CandidBlob;
export type CredentialId = CandidBlob;
export type DeviceKey = PublicKey;
export type UserKey = PublicKey;
export type SessionKey = PublicKey;
export type FrontendHostName = string;
export type Timestamp = Nat64;

export type HeaderField = [string, string];

// Record with named attributes is a type
export type HttpRequest = {
  method: string;
  url: string;
  // vec of type is expressed like this (array of type)
  headers: HeaderField[];
  body: CandidBlob;
};

export type HttpResponse = {
  status_code: number;
  headers: HeaderField[];
  body: CandidBlob;
  /* 
  Opt should be expressed as an optional attribute, parameter, or argument
  
  snake case should be converted to camelCase for attributes and variables, and PascalCase for classes and types

  streaming_strategy -> streamingStrategy
  */
  streamingStrategy?: StreamingStrategy;
};

export type StreamingCallbackHttpResponse = {
  body: CandidBlob;
  token?: Token;
};

// record {}; can be reported as unknown
export type Token = unknown;

// Complex variants should be broken out to their own types
export type Callback = {
  /*
  typed argument should be given a camelCase name with the provided type
  
  functions return a Promise yielding the indicated type
  */
  callback: (token: Token) => Promise<StreamingCallbackHttpResponse>;
};

// Complex variant pulled out - if Callback has a naming conflict, use StreamingStrategyCallback
export type StreamingStrategy = Callback;

// Variants are listed as objects with a kind of the label
export type Purpose = { kind: "recovery" } | { kind: "authentication" };

// Do not convert variant strings to camelCase
export type KeyType =
  | { kind: "unknown" }
  | { kind: "platform" }
  | { kind: "cross_platform" }
  | { kind: "seed_phrase" };

export type DeviceData = {
  pubkey: DeviceKey;
  alias: string;
  credentialId?: CredentialId;
  purpose: Purpose;
  keyType: KeyType;
};

// Variants with mixed complex types and simple types are objects with the variant label listed as kind:
export type RegisterResponse =
  | { kind: "registered"; userNumber: UserNumber }
  | { kind: "canister_full" };

export type Delegation = {
  pubkey: PublicKey;
  expiration: Timestamp;
  // opt vec
  targets?: Principal[];
};

export type SignedDelegation = {
  delegation: Delegation;
  signature: CandidBlob;
};

// Kind names are not transformed to camelCase, attributes should be
export type GetDelegationResponse =
  | { kind: "signed_delegation"; signedDelegation: SignedDelegation }
  | { kind: "no_such_delegation" };

export type InternetIdentityStats = {
  usersRegistered: Nat64;
  // Records that aren't string or number should be Arrays
  assignedUserNumberRange: [Nat64, Nat64];
};

export type InternetIdentityInit = {
  assignedUserNumberRange: [Nat64, Nat64];
};

export type ProofOfWork = {
  timestamp: Timestamp;
  nonce: Nat64;
};

// Service should be a type, not a function
export type _SERVICE = {
  // methods returning (); should return a Promise yielding simple success response
  init_salt: () => Promise<CallResponseDefault>;
  // Typed parameters should use camelCase
  register: (
    deviceData: DeviceData,
    proofOfWork: ProofOfWork
  ) => Promise<RegisterResponse>;
  add: (
    userNumber: UserNumber,
    deviceData: DeviceData
  ) => Promise<CallResponseDefault>;
  remove: (
    userNumber: UserNumber,
    deviceKey: DeviceKey
  ) => Promise<CallResponseDefault>;
  // Query is not relevant to the type generation
  lookup: (userNumber: UserNumber) => Promise<DeviceData[]>;
  stats: () => Promise<InternetIdentityStats>;
  prepare_delegation: (
    userNumber: UserNumber,
    frontendHostName: FrontendHostName,
    sessionKey: SessionKey,
    maxTimeToLive?: Nat64
    // If multiple types are returned, format as an object with camelCase attribute names
  ) => Promise<{ userKey: UserKey; timestamp: Timestamp }>;
  get_delegation: (
    userNumber: UserNumber,
    frontendHostName: FrontendHostName,
    sessionKey: SessionKey,
    maxTimeToLive?: Nat64
  ) => Promise<GetDelegationResponse>;
  http_request: (request: HttpRequest) => Promise<HttpResponse>;
};
