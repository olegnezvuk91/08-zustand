import { fetchNotes, FetchNotesRes } from '@/lib/api';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug?: string[] }>;
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
