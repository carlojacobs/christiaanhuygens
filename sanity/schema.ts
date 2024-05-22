import { type SchemaTypeDefinition } from 'sanity'

// Imported schemas
import vergadering from './schemas/vergadering';
import lecturer from './schemas/lecturer';
import lecture from './schemas/lecture';
import announcement from './schemas/announcement';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [vergadering, lecturer, lecture, announcement],
}
