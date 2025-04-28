import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthTokenInterceptor } from './auth/auth.interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import * as loginEffects from './pages/login/Store/login.effects';
import { loginFeatureKey, loginReducer } from './pages/login/Store/login.reducer';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import * as CurrentUserEffects  from './data/current-user.store/current-user.effects';
import { CurrentUserFeatureKey, CurrentUserReducer } from './data/current-user.store/current-user.reducer';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthTokenInterceptor])),
    provideStore({router:routerReducer}),
    provideState(loginFeatureKey, loginReducer),
    provideState(CurrentUserFeatureKey, CurrentUserReducer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(loginEffects, CurrentUserEffects),
    provideRouterStore()
],
};
