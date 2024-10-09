import { createTransactionDTO } from "./create-transaction-dto";

export interface updateTransactionDTO extends createTransactionDTO {
  id: number
}
