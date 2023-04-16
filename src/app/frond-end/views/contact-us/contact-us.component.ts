import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { ContactService } from 'src/app/services/contact.us.service';


@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  contactForm: any = {
    firstName: null,
    lastName: null,
    email: null,
    message: null,
  };
  public map!: Map;
  isSuccessful: boolean = false;

  constructor(httpClient: HttpClient, private contactService: ContactService){

}

  ngOnInit(): void {
    this.map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'ol-map'
    });
  
  }

  move(event:any): void {

  }
moveMap(event:any): void {

}

onContactSubmit(f: NgForm){
  console.log("onContactSubmit: " + JSON.stringify(f.value));

}
createContact(event:any): void {
  
}
}



