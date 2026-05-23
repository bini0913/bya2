import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import {
  deleteApplicationServer,
  updateApplicationServer,
} from "@/services/applications.service";
import type { ApplicationStatus } from "@/lib/validations/application";
import { prepareApprovalEmail, prepareRejectionEmail } from "@/services/email.service";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") return null;
  return user;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const updates: { status?: ApplicationStatus; admin_notes?: string | null } = {};
  if (body.status) updates.status = body.status;
  if (body.admin_notes !== undefined) updates.admin_notes = body.admin_notes;

  await updateApplicationServer(id, updates);

  if (body.status === "approved" && body.email) {
    await prepareApprovalEmail({
      to: body.email,
      parentName: body.parentName,
      studentName: body.studentName,
      referenceId: body.referenceId,
    });
  }
  if (body.status === "rejected" && body.email) {
    await prepareRejectionEmail({
      to: body.email,
      parentName: body.parentName,
      studentName: body.studentName,
      referenceId: body.referenceId,
    });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await deleteApplicationServer(id);
  return NextResponse.json({ ok: true });
}
