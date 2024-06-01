import {Component, OnInit} from '@angular/core';
import {BackendService} from "../../_services/backend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Warehouse} from "../../model/warehouse";

@Component({
  selector: 'app-document-update',
  templateUrl: './warehouse-update.component.html',
  styleUrl: './warehouse-update.component.css'
})
export class WarehouseUpdateComponent implements OnInit{

  id : number =0 ;
  warehouse : Warehouse = new Warehouse();
  isUpdateUpFailed : boolean = false;
  errorMessage = '';
  constructor(private backendService :BackendService ,
              private route : ActivatedRoute ,
              private router :Router) {
  }
  onSubmit(form : any) {
    if(form.valid){
      this.backendService.updateWarehouse(this.id , this.warehouse).subscribe({
        next : data =>{
          this.goToWarehouseList();
          this.isUpdateUpFailed = false;
        } ,
        error : err => {
          this.errorMessage = err.error.message;
          this.isUpdateUpFailed = true;
        }
      });
    }

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.backendService.getWarehouseId(this.id).subscribe(data =>{
      this.warehouse = data;
    }, error => console.log(error));
  }

  goToWarehouseList(){
    this.router.navigate(['/warehouse']);
  }

}
