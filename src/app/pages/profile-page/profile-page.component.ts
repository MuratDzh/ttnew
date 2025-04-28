import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { Profile } from '../../data/interfces/profile.interface';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImgPipe } from '../../helpers/pipes/img.pipe';
import { PostFeedComponent } from './post-feed/post-feed.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    ImgPipe,
    CommonModule,
    RouterLink,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent implements OnInit {
  profile$?: Observable<Profile>;
  subscribers$?: Observable<Profile[]>;

  constructor(
    private profService: ProfileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //  this.profile$=this.route.params.pipe(switchMap(
    //   ({id})=> this.profService.getProfile(id)
    // ))

    this.profile$ = this.route.params.pipe(
      switchMap((v) => this.profService.getProfile(v['id']))
    );

    this.subscribers$ = this.profService.getSubscribersShortList(6);
  }
}
