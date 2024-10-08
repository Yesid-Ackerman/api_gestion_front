import { TypeModel } from "./type-model";

export interface TransactionModel {
    id:number;
    date: Date;
    amount: number;
    reason: string;
    type_id: number;
    type?: TypeModel; //No lleva [] porque es belongsTo
}
