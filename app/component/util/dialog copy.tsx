import { Dialog, Text } from '@mantine/core';

export default function CornerDialogCope({ opened, close, message }: { opened: boolean, close: () => void, message: string }) {
  return (
    <>
      <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
        <Text size="sm" mb="xs" fw={500} className='!text-red-600'>
          {message}
        </Text>
      </Dialog>
    </>
  );
}