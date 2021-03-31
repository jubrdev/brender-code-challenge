import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ExpenseService {
  expenses = new BehaviorSubject([]);
  computationResult = new BehaviorSubject([]);

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

    // Clear any past calculations
    this.computationResult.next([]);
  }

  private getTotalAmount(items) {
    return items.reduce((prev, cur) => {
      return prev + cur.amount;
    }, 0);
  }

  // Calculate bill splitting
  public calculate() {
    let resultArray = [];

    const filteredArray = this.expenses.value.map((person) => {
      return {
        name: person.name,
        amount: this.getTotalAmount(person.expenseItems),
      };
    });

    //find the total and average
    const sum = filteredArray
      .map((item) => item.amount)
      .reduce((acc, cur) => acc + cur);
    const average = sum / filteredArray.length;

    //Splitting for each person
    filteredArray.forEach((obj) => {
      const amount = average - obj.amount;
      const value = amount < 0 ? "is owed" : "owes";
      resultArray.push(
        `${obj.name} ${value} ${Math.abs(amount).toFixed(2)} dollars `
      );
    });

    this.computationResult.next(resultArray);
  }
}
