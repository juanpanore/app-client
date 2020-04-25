import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root client')).getTagName() as Promise<string>;
  }

  getTitleClient() {
    return element(by.css('app-root client h2')).getText() as Promise<string>;
  }

  getButton( id : string ) {
    return element(by.id(id)).getText() as Promise<string>;
  }
}
