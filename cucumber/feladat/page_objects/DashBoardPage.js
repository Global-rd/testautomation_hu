export class DashBoardPage {
  constructor(page) {
    this.page = page;
    this.logoutButton = page.locator('#logout');
    this.addNewContactButton = page.locator('#add-contact');
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastname');
    this.submitButton = page.locator('#submit');
    this.editContactButton = page.locator('#edit-contact');
    this.myTable = this.page.locator('#myTable')
  }
  async goto() {
    await this.page.goto('/contactList');
  }
  async logoutUser() {
    await this.logoutButton.click();
  }

  async startCreateContact() {
    await this.addNewContactButton.click();
  }

  async startEditContact(oldName) {
    await this.page.locator(`text=${oldName}`).click();
  }

  async createContact(contactData) {
    await this.addNewContactButton.click();
    await this.firstNameInput.fill(contactData.name);
    await this.lastNameInput.fill(contactData.email);
    await this.submitButton.click();
  }

  async editContact(oldName, newData) {
    await this.startEditContact(oldName);
    await this.firstNameInput.fill(newData.name);
    await this.lastNameInput.fill(newData.email);
    await this.submitButton.click();
  }

  async deleteContact(contactName) {
    await this.startEditContact(contactName);
    await this.page.locator('#delete').click();
  }

  async isContactInList(contact) {
    const rows = await this.myTable.locator('tr').all();
    for (const row of rows) {
        const rowText = await row.innerText();
        if (typeof contact === 'string') {
            if (rowText.includes(contact)) {
                return true;
            }
        } else {
            if (rowText.includes(contact.name) && rowText.includes(contact.email)) {
                return true;
            }
        }
    }
    return false;
  }
}
