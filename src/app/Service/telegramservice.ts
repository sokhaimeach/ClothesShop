import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Telegramservice {
  private BOT_TOKEN = '';
  private ChatId = '';
  private url = `https://api.telegram.org/bot${this.BOT_TOKEN}/`;

  constructor(private http: HttpClient){}

  sendRecipt(recipt: string) {
    const body = {
      chat_id: this.ChatId,
      text: recipt
    };

    return this.http.post(this.url+'sendMessage', body);
  }
}
