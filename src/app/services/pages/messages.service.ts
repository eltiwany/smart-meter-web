import { ApiService } from './../../common/services/api/api.service';
import { HttpHrmService } from './../http/http-hrm.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private http: HttpHrmService,
    private api: ApiService,
  ) { }

  /**
   * Get messages for datatable from API
   * @param void
   * @returns Promise<any>
   */
  async getMessages(dataTablesParameters: any): Promise<any> {
    return await this.http.post(this.api.messages.getMessages, dataTablesParameters, false);
  }

  /**
   * Get messages from API
   * @param void
   * @returns Promise<any>
   */
   async getMessagesUnfiltered(): Promise<any> {
    return await this.http.get(this.api.messages.messages, false);
  }
}
