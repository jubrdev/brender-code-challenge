import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppComponent } from "./app.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { ExpenseLayoutComponent } from "./components/expense-layout/expense-layout";
import { ExpenseModalComponent } from "./components/expense-modal/expense-modal.component";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ExpenseLayoutComponent,
    ExpenseModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  entryComponents: [ExpenseModalComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
