import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { createTransactionDTO } from '@shared/dto/create-transaction-dto';
import { TransactionModel } from '@shared/models/transaction-model';

const { API_URL } = environment;

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private http = inject(HttpClient);

  endpoint: string = `${API_URL}/transactions`;

  constructor() {}
  getAll() {
    return this.http.get<TransactionModel[]>(`${this.endpoint}/index`);
  }
  create(data: createTransactionDTO) {
    return this.http.post<TransactionModel>(`${this.endpoint}/store`, data);
  }
  delete(transaction: number) {
    return this.http.delete(`${this.endpoint}/delete/${transaction}`);
  }
}
