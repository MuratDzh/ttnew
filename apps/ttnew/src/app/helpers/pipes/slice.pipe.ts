import { Pipe, PipeTransform } from '@angular/core';
import { Profile } from '../../data/interfces/profile.interface';

@Pipe({
  name: 'subscribersSlice',
  standalone: true,
})
export class SlicePipe implements PipeTransform {
  transform(value: Profile[] | null, args: number): any {
    if (value !== null) {
      return value.slice(0, args);
    }
  }
}
