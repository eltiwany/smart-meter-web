import { FunctionsService } from './../../../../services/extras/functions.service';
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.css']
})
export class ColumnChartComponent implements OnInit {
  @Input() columns: any[] = [];
  @Input() sensor: any;

  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> | any;

  constructor(
    private fn: FunctionsService
  ) {}

  ngOnInit(): void {
    this.chartOptions = {
      series: this.columns,
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
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
      fill: {
        opacity: 1
      },
    };
  }

}
