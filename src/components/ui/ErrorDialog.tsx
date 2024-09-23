import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";

// Define the type of your Zod error shape
interface ZodError {
  code: string;
  message: string;
  path: string[];
  expected?: string;
  received?: string;
}

// Create a type for an array of Zod errors
export type ZodErrorsArray = ZodError[];

interface ErrorDialogProps {
  errors: ZodErrorsArray;
  open: boolean;
  onClose: () => void;
}

export function ErrorDialog({ errors, open, onClose }: ErrorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Validation Error</DialogTitle>
        <DialogDescription>
          <ul className="space-y-2">
            {errors.map((error, index) => (
              <li key={index} className="text-red-600">
                <strong>{error.path.join(" → ")}:</strong> {error.message}
                {error.code === "invalid_type" && (
                  <p className="text-sm text-gray-600">
                    Expected: {error.expected}, Received: {error.received}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </DialogDescription>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
}
