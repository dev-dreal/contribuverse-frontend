import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { CREATE_USER } from '../../graphql/mutations';
import { CreateUserModel } from '../../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private apollo: Apollo) {}

  createUser(name: string, email: string): Observable<CreateUserModel> {
    return this.apollo
      .mutate<CreateUserModel>({
        mutation: CREATE_USER,
        variables: {
          name,
          email,
        },
      })
      .pipe(map((result: any) => result.data.createUser));
  }
}
