import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { CommonModule } from '@angular/common';
import { map, Observable, tap } from 'rxjs';
import { Profile } from '../../data/interfces/profile.interface';
import { ProfileService } from '../../data/services/profile.service';
import {
  ProfileFilterComponent,
  SearchForm,
} from './profile-filter/profile-filter.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ProfileCardComponent, CommonModule, ProfileFilterComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  acc$!: Observable<Profile[]>;

  constructor(
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.acc$ = this.profileService.getAccounts({}).pipe(map((v) => v.items));
  }
}
