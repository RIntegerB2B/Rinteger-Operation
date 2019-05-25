import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavheaderComponent } from './navheader/navheader.component';
import { SharedRoutingModule } from './shared-routing.module';
import { HttpModule } from '@angular/http';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
@NgModule({
  declarations: [NavheaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedRoutingModule
  ],
  exports: [NavheaderComponent],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
],
})
export class SharedModuleModule { }
