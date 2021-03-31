import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject } from "rxjs";
import { ExpenseService } from "src/app/services/expense.service";
import { ExpenseModalComponent } from "../expense-modal/expense-modal.component";
import { ExpenseType } from "../../models/expense.model";

@Component({
  selector: "app-expense-layout",
  templateUrl: "./expense-layout.component.html",
  styleUrls: ["./expense-layout.component.scss"],
})
export class ExpenseLayoutComponent implements OnInit {
  activeButtonState: Boolean = false;
  expenses: BehaviorSubject<ExpenseType[]>;
  computationResult: String[];

  constructor(private dialog: MatDialog, public service: ExpenseService) {}

  ngOnInit() {
    // Bind to behavior subject and use in template
    this.expenses = this.service.expenses;
  }

  // Simple method to add item values
  public getTotalAmount(items) {
    return items.reduce((prev, cur) => {
      return prev + cur.amount;
    }, 0);
  }

  // Launch modal with existing expense form data
  public editExpenses(expense: ExpenseType, index: number) {
    this.dialog.open(ExpenseModalComponent, {
      data: {
        title: `Edit ${expense.name}'s Expenses`,
        form: expense,
        index,
      },
    });
  }

  public createNewExpense() {
    // If button has never been clicked then change its state to activated
    !this.activeButtonState ? (this.activeButtonState = true) : null;

    // Launch modal with empty form data
    this.dialog.open(ExpenseModalComponent, {
      data: {
        title: "Add New Expense",
        form: {
          name: "",
          expenseItems: [{ type: "", amount: null, note: "" }],
        },
        index: null,
      },
    });
  }

  public calculate(expenses) {
    // clear and past calculations
    this.computationResult = [];

    const filteredArray = expenses.map((person) => {
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
      const amount = Math.abs(average - obj.amount);
      const value = amount < 0 ? "is owed" : "owes";
      this.computationResult.push(
        `${obj.name} ${value} ${amount.toFixed(2)} dollars `
      );
    });
  }
}
