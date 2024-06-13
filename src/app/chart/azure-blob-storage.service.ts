import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';

@Injectable({ providedIn: 'root' })
export class AzureBlobStorageService {
  accountName = 'labepza9c6';
  containerName = 'youtube-data-json';

  constructor(private httpClient: HttpClient) {}

  public async getVideoListJson(name: string, handler:(blob: Blob) => void) {
    const blobClient = this.containerClient().getBlobClient(name);
    blobClient.download().then(resp => {
      resp.blobBody?.then(blob => {
        handler(blob)
      })
    })
  }

  public containerClient() {
    return new BlobServiceClient(
      `https://${this.accountName}.blob.core.windows.net/`
    ).getContainerClient(this.containerName);
  }
}
