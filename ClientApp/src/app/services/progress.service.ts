import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProgressService {
  uploadProgress: Subject<any> = new Subject();
  downloadProgress: Subject<any> = new Subject();
}
