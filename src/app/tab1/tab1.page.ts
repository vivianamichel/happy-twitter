import { Component, OnInit, } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message';
    
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  messages: Message[];
  message: Message;

  constructor(private messageService: MessageService) {
    this.message = new Message();
    this.messages = [];
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getMessages(); // runs get messages function every time the component is viewed
  }

  getMessages() {
    this.messageService.getMessages().subscribe(data => {
      this.messages = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Message;
      })
      this.messages.sort((message1, message2) => ((message1.dateCreated < message2.dateCreated) ? 1 : -1)); // order messages (optional)
    });
  }

  createMessage() {
    this.messageService.createMessage(this.message);
  }

}