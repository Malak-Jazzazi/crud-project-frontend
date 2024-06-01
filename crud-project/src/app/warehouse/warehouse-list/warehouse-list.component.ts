import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Warehouse} from "../../model/warehouse";
import {BackendService} from "../../_services/backend.service";
import {Router} from "@angular/router";
import {ExcelExportService} from "../../_services/excel-export.service";

@Component({
  selector: 'app-document-list',
  templateUrl: './warehouse-list.component.html',
  styleUrl: './warehouse-list.component.css'
})
export class WarehouseListComponent implements OnInit {
  warehouses: Warehouse[] = [];
  selectedWarehouseIds: number[] = [];
  expandedWarehouseId: number | undefined;
  isExpand: boolean = false;
  warehouse : Warehouse | undefined ;
  deleteMode : boolean = false;

  constructor(private backendService: BackendService,
              private router: Router ,
              private excelExportService : ExcelExportService) {
  }

  ngOnInit(): void {
    this.getWarehouseList();
  }

  private getWarehouseList() {
    return this.backendService.getWarehouse().subscribe(data => {
      this.warehouses = data

    })
  }

  updateWarehouse(id: number | undefined) {
    this.router.navigate(['warehouse/warehouse-update', id]);
  }

  warehouseDetails(id: number | undefined) {
    this.router.navigate(['warehouse/warehouse-view', id]);
  }

  deleteWarehouse(id: number | undefined) {
    this.backendService.deleteWarehouse(id).subscribe(data => {
      this.getWarehouseList();
    })
  }

  ViewWarehouseDetails(id: number | undefined) {
    this.warehouseDetails(id);
  }


  onCheckboxChange(event: any, warehouseId: number | undefined) {
    if (typeof warehouseId === "number") {
      if (event.checked) {
        this.selectedWarehouseIds.push(warehouseId);

      } else {
        const index = this.selectedWarehouseIds.indexOf(warehouseId);
        if (index > -1) {
          this.selectedWarehouseIds.splice(index, 1);
        }
      }
    }
  }

  toggleExpand(id: number | undefined): void {
    this.expandedWarehouseId = this.expandedWarehouseId === id ? undefined : id;
    this.isExpand = !!this.expandedWarehouseId;
    if (this.isExpand) {
      this.warehouse = this.findWarehouseById(this.expandedWarehouseId);
    }
  }

  findWarehouseById(id: number | undefined): Warehouse | undefined {
    return this.warehouses.find(warehouse => warehouse.id === id);
  }

  isExpanded(id: number | undefined): boolean {
    return this.expandedWarehouseId === id;
  }

  exportToExcel(): void {
    this.excelExportService.exportWarehousesToExcel(this.warehouses);
  }

  addWarehouse() {
    this.router.navigate(['warehouse/warehouse-add']);
  }

  deleteEmployee() {
    if(this.deleteMode){
      this.backendService.deleteWarehouseByIds(this.selectedWarehouseIds).subscribe(data => {
        this.getWarehouseList();
      })
    }
    this.deleteMode = !this.deleteMode

  }
}
