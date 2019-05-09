import {
  EthereumEvent,
  SmartContract,
  EthereumValue,
  JSONValue,
  TypedMap,
  Entity,
  EthereumTuple,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class CreateStream extends EthereumEvent {
  get params(): CreateStream__Params {
    return new CreateStream__Params(this);
  }
}

export class CreateStream__Params {
  _event: CreateStream;

  constructor(event: CreateStream) {
    this._event = event;
  }

  get streamId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get sender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get recipient(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get tokenAddress(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get startBlock(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get stopBlock(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get payment(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get interval(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }

  get deposit(): BigInt {
    return this._event.parameters[8].value.toBigInt();
  }
}

export class WithdrawFromStream extends EthereumEvent {
  get params(): WithdrawFromStream__Params {
    return new WithdrawFromStream__Params(this);
  }
}

export class WithdrawFromStream__Params {
  _event: WithdrawFromStream;

  constructor(event: WithdrawFromStream) {
    this._event = event;
  }

  get streamId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get recipient(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get funds(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class RedeemStream extends EthereumEvent {
  get params(): RedeemStream__Params {
    return new RedeemStream__Params(this);
  }
}

export class RedeemStream__Params {
  _event: RedeemStream;

  constructor(event: RedeemStream) {
    this._event = event;
  }

  get streamId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get sender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get recipient(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get senderBalance(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get recipientBalance(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class ConfirmUpdate extends EthereumEvent {
  get params(): ConfirmUpdate__Params {
    return new ConfirmUpdate__Params(this);
  }
}

export class ConfirmUpdate__Params {
  _event: ConfirmUpdate;

  constructor(event: ConfirmUpdate) {
    this._event = event;
  }

  get streamId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get confirmer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get newTokenAddress(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get newStopBlock(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get newPayment(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get newInterval(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class RevokeUpdate extends EthereumEvent {
  get params(): RevokeUpdate__Params {
    return new RevokeUpdate__Params(this);
  }
}

export class RevokeUpdate__Params {
  _event: RevokeUpdate;

  constructor(event: RevokeUpdate) {
    this._event = event;
  }

  get streamId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get revoker(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get newTokenAddress(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get newStopBlock(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get newPayment(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get newInterval(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class ExecuteUpdate extends EthereumEvent {
  get params(): ExecuteUpdate__Params {
    return new ExecuteUpdate__Params(this);
  }
}

export class ExecuteUpdate__Params {
  _event: ExecuteUpdate;

  constructor(event: ExecuteUpdate) {
    this._event = event;
  }

  get streamId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get sender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get recipient(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get newTokenAddress(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get newStopBlock(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get newPayment(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get newInterval(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }
}

export class CreateStream1 extends EthereumEvent {
  get params(): CreateStream1__Params {
    return new CreateStream1__Params(this);
  }
}

export class CreateStream1__Params {
  _event: CreateStream1;

  constructor(event: CreateStream1) {
    this._event = event;
  }

  get streamId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get sender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get recipient(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get tokenAddress(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get startBlock(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get stopBlock(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get payment(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get interval(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }
}

export class Sablier__getStreamResult {
  value0: Address;
  value1: Address;
  value2: Address;
  value3: BigInt;
  value4: BigInt;
  value5: BigInt;
  value6: BigInt;
  value7: BigInt;

  constructor(
    value0: Address,
    value1: Address,
    value2: Address,
    value3: BigInt,
    value4: BigInt,
    value5: BigInt,
    value6: BigInt,
    value7: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromAddress(this.value0));
    map.set("value1", EthereumValue.fromAddress(this.value1));
    map.set("value2", EthereumValue.fromAddress(this.value2));
    map.set("value3", EthereumValue.fromUnsignedBigInt(this.value3));
    map.set("value4", EthereumValue.fromUnsignedBigInt(this.value4));
    map.set("value5", EthereumValue.fromUnsignedBigInt(this.value5));
    map.set("value6", EthereumValue.fromUnsignedBigInt(this.value6));
    map.set("value7", EthereumValue.fromUnsignedBigInt(this.value7));
    return map;
  }
}

export class Sablier extends SmartContract {
  static bind(address: Address): Sablier {
    return new Sablier("Sablier", address);
  }

  balanceOf(_streamId: BigInt, _addr: Address): BigInt {
    let result = super.call("balanceOf", [
      EthereumValue.fromUnsignedBigInt(_streamId),
      EthereumValue.fromAddress(_addr)
    ]);
    return result[0].toBigInt();
  }

  getStream(_streamId: BigInt): Sablier__getStreamResult {
    let result = super.call("getStream", [
      EthereumValue.fromUnsignedBigInt(_streamId)
    ]);
    return new Sablier__getStreamResult(
      result[0].toAddress(),
      result[1].toAddress(),
      result[2].toAddress(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBigInt(),
      result[6].toBigInt(),
      result[7].toBigInt()
    );
  }

  getUpdate(_streamId: BigInt, _addr: Address): boolean {
    let result = super.call("getUpdate", [
      EthereumValue.fromUnsignedBigInt(_streamId),
      EthereumValue.fromAddress(_addr)
    ]);
    return result[0].toBoolean();
  }
}
