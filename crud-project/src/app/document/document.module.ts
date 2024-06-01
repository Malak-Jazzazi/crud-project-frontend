import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {DocumentListComponent} from "./document-list/document-list.component";
import {DocumentAddComponent} from "./document-add/document-add.component";
import {DocumentViewComponent} from "./document-view/document-view.component";
import {DocumentUpdateComponent} from "./document-update/document-update.component";
import {DocumentHomeComponent} from "./document-home/document-home.component";

const routes: Routes = [
  {
    path: '',
    component: DocumentHomeComponent,
    children: [
      { path: '', component: DocumentListComponent },
      { path: 'document-add', component: DocumentAddComponent },
      { path: 'document-view/:id', component: DocumentViewComponent },
      { path: 'document-update/:id', component: DocumentUpdateComponent }
    ]
  }
]

@NgModule({
  declarations: [
    DocumentHomeComponent,
    DocumentListComponent,
    DocumentAddComponent,
    DocumentViewComponent,
    DocumentUpdateComponent
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
export class DocumentModule {
}
