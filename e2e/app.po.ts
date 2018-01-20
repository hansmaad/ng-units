import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getOutput1() {
    return element(by.css('ng-root pipe-test-1')).getText();
  }
}
