import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Chart, ChartConfiguration, ChartData, ChartDataset, ChartTypeRegistry, registerables} from 'chart.js'
import { ChartService } from './chart.service';
import { VideoStatisticsSimpleModel } from '../models/video-statistics-simple.model';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @ViewChild("dateFromRenderChart") dateFrom!: ElementRef;
  @ViewChild("dateToRenderChart") dateTo!: ElementRef;
  lineChartLikes:Chart | null = null;
  lineChartViews:Chart | null = null;
  lineChartComment:Chart | null = null;
  lineChartFavoriteCount:Chart | null = null;

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.chartService.getVideoListData();
  }

  renderCharts(){
    this.renderChartLikes();
    this.renderChartViews();
    this.renderChartComment();
    this.renderChartFavorites();
  }

  private renderChartLikes() {
    this.lineChartLikes?.destroy();

    let uniqueVideosId = this.getListUniqueVideosIds();

    let datasets: ChartDataset[] = [];
    uniqueVideosId.forEach((value, index, array) => {
      let oneVideo = this.chartService.videoListData.filter(x => this.filterByVideoId(x, uniqueVideosId[index])).filter(x => this.filterByDate(x));
      let randomColor = Math.floor(Math.random() * 16777215).toString(16);

      datasets.push({
        label: oneVideo[0].title,
        data: oneVideo.map(x => Number(x.statistics.likeCount)),
        fill: false,
        borderColor: "#" + randomColor,
        tension: 0.1,
        backgroundColor: "#" + randomColor
      });
    });

    const labels = this.getLabelsForChart();

    this.lineChartLikes = new Chart("lineChartLikes", {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Likes count of videos"
          }
        }
      }
    });
  }

  private renderChartViews() {
    this.lineChartViews?.destroy();

    let uniqueVideosId = this.getListUniqueVideosIds();

    let datasets: ChartDataset[] = [];
    uniqueVideosId.forEach((value, index, array) => {
      let oneVideo = this.chartService.videoListData.filter(x => this.filterByVideoId(x, uniqueVideosId[index])).filter(x => this.filterByDate(x));
      let randomColor = Math.floor(Math.random() * 16777215).toString(16);

      datasets.push({
        label: oneVideo[0].title,
        data: oneVideo.map(x => Number(x.statistics.viewCount)),
        fill: false,
        borderColor: "#" + randomColor,
        tension: 0.1,
        backgroundColor: "#" + randomColor
      });
    });

    const labels = this.getLabelsForChart();

    this.lineChartLikes = new Chart("lineChartViews", {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Views count of videos"
          }
        }
      }
    });
  }


  private renderChartComment() {
    this.lineChartComment?.destroy();

    let uniqueVideosId = this.getListUniqueVideosIds();

    let datasets: ChartDataset[] = [];
    uniqueVideosId.forEach((value, index, array) => {
      let oneVideo = this.chartService.videoListData.filter(x => this.filterByVideoId(x, uniqueVideosId[index])).filter(x => this.filterByDate(x));
      let randomColor = Math.floor(Math.random() * 16777215).toString(16);

      datasets.push({
        label: oneVideo[0].title,
        data: oneVideo.map(x => Number(x.statistics.commentCount)),
        fill: false,
        borderColor: "#" + randomColor,
        tension: 0.1,
        backgroundColor: "#" + randomColor
      });
    });

    const labels = this.getLabelsForChart();

    this.lineChartLikes = new Chart("lineChartComment", {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Comment count of videos"
          }
        }
      }
    });
  }


  private renderChartFavorites() {
    this.lineChartFavoriteCount?.destroy();

    let uniqueVideosId = this.getListUniqueVideosIds();

    let datasets: ChartDataset[] = [];
    uniqueVideosId.forEach((value, index, array) => {
      let oneVideo = this.chartService.videoListData.filter(x => this.filterByVideoId(x, uniqueVideosId[index])).filter(x => this.filterByDate(x));
      let randomColor = Math.floor(Math.random() * 16777215).toString(16);

      datasets.push({
        label: oneVideo[0].title,
        data: oneVideo.map(x => Number(x.statistics.favoriteCount)),
        fill: false,
        borderColor: "#" + randomColor,
        tension: 0.1,
        backgroundColor: "#" + randomColor
      });
    });

    const labels = this.getLabelsForChart();

    this.lineChartLikes = new Chart("lineChartFavoriteCount", {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Favorite count of videos"
          }
        }
      }
    });
  }

  private getLabelsForChart() {
    return this.chartService.videoListData.filter(x =>this.filterByVideoId(x, this.getListUniqueVideosIds()[0])).filter(x => this.filterByDate(x)).map(x => this.formatDate(new Date(x.Timestamp)));
  }

  private filterByVideoId(x:VideoStatisticsSimpleModel, videoId:string):boolean{
    return x.videoId == videoId;
  }

  private filterByDate(x:VideoStatisticsSimpleModel):boolean{
    let timestampDate = new Date(x.Timestamp);
      let result = true;
      if(this.dateFrom.nativeElement.value){
        let dateFromValue = new Date(this.dateFrom.nativeElement.value);
        result = result && (dateFromValue <= timestampDate);
      }

      if(this.dateTo.nativeElement.value){
        let dateToValue = new Date(this.dateTo.nativeElement.value);
        result = result && (dateToValue >= timestampDate);
      }

      return result;
  }

  private getListUniqueVideosIds() {
    return this.chartService.videoListData.map(x => x.videoId).filter((value, index, array) => array.indexOf(value) === index);
  }

  fectchDataFromAzure(){
    this.chartService.getVideoListData();
  }

  padTo2Digits(num:number) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

}
