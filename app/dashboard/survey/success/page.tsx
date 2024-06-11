import { Metadata } from 'next';
import { auth } from '@/auth';
import { lusitana } from '@/app/ui/fonts';
import darkTheme from '@/app/lib/dark-theme';
import { fetchParties, getUser } from '@/app/lib/data';
import { User } from '@/app/lib/definitions';
import Form from '@/app/ui/survey/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export const metadata: Metadata = {
    title: 'Succesful Survey',
};

export default async function Page() {
    const session = await auth();
    const userEmail = session?.user?.email!;

    return (
        <main className="w-full">
            <div className="flex w-full items-center justify-between mb-6">
                <h1 className={`${lusitana.className} text-2xl ${darkTheme.title}`}>Succesfuly Submitted Survey</h1>
            </div>
            <Link
                href="/dashboard"
                className={`flex h-10 items-center rounded-lg bg-gray-100 px-4 font-medium text-gray-600 transition-colors hover:bg-gray-200
                        ${darkTheme.container} ${darkTheme.border} ${darkTheme.text} ${darkTheme.hoverBg} ${darkTheme.hoverText}`}>
                Ok
            </Link>
        </main>
    )
}