import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';
import darkTheme from '@/app/lib/dark-theme';
import { fetchAggregateApprovalVotes, fetchAggregatePluralityVotes, fetchParties } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Dashboard',
};
export default async function Page() {
  const pluralityResults = await fetchAggregatePluralityVotes(-1);
  const approvalResults = await fetchAggregateApprovalVotes(-1);
  const parties = await fetchParties();


  const pluralityData = pluralityResults.map(pr => <tr key={pr.partyId.toString()}>
    <td>{parties.find(p => p.id == pr.partyId)?.name}</td>
    <td>{pr.numberOfVotes}</td>
  </tr>)
  const approvalData = approvalResults.map(pr => <tr key={pr.partyId.toString()}>
    <td>{parties.find(p => p.id == pr.partyId)?.name}</td>
    <td>{pr.numberOfVotes}</td>
  </tr>)

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl ${darkTheme.title}`}>
        Dashboard
      </h1>
      <h1 className={`${lusitana.className} text-2xl md:text-4xl ${darkTheme.title}`}>Under construction</h1>
      <div className={`${lusitana.className} text-base p-10 ${darkTheme.title}`}>
        <h1 className='text-xl'>Plurality results:</h1>
        <table>
          <tbody>
            <tr>
              <th>Party</th>
              <th>Votes</th>
            </tr>
            {pluralityData}
          </tbody>
        </table>
      </div>
      <div className={`${lusitana.className} text-base p-10 ${darkTheme.title}`}>
        <h1 className='text-xl'>Approval results:</h1>
        <table>
          <tbody>
            <tr>
              <th>Party</th>
              <th>Votes</th>
            </tr>
            {approvalData}
          </tbody>
        </table>
      </div>
      {/* <div className={`${lusitana.className} text-base ${darkTheme.title}`}>Approval results: <table>{approvalData}</table></div> */}
      {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div> */}
    </main >
  );
}