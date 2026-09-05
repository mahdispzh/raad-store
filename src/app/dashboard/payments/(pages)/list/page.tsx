"use client";

import { useRouter } from "next/navigation";

import { AllTransactionsTable } from "../../_components/all-transactions-table";

export default function AllTransactionsPage() {
  const router = useRouter();

  return (
   
<>
          <AllTransactionsTable />

</>
      
        
  );
}