import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ExpenseLayoutComponent } from "./expense-layout";

describe("ExpenseLayoutComponent", () => {
  let component: ExpenseLayoutComponent;
  let fixture: ComponentFixture<ExpenseLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExpenseLayoutComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
