import { ApiService } from './../../../common/services/api/api.service';
import { HttpHrmService } from './../../http/http-hrm.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SummaryReportsService {

  constructor(
    private http: HttpHrmService,
    private api: ApiService,
  ) { }

  /**
   * Get User Brief Stats
   * @param void
   * @returns Promise<any>
   */
  async getUserBriefStats(): Promise<any> {
    return await this.http.get(this.api.reports.getUserBriefStats, false);
  }

  /**
   * Get Brief Stats
   * @param void
   * @returns Promise<any>
   */
  async getBriefStats(): Promise<any> {
    return await this.http.get(this.api.reports.getBriefStats, false);
  }

  /**
   * Get Health Statuses
   * @param void
   * @returns Promise<any>
   */
  async getHealthStatus(): Promise<any> {
    return await this.http.get(this.api.reports.getHealthStatus, false);
  }

  /**
   * Get Total Losses
   * @param void
   * @returns Promise<any>
   */
  async getTotalLosses(): Promise<any> {
    return await this.http.get(this.api.reports.getTotalLosses, false);
  }

  /**
   * Get Summary for Map Rendering
   * @param void
   * @returns Promise<any>
   */
  async getMapUserSummary(): Promise<any> {
    return await this.http.get(this.api.reports.getMapUserSummary, false);
  }
}
