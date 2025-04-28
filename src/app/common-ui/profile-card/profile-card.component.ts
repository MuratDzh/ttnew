import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../../data/interfces/profile.interface';
import { CommonModule } from '@angular/common';
import { ImgPipe } from '../../helpers/pipes/img.pipe';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule, ImgPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  @Input()
  profile!: Profile;
}
