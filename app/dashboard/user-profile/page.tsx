import Form from '@/app/ui/user-profile/edit-form';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { lusitana } from '@/app/ui/fonts';
import darkTheme from '@/app/lib/dark-theme';
import { getUser } from '@/app/lib/data';
import { User } from '@/app/lib/definitions';

export const metadata: Metadata = {
  title: 'User Profile',
};

export default async function Page() {
  const session = await auth();
  const userEmail = session?.user?.email!;

  // const user = await getUser(userEmail);
  const user = {
    id: session?.user?.id,
    name: session?.user?.name,
    email: userEmail,
    password: 'XXX',
    isoauth: true,
    theme: 0
  } as User;

  return (
    <main className="w-full">
      <div className="flex w-full items-center justify-between mb-6">
        <h1 className={`${lusitana.className} text-2xl ${darkTheme.title}`}>Profile</h1>
      </div>
      <div className={`rounded-md bg-gray-50 ${darkTheme.container} p-4 md:p-6`}>
        <div className="mb-4">
          <p className={`
                mb-2 block text-base font-medium text-white
              `}>
            Welcome back, {user.name}!
          </p>
        </div>
      </div>
    </main>
  )
}