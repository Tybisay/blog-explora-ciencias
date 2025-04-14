'use client'
import {listBlogPosts} from '@/services/blog';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {toast} from '@/hooks/use-toast';

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);

  const isAdmin = true; // TODO: Implement real admin authentication

  useEffect(() => {
    const fetchBlogPosts = async () => {
      // Retrieve blog posts from local storage
      const storedPosts = localStorage.getItem('blogPosts');
      const blogPostsData = storedPosts ? JSON.parse(storedPosts) : [];
      setBlogPosts(blogPostsData);
    };

    fetchBlogPosts();
  }, []);

  // Function to delete a blog post
  const deleteBlogPost = (id: string) => {
    // Get existing posts from local storage
    let existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');

    // Filter out the post to be deleted
    existingPosts = existingPosts.filter(post => post.id !== id);

    // Save the updated array back to local storage
    localStorage.setItem('blogPosts', JSON.stringify(existingPosts));

    // Update the state to re-render the component
    setBlogPosts(existingPosts);

    toast({
      title: 'Post Deleted',
      description: 'Successfully deleted blog post.',
    });
  };


  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-4 text-primary">Blog Posts</h1>

      {isAdmin && (
        <Link href="/blog/create" className="inline-block mb-4">
          <Button className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded">
            Create New Post
          </Button>
        </Link>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts
          .filter(post => post.status === 'publish') // Only show published posts
          .map((post) => (
            <div key={post.id}>
              <Link href={`/blog/${post.id}?status=${post.status}`}>
                <Card>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={`https://picsum.photos/id/${post.id}/600/400`}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="rounded-md mb-4"
                    />
                    {post.excerpt}
                  </CardContent>
                </Card>
              </Link>
              {isAdmin && (
                <Button
                  variant="destructive"
                  onClick={() => deleteBlogPost(post.id)}
                  className="mt-2 w-full"
                >
                  Delete Post
                </Button>
              )}
            </div>
        ))}
      </div>
    </div>
  );
}
