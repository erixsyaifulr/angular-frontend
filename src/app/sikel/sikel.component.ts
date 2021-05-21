import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'app-sikel',
  templateUrl: './sikel.component.html',
  styleUrls: ['./sikel.component.css']
})
export class SikelComponent implements OnInit {

  imgChangeEvt: any = '';
    cropImgPreview: any = '';

    onFileChange(event: any): void {
        this.imgChangeEvt = event;
    }
    cropImg(e: ImageCroppedEvent) {
        this.cropImgPreview = e.base64;
    }

    imgLoad() {
        // display cropper tool
    }

    initCropper() {
        // init cropper
    }
    
    imgFailed() {
        // error msg
    }

  constructor() { }

  ngOnInit(): void {
  }

}
