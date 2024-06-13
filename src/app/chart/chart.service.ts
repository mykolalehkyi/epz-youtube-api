import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AzureBlobStorageService } from './azure-blob-storage.service';
import { VideoStatisticsSimpleModel } from '../models/video-statistics-simple.model';

@Injectable({ providedIn: 'root' })
export class ChartService {
  videoListData: VideoStatisticsSimpleModel[] = [];

  constructor(
    private azureBlobStorageService: AzureBlobStorageService,
    private httpClient: HttpClient
  ) {}

  public getVideoListData() {
    this.azureBlobStorageService.getVideoListJson('videolist.json', (blob) => {
      console.log(blob);
      blob.text().then((value) => {
        this.videoListData = JSON.parse(decodeURIComponent(value));
        console.log(this.videoListData);
      });
    });
  }
}
