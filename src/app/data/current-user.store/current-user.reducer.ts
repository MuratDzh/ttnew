import { createFeature, createReducer, on } from "@ngrx/store"
import { CurrentUserActions } from "./current-user.actions"
import { Profile } from "../interfces/profile.interface"
import { CurrentUserStateInterface } from "./current-user.state.interfase"

const CurrentUserInitialState: CurrentUserStateInterface = {
    me:null
}

const CurrentUserFeature = createFeature({
    name: "CurrentUserInitialState",
    reducer: createReducer(
        CurrentUserInitialState,
        on(CurrentUserActions.getMeSuccess, (state, action) => ({
           
                ...state,
                me: action.me
            
        }))
    )
})

export const {name: CurrentUserFeatureKey, reducer: CurrentUserReducer, selectMe} = CurrentUserFeature