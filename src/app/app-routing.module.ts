import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ExpenseLayoutComponent } from "./components/expense-layout/expense-layout";
import { HomepageComponent } from "./components/homepage/homepage.component";

const routes: Routes = [
  {
    path: "",
    component: HomepageComponent,
  },
  {
    path: "expenses",
    component: ExpenseLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
