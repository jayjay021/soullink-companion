import SessionClientView from './SessionClientView';

export default async function SessionPage({
  params,
}: {
  params: { sessionId: string };
}) {
  const { sessionId } = await params;
  return <SessionClientView sessionId={sessionId} />;
}
