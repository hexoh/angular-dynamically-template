import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { SafeurlPipe } from "../safeurl.pipe";
import { DynamicallyService } from "./dynamically.service";
import { UserComponent } from "./user/user.component";

@Component({
  selector: "app-dynamically",
  templateUrl: "./dynamically.component.html",
  styleUrls: ["./dynamically.component.css"],
  providers: [DynamicallyService]
})
export class DynamicallyComponent implements OnInit {
  tmpl: string = "<h1>Hello {{data.name}} dynamically template!</h1>" + 
  "<p class='color-red color-font' *ngIf='data.showP'>this p is show</p>";
  template: string;
  constructor(
    private safeUrl: SafeurlPipe,
    private dynamicallyService: DynamicallyService
  ) {}

  @ViewChild("container", { read: ViewContainerRef, static: true }) container: ViewContainerRef;

  dynamicComponent: ComponentRef<any>;

  ngOnInit() {
    const safe: any = this.safeUrl.transform(this.tmpl, "html");
    this.template = safe.changingThisBreaksApplicationSecurity;
    this.generateUserDynamicComponent();
  }

  destroyDynamicComponent(): void {
    this.dynamicComponent.destroy();
    this.dynamicComponent = null;
  }

  //  Private Methods
  private async generateUserDynamicComponent() {
    //  Define the component using Component decorator.
    const component = Component({
      selector: "user-dynamic",
      template: this.template,
      styles: [".color-red { color:red;} .color-font { font-size: 24px }"]
    })(UserComponent);

    const componentFactory = await this.dynamicallyService.generateDynamic(component);
  
    //  Create the component and add to the view.
    const componentRef = this.container.createComponent(componentFactory);
    // Assign the service to the component instance
    componentRef.instance.data = { name: "Angular", showP: true };
    this.dynamicComponent = componentRef;
  }
}
