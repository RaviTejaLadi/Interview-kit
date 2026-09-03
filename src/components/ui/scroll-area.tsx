import * as React from "react"

import { cn } from "@/lib/utils"

type ScrollAreaProps = React.ComponentProps<"div"> & {
  viewportRef?: React.MutableRefObject<HTMLDivElement | null>
  viewportClassName?: string
}

function ScrollArea({
  className,
  children,
  viewportRef,
  viewportClassName,
  ...props
}: ScrollAreaProps) {
  return (
    <div
      data-slot="scroll-area"
      className={cn("relative min-h-0 min-w-0 overflow-hidden", className)}
      {...props}
    >
      <div
        ref={(node) => {
          if (viewportRef) {
            viewportRef.current = node
          }
        }}
        data-slot="scroll-area-viewport"
        className={cn("trackless-scroll size-full overflow-auto overscroll-contain", viewportClassName)}
      >
        {children}
      </div>
    </div>
  )
}

export { ScrollArea }
