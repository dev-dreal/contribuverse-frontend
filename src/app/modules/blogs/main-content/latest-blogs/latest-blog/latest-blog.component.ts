import { Component, Input } from '@angular/core';
import { BlogModel } from '../../../../../models/blog.model';
import { RouterLink } from '@angular/router';
import { GlobalsService } from '../../../../../services/globals/globals.service';
import { UsersService } from '../../../../../services/users/users.service';
import { UserModel } from '../../../../../models/user.model';

@Component({
  selector: 'latest-blog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './latest-blog.component.html',
  styleUrl: './latest-blog.component.scss',
})
export class LatestBlogComponent {
  @Input({ required: true }) blog!: BlogModel;
  @Input() longDescriptionCutOff: number = 10;
  blogAuthor!: UserModel;
  isBlogAuthorLoaded: boolean = false;

  constructor(
    private globals: GlobalsService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.loadBlogAuthor(this.blog.userId);
  }

  getImageResolution = (url: string, width: number, height: number) => {
    return this.globals.getImageResolution(url, width, height);
  };

  loadBlogAuthor(userId: string) {
    this.usersService.getUserById(userId).subscribe({
      next: (res) => {
        this.blogAuthor = res;
        this.isBlogAuthorLoaded = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
