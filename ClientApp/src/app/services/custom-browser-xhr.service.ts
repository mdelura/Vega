import { Injectable } from '@angular/core';
import { ProgressService } from './progress.service';
import { BrowserXhr } from '@angular/http';

@Injectable()
export class CustomBrowserXhrService extends BrowserXhr {

  constructor(private service: ProgressService) { super(); }

  build(): XMLHttpRequest {
    const xhr: XMLHttpRequest = super.build();

    xhr.upload.onprogress = event => this.service.notify(this.createProgress(event));
    xhr.upload.onloadend = () => this.service.endTracking();

    return xhr;
  }

  private createProgress(event) {
    return {
      total: event.total,
      percentage: Math.round(event.loaded / event.total * 100)
    };
  }

}
