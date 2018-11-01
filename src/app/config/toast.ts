import { ToastOptions } from 'ng2-toastr';

export class ToastConfig extends ToastOptions {
  animate = 'fade';
  newestOnTop = true;
  showCloseButton = true;
  positionClass = 'toast-top-right';
  toastLife = 3000;
}
