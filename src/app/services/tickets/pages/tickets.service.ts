import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common/services/api/api.service';
import { HttpHrmService } from '../../http/http-hrm.service';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(
    private http: HttpHrmService,
    private api: ApiService,
  ) { }

  /**
   * Get tickets for datatable from API
   * @param void
   * @returns Promise<any>
   */
  async getTickets(dataTablesParameters: any): Promise<any> {
    return await this.http.post(this.api.tickets.getTickets, dataTablesParameters, false);
  }

  /**
   * Get tickets for datatable from API
   * @param void
   * @returns Promise<any>
   */
  async getTicketThread(ticketId: number): Promise<any> {
    return await this.http.get(this.api.tickets.getTicketThread + `/${ticketId}`, false);
  }

  /**
   * Get tickets from API
   * @param void
   * @returns Promise<any>
   */
   async getTicketsUnfiltered(): Promise<any> {
    return await this.http.get(this.api.tickets.tickets, false);
  }

  /**
   * New user from API
   * @param void
   * @returns Promise<any>
   */
   async newTicket(data: any): Promise<any> {
    return await this.http.post(this.api.tickets.tickets, data, true);
  }

  /**
   * Update user from API
   * @param void
   * @returns Promise<any>
   */
   async updateTicket(id:string, data: any): Promise<any> {
    return await this.http.put(this.api.tickets.tickets, id, data, true);
  }

  /**
   * Delete user from API
   * @param void
   * @returns Promise<any>
   */
   async deleteTicket(id:string): Promise<any> {
    return await this.http.delete(this.api.tickets.tickets, id, true);
  }
}
