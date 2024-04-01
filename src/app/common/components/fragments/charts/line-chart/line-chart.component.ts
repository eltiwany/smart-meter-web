import { FunctionsService } from './../../../../services/extras/functions.service';
import { Component, ViewChild, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input() columns: any[] = [];
  @Input() sensor: any;

  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> | any;

  constructor(
    private fn: FunctionsService
  ) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions = {
      series: this.columns,
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: true
        }
      },

      // grid: {
      //   borderColor: '#1F2937',
      //   strokeDashArray: 7,
      //   xaxis: {
      //     lines: {
      //       show: true
      //     }
      //   },
      //   yaxis: {
      //     lines: {
      //       show: true
      //     }
      //   }
      // },

      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Line Chart of " + this.fn.getColumnNames(this.columns),
        align: "left"
      },
      markers: {
        size: 1
      },
      xaxis: {
        title: {
          text: "x-axis [Time (t)]"
        },

        axisBorder: {
          show: true,
          color: '#1F2937',
          height: 1,
          width: '100%',
          offsetX: 0,
          offsetY: 0
        },

        axisTicks: {
          show: true,
          borderType: 'solid',
          color: '#1F2937',
          height: 6,
          width: '100%',
          offsetX: 0,
          offsetY: 0
        }

      },
      yaxis: {
        title: {
          text: `y-axis [${this.fn.getColumnNames(this.columns)}]`
        },

        axisBorder: {
          show: true,
          color: '#1F2937',
          // height: 1,
          // width: '100%',
          offsetX: 0,
          offsetY: 0
        },

        axisTicks: {
          show: true,
          borderType: 'solid',
          color: '#1F2937',
          // height: 3,
          width: 6,
          offsetX: 0,
          offsetY: 0
        }
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };

  }

}
