import { Tooltip as ChakraTooltip, Portal } from "@chakra-ui/react"
import * as React from "react"
import { FC } from "react"

interface CustomTooltipTriggerProps extends ChakraTooltip.TriggerProps {
  children?: React.ReactNode
  asChild?: boolean
}

interface CustomTooltipPositionerProps extends ChakraTooltip.PositionerProps {
  children?: React.ReactNode
}

interface CustomTooltipArrowProps extends ChakraTooltip.ArrowProps {
  children?: React.ReactNode
}

const TooltipTriggerWithType = ChakraTooltip.Trigger as FC<CustomTooltipTriggerProps>
const TooltipPositionerWithType = ChakraTooltip.Positioner as FC<CustomTooltipPositionerProps>
const TooltipArrowWithType = ChakraTooltip.Arrow as FC<CustomTooltipArrowProps>

export interface TooltipProps extends ChakraTooltip.RootProps {
  showArrow?: boolean
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
  content: React.ReactNode
  contentProps?: ChakraTooltip.ContentProps
  disabled?: boolean
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const {
      showArrow,
      children,
      disabled,
      portalled = true,
      content,
      contentProps,
      portalRef,
      ...rest
    } = props

    if (disabled) return children

    return (
      <ChakraTooltip.Root {...rest}>
        <TooltipTriggerWithType asChild>{children}</TooltipTriggerWithType>
        <Portal disabled={!portalled} container={portalRef}>
          <TooltipPositionerWithType>
            <ChakraTooltip.Content ref={ref} {...contentProps}>
              {showArrow && (
                <TooltipArrowWithType>
                  <ChakraTooltip.ArrowTip />
                </TooltipArrowWithType>
              )}
              {content}
            </ChakraTooltip.Content>
          </TooltipPositionerWithType>
        </Portal>
      </ChakraTooltip.Root>
    )
  },
)
