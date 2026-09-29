import z from "zod";

export const resourcesCreationValidation = z.object({
  title: z.string("title").min(1, "Title isrequired"),
  description: z.string("description").min(1, "Description is required"),
  type: z.enum(["note", "article", "document", "video", "link"]),
});
