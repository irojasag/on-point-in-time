import { MatSnackBar } from '@angular/material/snack-bar';

export const copyToClipBoard = (val: string, snackBar: MatSnackBar) => {
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = val;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);

  if (snackBar) {
    snackBar.open(`${val} ha sido copiado al portapapeles`, '', {
      duration: 2000,
    });
  }
};
