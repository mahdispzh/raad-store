// quick-card.ui.tsx
"use client";

import { SimpleButton } from "@/src/shared/ui/simple-button/simple-button.ui";
import { Text } from "@/src/shared/ui/text/text.ui";
import { StyledButton } from "../../../../shared/ui/styled-button/styled-button.ui";
import { QuickCardProps } from "../_types/dashboard-home.types";

// Quick actions card component
export function QuickCard({ items, className = "" }: QuickCardProps) {
  return (
    // Responsive grid container
    <div
      className={`grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5 ${className}`}
    >
      {items.map((item) => (
        // Individual card item
        <div
          key={item.id}
          className="flex h-[4vw] items-center justify-between rounded-sm bg-pure-white px-4 shadow-xl"
        >
          {/* Label */}
          <div className="flex items-center">
            <Text text={item.label} color="primary" size="md" weight="medium" />
          </div>

          {/* Actions container */}
          <div className="flex items-center gap-2">
            {/* Button type */}
            {item.isButton && item.value ? (
              <SimpleButton
                label={item.value}
                icon={item.buttonIcon}
                iconPosition="right"
                action={item.onClick || (() => {})}
              />
            ) : (
              <>
                {/* Value with separator */}
                {item.value && (
                  <>
                    <span className="text-gray">|</span>
                    <Text
                      text={item.value}
                      color="primary"
                      size="md"
                      weight="medium"
                    />
                  </>
                )}
              </>
            )}

            {/* Icon button */}
            {item.icon && (
              <StyledButton
                variant="icon"
                icon={item.icon}
                action={() => {}}
                size="md"
                type="primary"
                style="fill"
              />
            )}

            {/* Icon button with action */}
            {!item.isButton && item.buttonIcon && (
              <StyledButton
                variant="icon"
                icon={item.buttonIcon}
                action={item.onClick || (() => {})}
                size="md"
                type="primary"
                style="fill"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
