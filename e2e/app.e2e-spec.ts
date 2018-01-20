import { AppPage } from './app.po';

describe('ng-units App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should navigate', () => {
    page.navigateTo();
  });
});
