import { Component, Inject, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-expense-modal",
  templateUrl: "./expense-modal.component.html",
  styleUrls: ["./expense-modal.component.scss"],
})
export class ExpenseModalComponent implements OnInit {
  expenseForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.expenseForm = this.fb.group({
      name: this.data.form.name || "",
      expenseItems: this.fb.array([]),
    });

    if (this.data.form.items) {
      this.data.form.items.map((item) => this.addRow(item));
    }
  }

  public addRow(item) {
    (this.expenseForm.controls.expenseItems as FormArray).push(
      this.fb.group({ ...item })
    );
  }

  newExpense(): FormGroup {
    return this.fb.group({
      type: "",
      amount: "",
      note: "",
    });
  }

  addExpense() {
    this.getexpenseItems().push(this.newExpense());
  }

  public getexpenseItems(): FormArray {
    return this.expenseForm.get("expenseItems") as FormArray;
  }

  public removeExpense(i) {
    this.getexpenseItems().removeAt(i);
  }
}
