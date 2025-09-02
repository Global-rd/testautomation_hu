const { setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber');

class CustomWorld {
  constructor() {
    this.baseURL = process.env.BASE_URL || 'https://thinking-tester-contact-list.herokuapp.com';
    this.browser = null;
    this.context = null;
    this.page = null;
  }
}

setDefaultTimeout(60 * 1000);
setWorldConstructor(CustomWorld);
