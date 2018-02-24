import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-google',
  templateUrl: 'google.html',
})
export class GooglePage {

  @ViewChild('map') mapRef: ElementRef;

  
  long;
  lat;
  title;


  constructor(public navCtrl: NavController,  public navParams: NavParams) {
    this.long = this.navParams.get('longitude');
    this.lat = this.navParams.get('latitude');
    this.title = this.navParams.get('title');
  }

  ionViewDidLoad() {}

  ionViewDidEnter() {
    this.loadMap();
  }

 

  loadMap() {
    let latLong = {
      lat: Number(this.lat),
      lng: Number(this.long)
    };

    console.log(latLong);

    let map = new google.maps.Map(this.mapRef.nativeElement, {
      zoom: 15,
      center: latLong,
      
    });

    let marker = new google.maps.Marker({
      position: latLong,
      map: map,
      label: 'HB',
      title: 'Heritage Bank'
    });
  }



}
