import { Injectable } from '@angular/core';

import { Geolocation} from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';

import { StorageService } from '../storage/storage';

@Injectable()
export class Nativeprocess {

  constructor(
    private geolocation: Geolocation,
    private nativeGeocode: NativeGeocoder,
    private camera: Camera,
    private device: Device,
    private store: StorageService,
  ) {
    console.log('Hello NativeProvider Provider');
    this.getLocation();
  }

  // Returns User's Street, City and Country
  async getLocation(){
    let response = await this.store.fetchDoc('loginuser');
    if (response == 'Failed') {
      this.getLocation();
    }
    else {
      try {
        let resp = await this.geolocation.getCurrentPosition();
        let val: NativeGeocoderReverseResult = await this.nativeGeocode.reverseGeocode(resp.coords.latitude, resp.coords.longitude);
        alert(JSON.stringify(val));
        response.location = `${val.locality}, ${val.countryName}`;
      }
      catch(err) {
        console.log(err);
        response.location = 'Nigeria';
      }
      await this.store.createUpdateDoc(response);
    }
  }

  async takePicture() {
    const options: CameraOptions = {
      quality: 20,
      targetHeight: 400,
      targetWidth: 400,
      destinationType: this.camera.DestinationType.DATA_URL
    }

    try {
      let resp = await this.camera.getPicture(options);
      return 'data:image/jpeg;base64,' + resp;
    }
    catch(err) {
      console.log(err);
      return 'Failed';
    }
  }

  deviceOS(): string{
    return this.device.platform;
  }

  deviceModel(): string{
    return this.device.model;
  }

  deviceUUID(): string {
    let uuid: string = this.device.uuid;
    if (uuid == '' || uuid == null) return 'ID' + (Math.floor(Math.random() * (1000000 - 100000)) + 100000);
    return uuid;
  }

}
