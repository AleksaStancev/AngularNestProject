import { Component, Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { MaterialComponentsConfigProviderService } from '../../services/material-components-config-provider/material-components-config-provider.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private materialComponentConfigProvider: MaterialComponentsConfigProviderService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';

        const snackbarSettings: MatSnackBarConfig =
          this.materialComponentConfigProvider.snackbarConfig([
            'mat-toolbar',
            'mat-warn',
          ]);

        if (error.error instanceof ErrorEvent) {
          errorMsg = `Client error: ${error.error.message}`;
          this.snackBar.open(errorMsg, undefined, snackbarSettings);
        } else {
          errorMsg = `Error Code: ${error.status};\nMessage: ${error.error.message}`;
          this.snackBar.openFromComponent(NotificationComponent, {
            ...snackbarSettings,
            data: {
              firstLine: 'Error!',
              secondLine: error.error.message,
            },
          });
        }

        return throwError(errorMsg);
      })
    );
  }
}

@Component({
  template:
    '<div> <span>{{data.firstLine}}</span>  <span>{{data.secondLine}} </span></div>',
  styles: ['div {display:flex; flex-direction: column; align-items:center}'],
})
class NotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
