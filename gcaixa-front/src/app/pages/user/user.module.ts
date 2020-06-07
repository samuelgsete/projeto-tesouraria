import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from 'src/app/app.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { VerifyComponent } from './create-user/verify/verify.component';
import { UserService } from 'src/app/shared/services/user.service';

@NgModule({
  declarations: [CreateUserComponent, VerifyComponent],
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  exports:[CreateUserComponent],
  providers: [UserService]
})
export class UserModule { }
