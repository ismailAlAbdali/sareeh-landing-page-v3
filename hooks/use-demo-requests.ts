'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { NewDemoRequest } from '@/types/supabase';
import { toast } from 'sonner';

export function useDemoRequests() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitDemoRequest = async (data: NewDemoRequest) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('demo_requests')
        .insert([data]);

      if (error) throw error;

      return { success: true };
    } catch (error: any) {
      console.error('Error submitting demo request:', error);
      return { 
        success: false, 
        error: error.message 
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitDemoRequest,
    isSubmitting
  };
}