import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StudentComponent } from "./student.component";
import { RouterService } from "../services/router.service";

@NgModule({
  declarations: [StudentComponent],
  exports: [StudentComponent],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [RouterService]
})
export class ComponentsModule {}
