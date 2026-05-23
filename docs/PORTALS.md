# Portal System Plan

## Route Map

```
/portal/student          → Student hub
/portal/student/*        → Module pages (Phase 2)
/portal/parent           → Parent hub
/dashboard/teacher       → Teacher hub
/dashboard/admin         → Admin ERP hub
```

## Module Matrix

| Module | Student | Parent | Teacher | Admin |
|--------|---------|--------|---------|-------|
| Results / Grades | ✓ | ✓ | upload | ✓ |
| Assignments | ✓ | view | create | ✓ |
| Attendance | — | ✓ | mark | ✓ |
| Schedule | ✓ | ✓ | ✓ | ✓ |
| Announcements | ✓ | ✓ | — | publish |
| Payments | — | ✓ | — | ✓ |
| Finance | — | — | — | ✓ |
| Messaging | — | ✓ | ✓ | ✓ |
| Student mgmt | — | — | — | ✓ |
| Events | — | ✓ | — | ✓ |

## Implementation Phases

### Phase 1 (current)
- Portal shells with module cards
- `lib/portal-modules.ts` as single source of truth
- Demo forms on marketing site

### Phase 2
- Supabase Auth login page (`/login`)
- Role-based redirect after sign-in
- RLS policies per table

### Phase 3
- Full CRUD per module
- Recharts dashboards in admin
- Realtime notifications (Supabase Realtime)
- Payment integration (Chapa / Telebirr)

## Shared Components (to build)

- `PortalSidebar` — role-aware navigation
- `PortalHeader` — user menu, notifications
- `DataTable` — admin lists
- `GradeChart` — parent/student views
