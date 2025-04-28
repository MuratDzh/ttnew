import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SvgDirective } from '../../helpers/directives/svg.directive';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubscriberCardComponent } from '../subscriber-card/subscriber-card.component';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interfces/profile.interface';
import { Observable, Subscription } from 'rxjs';
import { ImgPipe } from '../../helpers/pipes/img.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgDirective,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    SubscriberCardComponent,
    ImgPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy {
  me?: Profile;

  meSubscription?: Subscription;
  menuItems = [
    {
      lebel: 'Моя страница',
      icon: 'home',
      link: '/profile/me',
    },
    {
      lebel: 'Чаты',
      icon: 'chat',
      link: '/chats',
    },
    {
      lebel: 'Поиск',
      icon: 'search',
      link: '/search',
    },
  ];

  subscribers$?: Observable<Profile[]>;

  constructor(private service: ProfileService) {}

  ngOnInit(): void {
    this.subscribers$ = this.service.getSubscribersShortList(3);
    this.meSubscription = this.service.getMe().subscribe((v) => (this.me = v));
  }

  ngOnDestroy(): void {
    this.meSubscription?.unsubscribe();
  }
}
