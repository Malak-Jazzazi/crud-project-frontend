import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule, Routes} from "@angular/router";
import {WarehouseListComponent} from "./warehouse-list/warehouse-list.component";
import {WarehouseAddComponent} from "./warehouse-add/warehouse-add.component";
import {WarehouseViewComponent} from "./warehouse-view/warehouse-view.component";
import {WarehouseUpdateComponent} from "./warehouse-update/warehouse-update.component";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {WarehouseHomeComponent} from "./warehouse-home/warehouse-home.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";

const routes: Routes = [
  {
    path: '',
    component: WarehouseHomeComponent,
    children: [
      {path: '', component: WarehouseListComponent},
      {path: 'warehouse-add', component: WarehouseAddComponent},
      {path: 'warehouse-view/:id', component: WarehouseViewComponent},
      {path: 'warehouse-update/:id', component: WarehouseUpdateComponent},
    ]
  }
]

@NgModule({
  declarations: [
    WarehouseHomeComponent,
    WarehouseListComponent,
    WarehouseAddComponent,
    WarehouseViewComponent,
    WarehouseUpdateComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  exports: [RouterModule]
})
export class WarehouseModule {
}
