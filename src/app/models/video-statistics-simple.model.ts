import { Statistics } from "./statistics.model";

export interface VideoStatisticsSimpleModel {
  Timestamp: string;
  statistics: Statistics;
  channelTitle: string;
  channelId: string;
  videoId: string;
  title: string;
}
