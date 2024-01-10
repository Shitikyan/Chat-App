export default interface ToastOptions {
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  autoClose: number;
  pauseOnHover: boolean;
  draggable: boolean;
  theme: 'light' | 'dark';
}
