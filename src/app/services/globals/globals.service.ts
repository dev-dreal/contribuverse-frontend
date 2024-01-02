import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageResolutionUtility } from '../../helpers/image-resolution.helper';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class GlobalsService {
  public http = inject(HttpClient);
  public router = inject(Router);
  public route = inject(ActivatedRoute);
  public fb = inject(FormBuilder);

  public getImageResolution = (url: string, width: number, height: number) => {
    return ImageResolutionUtility.getImageResolution(url, width, height);
  };
}
