import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private formbuilder = inject(FormBuilder);
  formTransaction: FormGroup | null = null;
  transactions: TransactionModel[] = [
    // {
    //   amount: 0,
    //   description: 'Compra de un producto',
    // }
  ];
  transaction:TransactionModel|null = null
  indexTransaction: number | null = null;
  createTransaction() {
    this.formTransaction = this.formbuilder.group({
      amount: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
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
    const newTransaction: TransactionModel = value as TransactionModel;
    if (this.indexTransaction !== null){
      let transactions = [...this.transactions];
      transactions[this.indexTransaction] = newTransaction;
      this.transactions = [...transactions];
      this.formTransaction = null;
      this.indexTransaction = null;
      return;
    }
    this.transactions = [...this.transactions,newTransaction];
    this.formTransaction = null;
  }
  deleteTransaction(index: number) {
    console.log(index);
    
    let transactions = [...this.transactions];
    transactions.splice(index, 1);
    this.transactions = [...transactions];
  }
  updateTransaction(transaction:TransactionModel,index:number){
    this.transaction = transaction;
    this.indexTransaction = index;
    this.formTransaction = this.formbuilder.group({
    amount: new FormControl(this.transaction?.amount, [Validators.required]),
    description: new FormControl(this.transaction?.description, [Validators.required]),
    })
  }
}
