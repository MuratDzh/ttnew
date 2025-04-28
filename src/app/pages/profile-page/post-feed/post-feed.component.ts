import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PostInputComponent } from '../post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import { PostService } from '../../../data/services/post.service';
import { firstValueFrom, Observable, Subscription, switchMap, tap } from 'rxjs';
import { Profile } from '../../../data/interfces/profile.interface';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CommentInt,
  CommentUpdate,
  Post,
  PostRes,
  CommentsRes,
} from '../../../data/interfces/post.interface.ts';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';
import { ProfileService } from '../../../data/services/profile.service';

export interface PostFormValue {
  title: string;
  content: string;
}

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [
    PostInputComponent,
    PostComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CommentComponent,
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeedComponent implements OnDestroy, OnChanges, OnInit {
  posts$!: Observable<PostRes[]>;
  subsription$!: Subscription;

  updatedPost?: PostRes;

  _profile!: Profile;
  me!: number;

  updatedComText = '';
  updatedComment?: CommentsRes;
  updatedComId = 0;
  isUpCom = false;

  get profile(): Profile {
    // console.log('GET', this._profile);
    return this._profile;
  }

  @Input()
  set profile(v: Profile) {
    // console.log('SET',v);
    this._profile = v;
    // this.posts$ = this.postServ.getPosts(this.profile.id).pipe(
    //   switchMap(() => {
    //     return this.postServ.posts$;
    //   })
    // );
    // this.cdr.markForCheck();
  }

  form = this.fb.group<PostFormValue>({
    title: '',
    content: '',
  });

  constructor(
    private postServ: PostService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private profServ: ProfileService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
    this.posts$ = this.postServ.getPosts(this.profile.id).pipe(
      switchMap(() => {
        return this.postServ.posts$.pipe(
          tap((v) => console.log('ngOnChanges', v))
        );
      })
    );
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.profServ.getMe().subscribe((v) => (this.me = v.id));
  }

  toCreatePost(formValue: PostFormValue) {
    let authorId = this.profile.id;
    let post: Post = {
      ...formValue,
      authorId,
    };
    if (this.updatedPost) {
      console.log('HHHHH');

      firstValueFrom(
        this.postServ.updatePost(post, this.updatedPost.id).pipe(
          tap(() => {
            setTimeout(() => {
              (this.updatedPost = undefined), this.cdr.markForCheck();
            }, 0);
          })
        )
      );
    } else {
      firstValueFrom(this.postServ.createPost(post));
    }
  }

  getPostFromChild(post: PostFormValue) {
    console.log(post);

    this.toCreatePost(post);
  }

  toUpdate(post: PostRes) {
    // this.updatedPost$ = this.postServ.getPostById(
    //   post.id
    // ) as Observable<PostRes>;
    this.postServ.getPostById(post.id).subscribe((v) => {
      setTimeout(() => {
        this.updatedPost = v;
        console.log('this.updatedPost', this.updatedPost),
          this.cdr.markForCheck();
      }, 0);
    });
  }

  toDel(post: PostRes) {
    // this.postServ.getPostById(post.id);
    this.postServ.delPost(post).subscribe();
  }

  onDelCom(i: number, postId: number) {
    this.postServ.delComment(i, postId, this.profile.id).subscribe();
  }
  onUpdateCom(i: number, postId: number) {
    this.postServ.getComment(i, postId).subscribe((v) =>
      setTimeout(() => {
        console.log('111', v);
        (this.updatedComText = v.text),
          (this.updatedComId = v.id),
          (this.updatedComment = v);
        this.isUpCom = true;
        this.cdr.markForCheck();
      }, 0)
    );
  }

  createCom(text: string, post: PostRes) {
    if (this.isUpCom) {
      let v = {
        text,
        commentId: this.updatedComId,
        authorId: post.author.id,
        // postId: post.id,
      };
      firstValueFrom(this.postServ.updateComment(v));
      this.isUpCom = false;
      this.updatedComment = undefined;
    } else {
      let v: CommentInt = {
        text,
        commentId: this.updatedComId,
        authorId: post.author.id,
        postId: post.id,
      };
      firstValueFrom(this.postServ.createComment(v));
    }
  }

  ngOnDestroy(): void {
    this.subsription$?.unsubscribe();
  }
}
