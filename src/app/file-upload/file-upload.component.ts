import { Component, Input, OnInit } from '@angular/core';
import { FileUploadService } from '../service/file-upload.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;
  @Input() id!: number;
  error = '';
 // Inject service
 constructor(private fileUploadService: FileUploadService) { }

 ngOnInit(): void {
  console.log(this.id);
  this.imageInfos = this.fileUploadService.getFiles();
 }
 selectFiles(event: any): void {
  this.message = [];
  this.progressInfos = [];
  this.selectedFiles = event.target.files;

  this.previews = [];
  if (this.selectedFiles && this.selectedFiles[0]) {
    const numberOfFiles = this.selectedFiles.length;
    for (let i = 0; i < numberOfFiles; i++) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        console.log(e.target.result);
        this.previews.push(e.target.result);
      };

      reader.readAsDataURL(this.selectedFiles[i]);
    }
  }
}
uploadFiles(): void {
  if(this.id !== null) {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i], this.id);
      }
    }
  }else{
    this.error = "Enregistrer d\'abord un terrain s\'il vous plaît ! ";
  }

}
upload(idx: number, file: File, id: number): void {
  this.progressInfos[idx] = { value: 0, fileName: file.name };

  if (file) {
    this.fileUploadService.upload(file, id).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          const msg = 'Uploaded the file successfully: ' + file.name;
          this.message.push(msg);
          this.imageInfos = this.fileUploadService.getFiles();
        }
      },
      (err: any) => {
        this.progressInfos[idx].value = 0;
        const msg = 'Could not upload the file: ' + file.name;
        this.message.push(msg);
      });
  }
}
}
