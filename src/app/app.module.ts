import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { PipesModule } from '../pipes/pipes.module';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { Geolocation} from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Camera } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { SignaturePadModule } from 'angular2-signaturepad';
import { NgIdleModule } from '@ng-idle/core';

import { MyApp } from './app.component';
import { ControllerService } from '../providers/controller/controller';
import { AppData } from '../providers/app-data/app-data';
import { Nativeprocess } from '../providers/native/native';
import { ServerService } from '../providers/server/server';
import { StorageService } from '../providers/storage/storage';
import { ValidateService } from '../providers/validate/validate';
import { ControllerServiceProvider } from '../providers/controller-service/controller-service';
import { ControllerServiceProvider2 } from '../providers/controller-service2/controller-service2';
import { ValidateServiceProvider } from '../providers/validate-service/validate-service';
import { VerifyServiceProvider } from '../providers/verify-service/verify-service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SignaturePadModule,
    HttpModule,
    NgIdleModule.forRoot(),
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    Geolocation,
    NativeGeocoder,
    Camera,
    Device,
    LocalNotifications,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ControllerService,
    AppData,
    Nativeprocess,
    ServerService,
    StorageService,
    ValidateService,
    ControllerServiceProvider,
    ControllerServiceProvider2,
    ValidateServiceProvider,
    VerifyServiceProvider
  ]
})
export class AppModule {}
