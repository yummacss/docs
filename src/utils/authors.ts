export interface Author {
  name: string;
  avatar: string;
  url: string;
}

export const authors: Record<string, Author> = {
  Renildo: {
    avatar: "https://avatars.githubusercontent.com/u/56491937?v=4",
    name: "Renildo Pereira",
    url: "https://x.com/rrenildoo",
  },
};

export function getAuthor(name: string): Author | undefined {
  return authors[name];
}
