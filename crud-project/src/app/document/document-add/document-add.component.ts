import {Component, OnInit} from '@angular/core';
import {BackendService} from "../../_services/backend.service";
import {Router} from "@angular/router";
import {SupplyDocument} from "../../model/supplyDocument";
import {Warehouse} from "../../model/warehouse";
import {MatSelectChange} from "@angular/material/select";
import {Item} from "../../model/item";

@Component({
  selector: 'app-document-add',
  templateUrl: './document-add.component.html',
  styleUrl: './document-add.component.css'
})
export class DocumentAddComponent implements OnInit{

  document: SupplyDocument = new SupplyDocument();
  warehouses : Warehouse[] = [];
  selectedWarehouse: Warehouse | undefined
  selectedItem: Item | undefined;
  constructor(private backendService:BackendService ,
              private router:Router) {
  }
  onSubmit() {
    this.document.warehouse = this.selectedWarehouse;
    this.document.item = this.selectedItem;
    this.backendService.addDocument(this.document).subscribe(data =>{
      this.goToDocumentList();
    })
  }

  goToDocumentList(){
    this.router.navigate(['/document'])
  }

  ngOnInit(): void {
    this.backendService.getWarehouse().subscribe(data =>{
      this.warehouses = data;
    }, error => {
      console.error('Error fetching warehouses:', error);
    });
  }

  onItemChange(event: MatSelectChange) {
    this.selectedItem = this.selectedWarehouse?.items.find(item => item.name === event.value);
  }

  onWarehouseChange(event: MatSelectChange) {
    this.selectedWarehouse = this.warehouses.find(warehouse => warehouse.name === event.value);
    this.selectedItem= new Item();
  }
}
