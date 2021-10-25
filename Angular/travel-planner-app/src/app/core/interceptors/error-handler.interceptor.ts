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

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        const snackbarSettings: MatSnackBarConfig = {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-warn'],
          duration: 5000,
        };

        if (error.error instanceof ErrorEvent) {
          errorMsg = `Client error: ${error.error.message}`;
          this.snackBar.open(errorMsg, undefined, snackbarSettings);
        } else {
          errorMsg = `Error Code: ${error.status};\nMessage: ${error.message}`;
          this.snackBar.openFromComponent(NotificationComponent, {
            ...snackbarSettings,
            data: {
              firstLine: 'Server error!',
              secondLine: `${error.status} ${error.statusText}`,
            },
          });
        }

        return throwError(errorMsg);
      })
    );
  }
}

@Component({
  template: '{{ data.firstLine }} <br> {{ data.secondLine }}',
})
class NotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
