import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { ControllerServiceProvider } from '../../providers/controller-service/controller-service';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { ServerService } from '../../providers/server/server';
// import { AtmdataProvider } from '../../providers/atmdata/atmdata';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';


@IonicPage()
@Component({
    selector: 'page-atm2',
    templateUrl: 'atm2.html', 
})

export class Atm2Page {
    loading: any;
    data: any;
    _data: any;
    _branches: any;
    branches: any;
    lati;
    longi;
    place;
    locator = "atm";
    searchTerm: any;
     


    constructor(public navCtrl: NavController, 
         private serverService: ServerService,
         private loadingCtrl: LoadingController, public navParams: NavParams, public geolocation: Geolocation, public nativeGeocoder: NativeGeocoder, public toaster: ToastController, private controller: ControllerServiceProvider,) {
    } 

    async ionViewDidLoad() {
        this.loading = this.loadingCtrl.create({
                spinner: "circles",
                content: 'Please wait....',
                duration: 3000
              });
              this.loading.present();
        const response = await this.serverService.getData('/atm');

        this._data = response;
        this.data = response;
        console.log(this.data);
        
        const branchres= await this.serverService.getData('/branch');
        this._branches= branchres;
        this.branches = branchres;
        console.log(this.branches);
        this.loading.dismiss();
    }


  

    popover(ev) {
        let pop = this.controller.miscPopOver('PopoverPage', ev);
        pop.present({ev: ev});
        pop.onDidDismiss((data) => {
            if (data)
                this.navCtrl.setRoot(data);
        });
      }

 

 
    openPost(data, branch) {
        console.log(data);
        this.navCtrl.push('GooglePage', { 
            title: data.ecName,
            longitude: data.longitude,
            latitude: data.latitude
        });
    }

    openBranch(branch){
        console.log(branch);
        this.navCtrl.push('GooglePage', { 
            title: branch.ecbName,
            longitude: branch.longitude,
            latitude: branch.latitude
        });

    }
    // openPost(atmlocation)
    // openPosts(branch)
 
    getItems(ev) {

        let searchKey = ev.target.value;
        if (this.locator === 'atm') {
            this.filterATM(searchKey);
        } else {
            this.filterBranches(searchKey);
        }
    }

    filterATM(val) {
        //this.data = this._data;
        if(!val || val.length < 1) {
            this.data = this._data;
            return;
        }

        if (val && val.trim() != '') {
            this.data = this._data.filter((item) => {
                return (item.atmAdress.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }

    }

    filterBranches(val) {
        // this.branches = this._branches;

        if(!val || val.length < 1) {
            this.branches = this._branches;
            return;
        }

        if (val && val.trim() != '') {
            this.branches = this._branches.filter((item) => {
                return (item.ecbAdress.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }

    }

}



