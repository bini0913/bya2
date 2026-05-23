"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitAdmissionInquiry } from "@/services/admissions.service";

export function AdmissionForm() {
  const t = useTranslations("admissions.form");
  const tc = useTranslations("common");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const schema = z.object({
    parentName: z.string().min(2, t("parentName")),
    email: z.string().email(t("email")),
    phone: z.string().min(8, t("phone")),
    gradeInterest: z.string().min(1, t("gradeInterest")),
    message: z.string().optional(),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      await submitAdmissionInquiry(data);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border border-gold-500/30 bg-gold-500/10 p-8 text-center" role="status">
        <p className="font-display text-xl font-semibold text-navy-900">{t("successTitle")}</p>
        <p className="mt-2 text-muted">{t("successMessage")}</p>
        <Button className="mt-6" variant="outline" onClick={() => setStatus("idle")}>
          {t("submitAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="parentName">{t("parentName")}</Label>
          <Input id="parentName" {...register("parentName")} aria-invalid={!!errors.parentName} />
          {errors.parentName && (
            <p className="text-xs text-red-600" role="alert">{errors.parentName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />
          {errors.email && (
            <p className="text-xs text-red-600" role="alert">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input id="phone" type="tel" {...register("phone")} aria-invalid={!!errors.phone} />
          {errors.phone && (
            <p className="text-xs text-red-600" role="alert">{errors.phone.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="gradeInterest">{t("gradeInterest")}</Label>
          <Input
            id="gradeInterest"
            placeholder={t("gradePlaceholder")}
            {...register("gradeInterest")}
            aria-invalid={!!errors.gradeInterest}
          />
          {errors.gradeInterest && (
            <p className="text-xs text-red-600" role="alert">{errors.gradeInterest.message}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{t("message")}</Label>
        <textarea
          id="message"
          rows={4}
          className="flex w-full rounded-sm border border-navy-900/15 bg-white px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50"
          {...register("message")}
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">{t("error")}</p>
      )}
      <Button type="submit" variant="gold" disabled={status === "loading"}>
        {status === "loading" ? tc("submitting") : t("submit")}
      </Button>
    </form>
  );
}
