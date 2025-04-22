'use client';

import { useSession, signOut } from "next-auth/react";

// Extend the Session type to include the 'id' property
declare module "next-auth" {
  interface Session {
    user: {
        id?: string | null;
        name?: string | null;
        email?: string | null;
        image?: string | null;
      }
      accessToken?: string | null;
    }
  }

// import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>; // Show a loading state while session is being fetched
  }

  if (!session) {
    router.push('/signin'); // Redirect to login if not authenticated
    return null; // Prevent rendering the rest of the component
  }

  console.log("session", session);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
          Dashboard
        </h1>
        <div className="space-y-4 max-w-sm">
          {/* <p>
            <strong>User ID:</strong> {session.user?.id || "N/A"}
          </p>
          <p>
            <strong>Name:</strong> {session.user?.name || "N/A"}
          </p>
           */}
          {/* <p>
            <strong>Image:</strong>
          </p> */}
          {/* <Image
            src={session.user?.image || '/default-avatar.png'}
            alt="User Image"
            className="w-16 h-16 rounded-full"
            width={300}
            height={400}
          /> */}
          <p>
            <strong>Email:</strong> {session.user?.email || "N/A"}
          </p>
          <p className="max-w-sm ">
            <strong>Access Token:</strong> {session?.accessToken || "N/A"}
          </p>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: '/signin' })}
          className="mt-6 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Page;