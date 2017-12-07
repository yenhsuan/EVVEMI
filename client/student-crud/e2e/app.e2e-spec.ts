import { StudentCrudPage } from './app.po';

describe('student-crud App', () => {
  let page: StudentCrudPage;

  beforeEach(() => {
    page = new StudentCrudPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
