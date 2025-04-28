import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { SvgDirective } from '../../../helpers/directives/svg.directive';
import { ProfileService } from '../../../data/services/profile.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  exhaustMap,
  map,
  Observable,
  skip,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { Subscribers } from '../../../data/interfces/subscribers.interfase';
import { Profile } from '../../../data/interfces/profile.interface';
import { CommonModule } from '@angular/common';

export interface SearchForm {
  firstName: string;
  lastName: string;
  city: string | null;
  stack: string;
}

@Component({
  selector: 'app-profile-filter',
  standalone: true,
  imports: [SvgDirective, ReactiveFormsModule, CommonModule],
  templateUrl: './profile-filter.component.html',
  styleUrl: './profile-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFilterComponent implements OnInit {
  accounts$!: Observable<Profile[]>;

  ac!: Subscribers<Profile>;

  constructor(
    private ps: ProfileService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  form = this.fb.group<SearchForm>({
    firstName: '',
    lastName: '',
    city: '',
    stack: '',
  });

  ngOnInit(): void {
    this.accounts$ = this.form.valueChanges
      .pipe(
        skip(1),
        tap((v) => this.cdr.markForCheck()),
        switchMap((v) => {
          console.log(v);

          return this.ps.getAccounts(v);
        })
      )
      .pipe(
        map((v) => {
          return v.items;
        })
      );
    //  this.accounts$ = this.form.valueChanges
    //    .pipe(
    //      skip(1),
    //      startWith(() => {
    //        this.accounts$ = this.ps.getAccounts({}).pipe(map((v) => v.items));
    //        this.cdr.markForCheck();
    //      }),
    //      switchMap((v) => {
    //        console.log(v);
    //        return this.ps.getAccounts(v)
    //      })
    //    )
    //    .pipe(
    //      map((v) => {
    //        return v.items;
    //      }),

    //    );
  }

  toSearch() {}
}
