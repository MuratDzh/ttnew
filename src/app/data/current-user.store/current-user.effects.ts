import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CurrentUserActions } from "./current-user.actions";
import { ProfileService } from "../services/profile.service";
import { catchError, map, of, switchMap, tap } from "rxjs";

export const CurrentUserEffects = createEffect(
    (actions$ = inject(Actions),
    profileService=inject(ProfileService)) => {
        return actions$.pipe(
            ofType(CurrentUserActions.getMe),
            tap(()=>console.log('1')),
            switchMap(() => {
                return profileService.getMe()
            }),
            map((v) => {
                console.log("V",v);
                
                return CurrentUserActions.getMeSuccess({me:v})
            }),
            catchError(()=>of(CurrentUserActions.getMeSuccess))
        )
    },
    { functional: true }
)