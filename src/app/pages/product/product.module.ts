import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ProductComponent } from "./product.component";
import { HeatmapComponent } from "./sensors/heatmap-chart/heatmap-chart.component";
import { ProductService } from "./product.service";
import { LinearChartComponent } from "./sensors/linear-chart/linear-chart.component";
import { TabsComponent } from "./tabs/tabs.component";
import { VerifierComponent } from "./verifier/verifier.component";
import { VerifierService } from "./verifier/verifier.service";
import { TranslateModule } from "@ngx-translate/core";
import { TasksListComponent } from "./work/tasks-list/tasks-list.component";
import { BusinessListComponent } from "./work/business-list/business-list.component";
import { SensorsComponent } from "./sensors/sensors.component";

import "@enchainte-projects/enchainte-uniswap-component";
import { DateSelectorComponent } from "./date-selector/date-selector.component";
import { ProductRoutingModule } from "./product-routing.module";
import { VerifierButtonComponent } from "./verifier/verifier-button/verifier-button.component";
import { EvidencesComponent } from "./evidences/evidences.component";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ProductComponent,
    HeatmapComponent,
    LinearChartComponent,
    TabsComponent,
    VerifierComponent,
    DateSelectorComponent,
    TasksListComponent,
    SensorsComponent,
    EvidencesComponent,
    VerifierButtonComponent,
    BusinessListComponent,
    DateSelectorComponent,
  ],
  imports: [CommonModule, FormsModule, TranslateModule, ProductRoutingModule],
  providers: [ProductService, VerifierService],
})
export class ProductModule {}
