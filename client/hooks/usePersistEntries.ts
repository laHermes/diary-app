import {
	createEntryMutation,
	deleteEntryMutation,
	updateEntryMutation,
} from '@config/api';
import { APP_ROUTES } from '@features/Routes/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const usePersistEntries = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	// Create Entry
	const createEntry = useMutation({
		mutationFn: createEntryMutation,
		onMutate: async (newEntry: IEntry) => {
			console.log(newEntry);
			// Cancel any outgoing refetches
			// (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries({ queryKey: ['Entries'] });

			// Snapshot the previous value
			const previousEntries = queryClient.getQueryData(['Entries']);

			// Optimistically update to the new value
			queryClient.setQueryData(['Entries'], (old: any) => [...old, newEntry]);

			return { previousEntries };
		},
		onError: (err, newEntry: IEntry, context) => {
			queryClient.setQueryData(['Entries'], context?.previousEntries);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['Entries'] });
		},
		onSuccess: () => {
			toast.success('Entry saved!') && router.push(APP_ROUTES.JOURNAL);
		},
	});

	// Update Entry
	const updateEntry = useMutation({
		mutationFn: updateEntryMutation,
		onMutate: async (newEntry: IEntry) => {
			// Cancel any outgoing refetches
			// (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries({ queryKey: ['Entries', newEntry.id] });

			// Snapshot the previous value
			const previousEntry = queryClient.getQueryData(['Entries', newEntry.id]);

			// Optimistically update to the new value
			queryClient.setQueryData(['Entries', newEntry.id], newEntry);

			// Return a context with the previous and new Entry
			return { previousEntry, newEntry };
		}, // If the mutation fails, use the context we returned above
		onError: (context: any) => {
			queryClient.setQueryData(
				['Entries', context?.newEntry.id],
				context?.previousEntry
			);
		},
		// // Always refetch after error or success:
		// onSettled: (newEntry: IEntry) => {
		// 	queryClient.invalidateQueries({ queryKey: ['Entries', newEntry.id] });
		// },
		onSuccess: () => {
			toast.success('Entry updated!') && router.push(APP_ROUTES.JOURNAL);
		},
	});

	// Delete Entry
	const deleteEntry = useMutation({
		mutationFn: deleteEntryMutation,
		onSuccess: () => {
			toast.success('Entry Deleted!') && router.push(APP_ROUTES.JOURNAL);
		},
	});
	return { createEntry, updateEntry, deleteEntry };
};

export default usePersistEntries;
