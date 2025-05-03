'use client';

import { Toaster as ToasterPrimitive, type ToasterProps } from 'sonner';

import { useTheme } from '@/providers/theme-provider';

const Toast = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();
  return (
    <ToasterPrimitive
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      richColors
      toastOptions={{
        classNames: {
          toast: 'toast border-0! inset-ring! inset-ring-foreground/10!',
          title: 'title',
          description: 'description',
          actionButton:
            'bg-primary! hover:bg-primary/90! text-primary-foreground!',
          cancelButton:
            'bg-transparent! hover:bg-secondary! hover:text-secondary-foreground!',
          closeButton: 'close-button',
        },
      }}
      {...props}
    />
  );
};

export type { ToasterProps };
export { Toast };
