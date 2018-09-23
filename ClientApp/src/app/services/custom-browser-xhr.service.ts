import { Injectable } from '@angular/core';
import { ProgressService } from './progress.service';
import { BrowserXhr } from '@angular/http';

@Injectable()
export class CustomBrowserXhrService extends BrowserXhr {

  constructor(private service: ProgressService) { super(); }

  build(): XMLHttpRequest {
    const xhr: XMLHttpRequest = super.build();

    xhr.onprogress = event => this.service.downloadProgress.next(this.createProgress(event));
    xhr.upload.onprogress = event => this.service.uploadProgress.next(this.createProgress(event));

    return xhr;
  }

  private createProgress(event) {
    return {
      total: event.total,
      percentage: Math.round(event.loaded / event.total * 100)
    };
  }

}
