import { cn } from "@/src/shared/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-gray", className)}
      {...props}
    />
  )
}

export { Skeleton }
