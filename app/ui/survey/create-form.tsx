'use client';

import { CustomerField, Party } from '@/app/lib/definitions';
import Link from 'next/link';
import {
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createSurvey } from '@/app/lib/actions';
import { createInvoice } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import darkTheme from '@/app/lib/dark-theme';

export default function Form({ parties }: { parties: Party[] }) {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createSurvey, initialState);

    return (
        <form action={dispatch}>
            <div className={`rounded-md bg-gray-50 ${darkTheme.container} p-4 md:p-6`}>
                {/* Plurality Selection */}
                <fieldset>
                    <legend className={`mb-2 block text-sm font-medium ${darkTheme.text}`}>
                        Choose ONE party
                    </legend>
                    <div className={`rounded-md border border-gray-200 bg-white px-[14px] py-3
                        ${darkTheme.bg} ${darkTheme.border}`}>
                        <div className="gap-4">
                            {parties.map((party) => (
                                <div key={party.id} className="flex items-center  py-1">
                                    <input
                                        id={party.id.toString()}
                                        name="pluralityId" type="radio" value={party.id}
                                        className={`h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2
                                                ${darkTheme.container} ${darkTheme.border} ${darkTheme.text}`}
                                        aria-describedby="status-error"
                                    />
                                    <label
                                        htmlFor={party.id.toString()}
                                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                                        {party.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div id="status-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.pluralityId &&
                            state.errors.pluralityId.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </fieldset>

                {/* Approval Selection */}
                <fieldset>
                    <legend className={`mb-2 block text-sm font-medium ${darkTheme.text}`}>
                        Choose ONE OR MORE parties
                    </legend>
                    <div className={`rounded-md border border-gray-200 bg-white px-[14px] py-3
                        ${darkTheme.bg} ${darkTheme.border}`}>
                        <div className="gap-4">
                            {parties.map((party) => (
                                <div key={party.id} className="flex items-center  py-1">
                                    <input
                                        id={'approval-' + party.id.toString()}
                                        name="approvalIds" type="checkbox" value={party.id}
                                        className={`h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2
                                                ${darkTheme.container} ${darkTheme.border} ${darkTheme.text}`}
                                        aria-describedby="status-error"
                                    />
                                    <label
                                        htmlFor={'approval-' + party.id.toString()}
                                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                                        {party.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div id="status-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.approvalIds &&
                            state.errors.approvalIds.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </fieldset>

                {state.message && (
                    <p className="mt-2 text-sm text-red-500" key={state.message}>
                        {state.message}
                    </p>
                )}
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard"
                    className={`flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200
                        ${darkTheme.container} ${darkTheme.border} ${darkTheme.text} ${darkTheme.hoverBg} ${darkTheme.hoverText}`}>
                    Cancel
                </Link>
                <Button type="submit">Submit Survey</Button>
            </div>
        </form>
    );
}
