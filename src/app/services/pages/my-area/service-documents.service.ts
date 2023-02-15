import { HttpHrmService } from './../../http/http-hrm.service';
import { ApiService } from './../../../common/services/api/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceDocumentsService {

  constructor(
    private http: HttpHrmService,
    private api: ApiService,
  ) { }

  /**
   * Get documents from API
   * @param void
   * @returns Promise<any>
   */
  async getDocuments(dataTablesParameters: any): Promise<any> {
    return await this.http.post(this.api.myArea.getServiceDocuments, dataTablesParameters, false);
  }

  /**
   * Get all documents from API
   * @param void
   * @returns Promise<any>
   */
   async getDocumentsUnfiltered(): Promise<any> {
    return await this.http.get(this.api.myArea.ServiceDocuments, false);
  }

  /**
   * New documents with specified permissions
   * @param void
   * @returns Promise<any>
   */
   async newDocument(data: any): Promise<any> {
    return await this.http.post(this.api.myArea.ServiceDocuments, data, true);
  }

  /**
   * Update documents with specified permissions
   * @param DocumentId id
   * @param data data
   * @returns Promise<any>
   */
   async updateDocument(id:string, data: any): Promise<any> {
    return await this.http.put(this.api.myArea.ServiceDocuments, id, data, true);
  }

  /**
   * Delete Document of specified ID from API
   * @param DocumentId id
   * @returns Promise<any>
   */
   async deleteDocument(id: string): Promise<any> {
    return await this.http.delete(this.api.myArea.ServiceDocuments, id, true);
  }
}
