import { z } from "zod";

import { labelsData } from "../_data/labels";

import { UserSchema } from "./user-schema";

import { MAX_SIZE } from "../constants";

const CommentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  text: z
    .string()
    .trim()
    .min(2, { message: "Comment must be at least 2 characters." })
    .min(250, { message: "Comment must be at most 250 characters." }),
  createdAt: z.date(),
});

const FileSchema = z.object({
  url: z.string(),
  name: z.string(),
  size: z.number().max(MAX_SIZE, {
    message: "File size must be less than or equal to 50 MB.",
  }),
  type: z.string(),
});

export const KanbanTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(50, { message: "Title must be at most 50 characters." }),
  description: z
    .string()
    .trim()
    .min(2, { message: "Description must be at least 2 characters." })
    .max(250, { message: "Description must be at most 250 characters." })
    .optional(),
  label: z.custom<string>(
    (value) => labelsData.some((label) => label.name === value),
    { message: "Invalid label. Please select a valid label." }
  ),
  assigned: z
    .array(UserSchema)
    .min(1, { message: "At least one user must be assigned." }),
  comments: z.array(CommentSchema),
  dueDate: z.date({
    required_error: "Due date is required.",
    invalid_type_error: "Invalid due date. Please provide a valid date.",
  }),
  attachments: z
    .array(FileSchema)
    .max(10, { message: "You can attach a maximum of 10 files." }),
});
