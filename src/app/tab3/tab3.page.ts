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
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(afs : AngularFirestore, private route: ActivatedRoute, private router: Router) 
  {
    this.isiDataColl =afs.collection('dataNote');
    this.isiData = this.isiDataColl.valueChanges();
  }
  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;
  index;

  ngOnInit()
  {
    let paramdetail = this.route.snapshot.paramMap.get("index");
    this.index = paramdetail;
  }

}
