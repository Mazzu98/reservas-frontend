import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerProvider } from '../../services/server.service';

@Component({
  selector: 'app-space-form-modal',
  templateUrl: './space-form-modal.component.html',
})
export class SpaceFormModalComponent {
  spaceForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  isEditMode: boolean;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private server: ServerProvider,
    private dialogRef: MatDialogRef<SpaceFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data.space;
    this.spaceForm = this.fb.group({
      name: [data.space?.name || '', Validators.required],
      type: [data.space?.type || '', Validators.required],
      description: [data.space?.description || '', Validators.required],
      capacity: [data.space?.capacity || '', Validators.required],
    });

    if (this.isEditMode && data.space.image_url) {
      this.imagePreview = data.space.image_url;
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;  // Guardar el archivo seleccionado
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;  // Mostrar la vista previa de la imagen
      };
      reader.readAsDataURL(file);  // Leer el archivo seleccionado
    }
  }

  async onSubmit() {
    if (this.spaceForm.valid) {
      const formData = new FormData();
      formData.append('name', this.spaceForm.get('name')?.value);
      formData.append('type', this.spaceForm.get('type')?.value);
      formData.append('description', this.spaceForm.get('description')?.value);
      formData.append('capacity', this.spaceForm.get('capacity')?.value);

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      console.log(formData);
      try {
        if (this.isEditMode) {
          await this.server.updateSpace(this.data.space.id, formData);
        }
        else {
          await this.server.createSpace(formData);
        }
        this.data.onSuccess();
        this.dialogRef.close();
      }
      catch (error) {
        this.data.onError();
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
