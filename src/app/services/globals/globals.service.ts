import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageResolutionUtility } from '../../helpers/image-resolution.helper';
import { FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToasterService } from '../toaster/toaster.service';
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class GlobalsService {
  public http = inject(HttpClient);
  public router = inject(Router);
  public route = inject(ActivatedRoute);
  public fb = inject(FormBuilder);
  public loader = inject(NgxUiLoaderService);
  public toast = inject(ToasterService);

  currentUser: WritableSignal<UserModel | null | undefined> = signal(undefined);

  public getImageResolution = (url: string, width: number, height: number) => {
    return ImageResolutionUtility.getImageResolution(url, width, height);
  };
}
