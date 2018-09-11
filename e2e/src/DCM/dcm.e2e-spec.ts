import { DcmFlow } from './dcm.flow';

fdescribe('DCM App', () => {

  let app: DcmFlow = new DcmFlow();

  beforeEach(() => {
    app.reset(); // in beforeEach because taking screenshot for failing tests fails when placed in the afterEach
    app.start();
  });

  it('should first render the login page with the corresponding elements', () => {
    expect(app.loginPage.isPresent()).toBeTruthy();
    expect(app.usernameInput.getAttribute('value')).toBe('');
    expect(app.passwordInput.getAttribute('value')).toBe('');
    expect(app.buttonLogin.isPresent()).toBeTruthy();
  });

  it('should not login and display an error when no credentials are set', () => {
    expect(app.loginPageErrors.isPresent()).toBeFalsy();
    app.buttonLogin.click();
    expect(app.loginPage.isPresent()).toBeTruthy();
    expect(app.loginPageErrors.getAttribute('innerHTML')).toBe('Authentication failed');
  });

  it('should be able to login with the correct credentials and able to logout again', () => {
    app.usernameInput.sendKeys('Aanvrager');
    app.passwordInput.sendKeys('Aanvrager');
    app.buttonLogin.click();
    expect(app.loginPage.isPresent()).toBeFalsy(
      'The loginpage is not expected anymore after entering the correct credentials');

    // State: logged in
    expect(app.projectPage.isPresent()).toBeTruthy();
    app.buttonLogout.click();

    // State: logged out
    expect(app.loginPage.isPresent()).toBeTruthy();
  });

});
