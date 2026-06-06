import { allDocs, allUis } from "content-collections";

const sortedDocs = [...allDocs].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
const sortedUis = [...allUis].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

function getNavigation<T extends { _meta: { path: string }; title: string }>(
  sorted: T[],
  slug: string,
): {
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
} {
  const currentIndex = sorted.findIndex((p) => p._meta.path === slug);
  if (currentIndex === -1) return { previous: null, next: null };
  return {
    previous:
      currentIndex > 0
        ? {
            slug: sorted[currentIndex - 1]._meta.path,
            title: sorted[currentIndex - 1].title,
          }
        : null,
    next:
      currentIndex < sorted.length - 1
        ? {
            slug: sorted[currentIndex + 1]._meta.path,
            title: sorted[currentIndex + 1].title,
          }
        : null,
  };
}

export const getDocsNavigation = (slug: string) =>
  getNavigation(sortedDocs, slug);
export const getUINavigation = (slug: string) => getNavigation(sortedUis, slug);
