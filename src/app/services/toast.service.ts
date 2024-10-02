import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ToastProvider {

    constructor(private snackBar: MatSnackBar) {}

    showSuccess(message: string) {
        this.snackBar.open(message, 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
        });
    }

    showError(message: string) {
        this.snackBar.open(message, 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
        });
    }

}
