import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { ConfirmAccountComponent } from './create-user/confirm-account/confirm-account.component';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthUserComponent } from './auth-user/auth-user.component';

@NgModule({
  declarations: [
    CreateUserComponent, 
    AuthUserComponent, 
    ConfirmAccountComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
  ],
  exports:[CreateUserComponent],
  providers: [UserService]
})
export class UserModule { }
