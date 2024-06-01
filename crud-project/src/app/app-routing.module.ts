import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path: 'warehouse',
    loadChildren: () => import('./warehouse/warehouse.module').then(m => m.WarehouseModule),
  },
  {
    path: 'document',
    loadChildren: () => import('./document/document.module').then(m => m.DocumentModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
