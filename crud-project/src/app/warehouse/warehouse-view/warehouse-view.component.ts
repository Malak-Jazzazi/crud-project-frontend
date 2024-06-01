import {Component, OnInit} from '@angular/core';
import {Warehouse} from "../../model/warehouse";
import {ActivatedRoute, Router} from "@angular/router";
import {BackendService} from "../../_services/backend.service";

@Component({
  selector: 'app-warehouse-view',
  templateUrl: './warehouse-view.component.html',
  styleUrl: './warehouse-view.component.css'
})
export class WarehouseViewComponent implements OnInit{

  id : number =0;
  warehouse : Warehouse = new Warehouse();

  constructor(private backendService: BackendService ,
              private route:ActivatedRoute ,
              private router:Router) {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.backendService.getWarehouseId(this.id).subscribe(data =>{
      this.warehouse = data;
    }, error => console.log(error));
  }

  goToWarehouseList() {
    this.router.navigate(["warehouse"])
  }
}
