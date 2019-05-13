import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NewsletterServiceService } from './newsletter-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'push-notifications-app';
  
  readonly VAPID_PUBLIC_KEY = "BJXzoigVy_ipzjYn0AHSabLuKt7jWw6X3cWV30fCY19FewT7UmpPgn1AcC4VfJkVif_Ph7eLtuNvh5NhTS2Q5TM";
  

  constructor(
    private swPush: SwPush,
    private newsletterService: NewsletterServiceService) {}

subscribeToNotifications() {

    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      console.log(sub)
     return this.newsletterService.addPushSubscriber(sub).subscribe();
    })
    .catch(err => console.error("Could not subscribe to notifications", err));
  }
}
