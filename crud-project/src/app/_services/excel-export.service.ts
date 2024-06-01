import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {Warehouse} from "../model/warehouse";

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {

  constructor() { }

  exportWarehousesToExcel(warehouses: Warehouse[]): void {
    // Define the header with descriptions
    const header = [
      { 'Warehouse Name': 'Name of the warehouse', 'Warehouse Description': 'Description of the warehouse', 'Item Name': 'Name of the item', 'Item Description': 'Description of the item', 'Item Quantity': 'Quantity of the item' }
    ];

    const data: any[] = [];

    warehouses.forEach(warehouse => {
      data.push({
        'Warehouse Name': warehouse.name,
        'Warehouse Description': warehouse.description,
        'Item Name': '',
        'Item Description': '',
        'Item Quantity': ''
      });

      if (warehouse.items && warehouse.items.length > 0) {
        warehouse.items.forEach(item => {
          data.push({
            'Warehouse Name': '',
            'Warehouse Description': '',
            'Item Name': item.name,
            'Item Description': item.description,
            'Item Quantity': item.quantity
          });
        });
      }
    });

    // Convert header and data to worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(header);
    XLSX.utils.sheet_add_json(worksheet, data, { skipHeader: true, origin: 'A2' });

    // Create the workbook and write to buffer
    const workbook: XLSX.WorkBook = { Sheets: { 'Warehouses': worksheet }, SheetNames: ['Warehouses'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'warehouses');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, `${fileName}.xlsx`);
  }
}
