import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/services/api";

// Define Types
type ContentType = "about" | "programme" | "evenement" | "carousel" | "activite" | "partenaire" | "timeline";

interface Post {
    id: string;
    type: ContentType;
    title: string;
    content: string; // Markdown or simple text
    category?: string;
    date: string;
    endDate?: string;
    status: "draft" | "published";
    imageUrl?: string;
    author?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AdminUser {
    id: string;
    email: string;
    name: string;
    role: "admin" | "editor";
    avatar?: string;
    token?: string;
}

interface ContentContextType {
    posts: Post[];
    addPost: (post: Post, file?: File) => Promise<void>;
    updatePost: (post: Post, file?: File) => Promise<void>;
    deletePost: (id: string) => Promise<void>;
    getPostsByType: (type: ContentType) => Post[];
    getPublishedPostsByType: (type: ContentType) => Post[];
    currentUser: AdminUser | null;
    setCurrentUser: (user: AdminUser | null) => void;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Initial Dummy Data
const initialPosts: Post[] = [
    {
        id: "1",
        type: "evenement",
        title: "Atelier de Formation Couture",
        content: "Formation en couture et design vestimentaire pour les femmes sourdes.",
        date: "2024-03-25",
        status: "published",
        imageUrl: "/path/to/image.jpg"
    },
    {
        id: "2",
        type: "evenement",
        title: "Conférence sur l'Inclusion",
        content: "Table ronde sur l'inclusion professionnelle des personnes sourdes.",
        date: "2024-04-15",
        status: "published",
        imageUrl: "/path/to/image2.jpg"
    },
    {
        id: "3",
        type: "programme",
        title: "Autonomisation Économique",
        content: "Programme visant à fournir des compétences entrepreneuriales.",
        date: "2024-01-10",
        status: "published"
    }
];

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Load from localStorage cache initially
    const [posts, setPosts] = useState<Post[]>([]);

    const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
        const saved = localStorage.getItem("asafs_user");
        return saved ? JSON.parse(saved) : null;
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load data from Backend on mount
    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const { data } = await api.get('/posts');
                
                // Robust array check
                const postsArray = Array.isArray(data) ? data : (data && typeof data === 'object' && Array.isArray((data as any).data) ? (data as any).data : []);
                
                const hostURL = api.defaults.baseURL?.replace('/api', '') || '';
                const formattedData = postsArray.map((p: any) => ({
                    ...p,
                    imageUrl: p.imageUrl ? (p.imageUrl.startsWith('http') ? p.imageUrl : `${hostURL}${p.imageUrl}`) : undefined
                }));

                setPosts(formattedData);
            } catch (err) {
                console.error("Failed to fetch posts:", err);
                setError("Failed to load content.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Sync user to localStorage whenever currentUser changes
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("asafs_user", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("asafs_user");
        }
    }, [currentUser]);

    const addPost = async (post: Post, file?: File) => {
        try {
            const formData = new FormData();
            formData.append('type', post.type);
            formData.append('title', post.title);
            formData.append('content', post.content);
            if (post.category) formData.append('category', post.category);
            formData.append('date', post.date);
            formData.append('status', post.status);
            if (post.author) formData.append('author', post.author);
            if (file) {
                formData.append('image', file);
            }

            const { data } = await api.post('/posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const hostURL = api.defaults.baseURL?.replace('/api', '') || '';
            const newPost = {
                 ...data,
                 imageUrl: data.imageUrl ? (data.imageUrl.startsWith('http') ? data.imageUrl : `${hostURL}${data.imageUrl}`) : undefined
            };
            setPosts((prev) => [newPost, ...prev]);
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    const updatePost = async (updatedPost: Post, file?: File) => {
        try {
            const formData = new FormData();
            formData.append('type', updatedPost.type);
            formData.append('title', updatedPost.title);
            formData.append('content', updatedPost.content);
            if (updatedPost.category) formData.append('category', updatedPost.category);
            formData.append('date', updatedPost.date);
            formData.append('status', updatedPost.status);
            if (updatedPost.author) formData.append('author', updatedPost.author);
             // Important: if we don't upload a new file, we might want to keep the old imageUrl or not send 'image' key.
             // If we send 'imageUrl' as text, the server can use it.
             // Our server logic checks req.file OR req.body.imageUrl.
             if (file) {
                formData.append('image', file);
             } else if (updatedPost.imageUrl) {
                 // Convert absolute URL back to relative if needed or just pass it?
                 // The server expects `/uploads/...`. 
                 // If our frontend has `http://localhost:3000/uploads/...`, we should probably strip the domain or handled in backend.
                 // Simple hack: just send it as is, and ensure backend handles it or just ignores if not file.
                 // Actually backend logic: `const imageUrl = req.file ? ... : bodyImageUrl;`
                  formData.append('imageUrl', updatedPost.imageUrl.replace(api.defaults.baseURL?.replace('/api', '') || '', ''));
             }

            const { data } = await api.put(`/posts/${updatedPost.id}`, formData, {
                 headers: { 'Content-Type': 'multipart/form-data' }
            });

             const hostURL = api.defaults.baseURL?.replace('/api', '') || '';
             const newPost = {
                 ...data,
                 imageUrl: data.imageUrl ? (data.imageUrl.startsWith('http') ? data.imageUrl : `${hostURL}${data.imageUrl}`) : undefined
            };

            setPosts((prev) => prev.map((p) => (p.id === updatedPost.id ? newPost : p)));
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const deletePost = async (id: string) => {
        try {
            await api.delete(`/posts/${id}`);
            setPosts((prev) => prev.filter(p => p.id !== id));
        } catch (error) {
             console.error('Error deleting post:', error);
        }
    };

    const getPostsByType = (type: ContentType) => {
        return posts.filter((p) => p.type === type);
    };

    const getPublishedPostsByType = (type: ContentType) => {
        return posts.filter((p) => p.type === type && p.status === 'published');
    };

    return (
        <ContentContext.Provider value={{
            posts,
            addPost,
            updatePost,
            deletePost,
            getPostsByType,
            getPublishedPostsByType,
            currentUser,
            setCurrentUser,
            isAuthenticated: !!currentUser,
            isLoading,
            error
        }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error("useContent must be used within a ContentProvider");
    }
    return context;
};
