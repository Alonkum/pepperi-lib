import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
// import { CustomizationService } from 'pepperi-lib/customization';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'pepperi web app test';
    color = 'hsl(100, 100%, 25%)';
    value = '';

    constructor(
        private translate: TranslateService,
        // private customizationService: CustomizationService
    ) {

        const browserCultureLang = translate.getBrowserCultureLang();
    }

    ngOnInit() {
        debugger;
        // this.customizationService.setThemeVariables();

    }

    onValueChanged(event) {
        // alert(event.value);
        // debugger;
        // this.checkForChanges = new Date();

        if (event.apiName == 'color1') {
            this.color = event.value;
        } else {
            this.value = 'changed';
        }
    }

    elementClicked(event) {
        debugger;
        this.value = 'Click';
        // alert("clicked");
    }
}
