import { textfield, optionInput } from '@support/codey/index';
import { Stap } from '@support/views/stap';

class StringInput extends Stap {
  public textfield = textfield;
  public optionInput = optionInput;

  public fill(data: string, fallbackData: boolean = false) {
    if (fallbackData) {
      this.optionInput.input().click();
    } else {
      this.textfield.input().type(data);
    }
  }
}

export default new StringInput();
