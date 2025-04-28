import { Profile } from './profile.interface';
export interface Subscribers<Profile> {
  items: Profile[];
  total: number;
  page: number;
  size: number;
  pages: number;
}