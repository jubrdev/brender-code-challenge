import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ExpenseService {
  expenses = new BehaviorSubject([]);

  constructor() {}

  // Reuseable method to save new expense object or replace existing expense object if already exists
  public saveExpenses(expense) {
    if (expense.index !== null) {
      const bhValue = this.expenses.value;
      bhValue.splice(expense.index, 1, expense);
      this.expenses.next(bhValue);
    } else {
      this.expenses.next(this.expenses.value.concat(expense));
    }
  }
}
