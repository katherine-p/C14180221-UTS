import { Component, OnInit } from '@angular/core';
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
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

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

  delete()
  {
    this.isiDataColl.doc(this.index).delete();
    alert("delete success");
  }

  update()
  {
    
  }

}
