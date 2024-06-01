import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BackendService} from "../../_services/backend.service";
import {SupplyDocument} from "../../model/supplyDocument";

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrl: './document-view.component.css'
})
export class DocumentViewComponent implements OnInit{

  id : number =0;
  supplyDocument : SupplyDocument = new SupplyDocument();

  constructor(private backendService: BackendService ,
              private route:ActivatedRoute ,
              private router:Router) {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.backendService.getDocumentId(this.id).subscribe(data =>{
      this.supplyDocument = data;
      console.log(data)
    }, error => console.log(error));
  }

  goToWarehouseList() {
    this.router.navigate(["document"])
  }
}
