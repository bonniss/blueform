import { FormFieldConfig } from "@/types"
import { FunctionComponent } from "react"
import { useArrayField } from "../provider"

interface ArrayRenderSlotProps {
  render?: FormFieldConfig<any, any>["render"]
}

const ArrayRenderSlot: FunctionComponent<ArrayRenderSlotProps> = ({
  render,
}) => {
  const { fieldProps } = useArrayField()
  const content = render?.({ fieldProps })
  return content
}

export default ArrayRenderSlot
