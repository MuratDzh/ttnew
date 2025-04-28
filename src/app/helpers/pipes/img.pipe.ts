import { Pipe, PipeTransform } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';

@Pipe({
  name: 'img',
  standalone: true
})
export class ImgPipe implements PipeTransform {

  constructor(private service: ProfileService){}

  transform(value: string | null): string|null {
    if (value === null) return null;
   const url=this.service.url+value
    return url;
  }

}
