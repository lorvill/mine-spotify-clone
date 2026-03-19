import { z as zod} from "zod";

export const idParams= zod.object({
  id: zod.coerce.number()
})

export const bodyReq= zod.object({
  title: zod.string().min(1).max(30).regex(/^[^@<>/"'&]+$/),
  description: zod.string().max(50).regex(/^[^@<>/"'&]+$/).optional(),
})