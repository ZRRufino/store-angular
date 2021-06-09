import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
	UrlTree,
	Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from "@core/services/auth/auth.service";

@Injectable({
	providedIn: 'root'
})
export class AdminGuard implements CanActivate {

	constructor(
		private authService: AuthService,
		private router: Router
	) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.authService
			.hasUser()
			.pipe(
				map(user => {
					if (!user) {
						this.router.navigate(['auth/login']);
					}
					return !!user
				})
			);
	}

}
