import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'openvino-dailylog';

  constructor(translate: TranslateService) {
    translate.addLangs(['ca', 'en', 'es', 'fr', 'pt'])
    translate.setDefaultLang('en');
    translate.use(translate.getBrowserLang() || 'en');
  }
}

