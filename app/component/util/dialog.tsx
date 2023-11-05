// import { dialogStore, selectedFeaturesFormStore } from '@/app/screener/screener-store';
import { dialogStore } from '@/app/app.store';
import { Dialog, Text } from '@mantine/core';

export default function CornerDialog({ message }: { message: string }) {
  const dialog = dialogStore((state) => state);

  return (
    <>
      <Dialog opened={dialog.opened} withCloseButton onClose={() => dialog.closeDialog()} size="lg" radius="md">
        <Text size="sm" mb="xs" fw={500} className='!text-red-600'>
          {message}
        </Text>
      </Dialog>
    </>
  );
}