import { Component, Inject, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ExpenseService } from "src/app/services/expense.service";

@Component({
  selector: "app-expense-modal",
  templateUrl: "./expense-modal.component.html",
  styleUrls: ["./expense-modal.component.scss"],
})
export class ExpenseModalComponent implements OnInit {
  expenseForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: ExpenseService
  ) {}

  ngOnInit() {
    // initialize and prepopulate expense form with data passed into modal
    this.expenseForm = this.fb.group({
      name: this.data.form.name || "",
      expenseItems: this.fb.array([]),
      index: this.data.index,
    });

    if (this.data.form.expenseItems) {
      this.data.form.expenseItems.map((item) => this.addRow(item));
    }
  }

  // set up item form group
  private newExpense(): FormGroup {
    return this.fb.group({
      type: "",
      amount: "",
      note: "",
    });
  }

  // add an expense item to form group
  public addRow(item) {
    (this.expenseForm.controls.expenseItems as FormArray).push(
      this.fb.group({ ...item })
    );
  }

  // get expenseItems from expenseForm returns as type FormArray
  public getExpenseItems(): FormArray {
    return this.expenseForm.get("expenseItems") as FormArray;
  }

  // Remove expense item object
  public removeExpense(i) {
    this.getExpenseItems().removeAt(i);
  }

  // Add a new empty expense
  public addExpense() {
    this.getExpenseItems().push(this.newExpense());
  }

  // Send form value to service and save state in BehaviorSubject
  public saveform() {
    this.service.saveExpenses(this.expenseForm.value);
  }
}
