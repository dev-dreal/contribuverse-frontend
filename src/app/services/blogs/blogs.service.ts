import { Injectable } from '@angular/core';
import { AddBlogModel, BlogModel } from '../../models/blog.model';
import { GET_BLOGS, GET_BLOG } from '../../graphql/queries';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { CREATE_BLOG } from '../../graphql/mutations';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private apollo: Apollo) {}

  getBlogCategories(): string[] {
    return [
      'ANDROID',
      'TECH',
      'AI_ML',
      'WEB',
      'JOBS',
      'STARTUPS',
      'UI_UX',
      'BOOKS',
      'DATABASES',
    ];
  }

  getBlogs(): Observable<BlogModel[]> {
    return this.apollo
      .watchQuery<any>({
        query: GET_BLOGS,
      })
      .valueChanges.pipe(map((result) => result.data.blogs));
  }

  getSingleBlog(id: string): Observable<BlogModel> {
    return this.apollo
      .watchQuery<any>({
        query: GET_BLOG,
        variables: {
          id,
        },
      })
      .valueChanges.pipe(map((result) => result.data.blog));
  }

  addBlog(blog: AddBlogModel) {
    return this.apollo.mutate({
      mutation: CREATE_BLOG,
      variables: {
        userId: blog.userId,
        category: blog.category,
        imageUrl: blog.imageUrl,
        content: blog.content,
        title: blog.title,
      },
    });
  }
}
