"use client";

import { useCallback, useState } from 'react';

export const useUpdateForm = (error: string[], handelError: (error: string[]) => void) => {
  const [formData, setFormData] = useState<Post>({})
  const onChangeData = useCallback(
    (value: string, name: keyof Post) => {
      if (error)
        if (error.includes(name)) {
          const newErrors = error.filter(e => e !== name);
          handelError(newErrors);
        }
      setFormData(prev => ({ ...prev,  [name]: value }));
    },
    [error],
  );

  return {
    onChangeData,
    formData
  };
};
