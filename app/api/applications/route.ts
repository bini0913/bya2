import { NextResponse } from "next/server";
import { applicationSchema } from "@/lib/validations/application";
import { submitApplication } from "@/services/applications.service";
import type { ApplicationDocuments } from "@/lib/validations/application";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = applicationSchema.safeParse(body.form);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const documents = (body.documents ?? {
      general: [],
      report_cards: [],
      birth_certificate: [],
    }) as ApplicationDocuments;

    const result = await submitApplication(parsed.data, documents);
    return NextResponse.json({ referenceId: result.referenceId, demo: result.demo });
  } catch (e) {
    console.error("[applications POST]", e);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
