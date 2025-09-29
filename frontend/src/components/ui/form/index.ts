import { InputForm as Default } from "./input";
import { NumberInput as Number } from "./number";
import { InputPasswordForm as Password } from "./password-input";
import { Select } from "./select";
import { DateTimeInput as DateTime } from "./datetime";

interface ReturnInputs {
  Default: typeof Default;
  Password: typeof Password;
  Select: typeof Select;
  Number: typeof Number;
  DateTime: typeof DateTime;
}

const Input: ReturnInputs = { Default, Password, Select, Number, DateTime };

export default Input;
