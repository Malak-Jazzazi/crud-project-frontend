import { Warehouse } from "./warehouse";
import { Item } from "./item";

export class SupplyDocument {
  constructor(
    public id : number = 0,
    public supplyDocumentName: string = '',
    public supplyDocumentSubject: string = '',
    public status: string = '',
    public createdBy: string = '',
    public createdOn: string | null = '',
    public warehouse: Warehouse | undefined = new Warehouse(),
    public item: Item | undefined = new Item()
  ) {}
}
