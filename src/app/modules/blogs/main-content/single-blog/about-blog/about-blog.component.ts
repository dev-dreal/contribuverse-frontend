import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  Input,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { UsersService } from '../../../../../services/users/users.service';
import { GlobalsService } from '../../../../../services/globals/globals.service';
import { Follower, UserModel } from '../../../../../models/user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';

@Component({
  selector: 'about-blog',
  standalone: true,
  imports: [CommonModule, NgxUiLoaderModule],
  templateUrl: './about-blog.component.html',
  styleUrl: './about-blog.component.scss',
})
export class AboutBlogComponent {
  SPINNER = SPINNER;
  @Input({ required: true }) blogAuthor!: UserModel;
  @Input({ required: true }) isLoading: WritableSignal<boolean> = signal(true);

  followingMetaData: WritableSignal<Follower | null> = signal(null);
  blogAuthorIsCurrentUser: boolean = false;
  currentUserId = this.globals.currentUser()?.id;

  constructor(
    private usersService: UsersService,
    private globals: GlobalsService,
    private destroyRef: DestroyRef,
  ) {
    effect(
      () => {
        if (!this.isLoading()) {
          this.getFollowingMetaData();
          this.checkIfBlogAuthorIsCurrentUser();
        }
      },
      {
        allowSignalWrites: true,
      },
    );
  }

  checkIfUserIsLoggedIn() {
    if (!!this.globals.currentUser() === false) {
      this.globals.toast.warning('This action requires you to be logged in!');
      this.globals.router.navigate(['/auth/login']);
    }
  }

  followUser(blogAuthorId: string) {
    this.globals.loader.start();
    // If the user is logged in, proceed to follow/unfollow, otherwise redirect to login page
    this.checkIfUserIsLoggedIn();
    if (this.followingMetaData()) {
      this.unFollowUser(this.followingMetaData()?.id!);
    } else {
      this.usersService
        .addFollower(blogAuthorId, this.currentUserId!)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res) => {
            this.followingMetaData.set(res);
            this.globals.toast.success(
              'You are now following ' + this.blogAuthor.name + '!',
            );
            this.globals.loader.stopAll();
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }

  unFollowUser(followerId: string) {
    this.globals.loader.start();
    this.usersService
      .deleteFollower(followerId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.followingMetaData.set(null);
          this.globals.toast.info(
            'You have unfollowed ' + this.blogAuthor.name + '!',
          );
          this.globals.loader.stopAll();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  getFollowingMetaData(): void {
    const blogAuthorFollowers = this.blogAuthor.followers;
    // console.log('Current user ID', currentUserId);
    console.log('Blog author followers', blogAuthorFollowers);

    // If the blog author has no followers, set the followingMetaData to null
    // Otherwise, loop through the followers and set the followingMetaData to the follower object if the current user is following the blog author
    if (blogAuthorFollowers.length === 0) {
      this.followingMetaData.set(null);
    } else {
      for (let i = 0; i < blogAuthorFollowers.length; i++) {
        if (blogAuthorFollowers[i].followingUserId === this.currentUserId) {
          this.followingMetaData.set(blogAuthorFollowers[i]);
          break;
        }
      }
    }
  }

  checkIfBlogAuthorIsCurrentUser() {
    if (this.blogAuthor.id === this.globals.currentUser()?.id) {
      this.blogAuthorIsCurrentUser = true;
    }
  }
}
