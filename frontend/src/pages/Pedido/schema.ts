import * as z from 'zod'

export const pedidoFormSchema = z.object({
  codigo: z.string(),
  descricao: z.string(),
  val_unitario: z.number().default(0),
  qtde: z.number().default(1),
  val_total: z.number().default(0),
  complemento: z.string().optional().default(''),
})

export type pedidoFormDataType = z.infer<typeof pedidoFormSchema>
