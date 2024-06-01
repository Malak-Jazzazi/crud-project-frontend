import {Component,  OnInit} from '@angular/core';
import {BackendService} from "../../_services/backend.service";
import {Router} from "@angular/router";
import {SupplyDocument} from "../../model/supplyDocument";
import {StorageService} from "../../_services/storage.service";
@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit {
  supplyDocuments: SupplyDocument[] = [];
  selectedDocumentsIds: number[] = [];
  deleteMode : boolean = false;
  private roles: string[] = [];
  showManagerView = false;
  showEmployeeView = false;
  constructor(private backendService: BackendService,
              private storageService:StorageService,
              private router: Router ) {
  }
  ngOnInit(): void {
    this.getDocumentList();

    const user = this.storageService.getUser();
    this.roles = user.roles;

    this.showManagerView = this.roles.includes('ROLE_MANAGER');
    this.showEmployeeView = this.roles.includes('ROLE_EMPLOYEE');
  }

  private getDocumentList() {
    return this.backendService.getDocument().subscribe(data => {
      this.supplyDocuments = data

    })
  }

  updateDocument(id: number | undefined) {
    this.router.navigate(['document/document-update', id]);
  }

  documentDetails(id: number | undefined) {
    this.router.navigate(['document/document-view', id]);
  }

  deleteDocument(id: number | undefined) {
    this.backendService.deleteDocument(id).subscribe(data => {
      this.getDocumentList();
    })
  }

  ViewDocumentDetails(id: number | undefined) {
    this.documentDetails(id);
  }


  onCheckboxChange(event: any, documentId: number | undefined) {
    if (typeof documentId === "number") {
      if (event.checked) {
        this.selectedDocumentsIds.push(documentId);

      } else {
        const index = this.selectedDocumentsIds.indexOf(documentId);
        if (index > -1) {
          this.selectedDocumentsIds.splice(index, 1);
        }
      }
    }
  }

  addDocument() {
    this.router.navigate(['document/document-add']);
  }

  deleteDocuments() {
    if(this.deleteMode){
      this.backendService.deleteDocumentsByIds(this.selectedDocumentsIds).subscribe(data => {
        this.getDocumentList();
      })
    }
    this.deleteMode = !this.deleteMode

  }

  approveDocument(document: SupplyDocument) {
    document.status = 'APPROVED'
    this.backendService.updateDocument(document.id , document).subscribe(data =>{
        this.getDocumentList();
      } ,
      error => console.log(error ));
  }

  declineDocument(document: SupplyDocument) {
    document.status = 'DECLINED'
    this.backendService.updateDocument(document.id , document).subscribe(data =>{
        this.getDocumentList();
      } ,
      error => console.log(error ));

  }
}
