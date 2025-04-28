import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SvgDirective } from '../../helpers/directives/svg.directive';
import { Profile } from '../../data/interfces/profile.interface';
import { ImgPipe } from '../../helpers/pipes/img.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [SvgDirective, ImgPipe],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeaderComponent {
  @Input()
  profile?: Profile;

  constructor(private router: Router) {}

  toSettings() {
    this.router.navigateByUrl('settings');
  }
  toSendMessage(id: number) {
    this.router.navigate(['chats', id]);
  }
}
