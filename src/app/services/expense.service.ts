import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { first, take } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ExpenseService {
  expenses = new BehaviorSubject([]);

  constructor() {}

  public saveExpenses(expense: any) {
    if (expense.index !== null) {
      const bhValue = this.expenses.value;
      bhValue.splice(expense.index, 1, expense);
      this.expenses.next(bhValue);
    } else {
      this.expenses.next(this.expenses.value.concat(expense));
    }
  }
}
