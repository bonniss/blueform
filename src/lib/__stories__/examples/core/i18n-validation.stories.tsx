import { setupForm, defineFieldMapping } from "@/components/form/setup"
import { Story, StoryDefault } from "@ladle/react"
import InputField from "../../components/with-native/InputField"

export default {
  title: "Core",
} satisfies StoryDefault

const [Form, defineConfig] = setupForm({
  renderRoot: ({ children, onSubmit }) => (
    <form onSubmit={onSubmit}>{children}</form>
  ),
  fieldMapping: defineFieldMapping({
    text: InputField,
  }),
  i18nConfig: {
    validationTranslation: {
      required: "field.required",
      minLength: "field.minLength",
    },
    t: (message, params) => {
      switch (message) {
        case "field.required":
          return `${params?.field} is required`
        case "field.minLength":
          return `${params?.field} must be at least ${params?.minLength} characters`
        default:
          return message
      }
    },
  },
})

export const ValidationAndI18n: Story = () => {
  return (
    <Form
      onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
      config={defineConfig({
        username: {
          type: "text",
          label: "Username",
          rules: {
            required: true,
            minLength: 4,
          },
        },
      })}
    >
      <button type="submit">Submit</button>
    </Form>
  )
}
