import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";

interface data{
  judul : string,
  isi : string,
  tgl : Date,
  nilai : number
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(afs : AngularFirestore, private route: ActivatedRoute, private router: Router) 
  {
    this.isiDataColl =afs.collection('dataNote');
    this.isiData = this.isiDataColl.valueChanges();
  }
  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;

  detail(i)
  {
    this.router.navigate(["/detail/" + i]);
  }

}
