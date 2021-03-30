import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject } from "rxjs";
import { ExpenseService } from "src/app/services/expense.service";
import { ExpenseModalComponent } from "../expense-modal/expense-modal.component";
@Component({
  selector: "app-expense-layout",
  templateUrl: "./expense-layout.component.html",
  styleUrls: ["./expense-layout.component.scss"],
})
export class ExpenseLayoutComponent implements OnInit {
  activeButtonState: Boolean = false;
  expenses: BehaviorSubject<any>;

  constructor(private dialog: MatDialog, public service: ExpenseService) {}

  ngOnInit() {
    this.expenses = this.service.expenses;
  }

  getTotalAmount(items) {
    return items.reduce((prev, cur) => {
      return prev + cur.amount;
    }, 0);
  }

  editExpenses(expense, index) {
    this.dialog.open(ExpenseModalComponent, {
      data: {
        title: `Edit ${expense.name}'s Expenses`,
        form: expense,
        index,
      },
    });
  }

  createNewExpense() {
    // If button has never been clicked then change its state to activated
    !this.activeButtonState ? (this.activeButtonState = true) : null;

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

  calculate() {
    console.log("do something here");
  }
}
