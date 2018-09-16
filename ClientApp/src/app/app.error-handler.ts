import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    constructor(
        private ngZone: NgZone,
        private injector: Injector) { }

    handleError(error: any): void {
        this.ngZone.run(() => {
            const toastrService = this.injector.get(ToastrService);
            toastrService.error('An unexpected error happened.', 'Error', { timeOut: 5000 });
        });
    }
}
