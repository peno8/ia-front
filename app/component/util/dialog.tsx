// import { dialogStore, selectedFeaturesFormStore } from '@/app/screener/screener-store';
import { dialogStore } from '@/app/app.store';
import { Dialog, Text } from '@mantine/core';
import { useState } from 'react';

export default function CornerDialog({ message }: { message: string }) {
  // const [opened, setOpened] = useState(false);
  const dialog = dialogStore((state) => state);
  // const count = selectedFeaturesFormStore((state) => state.count)
  console.log(dialog);

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