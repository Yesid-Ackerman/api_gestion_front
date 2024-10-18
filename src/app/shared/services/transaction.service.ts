import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { createTransactionDTO } from '@shared/dto/create-transaction-dto';
import { updateTransactionDTO } from '@shared/dto/update-transaction-dto';
import { TransactionModel } from '@shared/models/transaction-model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private http = inject(HttpClient);

  url: string = `transactions`;

  constructor() {}
  getAll() {
    return this.http.get<TransactionModel[]>(`${this.url}`);
  }
  create(data: createTransactionDTO) {
    return this.http.post<TransactionModel>(`${this.url}`, data);
  }
  delete(transaction: number) {
    return this.http.delete(`${this.url}/${transaction}`);
  }
  update(data: updateTransactionDTO){
    const {id} = data;
    return this.http.put<TransactionModel>(`${this.url}/${id}`,data);
  }
}
