import { z as zod} from "zod";

export const idParams= zod.object({
    id: zod.string().regex(/^\d+$/, "id must be a number"),
})

export const bodyReq= zod.object({
    title: zod.string().min(1).max(15).regex(/^[^@<>/"'&]+$/),
    description: zod.string().max(50).regex(/^[^@<>/"'&]+$/).optional(),
})