class OptionInput {
  public label = () => cy.getBy('option-input_label');
  public input = () => cy.getBy('option-input_input');
  public error = () => cy.getBy('option-input-list_error');
}

export default new OptionInput();
