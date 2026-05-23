"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "@/i18n/navigation";
import {
  applicationSchema,
  GRADES,
  GENDERS,
  type ApplicationFormData,
  type ApplicationDocuments,
} from "@/lib/validations/application";
import { uploadApplicationFile } from "@/services/applications.client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, ChevronRight, Upload } from "lucide-react";

const STEPS = ["Student", "Parent", "Documents", "Review"] as const;

type FileState = {
  general: File[];
  report_cards: File[];
  birth_certificate: File[];
};

export function AdmissionWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState<FileState>({
    general: [],
    report_cards: [],
    birth_certificate: [],
  });

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      studentName: "",
      gender: undefined,
      dob: "",
      grade: "",
      previousSchool: "",
      parentName: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    },
    mode: "onBlur",
  });

  const values = form.watch();

  const stepFields: (keyof ApplicationFormData)[][] = [
    ["studentName", "gender", "dob", "grade"],
    ["parentName", "phone", "email", "address"],
    [],
    [],
  ];

  const next = async () => {
    const fields = stepFields[step];
    if (fields.length) {
      const valid = await form.trigger(fields);
      if (!valid) return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async () => {
    const valid = await form.trigger();
    if (!valid) return;

    setSubmitting(true);
    try {
      const documents: ApplicationDocuments = {
        general: [],
        report_cards: [],
        birth_certificate: [],
      };

      for (const f of files.general) {
        documents.general.push(await uploadApplicationFile(f, "general"));
      }
      for (const f of files.report_cards) {
        documents.report_cards.push(await uploadApplicationFile(f, "report-cards"));
      }
      for (const f of files.birth_certificate) {
        documents.birth_certificate.push(await uploadApplicationFile(f, "birth-certificate"));
      }

      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: form.getValues(), documents }),
      });

      if (!res.ok) throw new Error("Submit failed");
      const data = await res.json();
      router.push(`/admissions/apply/success?ref=${encodeURIComponent(data.referenceId)}`);
    } catch {
      form.setError("root", { message: "Submission failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const FileField = ({
    label,
    hint,
    bucket,
    selected,
    onChange,
  }: {
    label: string;
    hint: string;
    bucket: keyof FileState;
    selected: File[];
    onChange: (f: File[]) => void;
  }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <p className="text-xs text-muted">{hint}</p>
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-navy-900/15 bg-ivory/50 px-6 py-8 transition-colors hover:border-gold-500/50 hover:bg-gold-500/5">
        <Upload className="mb-2 h-8 w-8 text-gold-600" />
        <span className="text-sm font-medium text-navy-900">Click to upload</span>
        <span className="mt-1 text-xs text-muted">PDF, JPG, PNG up to 10MB</span>
        <input
          type="file"
          className="sr-only"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => onChange(Array.from(e.target.files ?? []))}
        />
      </label>
      {selected.length > 0 && (
        <ul className="text-sm text-muted">
          {selected.map((f) => (
            <li key={f.name}>{f.name}</li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-10 flex justify-between gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                i < step && "border-gold-500 bg-gold-500 text-navy-950",
                i === step && "border-gold-500 bg-navy-900 text-gold-400",
                i > step && "border-navy-900/20 bg-white text-muted"
              )}
            >
              {i < step ? <Check className="h-5 w-5" /> : i + 1}
            </div>
            <span
              className={cn(
                "hidden text-xs font-medium sm:block",
                i === step ? "text-navy-900" : "text-muted"
              )}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-navy-900/8 bg-white p-8 shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl font-semibold text-navy-900">Student Information</h2>
                <div className="space-y-2">
                  <Label htmlFor="studentName">Full Name *</Label>
                  <Input id="studentName" {...form.register("studentName")} />
                  {form.formState.errors.studentName && (
                    <p className="text-xs text-red-600">{form.formState.errors.studentName.message}</p>
                  )}
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select id="gender" {...form.register("gender")} defaultValue="">
                      <option value="" disabled>Select</option>
                      {GENDERS.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </Select>
                    {form.formState.errors.gender && (
                      <p className="text-xs text-red-600">{form.formState.errors.gender.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input id="dob" type="date" {...form.register("dob")} />
                    {form.formState.errors.dob && (
                      <p className="text-xs text-red-600">{form.formState.errors.dob.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade Applying For *</Label>
                  <Select id="grade" {...form.register("grade")} defaultValue="">
                    <option value="" disabled>Select grade</option>
                    {GRADES.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </Select>
                  {form.formState.errors.grade && (
                    <p className="text-xs text-red-600">{form.formState.errors.grade.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="previousSchool">Previous School</Label>
                  <Input id="previousSchool" {...form.register("previousSchool")} />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl font-semibold text-navy-900">Parent / Guardian</h2>
                <div className="space-y-2">
                  <Label htmlFor="parentName">Full Name *</Label>
                  <Input id="parentName" {...form.register("parentName")} />
                  {form.formState.errors.parentName && (
                    <p className="text-xs text-red-600">{form.formState.errors.parentName.message}</p>
                  )}
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" {...form.register("phone")} />
                    {form.formState.errors.phone && (
                      <p className="text-xs text-red-600">{form.formState.errors.phone.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" {...form.register("email")} />
                    {form.formState.errors.email && (
                      <p className="text-xs text-red-600">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea id="address" rows={3} {...form.register("address")} />
                  {form.formState.errors.address && (
                    <p className="text-xs text-red-600">{form.formState.errors.address.message}</p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-semibold text-navy-900">Documents & Notes</h2>
                <FileField
                  label="Supporting Documents"
                  hint="Optional additional documents"
                  bucket="general"
                  selected={files.general}
                  onChange={(f) => setFiles((s) => ({ ...s, general: f }))}
                />
                <FileField
                  label="Report Cards"
                  hint="Previous school report cards"
                  bucket="report_cards"
                  selected={files.report_cards}
                  onChange={(f) => setFiles((s) => ({ ...s, report_cards: f }))}
                />
                <FileField
                  label="Birth Certificate"
                  hint="Student birth certificate copy"
                  bucket="birth_certificate"
                  selected={files.birth_certificate}
                  onChange={(f) => setFiles((s) => ({ ...s, birth_certificate: f }))}
                />
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" rows={4} {...form.register("notes")} placeholder="Anything else we should know..." />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-semibold text-navy-900">Review & Submit</h2>
                <dl className="divide-y divide-navy-900/8 text-sm">
                  <div className="grid grid-cols-2 gap-2 py-3">
                    <dt className="text-muted">Student</dt>
                    <dd className="font-medium text-navy-900">{values.studentName}</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-3">
                    <dt className="text-muted">Grade</dt>
                    <dd className="font-medium text-navy-900">{values.grade}</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-3">
                    <dt className="text-muted">Parent</dt>
                    <dd className="font-medium text-navy-900">{values.parentName}</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-3">
                    <dt className="text-muted">Contact</dt>
                    <dd className="font-medium text-navy-900">{values.email} · {values.phone}</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-3">
                    <dt className="text-muted">Files</dt>
                    <dd className="font-medium text-navy-900">
                      {files.general.length + files.report_cards.length + files.birth_certificate.length} attached
                    </dd>
                  </div>
                </dl>
                {form.formState.errors.root && (
                  <p className="text-sm text-red-600">{form.formState.errors.root.message}</p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between border-t border-navy-900/8 pt-6">
          <Button type="button" variant="outline" onClick={back} disabled={step === 0}>
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button type="button" variant="gold" onClick={next}>
              Continue <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="button" variant="gold" onClick={onSubmit} disabled={submitting}>
              {submitting ? "Submitting…" : "Submit Application"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
