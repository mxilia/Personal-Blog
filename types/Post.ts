export interface Post {
  title: string,
  href: string,
  date: string,
  order: string,
  subtopics: Heading[],
  contentHTML: string
}

export interface Heading {
  id: string,
  text: string
}