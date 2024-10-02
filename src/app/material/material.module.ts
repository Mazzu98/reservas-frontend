import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

const materialComponents = [
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSpinner,
    MatSelectModule,
    MatCardModule,
    MatTableModule
];

@NgModule({
    imports: [materialComponents],
    exports: [materialComponents],
})
export class MaterialModule {}