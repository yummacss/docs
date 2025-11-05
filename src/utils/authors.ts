export interface Author {
  name: string;
  avatar: string;
  url: string;
}

export const authors: Record<string, Author> = {
  Renildo: {
    name: "Renildo Pereira",
    avatar: "/avatars/renildo.jpg",
    url: "https://x.com/rrenildoo",
  },
};

export function getAuthor(name: string): Author | undefined {
  return authors[name];
}
