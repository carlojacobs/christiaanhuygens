// import { groq } from "next-sanity";

// // Get all posts
// export const postsQuery = groq`*[_type == "post"] {
//   _createdAt,
//   title,
//   slug,
//   mainImage,
//   "imageURL": mainImage.asset->url,
//   "authorName": author->name,
// }`;

// // Get a single post by its slug
// export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{ 
//     title, description, mainImage, body
//   }`;

// // Get all post slugs
// export const postPathsQuery = groq`*[_type == "post" && defined(slug.current)][]{
//     "params": { "slug": slug.current }
//   }`;

import { groq } from "next-sanity";

// Get all vergaderingen
export const vergaderingenQuery = groq`*[_type == "vergadering"] | order(date desc) {
  _createdAt,
  number,
  date,
  location,
  lecturer,
  "invitationUrl": invitation.asset->url,
  lecture {
    title,
    "fileUrl": file.asset->url
  }
}`;

// Get a single vergadering by its number
export const vergaderingQuery = groq`*[_type == "vergadering" && number == $number][0]{ 
    number,
    date,
    location,
    lecturer,
    "invitationUrl": invitation.asset->url,
    "presentationUrl": presentation.asset->url
  }`;

// Get all vergadering numbers
export const vergaderingNumbersQuery = groq`*[_type == "vergadering" && defined(number)][]{
    "params": { "number": number }
  }`;
