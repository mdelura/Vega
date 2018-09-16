import { ErrorHandler, Injectable, Injector, NgZone, isDevMode } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as Raven from 'raven-js';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    constructor(
        private ngZone: NgZone,
        private injector: Injector) { }

    handleError(error: any): void {
        this.ngZone.run(() => {
            console.log('Should show exception...');
            const toastrService = this.injector.get(ToastrService);
            toastrService.error('An unexpected error happened.', 'Error', { timeOut: 5000 });
        });

        if (!isDevMode()) {
            Raven.captureException(error.originalError || error);
        } else {
            throw error;
        }
    }
}
