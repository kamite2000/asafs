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
import { Loader2, Plus, Pencil, Trash2, LayoutDashboard, FileText, Calendar, Image as ImageIcon, LogOut, Settings, Mail, Bell, Users, CheckCircle, Eye, Handshake, Menu, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useContacts, useNewsletterSubs, useMarkContactRead, useDeleteContact, useSettings, useUpdateSettings } from '@/hooks/useAdminData';
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

    const { data: settings } = useSettings();
    const updateSettingsMutation = useUpdateSettings();

    const [socialLinks, setSocialLinks] = useState({
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        missionVideo: ''
    });

    useEffect(() => {
        if (settings) {
            setSocialLinks({
                facebook: settings.facebookUrl || '',
                twitter: settings.twitterUrl || '',
                instagram: settings.instagramUrl || '',
                linkedin: settings.linkedinUrl || '',
                missionVideo: settings.missionVideoUrl || ''
            });
        }
    }, [settings]);

    const handleSaveSettings = (e: React.FormEvent) => {
        e.preventDefault();
        updateSettingsMutation.mutate({
            facebookUrl: socialLinks.facebook,
            twitterUrl: socialLinks.twitter,
            instagramUrl: socialLinks.instagram,
            linkedinUrl: socialLinks.linkedin,
            missionVideoUrl: socialLinks.missionVideo
        });
    };

    if (!currentUser) return null;

    const posts = allPosts || [];
    const getPostsByType = (type: string) => posts.filter(p => p.type === type);
    const getStats = (type: string) => getPostsByType(type).length;



    useEffect(() => {
        if (!currentUser) {
            navigate('/admin');
        }
    }, [currentUser, navigate]);

    const [activeTab, setActiveTab] = useState<'dashboard' | 'about' | 'programme' | 'evenement' | 'carousel' | 'activite' | 'partenaire' | 'timeline' | 'contacts' | 'newsletter' | 'settings'>('dashboard');
    const [isEditing, setIsEditing] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [previewMode, setPreviewMode] = useState(false);
    const [isDragActive, setIsDragActive] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Form State avec imageUrl
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        date: '',
        endDate: '',
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
            endDate: post.endDate || '',
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
            endDate: '',
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
            author: currentUser?.name || t('admin.anonymous', { defaultValue: 'Anonyme' }),
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
            endDate: post.endDate,
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
            <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 md:mb-6">
                    <h3 className="text-lg md:text-2xl font-bold capitalize text-slate-900 dark:text-white">{t('admin.management', { defaultValue: 'Gestion' })} {type}</h3>
                    <Button onClick={() => handleNew(type)} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-sm md:text-base">
                        + {t('admin.create_new', { defaultValue: 'Créer Nouveau' })}
                    </Button>
                </div>
                {typePosts.length === 0 ? (
                    <p className="text-gray-500 italic">{t('admin.no_content_yet', { defaultValue: 'Aucun contenu pour le moment.' })}</p>
                ) : (
                    <div className="grid gap-4">
                        {typePosts.map((post) => (
                            <div key={post.id} className="bg-white p-3 md:p-4 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                                    {/* Image */}
                                    {post.imageUrl && (
                                        <div className="w-full sm:w-24 sm:h-24 h-40 flex-shrink-0">
                                            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover rounded-lg" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-base md:text-lg line-clamp-1">{post.title}</h4>
                                        <div className="flex flex-wrap gap-2 text-xs md:text-sm text-gray-500 mt-2">
                                            <span className="whitespace-nowrap">{post.date}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {post.status === 'published' ? 'Publié' : 'Brouillon'}
                                            </span>
                                            {post.author && <span className="text-gray-400 line-clamp-1 text-xs">par {post.author}</span>}
                                        </div>
                                        <p className="text-xs md:text-sm text-gray-600 mt-2 line-clamp-2">{post.content}</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3 md:mt-4">
                                    {post.status === 'draft' && (
                                        <Button variant="outline" size="sm" onClick={() => handlePublish(post)} className="text-green-600 border-green-600 hover:bg-green-50 text-xs flex-1 sm:flex-none">
                                            Publier
                                        </Button>
                                    )}
                                    <Button variant="outline" size="sm" onClick={() => handleEdit(post)} className="text-xs flex-1 sm:flex-none">{t('admin.edit', { defaultValue: 'Modifier' })}</Button>
                                    <Button variant="destructive" size="sm" onClick={(e) => handleDelete(post.id, e)} className="text-xs flex-1 sm:flex-none">{t('admin.delete', { defaultValue: 'Supprimer' })}</Button>
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
                        <h2 className="text-xl font-bold text-blue-600 uppercase tracking-widest">📋 {t('admin.preview')}</h2>
                        <Button variant="outline" onClick={() => setPreviewMode(false)}>{t('admin.back_to_edit', { defaultValue: 'Retour à l\'édition' })}</Button>
                    </div>
                    <div className="prose max-w-none">
                        <div className="mb-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${formData.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {formData.status === 'published' ? t('admin.published') : t('admin.draft')}
                            </span>
                        </div>
                        {formData.imageUrl && (
                            <div className="mb-6">
                                <img src={formData.imageUrl} alt={formData.title} className="w-full max-h-96 object-cover rounded-lg" />
                            </div>
                        )}
                        <h1 className="text-3xl font-bold mb-2 text-gray-900">{formData.title || t('admin.title_placeholder', { defaultValue: 'Titre à ajouter' })}</h1>
                        <p className="text-sm text-gray-500 mb-6">📅 {formData.date}</p>
                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed bg-gray-50 p-4 rounded border border-gray-200">
                            {formData.content || t('admin.content_placeholder', { defaultValue: 'Contenu à ajouter' })}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
                    <h3 className="text-lg md:text-xl font-bold">{editingPost ? t('admin.edit_content') : t('admin.new_content')}</h3>
                    <Button variant="ghost" onClick={() => setIsEditing(false)} className="text-sm">{t('admin.cancel', { defaultValue: 'Annuler' })}</Button>
                </div>
                <form onSubmit={handleSave} className="space-y-3 md:space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">{t('admin.title')} *</label>
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder={t('admin.enter_title', { defaultValue: 'Entrez le titre...' })}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">{t('admin.date_start', { defaultValue: 'Date de début' })} *</label>
                            <Input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                required
                                className="text-base"
                            />
                        </div>
                        {(formData.type === 'programme' || formData.type === 'evenement') ? (
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">{t('admin.date_end', { defaultValue: 'Date de fin' })} ({t('admin.optional', { defaultValue: 'Optionnel' })})</label>
                                <Input
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                />
                            </div>
                        ) : (
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">{t('admin.status')} *</label>
                                <select
                                    className="w-full border rounded-md p-2 text-gray-700"
                                    value={formData.status}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                                    aria-label="Statut du contenu"
                                >
                                    <option value="draft">📝 {t('admin.draft')}</option>
                                    <option value="published">✅ {t('admin.published')}</option>
                                </select>
                            </div>
                        )}
                    </div>

                    {(formData.type === 'programme' || formData.type === 'evenement') && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium mb-1 text-gray-700">{t('admin.status')} *</label>
                            <select
                                className="w-full border rounded-md p-2 text-gray-700"
                                value={formData.status}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                                aria-label="Statut du contenu"
                            >
                                <option value="draft">📝 {t('admin.draft')}</option>
                                <option value="published">✅ {t('admin.published')}</option>
                            </select>
                        </div>
                    )}

                    {(formData.type === 'about' || formData.type === 'activite' || formData.type === 'partenaire' || formData.type === 'timeline' || formData.type === 'programme') && (
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">
                                {formData.type === 'partenaire' ? t('admin.partnership_type', { defaultValue: 'Type de partenariat' }) :
                                    formData.type === 'timeline' ? 'Badge/Tag' :
                                        t('admin.category')}
                            </label>
                            <select
                                className="w-full border rounded-md p-2 text-gray-700 bg-white"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="">--- {t('admin.select', { defaultValue: 'Sélectionner' })} ---</option>
                                {formData.type === 'partenaire' ? (
                                    <>
                                        <option value="Institutionnel">🏛️ {t('categories.Institutionnel')}</option>
                                        <option value="Privé">🏢 {t('categories.Privé')}</option>
                                        <option value="ONG">🤝 {t('categories.ONG')}</option>
                                        <option value="Technique">⚙️ {t('categories.Technique')}</option>
                                    </>
                                ) : formData.type === 'timeline' ? (
                                    <>
                                        <option value="AUTONOMIE">⚡ {t('categories.AUTONOMIE')}</option>
                                        <option value="SOUVERAINETÉ">👑 {t('categories.SOUVERAINETÉ')}</option>
                                        <option value="MOBILISATION">📢 {t('categories.MOBILISATION')}</option>
                                        <option value="VALORISATION">🌟 {t('categories.VALORISATION')}</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="Éducation">📚 {t('categories.Éducation')}</option>
                                        <option value="Plaidoyer">⚖️ {t('categories.Plaidoyer')}</option>
                                        <option value="Social">🤝 {t('categories.Social')}</option>
                                        <option value="Santé">🩺 {t('categories.Santé')}</option>
                                        <option value="Autonomisation">💪 {t('categories.Autonomisation')}</option>
                                    </>
                                )}
                            </select>
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
                                    {t('admin.drag_drop_image', { defaultValue: 'Glissez votre image ici ou cliquez pour sélectionner' })}
                                </label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="cursor-pointer"
                                    id="image-input"
                                />
                            </div>
                            <p className="text-xs text-gray-500">{t('admin.image_formats', { defaultValue: 'PNG, JPG, GIF jusqu\'à 5MB' })}</p>
                        </div>
                    </div>

                    {/* Aperçu de l'image */}
                    {formData.imageUrl && (
                        <div className="relative">
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.image_preview', { defaultValue: 'Aperçu de l\'image' })}</label>
                                <img src={formData.imageUrl} alt="Preview" className="max-h-48 rounded-lg border border-gray-200" />
                            </div>
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => setFormData({ ...formData, imageUrl: '' })}
                            >
                                ✕ {t('admin.delete_image', { defaultValue: 'Supprimer l\'image' })}
                            </Button>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            {formData.type === 'partenaire' ? t('admin.website_link', { defaultValue: 'Lien du site web (optionnel)' }) : t('admin.content_label', { defaultValue: 'Contenu *' })}
                        </label>
                        <Textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className={formData.type === 'partenaire' ? "h-20" : "h-64"}
                            placeholder={formData.type === 'partenaire' ? "https://www.exemple.com" : t('admin.content_placeholder_input', { defaultValue: 'Écrivez votre contenu ici...' })}
                            required={formData.type !== 'partenaire'}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-4 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={() => setPreviewMode(true)} className="flex-1">👁️ {t('admin.preview')}</Button>
                        <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">💾 {t('admin.save')}</Button>
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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row font-sans transition-colors duration-300">
            {/* Mobile Header with Menu Button */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 z-50 flex items-center justify-between px-4 py-3">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    aria-label="Toggle sidebar"
                >
                    {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <h1 className="text-lg font-bold dark:text-white">ASAFS Admin</h1>
                <div className="w-10" />
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 md:hidden z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 w-64 bg-gradient-to-b from-slate-900 to-slate-950 text-white flex-shrink-0 flex flex-col h-screen sticky top-0 shadow-xl transition-transform duration-300 z-40 mt-14 md:mt-0`}>
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-2xl font-bold tracking-tight">ASAFS</h1>
                    <p className="text-xs text-slate-400 mt-1">{t('admin.panel_version', { defaultValue: 'Admin Panel v1.0' })}</p>
                </div>

                <nav className="mt-4 flex-1 px-4 space-y-2 overflow-x-hidden overflow-y-auto">
                    <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 ml-2">{t('admin.dashboard')}</div>
                    <button
                        onClick={() => { setActiveTab('dashboard'); setIsEditing(false); setSidebarOpen(false); }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-gray-800 text-white border-l-4 border-blue-500' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                        🏠 {t('admin.dashboard')}
                    </button>

                    <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mt-6 mb-2 ml-2">{t('admin.content_management', { defaultValue: 'Content Management' })}</div>
                    <button
                        onClick={() => { setActiveTab('about'); setIsEditing(false); setSidebarOpen(false); }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === 'about' ? 'bg-gray-800 text-white border-l-4 border-blue-500' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                        ℹ️ {t('admin.news')}
                    </button>
                    <button
                        onClick={() => { setActiveTab('programme'); setIsEditing(false); setSidebarOpen(false); }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === 'programme' ? 'bg-gray-800 text-white border-l-4 border-blue-500' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                        📚 {t('admin.programs')}
                    </button>
                    <button
                        onClick={() => { setActiveTab('evenement'); setIsEditing(false); setSidebarOpen(false); }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === 'evenement' ? 'bg-gray-800 text-white border-l-4 border-blue-500' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                        🎯 {t('admin.events')}
                    </button>
                    <button
                        onClick={() => { setActiveTab('carousel'); setIsEditing(false); setSidebarOpen(false); }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === 'carousel' ? 'bg-gray-800 text-white border-l-4 border-blue-500' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                        🖼️ {t('admin.carousel')}
                    </button>
                    <button
                        onClick={() => { setActiveTab('activite'); setIsEditing(false); setSidebarOpen(false); }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === 'activite' ? 'bg-gray-800 text-white border-l-4 border-blue-500' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                        📋 {t('admin.activities')}
                    </button>
                    <button
                        onClick={() => { setActiveTab('partenaire'); setIsEditing(false); setSidebarOpen(false); }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === 'partenaire' ? 'bg-gray-800 text-white border-l-4 border-blue-500' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                        🤝 {t('admin.partners')}
                    </button>
                    <button
                        onClick={() => { setActiveTab('timeline'); setIsEditing(false); setSidebarOpen(false); }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === 'timeline' ? 'bg-gray-800 text-white border-l-4 border-blue-500' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                        🕒 {t('admin.timeline')}
                    </button>

                    <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mt-6 mb-2 ml-2">{t('admin.communication', { defaultValue: 'Communication' })}</div>
                    <button
                        onClick={() => { setActiveTab('contacts'); setIsEditing(false); setSidebarOpen(false); }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === 'contacts' ? 'bg-gray-800 text-white border-l-4 border-blue-500' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                        📧 {t('admin.contacts')}
                        {allContacts?.filter(c => !c.isRead).length ? (
                            <Badge className="ml-2 bg-blue-500">{allContacts.filter(c => !c.isRead).length}</Badge>
                        ) : null}
                    </button>
                    <button
                        onClick={() => { setActiveTab('newsletter'); setIsEditing(false); setSidebarOpen(false); }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === 'newsletter' ? 'bg-gray-800 text-white border-l-4 border-blue-500' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                        ✉️ {t('admin.newsletter')}
                    </button>

                    <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mt-8 mb-3 ml-2">Compte</div>
                    <button
                        onClick={() => { setActiveTab('settings'); setIsEditing(false); setSidebarOpen(false); }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === 'settings' ? 'bg-blue-600 text-white border-l-4 border-blue-400' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                        ⚙️ Profil & Paramètres
                    </button>

                    {/* Divider */}
                    <div className="my-4 border-t border-gray-700" />

                    {/* Profil Section Inside Nav */}
                    <div className="px-2 py-3 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-500/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                                {currentUser.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate">{currentUser.name}</p>
                                <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
                                <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${currentUser.role === 'admin' ? 'bg-red-500/20 text-red-300' : 'bg-blue-500/20 text-blue-300'}`}>
                                    {currentUser.role === 'admin' ? '👑 Admin' : '✏️ Éditeur'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 mt-3 text-red-400 hover:text-red-300 hover:bg-red-950/40 bg-gray-800 hover:bg-gray-700 transition-all text-sm font-semibold py-2 px-3 rounded-lg border border-gray-700 hover:border-red-500/50"
                    >
                        <LogOut className="h-4 w-4" />
                        {t('admin.logout')}
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto pt-14 md:pt-0">
                <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10 transition-colors duration-300">
                    <div className="px-4 md:px-8 py-4 md:py-6 flex justify-between items-center gap-4">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase line-clamp-1">
                                {activeTab === 'dashboard' && `📊 ${t('admin.dashboard')}`}
                                {activeTab === 'about' && `ℹ️ ${t('admin.news')}`}
                                {activeTab === 'programme' && `📚 ${t('admin.programs')}`}
                                {activeTab === 'evenement' && `🎯 ${t('admin.events')}`}
                                {activeTab === 'carousel' && `🖼️ ${t('admin.carousel')}`}
                                {activeTab === 'contacts' && `📧 ${t('admin.contacts')}`}
                                {activeTab === 'newsletter' && `✉️ ${t('admin.newsletter')}`}
                                {activeTab === 'partenaire' && `🤝 ${t('admin.partners')}`}
                                {activeTab === 'timeline' && `🕒 ${t('admin.timeline')}`}
                                {activeTab === 'settings' && `⚙️ Profil & Paramètres`}
                            </h2>
                            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-1 font-medium line-clamp-1">{t('admin.welcome')} {currentUser.name}!</p>
                        </div>
                        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                            <div className="flex -space-x-2">
                                {allContacts?.filter(c => !c.isRead).slice(0, 3).map(c => (
                                    <div key={c.id} title={c.name} className="w-6 md:w-8 h-6 md:h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[9px] md:text-[10px] font-bold text-blue-600 uppercase">
                                        {c.name.charAt(0)}
                                    </div>
                                ))}
                            </div>
                            {allContacts?.some(c => !c.isRead) && (
                                <div className="bg-red-500 w-2 h-2 rounded-full animate-pulse" />
                            )}
                        </div>
                    </div>
                </header>

                <div className="p-3 md:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {activeTab === 'dashboard' && (
                            <div className="space-y-4 md:space-y-8">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                                    <StatsCard title={t('admin.programs')} value={getStats('programme')} icon={FileText} color="blue" />
                                    <StatsCard title={t('admin.events')} value={getStats('evenement')} icon={Calendar} color="purple" />
                                    <StatsCard title={t('admin.activities')} value={getStats('activite')} icon={LayoutDashboard} color="indigo" />
                                    <StatsCard title={t('admin.carousel')} value={getStats('carousel')} icon={ImageIcon} color="orange" />
                                    <StatsCard title={t('admin.news')} value={getStats('about')} icon={Calendar} color="green" />
                                    <StatsCard title={t('admin.partners')} value={getStats('partenaire')} icon={Handshake} color="teal" />
                                    <StatsCard title={t('admin.timeline')} value={getStats('timeline')} icon={Calendar} color="amber" />
                                    <StatsCard title={t('admin.contacts')} value={allContacts?.length || 0} icon={Mail} color="pink" />
                                    <StatsCard title={t('admin.newsletter')} value={allSubs?.length || 0} icon={Bell} color="yellow" />
                                </div>

                                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-4 md:p-6 transition-colors duration-300">
                                    <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Actions Rapides</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
                                        <Button onClick={() => { handleNew('evenement'); setActiveTab('evenement'); setSidebarOpen(false); }} className="h-auto py-3 md:py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center gap-2 transition-colors duration-300 text-xs md:text-sm">
                                            <Plus className="h-5 md:h-6 w-5 md:w-6 text-purple-600" />
                                            <span className="text-center">Événement</span>
                                        </Button>
                                        <Button onClick={() => { handleNew('programme'); setActiveTab('programme'); setSidebarOpen(false); }} className="h-auto py-3 md:py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center gap-2 transition-colors duration-300 text-xs md:text-sm">
                                            <Plus className="h-5 md:h-6 w-5 md:w-6 text-blue-600" />
                                            <span className="text-center">Programme</span>
                                        </Button>
                                        <Button onClick={() => { handleNew('about'); setActiveTab('about'); setSidebarOpen(false); }} className="h-auto py-3 md:py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center gap-2 transition-colors duration-300 text-xs md:text-sm">
                                            <Plus className="h-5 md:h-6 w-5 md:w-6 text-green-600" />
                                            <span className="text-center">Contenu</span>
                                        </Button>
                                        <Button onClick={() => { handleNew('carousel'); setActiveTab('carousel'); setSidebarOpen(false); }} className="h-auto py-3 md:py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center gap-2 transition-colors duration-300 text-xs md:text-sm">
                                            <Plus className="h-5 md:h-6 w-5 md:w-6 text-orange-600" />
                                            <span className="text-center">Image</span>
                                        </Button>
                                        <Button onClick={() => { handleNew('activite'); setActiveTab('activite'); setSidebarOpen(false); }} className="h-auto py-3 md:py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center gap-2 transition-colors duration-300 text-xs md:text-sm">
                                            <Plus className="h-5 md:h-6 w-5 md:w-6 text-indigo-600" />
                                            <span className="text-center">Activité</span>
                                        </Button>
                                        <Button onClick={() => { handleNew('partenaire'); setActiveTab('partenaire'); setSidebarOpen(false); }} className="h-auto py-3 md:py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center gap-2 transition-colors duration-300 text-xs md:text-sm">
                                            <Plus className="h-5 md:h-6 w-5 md:w-6 text-teal-600" />
                                            <span className="text-center">Partenaire</span>
                                        </Button>
                                        <Button onClick={() => { handleNew('timeline'); setActiveTab('timeline'); setSidebarOpen(false); }} className="h-auto py-3 md:py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center gap-2 transition-colors duration-300 text-xs md:text-sm">
                                            <Plus className="h-5 md:h-6 w-5 md:w-6 text-amber-600" />
                                            <span className="text-center">Étape</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {(activeTab === 'about' || activeTab === 'programme' || activeTab === 'evenement' || activeTab === 'carousel' || activeTab === 'activite' || activeTab === 'partenaire' || activeTab === 'timeline') && (
                            <div>
                                {isEditing ? renderEditor() : renderPostList(activeTab)}
                            </div>
                        )}

                        {activeTab === 'contacts' && (
                            <div className="space-y-4 md:space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-2">
                                            <Mail className="w-5 h-5 text-blue-600" />
                                            Messages de contact ({allContacts?.length || 0})
                                        </CardTitle>
                                        <CardDescription className="text-xs md:text-sm">Consultez et gérez les messages envoyés depuis le site web.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {/* Desktop Table View */}
                                        <div className="hidden md:block overflow-x-auto">
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
                                                                    <div className="font-bold text-sm">{msg.name}</div>
                                                                    <div className="text-xs text-slate-500">{msg.email}</div>
                                                                </TableCell>
                                                                <TableCell className="font-semibold text-sm">{msg.subject}</TableCell>
                                                                <TableCell className="max-w-xs truncate text-sm">{msg.message}</TableCell>
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
                                                                            <div className="mt-4 p-4 md:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-slate-700 dark:text-slate-300 whitespace-pre-wrap max-h-[60vh] overflow-y-auto border border-slate-100 dark:border-slate-800 text-sm">
                                                                                {msg.message}
                                                                            </div>
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                    <Button variant="ghost" size="icon" onClick={() => { if (confirm('Supprimer ce message?')) deleteContactMutation.mutate(msg.id) }} title="Supprimer">
                                                                        <Trash2 className="w-4 h-4 text-red-600" />
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </div>

                                        {/* Mobile Card View */}
                                        <div className="md:hidden space-y-3">
                                            {allContacts?.length === 0 ? (
                                                <div className="text-center py-8 text-slate-500 text-sm">Aucun message reçu.</div>
                                            ) : (
                                                allContacts?.map((msg) => (
                                                    <div key={msg.id} className={`p-3 rounded-lg border ${msg.isRead ? 'border-gray-200 bg-gray-50' : 'border-blue-200 bg-blue-50/50'}`}>
                                                        <div className="flex justify-between items-start gap-2 mb-2">
                                                            <div className="flex-1 min-w-0">
                                                                <div className="font-bold text-sm truncate">{msg.name}</div>
                                                                <div className="text-xs text-slate-600 break-all">{msg.email}</div>
                                                            </div>
                                                            {!msg.isRead && <Badge className="bg-blue-600 flex-shrink-0">Nouveau</Badge>}
                                                        </div>
                                                        <div className="mb-2">
                                                            <p className="font-semibold text-sm line-clamp-1 mb-1">{msg.subject}</p>
                                                            <p className="text-xs text-slate-600 line-clamp-2">{msg.message}</p>
                                                        </div>
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="text-xs text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="flex gap-2 flex-wrap">
                                                            {!msg.isRead && (
                                                                <Button variant="ghost" size="sm" onClick={() => markContactReadMutation.mutate(msg.id)} className="text-xs flex-1">
                                                                    <CheckCircle className="w-3 h-3 mr-1" />
                                                                    Lire
                                                                </Button>
                                                            )}
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <Button variant="ghost" size="sm" className="text-xs flex-1">
                                                                        <Eye className="w-3 h-3 mr-1" />
                                                                        Voir
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="max-w-xs">
                                                                    <DialogHeader>
                                                                        <DialogTitle className="text-base">{msg.subject}</DialogTitle>
                                                                        <div className="text-xs text-slate-500">De: {msg.name}</div>
                                                                    </DialogHeader>
                                                                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-slate-700 dark:text-slate-300 whitespace-pre-wrap max-h-[50vh] overflow-y-auto border border-slate-100 dark:border-slate-800 text-xs">
                                                                        {msg.message}
                                                                    </div>
                                                                </DialogContent>
                                                            </Dialog>
                                                            <Button variant="ghost" size="sm" onClick={() => { if (confirm('Supprimer ce message?')) deleteContactMutation.mutate(msg.id) }} className="text-xs flex-1 text-red-600">
                                                                <Trash2 className="w-3 h-3 mr-1" />
                                                                Supprimer
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {activeTab === 'newsletter' && (
                            <div className="space-y-4 md:space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-2">
                                            <Bell className="w-5 h-5 text-blue-600" />
                                            Abonnés Newsletter ({allSubs?.length || 0})
                                        </CardTitle>
                                        <CardDescription className="text-xs md:text-sm">Liste des adresses emails inscrites à la newsletter.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {/* Desktop Table View */}
                                        <div className="hidden md:block overflow-x-auto">
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
                                                                <TableCell className="font-medium text-sm">{sub.email}</TableCell>
                                                                <TableCell>
                                                                    <Badge variant={sub.active ? 'default' : 'secondary'} className={sub.active ? 'bg-green-500 hover:bg-green-600 text-xs' : 'text-xs'}>
                                                                        {sub.active ? 'Actif' : 'Désabonné'}
                                                                    </Badge>
                                                                </TableCell>
                                                                <TableCell className="text-xs text-slate-500">{new Date(sub.createdAt).toLocaleDateString()}</TableCell>
                                                            </TableRow>
                                                        ))
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </div>

                                        {/* Mobile Card View */}
                                        <div className="md:hidden space-y-3">
                                            {allSubs?.length === 0 ? (
                                                <div className="text-center py-8 text-slate-500 text-sm">Aucun abonné pour le moment.</div>
                                            ) : (
                                                allSubs?.map((sub) => (
                                                    <div key={sub.id} className="p-3 rounded-lg border border-gray-200 bg-white">
                                                        <div className="flex justify-between items-center gap-2 mb-2">
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-medium text-sm break-all">{sub.email}</p>
                                                            </div>
                                                            <Badge variant={sub.active ? 'default' : 'secondary'} className={`flex-shrink-0 text-xs ${sub.active ? 'bg-green-500 hover:bg-green-600' : ''}`}>
                                                                {sub.active ? 'Actif' : 'Désabonné'}
                                                            </Badge>
                                                        </div>
                                                        <div className="text-xs text-slate-500">{new Date(sub.createdAt).toLocaleDateString()}</div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="space-y-4 md:space-y-6 max-w-2xl">
                                <div className="bg-white dark:bg-slate-900 p-4 md:p-8 rounded-lg md:rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300">
                                    <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                                        👤 Profil Administrateur
                                    </h3>
                                    <div className="space-y-4 md:space-y-6">
                                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
                                            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md flex-shrink-0">
                                                {currentUser.avatar}
                                            </div>
                                            <div className="text-center sm:text-left">
                                                <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400">Profil actuel</p>
                                                <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{currentUser.name}</p>
                                                <p className="text-sm md:text-base text-gray-600 dark:text-slate-300">{currentUser.email}</p>
                                                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${currentUser.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'}`}>
                                                    {currentUser.role === 'admin' ? '👑 Administrateur' : '✏️ Éditeur'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                                            <div>
                                                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Adresse Email</label>
                                                <Input value={currentUser.email} disabled className="text-sm bg-gray-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600" />
                                            </div>
                                            <div>
                                                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Rôle</label>
                                                <Input value={currentUser.role === 'admin' ? 'Administrateur' : 'Éditeur'} disabled className="text-sm bg-gray-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600" />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="bg-white dark:bg-slate-900 p-4 md:p-8 rounded-lg md:rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300">
                                    <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                                        🌐 Réseaux Sociaux
                                    </h3>
                                    <form onSubmit={handleSaveSettings} className="space-y-4">
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Facebook</label>
                                            <Input 
                                                value={socialLinks.facebook} 
                                                onChange={(e) => setSocialLinks({...socialLinks, facebook: e.target.value})}
                                                placeholder="https://facebook.com/..."
                                                className="text-sm bg-gray-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Twitter / X</label>
                                            <Input 
                                                value={socialLinks.twitter} 
                                                onChange={(e) => setSocialLinks({...socialLinks, twitter: e.target.value})}
                                                placeholder="https://twitter.com/..."
                                                className="text-sm bg-gray-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Instagram</label>
                                            <Input 
                                                value={socialLinks.instagram} 
                                                onChange={(e) => setSocialLinks({...socialLinks, instagram: e.target.value})}
                                                placeholder="https://instagram.com/..."
                                                className="text-sm bg-gray-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600" 
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">LinkedIn</label>
                                            <Input 
                                                value={socialLinks.linkedin} 
                                                onChange={(e) => setSocialLinks({...socialLinks, linkedin: e.target.value})}
                                                placeholder="https://linkedin.com/in/..."
                                                className="text-sm bg-gray-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600" 
                                            />
                                        </div>
                                        <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                                            <h4 className="text-sm font-bold mb-3 dark:text-white">Vidéo "Notre Mission"</h4>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Lien YouTube/Vimeo</label>
                                            <Input 
                                                value={socialLinks.missionVideo} 
                                                onChange={(e) => setSocialLinks({...socialLinks, missionVideo: e.target.value})}
                                                placeholder="https://www.youtube.com/watch?v=..."
                                                className="text-sm bg-gray-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600" 
                                            />
                                        </div>

                                        <Button type="submit" disabled={updateSettingsMutation.isPending} className="w-full bg-blue-600 hover:bg-blue-700">
                                            {updateSettingsMutation.isPending ? 'Enregistrement...' : 'Enregistrer les liens'}
                                        </Button>
                                    </form>
                                </div>

                                <div className="bg-white dark:bg-slate-900 p-4 md:p-8 rounded-lg md:rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300">
                                    <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                                        🔒 Sécurité
                                    </h3>
                                    <div className="space-y-4">
                                        <p className="text-gray-600 dark:text-slate-400 text-xs md:text-sm">Session actuelle - Vous êtes connecté(e)</p>
                                        <Button variant="outline" className="w-full text-orange-600 border-orange-600 hover:bg-orange-50 dark:bg-slate-800 dark:text-orange-400 dark:border-orange-600 dark:hover:bg-slate-700">Changer le mot de passe</Button>
                                    </div>
                                </div>

                                <div className="bg-red-50 dark:bg-red-950/30 p-4 md:p-8 rounded-lg md:rounded-xl border border-red-200 dark:border-red-800">
                                    <h3 className="text-lg md:text-xl font-bold mb-4 text-red-900 dark:text-red-300 flex items-center gap-2">
                                        🚪 Déconnexion
                                    </h3>
                                    <p className="text-red-800 dark:text-red-400 text-xs md:text-sm mb-4">{t('admin.logout_confirm', { defaultValue: 'Êtes-vous sûr de vouloir vous déconnecter? Vous devrez vous reconnecter pour accéder à l\'administration.' })}</p>
                                    <Button variant="destructive" onClick={handleLogout} className="w-full">
                                        {t('admin.logout')}
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

