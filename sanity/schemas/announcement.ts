import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'announcement',
    title: 'Announcement',
    type: 'document',
    fields: [
      {
        name: 'date',
        title: 'Date',
        type: 'datetime',
        description: 'The date and time of the announcement.'
      },
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'The title of the announcement.'
      },
      {
        name: 'body',
        title: 'Body',
        type: 'text',
        description: 'The full text of the announcement.'
      }
    ]
  });
  