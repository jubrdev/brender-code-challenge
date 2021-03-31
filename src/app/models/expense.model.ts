export interface ExpenseType {
  name: string;
  index: number;
  expenseItems: ExpenseItem[];
}

export interface ExpenseItem {
  note: string;
  amount: number;
  type: string;
}
