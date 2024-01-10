export interface ToastOptions {
  position:
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left';
  autoClose: number;
  pauseOnHover: boolean;
  draggable: boolean;
  theme: 'light' | 'dark';
}
