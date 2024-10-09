import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { createTransactionDTO } from '@shared/dto/create-transaction-dto';
import { updateTransactionDTO } from '@shared/dto/update-transaction-dto';
import { TransactionModel } from '@shared/models/transaction-model';
import { TypeModel } from '@shared/models/type-model';
import { TransactionService } from '@shared/services/transaction.service';
import { TypeService } from '@shared/services/type.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  private formbuilder = inject(FormBuilder);
  private transactionService = inject(TransactionService);

  private typeService = inject(TypeService);

  formTransaction: FormGroup | null = null;
  transactions: TransactionModel[] = [
    // {
    //   amount: 0,
    //   reason: 'Compra de un producto',
    // }
  ];
  types: TypeModel[] = [];
  transaction: TransactionModel | null = null;

  indexTransaction: number | null = null;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const dataSub = forkJoin([
      this.transactionService.getAll(),
      this.typeService.getAll(),
    ]).subscribe({
      next: ([transactions, types]) => {
        this.transactions = [...transactions];
        this.types = [...types];
      },
      complete() {
        dataSub.unsubscribe();
      },
    });
  }

  createTransaction() {
    this.formTransaction = this.formbuilder.group({
      date: new FormControl(null, [Validators.required]),
      type_id: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      reason: new FormControl(null, [Validators.required]),
    });
  }
  cancelTransaction() {
    this.formTransaction = null;
    this.indexTransaction = null;
    this.formTransaction = null;
  }

  saveTransaction() {
    if (!this.formTransaction || this.formTransaction.invalid) {
      alert('please complete the fields');
      return;
    }
    const { value } = this.formTransaction;
    console.log(this.formTransaction.get('id'));
    if (this.formTransaction.get('id')) {
      const newTransaction: updateTransactionDTO =
        value as updateTransactionDTO;
      const saveSub = this.transactionService.update(newTransaction)
      .subscribe({
        next: (transaction) => {
          let transactions = [...this.transactions];
          let transaction_index = transactions.findIndex((transaction) => transaction.
          id === newTransaction.id);
          transactions[transaction_index] = transaction;
          this.transactions = transactions;
          this.cancelTransaction();
        },
      });
      return;
    }
    const newTransaction:createTransactionDTO = value as createTransactionDTO;
    const saveSub = this.transactionService
    .create(newTransaction)
    .subscribe({
      next: (transaction) => {
        this.transactions = [...this.transactions, transaction];
        this.cancelTransaction();
        },
        complete:()=>{
          saveSub.unsubscribe();
        }
      });
  }

  deleteTransaction(transaction: number) {
    console.log(transaction);
    const deleteSub = this.transactionService.delete(transaction).subscribe({
      next: () => {
        this.transactions = this.transactions.filter(
          (t) => t.id !== transaction
        );
      },
      complete: () => {
        deleteSub.unsubscribe();
      },
    });
  }
  updateTransaction(transaction: TransactionModel) {
    this.formTransaction = this.formbuilder.group({
      id: new FormControl(transaction.id),
      date: new FormControl(null, [Validators.required]),
      type_id: new FormControl(transaction.type,[Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      reason: new FormControl(transaction.type),
    });
  }
}
