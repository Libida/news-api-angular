import { AppPage } from './app.po';
import {browser, by, element, logging} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should redirect to Login on Login cta click', () => {
    page.navigateTo();
    const topCtas = element.all(by.css('.header-section_top-auth .list-inline-item'));
    const loginLink = topCtas.get(0);
    loginLink.click();
    expect(page.getTitleText()).toEqual('Login');
  });

  it('should show 404 page if url is incorrect', () => {
    browser.getCurrentUrl().then((url) => {
      browser.get(`${url}/incorrect_url`);
      const status404 = element.all(by.css('#not-found-status'));
      expect(status404.get(0).getText()).toEqual('404');
    });
  });
});
