import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/modules/store/app.state';
import { logout } from 'src/app/core/modules/store/user/user.actions';
import { MaterialComponentsConfigProviderService } from 'src/app/core/services/material-components-config-provider/material-components-config-provider.service';
import { UserDeleteDialogComponent } from './user-delete-dialog/user-delete-dialog.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private materialComponentsConfigProvider: MaterialComponentsConfigProviderService
  ) {}

  ngOnInit(): void {}

  onLogout(): void {
    this.store.dispatch(logout());
  }

  onAccountUpdate(): void {
    this.dialog.open(
      UserDialogComponent,
      this.materialComponentsConfigProvider.matDialogConfig('20%')
    );
  }

  onAccountDelete(): void {
    this.dialog.open(
      UserDeleteDialogComponent,
      this.materialComponentsConfigProvider.matDialogConfig('20%')
    );
  }
}
