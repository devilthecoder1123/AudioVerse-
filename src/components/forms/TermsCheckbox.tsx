import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TermsCheckboxProps {
  acceptTerms: boolean;
  onAcceptTermsChange: (checked: boolean) => void;
  isLoading: boolean;
}

export function TermsCheckbox({ 
  acceptTerms, 
  onAcceptTermsChange, 
  isLoading 
}: TermsCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        checked={acceptTerms}
        onCheckedChange={onAcceptTermsChange}
        disabled={isLoading}
      />
      <Label htmlFor="terms" className="text-sm">
        I agree to the{" "}
        <Link href="/terms" className="text-primary hover:text-primary/80">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-primary hover:text-primary/80">
          Privacy Policy
        </Link>
      </Label>
    </div>
  );
}
