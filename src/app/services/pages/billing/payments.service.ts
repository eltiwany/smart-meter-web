import { ApiService } from './../../../common/services/api/api.service';
import { HttpHrmService } from './../../http/http-hrm.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
    private http: HttpHrmService,
    private api: ApiService,
  ) { }

  /**
   * Get user boards for datatable from API
   * @param void
   * @returns Promise<any>
   */
  async getPayments(dataTablesParameters: any): Promise<any> {
    return await this.http.post(this.api.billing.payments.getPayments, dataTablesParameters, false);
  }

  /**
   * Import test data
   * @param void
   * @returns Promise<any>
   */
   async importPayments(data: any): Promise<any> {
    return await this.http.post(this.api.billing.payments.payments, data, true);
  }

  /**
   * Delete Payment of specified ID from API
   * @param PaymentId id
   * @returns Promise<any>
   */
  async deletePayment(id: string): Promise<any> {
    return await this.http.delete(this.api.billing.payments.payments, id, true);
  }
}
