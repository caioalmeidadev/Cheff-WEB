import * as z from 'zod'

export const loginFormSchema = z.object({
  usuario: z.string(),
  senha: z.string(),
})

export type LoginFormDataProps = z.infer<typeof loginFormSchema>
