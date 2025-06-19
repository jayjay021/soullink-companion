import { SessionView } from './SessionView';

export default async function SessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  return <SessionView sessionId={sessionId} />;
}
