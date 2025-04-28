import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { CanActivateAuth } from './auth/access.guard';
import { SettingsComponent } from './pages/settings/settings.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { ChatsRoutes } from './pages/chats/chats.routes';
import { CurrentUserResolver } from './data/current-user.store/current-user.resolver';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: SearchComponent },
      { path: 'profile/:id', component: ProfilePageComponent },
      {path:'settings', component: SettingsComponent},
      { path: 'search', component: SearchComponent},
      {
        path: 'chats', 
        loadChildren: ()=>ChatsRoutes
      },
    ],
    resolve: {
      me: CurrentUserResolver
    },
    canActivate:[CanActivateAuth]
  },
  { path: 'login', component: LoginComponent },
];
