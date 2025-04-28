import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Profile } from "../interfces/profile.interface";
import { inject } from "@angular/core";

import { Store } from "@ngrx/store";
import { selectMe } from "./current-user.reducer";
import { CurrentUserActions } from "./current-user.actions";
import { first, tap } from "rxjs";

export const CurrentUserResolver: ResolveFn<Profile> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
    const store=inject(Store)
    let me:Profile|null=null
        store.select(selectMe).subscribe(v=>me=v)
    console.log("STORE", me);
    
    if (me!==null) {
        return me
    }

    return store.pipe(tap(() => store.dispatch(CurrentUserActions.getMe())),
    first()); 
}