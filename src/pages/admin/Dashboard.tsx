import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { usePosts, useCreatePost, useUpdatePost, useDeletePost, Post, ContentType } from '@/hooks/usePosts';
import { useContent } from '@/lib/ContentContext';
import { useTranslation } from 'react-i18next';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Plus, Pencil, Trash2, LayoutDashboard, FileText, Calendar, Image as ImageIcon, LogOut, Settings, Mail, Bell, Users, CheckCircle, Eye } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useContacts, useNewsletterSubs, useMarkContactRead, useDeleteContact } from '@/hooks/useAdminData';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const Dashboard = () => {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContent();
    const { t } = useTranslation();
    
    // React Query Hooks
    // Fetch all for now, or fetch by active tab?
    // Let's fetch all and filter client side for better UX or fetch by active tab if many calls
    // Optimizing: fetch all on load or separate queries?
    // The previous implementation used getPostsByType. 
    // Let's use specific queries based on activeTab if it's not dashboard.
    // Actually, dashboard needs stats from ALL types.
    
    const { data: allPosts, isLoading } = usePosts();
    const { data: allContacts, isLoading: isLoadingContacts } = useContacts();
    const { data: allSubs, isLoading: isLoadingSubs } = useNewsletterSubs();
    
    const markContactReadMutation = useMarkContactRead();
    const deleteContactMutation = useDeleteContact();

    const createPostMutation = useCreatePost();
    const updatePostMutation = useUpdatePost();
    const deletePostMutation = useDeletePost();
    
    if (!currentUser) return null;
    
    const posts = allPosts || [];
    const getPostsByType = (type: string) => posts.filter(p => p.type === type);
    const getStats = (type: string) => getPostsByType(type).length;



    useEffect(() => {
        if (!currentUser) {
            navigate('/admin');
        }
    }, [currentUser, navigate]);

    const [activeTab, setActiveTab] = useState<'dashboard' | 'about' | 'programme' | 'evenement' | 'carousel' | 'activite' | 'contacts' | 'newsletter' | 'settings'>('dashboard');
    const [isEditing, setIsEditing] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [previewMode, setPreviewMode] = useState(false);
    const [isDragActive, setIsDragActive] = useState(false);

    // Form State avec imageUrl
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        date: '',
        status: 'draft' as 'draft' | 'published',
        type: 'evenement' as ContentType,
        imageUrl: ''
    });
    // State pour le fichier image sélectionné (File object)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processImageFile(file);
        }
    };

    const processImageFile = (file: File) => {
        // Vérifier le type de fichier
        if (!file.type.startsWith('image/')) {
            toast.error("Veuillez sélectionner une image valide");
            return;
        }

        // Vérifier la taille (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("L'image ne doit pas dépasser 5MB");
            return;
        }

        setSelectedFile(file); // Stocker le fichier pour l'envoi
        
        // Prévisualisation seulement
        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target?.result as string;
            setFormData({ ...formData, imageUrl: result });
            toast.success("Image sélectionnée avec succès");
        };
        reader.onerror = () => {
            toast.error("Erreur lors de la lecture de l'image");
        };
        reader.readAsDataURL(file);
    };

    // Drag and Drop Handlers
    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragActive(true);
        } else if (e.type === "dragleave") {
            setIsDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            processImageFile(files[0]);
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        toast.success("Déconnecté avec succès");
        navigate('/admin');
    };

    const handleEdit = (post: Post) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            content: post.content,
            category: post.category || '',
            date: post.date,
            status: post.status,
            type: post.type,
            imageUrl: post.imageUrl || ''
        });
        setSelectedFile(null); // Reset selected file on edit start
        setIsEditing(true);
        setPreviewMode(false);
    };

    const handleNew = (type: ContentType) => {
        setEditingPost(null);
        setFormData({
            title: '',
            content: '',
            category: '',
            date: new Date().toISOString().split('T')[0],
            status: 'draft',
            type: type,
            imageUrl: ''
        });
        setSelectedFile(null); // Reset selected file
        setIsEditing(true);
        setPreviewMode(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const postData = {
            ...formData,
            author: currentUser?.name || 'Anonyme',
        };

        if (editingPost) {
            updatePostMutation.mutate({ 
                id: editingPost.id, 
                post: postData, 
                file: selectedFile || undefined 
            }, {
                onSuccess: () => {
                    setIsEditing(false);
                    setEditingPost(null);
                }
            });
        } else {
            createPostMutation.mutate({ 
                post: postData, 
                file: selectedFile || undefined 
            }, {
                onSuccess: () => {
                    setIsEditing(false);
                    setEditingPost(null);
                }
            });
        }
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Access row click usually opens edit
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce contenu ?")) {
            deletePostMutation.mutate(id);
        }
    };
    
    // Derived state for stats - Removed duplicates
    
    const handlePublish = (post: Post) => {
        // Create a proper Post object for the mutation
        const updatedPost = {
            title: post.title,
            content: post.content,
            date: post.date,
            status: 'published' as const,
            type: post.type,
            imageUrl: post.imageUrl
        };

        updatePostMutation.mutate({ 
            id: post.id, 
            post: updatedPost 
        }, {
            onSuccess: () => {
                toast.success("Contenu publié avec succès !");
            }
        });
    };

    // Render Helpers
    const renderPostList = (type: ContentType) => {
        const typePosts = getPostsByType(type);
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold capitalize">Gestion {type}</h3>
                    <Button onClick={() => handleNew(type)} className="bg-blue-600 hover:bg-blue-700">
                        + Créer Nouveau
                    </Button>
                </div>
                {typePosts.length === 0 ? (
                    <p className="text-gray-500 italic">Aucun contenu pour le moment.</p>
                ) : (
                    <div className="grid gap-4">
                        {typePosts.map((post) => (
                            <div key={post.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                                <div className="flex justify-between items-start gap-4">
                                    {/* Image */}
                                    {post.imageUrl && (
                                        <div className="w-24 h-24 flex-shrink-0">
                                            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover rounded-lg" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg">{post.title}</h4>
                                        <div className="flex gap-3 text-sm text-gray-500 mt-2 flex-wrap">
                                            <span>{post.date}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {post.status === 'published' ? 'Publié' : 'Brouillon'}
                                            </span>
                                            {post.author && <span className="text-gray-400">par {post.author}</span>}
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{post.content}</p>
                                    </div>
                                    <div className="flex gap-2 ml-4 flex-shrink-0">
                                        {post.status === 'draft' && (
                                            <Button variant="outline" size="sm" onClick={() => handlePublish(post)} className="text-green-600 border-green-600 hover:bg-green-50">
                                                Publier
                                            </Button>
                                        )}
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>Modifier</Button>
                                        <Button variant="destructive" size="sm" onClick={(e) => handleDelete(post.id, e)}>Supprimer</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderEditor = () => {
        if (previewMode) {
            return (
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto border-2 border-dashed border-blue-300">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h2 className="text-xl font-bold text-blue-600 uppercase tracking-widest">📋 Prévisualisation</h2>
                        <Button variant="outline" onClick={() => setPreviewMode(false)}>Retour à l'édition</Button>
                    </div>
                    <div className="prose max-w-none">
                        <div className="mb-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${formData.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {formData.status === 'published' ? 'Publié' : 'Brouillon'}
                            </span>
                        </div>
                        {formData.imageUrl && (
                            <div className="mb-6">
                                <img src={formData.imageUrl} alt={formData.title} className="w-full max-h-96 object-cover rounded-lg" />
                            </div>
                        )}
                        <h1 className="text-3xl font-bold mb-2 text-gray-900">{formData.title || 'Titre à ajouter'}</h1>
                        <p className="text-sm text-gray-500 mb-6">📅 {formData.date}</p>
                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed bg-gray-50 p-4 rounded border border-gray-200">
                            {formData.content || 'Contenu à ajouter'}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">{editingPost ? 'Modifier Contenu' : 'Nouveau Contenu'}</h3>
                    <Button variant="ghost" onClick={() => setIsEditing(false)}>Annuler</Button>
                </div>
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Titre *</label>
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Entrez le titre..."
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Date *</label>
                            <Input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Statut *</label>
                            <select
                                className="w-full border rounded-md p-2 text-gray-700"
                                value={formData.status}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                                aria-label="Statut du contenu"
                            >
                                <option value="draft">📝 Brouillon</option>
                                <option value="published">✅ Publié</option>
                            </select>
                        </div>
                    </div>

                    {(formData.type === 'about' || formData.type === 'activite') && (
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Catégorie (Toutes, Éducation, Plaidoyer, Social, Santé)</label>
                            <Input
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                placeholder="e.g. Éducation"
                            />
                        </div>
                    )}

                    {/* Image Upload avec Drag and Drop */}
                    <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${isDragActive
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 bg-gray-50'
                            }`}
                    >
                        <div className="space-y-3">
                            <div className="text-3xl">🖼️</div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                    Glissez votre image ici ou cliquez pour sélectionner
                                </label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="cursor-pointer"
                                    id="image-input"
                                />
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 5MB</p>
                        </div>
                    </div>

                    {/* Aperçu de l'image */}
                    {formData.imageUrl && (
                        <div className="relative">
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Aperçu de l'image</label>
                                <img src={formData.imageUrl} alt="Preview" className="max-h-48 rounded-lg border border-gray-200" />
                            </div>
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => setFormData({ ...formData, imageUrl: '' })}
                            >
                                ✕ Supprimer l'image
                            </Button>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Contenu *</label>
                        <Textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="h-64"
                            placeholder="Écrivez votre contenu ici..."
                            required
                        />
                    </div>
                    <div className="flex gap-4 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={() => setPreviewMode(true)}>👁️ Prévisualiser</Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">💾 Enregistrer</Button>
                    </div>
                </form>
            </div>
        );
    };

    if (isLoading) {
        return (
             <div className="flex h-screen items-center justify-center bg-gray-100">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!currentUser) return null;

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-950 text-white flex-shrink-0 flex flex-col h-screen sticky top-0 shadow-xl">
                <div className="p-6 border-b border-gray-800">
                    <h1 className="text-2xl font-bold tracking-tight">ASAFS</h1>
                    <p className="text-xs text-gray-400 mt-1">Admin Panel v1.0</p>
                </div>

                <nav className="mt-4 flex-1 px-4 space-y-2">
                    <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 ml-2">{t('admin.dashboard')}</div>
                    <button
                        onClick={() => { setActiveTab('dashboard'); setIsEditing(false); }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-gray-800 text-white border-l-4 border-blue-500' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                        🏠 {t('admin.dashboard')}
                    </button>

                    <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mt-6 mb-2 ml-2">Content Management</div>
                    <button
                        onClick={() => { setActiveTab('about'); setIsEditing(false); }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === 'about' ? 'bg-gray-800 text-white border-l-4 border-blue-500' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                        ℹ️ {t('admin.news')}
                    </button>
                    <button
                        onClick={() => { setActiveTab('programme'); setIsEditing(false); }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === 'programme' ? 'bg-gray-800 text-white border-l-4 border-blue-500' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                        📚 {t('admin.programs')}
                    </button>
                    <button
                        onClick={() => { setActiveTab('evenement'); setIsEditing(false); }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === 'evenement' ? 'bg-gray-800 text-white border-l-4 border-blue-500' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                        🎯 {t('admin.events')}
                    </button>
                    <button
                        onClick={() => { setActiveTab('carousel'); setIsEditing(false); }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === 'carousel' ? 'bg-gray-800 text-white border-l-4 border-blue-500' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                        🖼️ {t('admin.carousel')}
                    </button>
                    <button
                        onClick={() => { setActiveTab('activite'); setIsEditing(false); }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === 'activite' ? 'bg-gray-800 text-white border-l-4 border-blue-500' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                        📋 {t('admin.activities')}
                    </button>

                    <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mt-6 mb-2 ml-2">Communication</div>
                    <button
                        onClick={() => { setActiveTab('contacts'); setIsEditing(false); }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === 'contacts' ? 'bg-gray-800 text-white border-l-4 border-blue-500' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                        📧 {t('admin.contacts')}
                        {allContacts?.filter(c => !c.isRead).length ? (
                            <Badge className="ml-2 bg-blue-500">{allContacts.filter(c => !c.isRead).length}</Badge>
                        ) : null}
                    </button>
                    <button
                        onClick={() => { setActiveTab('newsletter'); setIsEditing(false); }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === 'newsletter' ? 'bg-gray-800 text-white border-l-4 border-blue-500' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                        ✉️ {t('admin.newsletter')}
                    </button>

                    <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mt-6 mb-2 ml-2">Compte</div>
                    <button
                        onClick={() => { setActiveTab('settings'); setIsEditing(false); }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === 'settings' ? 'bg-gray-800 text-white border-l-4 border-blue-500' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                        ⚙️ Profil & Paramètres
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                            {currentUser.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">{currentUser.name}</p>
                            <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm font-medium w-full p-2 rounded hover:bg-gray-800"
                    >
                        <LogOut className="h-5 w-5" />
                        {t('admin.logout')}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="px-8 py-6 flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">
                                {activeTab === 'dashboard' && `📊 ${t('admin.dashboard')}`}
                                {activeTab === 'about' && `ℹ️ ${t('admin.news')}`}
                                {activeTab === 'programme' && `📚 ${t('admin.programs')}`}
                                {activeTab === 'evenement' && `🎯 ${t('admin.events')}`}
                                {activeTab === 'carousel' && `🖼️ ${t('admin.carousel')}`}
                                {activeTab === 'contacts' && `📧 ${t('admin.contacts')}`}
                                {activeTab === 'newsletter' && `✉️ ${t('admin.newsletter')}`}
                                {activeTab === 'settings' && `⚙️ Profil & Paramètres`}
                            </h2>
                            <p className="text-gray-500 mt-1">{t('admin.welcome')} {currentUser.name}!</p>
                        </div>
                        <div className="flex items-center gap-4">
                             <div className="flex -space-x-2">
                                 {allContacts?.filter(c => !c.isRead).slice(0, 3).map(c => (
                                     <div key={c.id} title={c.name} className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600 uppercase">
                                         {c.name.charAt(0)}
                                     </div>
                                 ))}
                             </div>
                             {allContacts?.some(c => !c.isRead) && (
                                 <div className="bg-red-500 w-2 h-2 rounded-full absolute -top-1 -right-1 animate-pulse" />
                             )}
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <div className="max-w-6xl mx-auto">
                        {activeTab === 'dashboard' && (
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    <StatsCard title={t('admin.programs')} value={getStats('programme')} icon={FileText} color="blue" />
                                    <StatsCard title={t('admin.events')} value={getStats('evenement')} icon={Calendar} color="purple" />
                                    <StatsCard title={t('admin.activities')} value={getStats('activite')} icon={LayoutDashboard} color="indigo" />
                                    <StatsCard title={t('admin.carousel')} value={getStats('carousel')} icon={ImageIcon} color="orange" />
                                    <StatsCard title={t('admin.news')} value={getStats('about')} icon={Calendar} color="green" />
                                    <StatsCard title={t('admin.contacts')} value={allContacts?.length || 0} icon={Mail} color="pink" />
                                    <StatsCard title={t('admin.newsletter')} value={allSubs?.length || 0} icon={Bell} color="yellow" />
                                </div>

                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="text-lg font-bold mb-4 text-gray-800">Actions Rapides</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                        <Button onClick={() => { handleNew('evenement'); setActiveTab('evenement'); }} className="h-auto py-4 bg-white hover:bg-gray-50 text-gray-700 border shadow-sm flex flex-col items-center gap-2">
                                            <Plus className="h-6 w-6 text-purple-600" />
                                            <span>Nouvel Événement</span>
                                        </Button>
                                        <Button onClick={() => { handleNew('programme'); setActiveTab('programme'); }} className="h-auto py-4 bg-white hover:bg-gray-50 text-gray-700 border shadow-sm flex flex-col items-center gap-2">
                                            <Plus className="h-6 w-6 text-blue-600" />
                                            <span>Nouveau Programme</span>
                                        </Button>
                                        <Button onClick={() => { handleNew('about'); setActiveTab('about'); }} className="h-auto py-4 bg-white hover:bg-gray-50 text-gray-700 border shadow-sm flex flex-col items-center gap-2">
                                            <Plus className="h-6 w-6 text-green-600" />
                                            <span>Nouveau Contenu</span>
                                        </Button>
                                        <Button onClick={() => { handleNew('carousel'); setActiveTab('carousel'); }} className="h-auto py-4 bg-white hover:bg-gray-50 text-gray-700 border shadow-sm flex flex-col items-center gap-2">
                                            <Plus className="h-6 w-6 text-orange-600" />
                                            <span>Nouvelle Image</span>
                                        </Button>
                                        <Button onClick={() => { handleNew('activite'); setActiveTab('activite'); }} className="h-auto py-4 bg-white hover:bg-gray-50 text-gray-700 border shadow-sm flex flex-col items-center gap-2">
                                            <Plus className="h-6 w-6 text-indigo-600" />
                                            <span>Nouvelle Activité</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {(activeTab === 'about' || activeTab === 'programme' || activeTab === 'evenement' || activeTab === 'carousel' || activeTab === 'activite') && (
                            <div>
                                {isEditing ? renderEditor() : renderPostList(activeTab)}
                            </div>
                        )}

                        {activeTab === 'contacts' && (
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                                            <Mail className="w-5 h-5 text-blue-600" />
                                            Messages de contact ({allContacts?.length || 0})
                                        </CardTitle>
                                        <CardDescription>Consultez et gérez les messages envoyés depuis le site web.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[200px]">Expéditeur</TableHead>
                                                    <TableHead>Sujet</TableHead>
                                                    <TableHead>Message</TableHead>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {allContacts?.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="text-center py-8 text-slate-500">Aucun message reçu.</TableCell>
                                                    </TableRow>
                                                ) : (
                                                    allContacts?.map((msg) => (
                                                        <TableRow key={msg.id} className={msg.isRead ? 'opacity-60' : 'bg-blue-50/30'}>
                                                            <TableCell>
                                                                <div className="font-bold">{msg.name}</div>
                                                                <div className="text-xs text-slate-500">{msg.email}</div>
                                                            </TableCell>
                                                            <TableCell className="font-semibold">{msg.subject}</TableCell>
                                                            <TableCell className="max-w-xs truncate">{msg.message}</TableCell>
                                                            <TableCell className="text-xs text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</TableCell>
                                                            <TableCell className="text-right flex items-center justify-end gap-2">
                                                                {!msg.isRead && (
                                                                    <Button variant="ghost" size="icon" onClick={() => markContactReadMutation.mutate(msg.id)} title="Marquer comme lu">
                                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                                    </Button>
                                                                )}
                                                                <Dialog>
                                                                    <DialogTrigger asChild>
                                                                        <Button variant="ghost" size="icon" title="Voir le message">
                                                                            <Eye className="w-4 h-4 text-blue-600" />
                                                                        </Button>
                                                                    </DialogTrigger>
                                                                    <DialogContent>
                                                                        <DialogHeader>
                                                                            <DialogTitle>{msg.subject}</DialogTitle>
                                                                            <div className="text-sm text-slate-500">De: {msg.name} ({msg.email})</div>
                                                                        </DialogHeader>
                                                                        <div className="mt-4 p-4 bg-slate-50 rounded-lg text-slate-700 whitespace-pre-wrap">
                                                                            {msg.message}
                                                                        </div>
                                                                    </DialogContent>
                                                                </Dialog>
                                                                <Button variant="ghost" size="icon" onClick={() => { if(confirm('Supprimer ce message?')) deleteContactMutation.mutate(msg.id) }} title="Supprimer">
                                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {activeTab === 'newsletter' && (
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                                            <Bell className="w-5 h-5 text-blue-600" />
                                            Abonnés Newsletter ({allSubs?.length || 0})
                                        </CardTitle>
                                        <CardDescription>Liste des adresses emails inscrites à la newsletter.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Email</TableHead>
                                                    <TableHead>Statut</TableHead>
                                                    <TableHead>Date d'inscription</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {allSubs?.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={3} className="text-center py-8 text-slate-500">Aucun abonné pour le moment.</TableCell>
                                                    </TableRow>
                                                ) : (
                                                    allSubs?.map((sub) => (
                                                        <TableRow key={sub.id}>
                                                            <TableCell className="font-medium">{sub.email}</TableCell>
                                                            <TableCell>
                                                                <Badge variant={sub.active ? 'default' : 'secondary'} className={sub.active ? 'bg-green-500 hover:bg-green-600' : ''}>
                                                                    {sub.active ? 'Actif' : 'Désabonné'}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="text-xs text-slate-500">{new Date(sub.createdAt).toLocaleDateString()}</TableCell>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="space-y-6 max-w-2xl">
                                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        👤 Profil Administrateur
                                    </h3>
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md">
                                                {currentUser.avatar}
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Profil actuel</p>
                                                <p className="text-2xl font-bold text-gray-900">{currentUser.name}</p>
                                                <p className="text-gray-600">{currentUser.email}</p>
                                                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${currentUser.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                                    {currentUser.role === 'admin' ? '👑 Administrateur' : '✏️ Éditeur'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Adresse Email</label>
                                                <Input value={currentUser.email} disabled className="bg-gray-50" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Rôle</label>
                                                <Input value={currentUser.role === 'admin' ? 'Administrateur' : 'Éditeur'} disabled className="bg-gray-50" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        🔒 Sécurité
                                    </h3>
                                    <div className="space-y-4">
                                        <p className="text-gray-600 text-sm">Session actuelle - Vous êtes connecté(e)</p>
                                        <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50">Changer le mot de passe</Button>
                                    </div>
                                </div>

                                <div className="bg-red-50 p-8 rounded-xl border border-red-200">
                                    <h3 className="text-xl font-bold mb-4 text-red-900 flex items-center gap-2">
                                        🚪 Déconnexion
                                    </h3>
                                    <p className="text-red-800 text-sm mb-4">Êtes-vous sûr de vouloir vous déconnecter? Vous devrez vous reconnecter pour accéder à l'administration.</p>
                                    <Button variant="destructive" onClick={handleLogout} className="w-full md:w-auto">
                                        Se Déconnecter
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;

