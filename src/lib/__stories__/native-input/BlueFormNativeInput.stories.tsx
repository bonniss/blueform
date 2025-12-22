import { setupForm } from "@/components/helper"
import { ComponentMap } from "@/types"
import { Story } from "@ladle/react"
import { useState } from "react"
import { UserProfile } from "../example/types"
import InputField from "./InputField"
import TextAreaField from "./TextAreaField"

const fieldMapping = {
  text: InputField,
  longText: TextAreaField,
} as const satisfies ComponentMap

const [Form, defineConfig] = setupForm({
  fieldMapping,
})

export const FormWithNativeInput: Story = () => {
  const [formData, setFormData] = useState<any>()

  return (
    <>
      <h2>With native input</h2>
      <Form<UserProfile>
        onFormChange={(fd) => setFormData(fd)}
        renderRoot={({ children, onSubmit }) => (
          <form onSubmit={onSubmit}>{children}</form>
        )}
        config={defineConfig({
          name: {
            type: "text",
            label: "Name",
            props: {
              type: "text",
            },
            rules: {
              required: true,
            },
          },
          password: {
            type: "text",
            label: "Password",
            props: {
              type: "password",
            },
          },
          bio: {
            type: "longText",
            label: "Bio",
          },
        })}
      />
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </>
  )
}
