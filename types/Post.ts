export interface Post {
  title: string,
  href: string,
  date: string,
  order: string,
  subtopics: Heading[],
  contentHTML: string,
  showSubTopics: boolean[]
}

export interface Heading {
  id: string,
  text: string
}