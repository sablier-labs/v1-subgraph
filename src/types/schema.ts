import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Stream extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Stream entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Stream entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Stream", id.toString(), this);
  }

  static load(id: string): Stream | null {
    return store.get("Stream", id) as Stream | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get sender(): Bytes {
    let value = this.get("sender");
    return value.toBytes();
  }

  set sender(value: Bytes) {
    this.set("sender", Value.fromBytes(value));
  }

  get recipient(): Bytes {
    let value = this.get("recipient");
    return value.toBytes();
  }

  set recipient(value: Bytes) {
    this.set("recipient", Value.fromBytes(value));
  }

  get tokenAddress(): Bytes {
    let value = this.get("tokenAddress");
    return value.toBytes();
  }

  set tokenAddress(value: Bytes) {
    this.set("tokenAddress", Value.fromBytes(value));
  }

  get startBlock(): BigInt {
    let value = this.get("startBlock");
    return value.toBigInt();
  }

  set startBlock(value: BigInt) {
    this.set("startBlock", Value.fromBigInt(value));
  }

  get stopBlock(): BigInt {
    let value = this.get("stopBlock");
    return value.toBigInt();
  }

  set stopBlock(value: BigInt) {
    this.set("stopBlock", Value.fromBigInt(value));
  }

  get payment(): BigInt {
    let value = this.get("payment");
    return value.toBigInt();
  }

  set payment(value: BigInt) {
    this.set("payment", Value.fromBigInt(value));
  }

  get interval(): BigInt {
    let value = this.get("interval");
    return value.toBigInt();
  }

  set interval(value: BigInt) {
    this.set("interval", Value.fromBigInt(value));
  }

  get status(): string {
    let value = this.get("status");
    return value.toString();
  }

  set status(value: string) {
    this.set("status", Value.fromString(value));
  }

  get balance(): string {
    let value = this.get("balance");
    return value.toString();
  }

  set balance(value: string) {
    this.set("balance", Value.fromString(value));
  }

  get txs(): Array<string> {
    let value = this.get("txs");
    return value.toStringArray();
  }

  set txs(value: Array<string>) {
    this.set("txs", Value.fromStringArray(value));
  }
}

export class Balance extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Balance entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Balance entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Balance", id.toString(), this);
  }

  static load(id: string): Balance | null {
    return store.get("Balance", id) as Balance | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get contract(): BigInt {
    let value = this.get("contract");
    return value.toBigInt();
  }

  set contract(value: BigInt) {
    this.set("contract", Value.fromBigInt(value));
  }

  get sender(): BigInt {
    let value = this.get("sender");
    return value.toBigInt();
  }

  set sender(value: BigInt) {
    this.set("sender", Value.fromBigInt(value));
  }

  get stream(): string {
    let value = this.get("stream");
    return value.toString();
  }

  set stream(value: string) {
    this.set("stream", Value.fromString(value));
  }

  get recipient(): BigInt {
    let value = this.get("recipient");
    return value.toBigInt();
  }

  set recipient(value: BigInt) {
    this.set("recipient", Value.fromBigInt(value));
  }
}

export class Transaction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Transaction entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Transaction entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Transaction", id.toString(), this);
  }

  static load(id: string): Transaction | null {
    return store.get("Transaction", id) as Transaction | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get block(): i32 {
    let value = this.get("block");
    return value.toI32();
  }

  set block(value: i32) {
    this.set("block", Value.fromI32(value));
  }

  get event(): string {
    let value = this.get("event");
    return value.toString();
  }

  set event(value: string) {
    this.set("event", Value.fromString(value));
  }

  get stream(): string {
    let value = this.get("stream");
    return value.toString();
  }

  set stream(value: string) {
    this.set("stream", Value.fromString(value));
  }

  get timestamp(): i32 {
    let value = this.get("timestamp");
    return value.toI32();
  }

  set timestamp(value: i32) {
    this.set("timestamp", Value.fromI32(value));
  }
}
