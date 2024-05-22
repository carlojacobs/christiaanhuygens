// Sanity/schemas/lecture.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'lecture',
  title: 'Lecture',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      options: {
        accept: 'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/pdf',
      },
    }),
  ],
});
