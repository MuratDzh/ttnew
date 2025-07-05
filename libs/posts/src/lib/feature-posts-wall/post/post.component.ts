import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges, AfterContentInit, contentChild,
} from '@angular/core';
import {
  CommentsRes,
  PostRes,
} from '../../data/interfaces/post.interface.ts.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CommentComponent} from "@tt/posts";
import {AvatarCircleComponent} from "../../../../../common-ui/src/lib/components";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule, AvatarCircleComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnChanges, AfterContentInit {
  text = '';

  constructor(private cdr: ChangeDetectorRef) {}

  @Input()
  post!: PostRes;

  @Input()
  updatedComText?: string;

  @Input()
  upComRes?: CommentsRes;

  @Input()
  me: number | null = null;

  @Output()
  delCom = new EventEmitter();

  @Output()
  updateCom = new EventEmitter();

  @Output()
  createCom = new EventEmitter();

  // @ContentChild('comment', {read:CommentComponent})
  // comment!: CommentComponent;

  comment = contentChild(AvatarCircleComponent, {read: AvatarCircleComponent});

  ngOnChanges(changes: SimpleChanges): void {
    if (this.post.id == this.upComRes?.postId && this.upComRes.text) {
      this.text = this.upComRes.text;
    }

    if (
      changes['post']?.currentValue?.comments.length !==
      changes['post']?.previousValue?.comments.length
    ) {
      this.text=''

    }

    console.log('changes', changes['post']);

    this.cdr.markForCheck();
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit', this.comment()?.profileAvatar);
  }

  onDelCom() {
    this.delCom.emit();
    this.text = '';
  }

  onUpdateCom() {
    this.updateCom.emit();
  }

  toCreateCom() {
    this.createCom.emit(this.text);
    this.text = '';
  }

}
