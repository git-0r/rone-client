import { getSession } from "@auth0/nextjs-auth0";
import Form from "@/components/upload";

export default async function Upload() {
  const session = await getSession();

  return (
    <main className="h-[calc(100vh-3.5rem)] w-full flex flex-col items-center">
      <Form user={session?.user} token={session?.accessToken} />
    </main>
  );
}
