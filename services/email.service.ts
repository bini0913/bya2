/**
 * Email notification architecture (SMTP not implemented).
 * Wire Resend / SendGrid / Supabase Edge Functions in production.
 */

export type EmailTemplate = "approval" | "rejection" | "contacted";

export type EmailPayload = {
  to: string;
  parentName: string;
  studentName: string;
  referenceId: string;
  template: EmailTemplate;
};

export async function queueApplicationEmail(payload: EmailPayload): Promise<void> {
  // Future: enqueue to email_jobs table or call edge function
  console.info("[BYA Email] Queued (not sent):", payload.template, payload.to, payload.referenceId);
}

export function prepareApprovalEmail(payload: Omit<EmailPayload, "template">) {
  return queueApplicationEmail({ ...payload, template: "approval" });
}

export function prepareRejectionEmail(payload: Omit<EmailPayload, "template">) {
  return queueApplicationEmail({ ...payload, template: "rejection" });
}
