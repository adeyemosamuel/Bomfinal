import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

import { StorageService } from '../providers/storage/storage';
import { ControllerService } from '../providers/controller/controller';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string = '';

  constructor(
    private platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    network: Network,
    private controller: ControllerService,
    private app: App,
    idle: Idle,
    private store: StorageService
  ) {
    platform.ready().then(() => {
      statusBar.backgroundColorByHexString('#3E9134');
      splashScreen.hide();

      this.setRootPage();

      idle.setIdle(300);
      idle.setTimeout(300);
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
      
      idle.onTimeout.subscribe(() => {
        let view: any = app.getActiveNav();

        if (view._views[0].component != 'LoginPage') {
          app.getRootNav().setRoot('LoginPage');
          alert('session timeout');
        }
        idle.watch();
      });

      idle.onIdleStart.subscribe(() => {
        console.log('idle started');
      });

      idle.watch();

      network.onDisconnect().subscribe(() => {
        this.controller.toastCtrl('No network connection', 'top', false);
      });

      network.onConnect().subscribe(() => {
        this.controller.toastCtrl('Network connected', 'top', false);
      });
    });
  }

  async setRootPage() {
    const user = await this.store.fetchDoc('loginuser');
    (user != 'Failed' && user.username != '') ? this.rootPage = 'HomePage' : this.rootPage = 'LoginPage';
  }
}
