import { MosaicFieldProps } from "@root/components/Field/FieldTypes";

export interface DatePickerProps extends Omit<MosaicFieldProps, "onChange"> {
  onChange?: (date: Date) => void;
}
