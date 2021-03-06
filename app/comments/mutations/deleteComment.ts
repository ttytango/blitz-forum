import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteComment = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteComment), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, add validation to ensure correct tenant
  return await db.comment.deleteMany({ where: { id } })
})
