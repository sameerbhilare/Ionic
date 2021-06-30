import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @Output() imagePick = new EventEmitter<string>(); // base64 string representation of the image
  selectedImage: string;
  constructor() {}

  ngOnInit() {}

  async onPickImage() {
    // check if Camera feature is available
    if (!Capacitor.isPluginAvailable('Camera')) {
      return;
    }

    try {
      // Camera feature is available
      const photo: Photo = await Camera.getPhoto({
        // image quality. max 100, min 1
        quality: 50,
        // CameraSource.Prompt = will ask use to open camera or gallary
        source: CameraSource.Prompt,
        correctOrientation: true,
        // choose appropriate dimensions
        height: 320,
        width: 200,
        // means that the image is encoded into a string which we then can convert to a file if we want to, or just use like that.
        resultType: CameraResultType.Base64,
      });

      // set the image base64 representation
      this.selectedImage = photo.base64String;
      // emit event
      this.imagePick.emit(photo.base64String);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
