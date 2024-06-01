import {Component, OnInit} from '@angular/core';
import {BackendService} from "../../_services/backend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Warehouse} from "../../model/warehouse";
import {SupplyDocument} from "../../model/supplyDocument";
import {MatSelectChange} from "@angular/material/select";
import {Item} from "../../model/item";

@Component({
  selector: 'app-document-update',
  templateUrl: './document-update.component.html',
  styleUrl: './document-update.component.css'
})
export class DocumentUpdateComponent implements OnInit{

  id : number =0 ;
  document : SupplyDocument = new SupplyDocument();
  warehouses : Warehouse[] = [];
  selectedWarehouse: Warehouse | undefined
  selectedItem: Item | undefined;
  selectedWarehouseName: string | undefined = "hi"
  selectedItemName: string | undefined = "hi"
  constructor(private backendService :BackendService ,
              private route : ActivatedRoute ,
              private router :Router) {
  }
  onSubmit() {
    this.document.warehouse = this.selectedWarehouse;
    this.document.item = this.selectedItem;
    this.backendService.updateDocument(this.id , this.document).subscribe(data =>{
        this.goToWarehouseList();
      } ,
      error => console.log(error ));
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.backendService.getDocumentId(this.id).subscribe(data =>{
      this.document = data;
      this.selectedWarehouse = this.document.warehouse;
      this.selectedItem = this.document.item;
      this.selectedWarehouseName = this.document.warehouse?.name;
      this.selectedItemName = this.document.item?.name;
    }, error => console.log(error));



    this.backendService.getWarehouse().subscribe(data =>{
      this.warehouses = data;
    }, error => {
      console.error('Error fetching warehouses:', error);
    });
  }

  goToWarehouseList(){
    this.router.navigate(['/document']);
  }

  onItemChange(event: MatSelectChange) {
    this.selectedItem = this.selectedWarehouse?.items.find(item => item.name === event.value);
  }

  onWarehouseChange(event: MatSelectChange) {
    this.selectedWarehouse = this.warehouses.find(warehouse => warehouse.name === event.value);
    this.selectedItem= new Item();
  }

}
