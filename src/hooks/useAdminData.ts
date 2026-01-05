import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { toast } from 'sonner';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  active: boolean;
  createdAt: string;
}

// Contacts Hooks
export const useContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const { data } = await api.get('/contact');
      return (data.data || []) as ContactMessage[];
    },
  });
};

export const useMarkContactRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.patch(`/contact/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/contact/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Message supprimé');
    },
  });
};

// Newsletter Hooks
export const useNewsletterSubs = () => {
  return useQuery({
    queryKey: ['newsletter'],
    queryFn: async () => {
      const { data } = await api.get('/newsletter');
      return (data.data || []) as NewsletterSubscription[];
    },
  });
};
