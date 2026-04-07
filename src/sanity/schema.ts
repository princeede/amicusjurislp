import { type SchemaTypeDefinition } from "sanity";
import { authorType } from "./schemaTypes/authorType";
import { categoryType } from "./schemaTypes/categoryType";
import { richTextType } from "./schemaTypes/portableText";
import {
  publicationSupportingTypes,
  publicationType,
} from "./schemaTypes/publicationType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Shared
    richTextType,

    // Documents
    authorType,
    categoryType,
    publicationType,

    // Objects (sections, recipient, etc.)
    ...publicationSupportingTypes,
  ],
};
