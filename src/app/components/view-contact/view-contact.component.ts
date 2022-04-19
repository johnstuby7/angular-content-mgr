import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/iGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: IContact = {} as IContact;
  public errorMessage : string | null = null;
  public group:IGroup = {} as IGroup;
  
  // This is used to load data based on id submitted to get to this page
  constructor(
    private activatedRoute : ActivatedRoute,
    private contactService : ContactService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.contactId = param.get('contactId');
    });
    if(this.contactId) {
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe((data: IContact) => {
        this.contact = data;
        this.loading = false;
        this.contactService.getGroup(data).subscribe((data : IGroup) => {
          this.group = data;
        });
      }, (error) => {
        this.errorMessage = error;
        this.loading = false;
      });
    }
  }

  // Check for returning data, will make sure the data exists before returning
  public isNotEmpty() {
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
  }
}
