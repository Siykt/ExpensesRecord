export enum BillBasicType {
  /** 生活琐事 */
  normal,
  /** 非预期消费 */
  unusual,
}

interface BillType {
  name: string;
  type: BillBasicType;
}

export interface Bill {
  type: BillType;
  name: string;
  money: number;
  count: number;
  total: number;
}

export class Bill {
  type: BillType;
  name: string;
  money: number;
  count: number;
  total: number;

  constructor(info: Bill) {
    this.type = info.type;
    this.name = info.name;
    this.money = info.money;
    this.count = info.count;
    this.total = info.total;
  }
}
