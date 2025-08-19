import { fetchNotes, FetchNotesRes } from '@/lib/api';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  const tag = slug?.[0] === 'all' ? undefined : slug?.[0];

  return {
    title: `Notes: ${tag ? `${tag}` : 'all'}`,
    description: `Note: ${tag || 'all'} — created in Notehub.`,
    openGraph: {
      title: `Notes: ${tag ? `${tag}` : 'all'}`,
      description: `Note: ${tag || 'all'} — created in Notehub.`,
      url: `https://08-zustand-zeta-one.vercel.app/notes/filter/${(slug ?? []).join('/')}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'notehub image',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Notes: ${tag ? `${tag}` : 'all'}`,
      description: `Note: ${tag || 'all'} — created in Notehub.`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'notehub image',
        },
      ],
    },
  };
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;

  const initialPage = 1;
  const initialSearch = '';

  const tag = slug?.[0] === 'all' ? undefined : slug?.[0];

  const initialData: FetchNotesRes = await fetchNotes(
    initialSearch,
    initialPage,
    tag,
  );

  return <NotesClient initialData={initialData} tag={tag} />;
}
