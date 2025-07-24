export class EditContactPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('#firstName');
    this.submitButton = page.locator('#submit');
  }

    async fillContactForm(newName){
        await this.firstNameInput.fill(newName);
        await this.submitButton.click()
    }

};
