import { FormField } from "./FormField";
import { User } from "lucide-react";

interface NameFieldsProps {
  firstName: string;
  lastName: string;
  onInputChange: (field: string, value: string) => void;
  isLoading: boolean;
}

export function NameFields({ 
  firstName, 
  lastName, 
  onInputChange, 
  isLoading 
}: NameFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        id="firstName"
        label="First Name"
        placeholder="First name"
        value={firstName}
        onChange={(value) => onInputChange("firstName", value)}
        icon={<User />}
        required
        disabled={isLoading}
      />
      <FormField
        id="lastName"
        label="Last Name"
        placeholder="Last name"
        value={lastName}
        onChange={(value) => onInputChange("lastName", value)}
        icon={<User />}
        required
        disabled={isLoading}
      />
    </div>
  );
}
