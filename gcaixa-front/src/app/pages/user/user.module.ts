import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from 'src/app/shared/services/user.service';
import { CreateUserComponent } from './create-user/create-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { routing } from 'src/app/app.routing';

@NgModule({
  declarations: [CreateUserComponent],
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  exports:[CreateUserComponent],
  providers: [UserService]
})
export class UserModule { }
