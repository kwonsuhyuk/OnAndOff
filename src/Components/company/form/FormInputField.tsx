import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Control, FieldValues } from "react-hook-form";

interface FormInputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  control: Control<FieldValues>;
}

const FormInputField = ({ name, label, placeholder, control }: FormInputFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <Label htmlFor={name}>{label}</Label>
          <FormControl>
            <Input id={name} {...field} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInputField;
