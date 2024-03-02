import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const toastOptions = {
  positionClass: 'toast-top-right',
  preventDuplicates: false,
  closeButton: true,
  progressBar: true,
  timeOut: 3000,
};

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  success(message: string, title = '') {
    this.toastr.success(message, title);
  }
  info(message: string, title = '') {
    this.toastr.info(message, title);
  }
  error(message: string, title = '') {
    this.toastr.error(message, title);
  }
  warning(message: string, title = '') {
    this.toastr.warning(message, title);
  }
}
