import { Metadata } from 'next';
import { auth } from '@/auth';
import { lusitana } from '@/app/ui/fonts';
import darkTheme from '@/app/lib/dark-theme';
import { fetchParties, getUser } from '@/app/lib/data';
import { User } from '@/app/lib/definitions';
import Form from '@/app/ui/survey/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

export const metadata: Metadata = {
    title: 'New Survey',
};

export default async function Page() {
    const session = await auth();
    const userEmail = session?.user?.email!;
    const parties = await fetchParties();

    return (
        <main className="w-full">
            <div className="flex w-full items-center justify-between mb-6">
                <h1 className={`${lusitana.className} text-2xl ${darkTheme.title}`}>New Survey</h1>
            </div>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Surveys', href: '/dashboard/surveys' },
                    {
                        label: 'Create Survey',
                        href: '/dashboard/surveys/create',
                        active: true,
                    },
                ]}
            />
            <Form parties={parties} />
        </main>
    )
}