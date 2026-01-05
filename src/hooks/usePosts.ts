import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { toast } from 'sonner';

export type ContentType = "about" | "programme" | "evenement" | "carousel" | "activite";

export interface Post {
    id: string;
    type: ContentType;
    title: string;
    content: string;
    category?: string;
    date: string;
    status: "draft" | "published";
    imageUrl?: string;
    author?: string;
    createdAt?: string;
    updatedAt?: string;
}

// Fetch posts
const fetchPosts = async (type?: ContentType, status?: string) => {
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (status) params.append('status', status);
    
    const { data } = await api.get(`/posts?${params.toString()}`);
    // Handle both direct array and { data: [...] } structure
    const posts = Array.isArray(data) ? data : (data && typeof data === 'object' && Array.isArray((data as any).data) ? (data as any).data : []);
    return posts as Post[];
};

export const usePosts = (type?: ContentType, status?: string) => {
    return useQuery({
        queryKey: ['posts', type, status],
        queryFn: () => fetchPosts(type, status),
    });
};

// Mutations
export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ post, file }: { post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>, file?: File }) => {
            const formData = new FormData();
            formData.append('type', post.type);
            formData.append('title', post.title);
            formData.append('content', post.content);
            if (post.category) formData.append('category', post.category);
            formData.append('date', post.date);
            formData.append('status', post.status);
            if (post.author) formData.append('author', post.author);
            if (file) formData.append('image', file);

            const { data } = await api.post('/posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            toast.success('Contenu créé avec succès');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Erreur lors de la création');
        }
    });
};

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, post, file }: { id: string, post: Partial<Post>, file?: File }) => {
            const formData = new FormData();
            // Append only defined fields
            Object.keys(post).forEach(key => {
                const value = post[key as keyof Post];
                if (value !== undefined && key !== 'id' && key !== 'imageUrl' && key !== 'createdAt' && key !== 'updatedAt') {
                    formData.append(key, value as string);
                }
            });
            
            // Handle existing image URL if strict, but backend handles it based on file presence usually.
            // If file is provided, it overrides.
            if (file) formData.append('image', file);
            else if (post.imageUrl) {
                 // Should we send generic string? API expects 'image' as file or data fields.
                 // Backend logic: const imageUrl = file ? ... : data.imageUrl;
                 formData.append('imageUrl', post.imageUrl);
            }

            const { data } = await api.put(`/posts/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            toast.success('Contenu mis à jour');
        },
        onError: (error: any) => {
             toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour');
        }
    });
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/posts/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            toast.success('Contenu supprimé');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Erreur lors de la suppression');
        }
    });
};
