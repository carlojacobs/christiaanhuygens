// Sanity/schemas/lecturer.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'lecturer',
  title: 'Lecturer',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Lector', value: 'lector' },
          { title: 'Memorisant', value: 'memorisant' },
        ],
      },
    }),
  ],
});
