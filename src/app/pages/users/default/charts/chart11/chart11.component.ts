import { Component, ViewChild } from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexMarkers,
  ApexTooltip,
  ApexPlotOptions,
  ApexResponsive,
  ApexDataLabels,
  ApexLegend,
  ApexFill,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  grid: ApexGrid;
  markers: ApexMarkers;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  fill: ApexFill;
};
@Component({
  selector: "ngx-chart11",
  templateUrl: "./chart11.component.html",
  styleUrls: ["./chart11.component.scss"],
})
export class Chart11Component {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<any>;

  constructor() {
    this.chartOptions = {
      series: [80, 50, 35],
      labels: ["Поисковые системы", "Социальные сети", "Загрузка файлов"],
      chart: {
        type: "radialBar",
        height: 350,
      },
      title: {
        text: "Статистика интернет - соеденения",
      },
      fill: {
        colors: ["#32CD32", "#20B2AA", "#9400D3"],
      },
      stroke: {
        lineCap: "round",
      },
      plotOptions: {
        radialBar: {
          track: {
            show: true,
            dropShadow: {
              enabled: true,
              top: 0,
              left: 0,
              blur: 0,
              opacity: 0.5
            },
          },
          size: "85%",
          labels: {
            show: false,
            name: {
              show: true,
            },
            value: {
              show: true,
            },
            total: {
              show: true,
              label: "Общее время",
              fontSize: '16px',
              color: "black",
              formatter: function (w) 
              {
                return w.globals.seriesTotals.reduce((a, b, c) => 
                {return a + b + c}, 0) },
            },
          },
        },
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        show: true,
        position: "bottom",
        offsetY: -5,
        markers: {
          fillColors: ["#32CD32", "#20B2AA", "#9400D3"],
        },
      },
    };
  }
}