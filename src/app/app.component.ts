import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TransactionModel } from './shared/models/transaction-model';
import { TransactionService } from '@shared/services/transaction.service';
import { forkJoin } from 'rxjs';
import { TypeService } from '@shared/services/type.service';
import { TypeModel } from '@shared/models/type-model';
import { createTransactionDTO } from '@shared/dto/create-transaction-dto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
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
    const newTransaction: createTransactionDTO = value as createTransactionDTO;

    const saveSub = this.transactionService.create(newTransaction).subscribe({
      next: (transaction) => {
        this.transactions = [...this.transactions, transaction];
        this.cancelTransaction();
      },
      complete: () => {
        saveSub.unsubscribe();
      },
    });
  }

  deleteTransaction(transaction: number) {
    console.log(transaction);
    const deleteSub = this.transactionService.delete(transaction).subscribe({
      next: () => {
        this.transactions = this.transactions.filter((t) => t.id !== transaction);
        },
        complete: () => {
          deleteSub.unsubscribe();
          },
          });
  }
  updateTransaction(transaction: TransactionModel, index: number) {
    this.transaction = transaction;
    this.indexTransaction = index;
    this.formTransaction = this.formbuilder.group({
      amount: new FormControl(this.transaction?.amount, [Validators.required]),
      reason: new FormControl(this.transaction?.reason, [Validators.required]),
    });
  }
}
