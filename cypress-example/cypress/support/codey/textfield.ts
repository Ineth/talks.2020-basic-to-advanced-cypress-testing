class Textfield {
  public inputAutomationId = 'textfield_input';
  public errorAutomationid = 'textfield_error';
  public optionAutomationId = 'textfield_option';
  public label = () => cy.getBy('textfield_label');
  public input = () => cy.getBy(this.inputAutomationId);
  public icon = () => cy.getBy('textfield_icon');
  public optionList = () => cy.getBy('textfield_options');
  public option = () => cy.getBy(this.optionAutomationId);
  public error = () => cy.getBy(this.errorAutomationid);
  public caption = () => cy.getBy('textfield_caption');

  public fill = (text: string) => this.input().type(text);

  public selectFirstOption = () =>
    this.option()
      .first()
      .click();
  public selectLastOption = () =>
    this.option()
      .last()
      .click();
  public selectOptionContaining = (text: string) =>
    this.option()
      .contains(text)
      .click();
}

export default new Textfield();
