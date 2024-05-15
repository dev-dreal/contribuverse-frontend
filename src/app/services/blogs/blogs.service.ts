import { Injectable, signal } from '@angular/core';
import { AddBlogModel, BlogModel, Like } from '../../models/blog.model';
import { GET_BLOGS, GET_BLOG } from '../../graphql/queries';
import { Apollo } from 'apollo-angular';
import { Observable, map, of, tap } from 'rxjs';
import { ADD_LIKE, CREATE_BLOG, DELETE_LIKE } from '../../graphql/mutations';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private apollo: Apollo) {}
  isBlogAuthorLoading = signal(true);
  isSingleBlogLoading = signal(true);
  isBlogsLoading = signal(true);
  isBlogCategoriesLoading = signal(true);

  getBlogCategoriesStrings(): string[] {
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

  getBlogCategories(): Observable<BlogModel[]> {
    const blogCategories = signal([
      {
        id: '',
        title: 'Machine Learning',
        imageUrl: 'assets/svgs/ml.svg',
        userId: '1',
        category: 'Machine Learning',
        comments: [],
        likes: [],
        tags: [],
        content: 'Future Trends in Machine Learning.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '',
        title: 'Android Development',
        imageUrl: 'assets/svgs/android-logo.svg',
        userId: '1',
        category: 'Android Development',
        comments: [],
        likes: [],
        tags: [],
        content:
          'Composables are typically represented as functions in Kotlin.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '',
        title: 'Flutter',
        shortDescription:
          'Flutter is an open-source UI software development kit created by Google.',
        imageUrl: 'assets/svgs/flutter-logo.svg',
        userId: '1',
        category: 'Flutter',
        comments: [],
        likes: [],
        tags: [],
        content:
          'Flutter is an open-source UI software development kit created by Google.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '',
        title: 'React',
        shortDescription:
          'React is an open-source front-end JavaScript library for building user interfaces or UI components.',
        imageUrl: 'assets/svgs/react-logo.svg',
        userId: '1',
        category: 'React',
        comments: [],
        likes: [],
        tags: [],
        content:
          'React is an open-source front-end JavaScript library for building user interfaces or UI components.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);

    return of(blogCategories()).pipe(
      tap(() => this.isBlogCategoriesLoading.set(false)),
    );
  }

  getBlogs(): Observable<BlogModel[]> {
    return this.apollo
      .watchQuery<any>({
        query: GET_BLOGS,
      })
      .valueChanges.pipe(
        map((result) => result.data.blogs),
        tap(() => this.isBlogsLoading.set(false)),
      );
  }

  getSingleBlog(id: string): Observable<BlogModel> {
    return this.apollo
      .watchQuery<any>({
        query: GET_BLOG,
        variables: {
          id,
        },
      })
      .valueChanges.pipe(
        map((result) => result.data.blog),
        tap(() => this.isSingleBlogLoading.set(false)),
      );
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

  addLike(like: number, blogId: string, userId: string): Observable<Like> {
    return this.apollo
      .mutate<Like>({
        mutation: ADD_LIKE,
        variables: {
          like,
          blogId,
          userId,
        },
      })
      .pipe(map((result: any) => result.data.addLike));
  }

  deleteLike(deleteLikeId: string): Observable<Like> {
    return this.apollo
      .mutate<Like>({
        mutation: DELETE_LIKE,
        variables: {
          deleteLikeId,
        },
      })
      .pipe(map((result: any) => result.data.deleteLike));
  }
}
