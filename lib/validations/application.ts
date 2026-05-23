import { z } from "zod";

export const GRADES = [
  "KG1",
  "KG2",
  "KG3",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
] as const;

export const GENDERS = ["Male", "Female"] as const;

export const applicationSchema = z.object({
  studentName: z.string().min(2, "Student full name is required"),
  gender: z.enum(GENDERS, { message: "Please select gender" }),
  dob: z.string().min(1, "Date of birth is required"),
  grade: z.string().min(1, "Please select a grade"),
  previousSchool: z.string().optional(),
  parentName: z.string().min(2, "Parent full name is required"),
  phone: z
    .string()
    .min(8, "Valid phone number required")
    .regex(/^[\d\s+()-]+$/, "Invalid phone format"),
  email: z.string().email("Valid email required"),
  address: z.string().min(5, "Address is required"),
  notes: z.string().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

export type ApplicationDocuments = {
  general: string[];
  report_cards: string[];
  birth_certificate: string[];
};

export type ApplicationStatus = "pending" | "approved" | "rejected" | "contacted";
