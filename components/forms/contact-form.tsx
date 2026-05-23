"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitContactMessage } from "@/services/contact.service";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tc = useTranslations("common");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const schema = z.object({
    name: z.string().min(2, t("name")),
    email: z.string().email(t("email")),
    subject: z.string().min(3, t("subject")),
    message: z.string().min(10, t("message")),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      await submitContactMessage(data);
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
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t("name")}</Label>
          <Input id="name" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name && <p className="text-xs text-red-600" role="alert">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">{t("email")}</Label>
          <Input id="contact-email" type="email" {...register("email")} aria-invalid={!!errors.email} />
          {errors.email && <p className="text-xs text-red-600" role="alert">{errors.email.message}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">{t("subject")}</Label>
        <Input id="subject" {...register("subject")} aria-invalid={!!errors.subject} />
        {errors.subject && <p className="text-xs text-red-600" role="alert">{errors.subject.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">{t("message")}</Label>
        <textarea
          id="contact-message"
          rows={5}
          className="flex w-full rounded-sm border border-navy-900/15 bg-white px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50"
          {...register("message")}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="text-xs text-red-600" role="alert">{errors.message.message}</p>}
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">{t("error")}</p>
      )}
      <Button type="submit" variant="gold" disabled={status === "loading"}>
        {status === "loading" ? tc("sending") : t("submit")}
      </Button>
    </form>
  );
}
