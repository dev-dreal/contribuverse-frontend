import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_BLOG } from '../../../../graphql/queries';
import { BlogModel } from '../../../../models/blog.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { fadingAnimation } from '../../../../helpers/animations';

@Component({
  selector: 'single-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-blog.component.html',
  styleUrl: './single-blog.component.scss',
  animations: [fadingAnimation],
})
export class SingleBlogComponent {
  blog: BlogModel = {} as BlogModel;
  id: string = '';
  constructor(private apollo: Apollo, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.loadBlog();
  }

  loadBlog() {
    this.apollo
      .watchQuery({
        query: GET_BLOG,
        variables: {
          id: this.id,
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        console.log(data);
        this.blog = data.blog;
        if (error) {
          console.error(error);
        }
      });
  }
}
