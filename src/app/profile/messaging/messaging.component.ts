import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-messaging',
  standalone: false,
  templateUrl: './messaging.component.html',
  styleUrl: './messaging.component.css'
})
export class MessagingComponent implements OnInit{
  @Input() receiverId!: any;
  currentUserId: number = 0;
  messages: any[] = [];
  messageText: string = "";

  constructor(private dataService: DataService) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserId = JSON.parse(storedUser).id;
    }

    this.loadMessages();
  }

  loadMessages() {
    this.dataService.fetchMessages(this.currentUserId, this.receiverId).subscribe((res: any) => {
      this.messages = res;
      console.log(res);
    });
  }

  sendMessage() {
    if (!this.messageText.trim()) return;

    this.dataService.sendMessage(this.currentUserId, this.receiverId, this.messageText)
      .subscribe(() => {
        this.messages.push({
          sender_id: this.currentUserId,
          receiver_id: this.receiverId,
          message: this.messageText,
          created_at: new Date()
        });



        this.messageText = "";
      });
  }
}
