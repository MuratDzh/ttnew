import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { concat, Observable, of } from "rxjs";
import { Profile } from "../../../../../libs/interfaces/src";
import { inject } from "@angular/core";
import { CurrentUserActions, getSubscribersActions, ProfileActions, ProfileService } from "../../../../../libs/shared/src";
import { Store } from "@ngrx/store";

export const TestResolver: ResolveFn<Observable<void>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const profileService = inject(ProfileService)
    const store=inject(Store)
    
    // let me$: Observable<Profile> = profileService.getMe()
    let me$ = of(store.dispatch(CurrentUserActions.getMe()))
    let sub$ = of(
      store.dispatch(
        getSubscribersActions.getSubscribers({
          id: route.paramMap.get('id') as string,
        })
      )
    );
    let currentProfile$=of(store.dispatch(ProfileActions.loadProfile({id:route.paramMap.get("id") as string})))
    return concat(me$, currentProfile$, sub$)
}