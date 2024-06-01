import { Item } from "./item";

export class Warehouse {
  constructor(
    public id: number = 0,
    public name: string = '',
    public description: string = '',
    public createdBy: string = '',
    public createdOn: string = '',
    public items: Item[] = []
  ) {}
}
