export class ContactDetailsPage {
  constructor(page) {
    this.page = page;
    this.editContactButton = page.locator('#edit-contact');
    this.deleteContactButton = page.locator('#delete')
  }

  async startEditContact(oldName, newName) {
    await this.page.locator(`text=${oldName}`).click();
  }

  async deleteContact() {
    await this.deleteContactButton.click()
    //TODO: accept popup
  }
};
