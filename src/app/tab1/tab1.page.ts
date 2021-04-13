import { Component } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from "@angular/fire/storage";
import { FotoService } from '../services/foto.service';

interface data{
  judul : string,
  isi : string,
  tgl : Date,
  nilai : number,
  foto : string[]
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(afs : AngularFirestore, private afStorage: AngularFireStorage, public fotoService : FotoService) 
  {
    this.isiDataColl = afs.collection('dataNote');
    this.isiData = this.isiDataColl.valueChanges();
  }

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;
  
  in_judul:string;
  in_isi:string;
  in_tgl:Date;
  in_nilai:number;
  in_foto : string[];

  urlimagestorage : string[] = [];
 

  save()
  {
    this.upload();
    this.isiDataColl.doc(this.in_judul).set({
      judul : this.in_judul,
      isi : this.in_isi,
      tgl : this.in_tgl,
      nilai : this.in_nilai,
      foto : this.in_foto
    });    
    alert("Save Success");
  }

  upload()
  {
    this.urlimagestorage = [];
    
    for (var index in this.fotoService.dataFoto)
    {
      const imgFilepath = `imgStorage/${this.fotoService.dataFoto[index].filePath}`;
      this.afStorage.upload(imgFilepath, this.fotoService.dataFoto[index].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url) => {
          this.urlimagestorage.unshift(url);
          alert(this.afStorage.storage.ref().child(imgFilepath).name);
          this.in_foto.unshift(this.afStorage.storage.ref().child(imgFilepath).name);
          // this.in_foto = url;
        });
      });
    }
    //alert("Upload success");
  }

  foto()
  {
    this.fotoService.tambahFoto();
  }

}


