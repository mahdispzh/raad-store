import { UsersTable } from "@/src/app/dashboard/users/_components/users-table";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <UsersTable />
    </Suspense>
  );
}
