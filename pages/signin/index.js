import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Signin() {
  const { data: session } = useSession();
  const router = useRouter()

  if(session){
    router.push("/")
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md flex-col flex justify-center'>
        <div>
          <h1 className='text-2xl font-semibold mb-4'>Login</h1>
          <p className='text-gray-600 mb-6'>
            Get access to your Orders, Wishlist and Recommendations
          </p>
        </div>
        {!session ? (
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 w-fit rounded-md mx-auto'
            onClick={() => signIn('google')}
          >
            Sign in with Google
          </button>
        ) : (
          <div className='text-center'>
            <p className='text-lg font-semibold mb-2'>
              Welcome, {session.user.name}!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
