'use client';

import {useState, useCallback} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {toast} from '@/hooks/use-toast';
import {EditorContent, useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from 'lucide-react';

export default function CreateBlogPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState<'publish' | 'draft'>('draft');

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Bold,
      Italic,
    ],
    content: content,
    onUpdate({editor}) {
      setContent(editor.getHTML());
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // In a real application, you would send this data to your backend
    const newPost = {
      id: Date.now().toString(), // Generate a unique ID
      title,
      content,
      author,
      status,
      excerpt: content.substring(0, 100) + '...', // Generate a basic excerpt
      featuredImage: 'https://picsum.photos/id/1084/600/400', // Default image
      date: new Date().toISOString().slice(0, 10), // Get current date
    };

    // Get existing posts from local storage
    let existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');

    // Add the new post to the array
    existingPosts.push(newPost);

    // Save the updated array back to local storage
    localStorage.setItem('blogPosts', JSON.stringify(existingPosts));

    toast({
      title: 'Post Created',
      description: 'Successfully created new blog post.',
    });

    // Reset form fields
    setTitle('');
    setContent('');
    setAuthor('');
    setStatus('draft');

    // Redirect to the blog page
    router.push('/blog');
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              {editor && (
                <div>
                  <div className="flex gap-2 mb-2">
                    <Button
                      onClick={() => editor.chain().focus().toggleBold().run()}
                      disabled={
                        !editor.can().chain().focus().toggleBold().run()
                      }
                    >
                      Bold
                    </Button>
                    <Button
                      onClick={() =>
                        editor.chain().focus().toggleItalic().run()
                      }
                      disabled={
                        !editor.can().chain().focus().toggleItalic().run()
                      }
                    >
                      Italic
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          <AlignJustify className="h-4 w-4" />
                          <span className="sr-only">Align</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            editor.chain().focus().setTextAlign('left').run()
                          }
                        >
                          <AlignLeft className="mr-2 h-4 w-4" />
                          Left
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            editor.chain().focus().setTextAlign('center').run()
                          }
                        >
                          <AlignCenter className="mr-2 h-4 w-4" />
                          Center
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            editor.chain().focus().setTextAlign('right').run()
                          }
                        >
                          <AlignRight className="mr-2 h-4 w-4" />
                          Right
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                   <EditorContent editor={editor}
                   onClick={() => editor.chain().focus().run()}
                   className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm whitespace-normal break-words" />
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as 'publish' | 'draft')
                }
                className="rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="publish">Publish</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <Button type="submit">Create Post</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
