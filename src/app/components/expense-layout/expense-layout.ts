import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ExpenseModalComponent } from "../expense-modal/expense-modal.component";

@Component({
  selector: "app-expense-layout",
  templateUrl: "./expense-layout.component.html",
  styleUrls: ["./expense-layout.component.scss"],
})
export class ExpenseLayoutComponent implements OnInit {
  activeButtonState: Boolean = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  createNewExpense() {
    // If button has never been clicked then change its state to activated
    !this.activeButtonState ? (this.activeButtonState = true) : null;

    this.dialog.open(ExpenseModalComponent, {
      data: {
        title: "Add New Expense",
        form: {
          name: "Juliet",
          items: [
            { type: "pencil", amount: 5.25, note: "pencil note" },
            { type: "paper", amount: 1.98, note: "paper note" },
          ],
        },
      },
    });
  }
}
