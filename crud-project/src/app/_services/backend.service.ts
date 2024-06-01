import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import {StorageService} from "./storage.service";
import {Warehouse} from "../model/warehouse";
import {SupplyDocument} from "../model/supplyDocument";

const API_URL = 'http://localhost:8080/api/v1/test/';
const API_URL_WAREHOUSE = 'http://localhost:8080/api/v1/warehouse/';
const API_URL_DOCUMENT = 'http://localhost:8080/api/v1/document/';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient ,
              private localStorageService : StorageService) {}

  public buildSecuredHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.localStorageService.getUser().tokenType + " " + this.localStorageService.getUser().accessToken,
    });
  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getWarehouse(): Observable<any> {
     return this.http.get(API_URL_WAREHOUSE,  { headers: this.buildSecuredHeader()});
  }

  addWarehouse(warehouse : Warehouse): Observable<any> {
    return this.http.post(API_URL_WAREHOUSE,  JSON.stringify(warehouse) , { headers: this.buildSecuredHeader()});
  }

  getWarehouseId(id : number):Observable<Warehouse>{
    return this.http.get<Warehouse>(API_URL_WAREHOUSE  + id , { headers: this.buildSecuredHeader()});
  }

  updateWarehouse(id : number , warehouse : Warehouse): Observable<Warehouse>{
    return this.http.put<Warehouse>(API_URL_WAREHOUSE  + id , warehouse , { headers: this.buildSecuredHeader()});
  }

  deleteWarehouse(id: number| undefined):Observable<any>{
    return this.http.delete(API_URL_WAREHOUSE + id , { headers: this.buildSecuredHeader() , responseType: 'text'});
  }

  deleteWarehouseByIds(selectedWarehouseIds: number[]) {
    const req = new HttpRequest('DELETE', API_URL_WAREHOUSE, selectedWarehouseIds, {
      headers: this.buildSecuredHeader(),
      responseType: 'text'
    });
    return this.http.request(req);  }

  getDocument(): Observable<any> {
    return this.http.get(API_URL_DOCUMENT,  { headers: this.buildSecuredHeader()});
  }

  addDocument(document : SupplyDocument): Observable<SupplyDocument> {
    return this.http.post<SupplyDocument>(API_URL_DOCUMENT,  JSON.stringify(document) , { headers: this.buildSecuredHeader()});
  }

  getDocumentId(id : number):Observable<SupplyDocument>{
    return this.http.get<SupplyDocument>(API_URL_DOCUMENT  + id , { headers: this.buildSecuredHeader()});
  }

  updateDocument(id : number , document : SupplyDocument): Observable<SupplyDocument>{
    return this.http.put<SupplyDocument>(API_URL_DOCUMENT  + id , document , { headers: this.buildSecuredHeader()});
  }

  deleteDocument(id: number| undefined):Observable<any>{
    return this.http.delete(API_URL_DOCUMENT + id , { headers: this.buildSecuredHeader() , responseType: 'text'});
  }

  deleteDocumentsByIds(selectedDocumentIds: number[]) {
    const req = new HttpRequest('DELETE', API_URL_DOCUMENT, selectedDocumentIds, {
      headers: this.buildSecuredHeader(),
      responseType: 'text'
    });
    return this.http.request(req);  }

}
