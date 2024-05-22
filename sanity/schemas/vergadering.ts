import { defineField, defineType } from 'sanity';

import lecturer from './lecturer';
import lecture from './lecture';

export default defineType({
  name: 'vergadering',
  title: 'Vergadering',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Number',
      type: 'number',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'lecturer',
      title: 'Lecturer',
      type: 'lecturer',
    }),
    defineField({
      name: 'invitation',
      title: 'Invitation (PDF File)',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    }),
    defineField({
      name: 'lecture',
      title: 'Lecture',
      type: 'lecture'
    }),
  ],
});
