import { TransactionModel } from "./transaction-model";

export interface TypeModel {
  id: number;
  type: string;
  transactions?: TransactionModel[]; //Lleva [] cuando es hasMany
}
