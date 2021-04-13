import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { DynamicallyComponent } from "./dynamically/dynamically.component";
import { SafeurlPipe } from "./safeurl.pipe";
import { DynamicallyService } from './dynamically/dynamically.service';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HelloComponent, DynamicallyComponent, SafeurlPipe],
  providers:[SafeurlPipe, DynamicallyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
