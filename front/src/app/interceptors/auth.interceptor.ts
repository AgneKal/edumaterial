import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };

@Injectable()
export class authInterceptor implements HttpInterceptor{
  constructor (private authService:AuthService){
   
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.user!=null && this.authService.user.token!=null){
      let newReq=req.clone({
        headers:req.headers.append("auth",this.authService.user.token)
      });
      return next.handle(newReq);
 
    }
   
    return next.handle(req);
  }
}