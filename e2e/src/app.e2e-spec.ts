import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Initial page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('client');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

describe('Client page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display client message', () => {
    page.navigateTo();
    expect(page.getTitleClient()).toEqual('Client Management');
  });

  it('should be save button', () => {
    page.navigateTo();
    expect(page.getButton('save')).toEqual('Save');
  });

  it('should be update button', () => {
    page.navigateTo();
    expect(page.getButton('update')).toEqual('Update');
  });

  it('should be delete button', () => {
    page.navigateTo();
    expect(page.getButton('delete')).toEqual('Delete');
  });

  //Agregar test Routes

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});


