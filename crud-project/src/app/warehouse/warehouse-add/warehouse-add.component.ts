import {Component} from '@angular/core';
import {Warehouse} from "../../model/warehouse";
import {BackendService} from "../../_services/backend.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-warehouse-add',
  templateUrl: './warehouse-add.component.html',
  styleUrl: './warehouse-add.component.css'
})
export class WarehouseAddComponent{

  warehouse: Warehouse = {
    name: '',
    description: '',
    items: [] = [] ,
    id: 0 ,
    createdBy : '',
    createdOn : ''
  };
  itemInputs: { name: string, description: string , quantity : string }[] = [];
  isAddUpFailed : boolean = false;
  errorMessage = '';
  constructor(private backendService:BackendService ,
              private router:Router) {
  }
  onSubmit(form: any) {
    if (form.valid) {
      this.backendService.addWarehouse(this.warehouse).subscribe({
        next:data => {
        this.goToWarehouseList();
        this.isAddUpFailed = false;
      },
        error: err => {
        this.errorMessage = err.error.message;
        this.isAddUpFailed = true;
      }
    });
    }
  }

  goToWarehouseList(){
    this.router.navigate(['/warehouse'])
  }

  addItem(event: Event): void {
    event.preventDefault();
    this.itemInputs.push({ name: '', description: '' , quantity : '' }); // Add empty input values for the new item
    this.warehouse.items = this.itemInputs ;
  }

  removeItem(event: Event , index: number): void {
    event.preventDefault();
    this.itemInputs.splice(index, 1); // Remove corresponding input values
    this.warehouse.items = this.itemInputs
  }
}
