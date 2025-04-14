'use client';

import {listBlogPosts} from '@/services/blog';
import {listCourses} from '@/services/courses';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Search} from 'lucide-react';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesData = await listCourses();
      setCourses(coursesData);
    };

    const fetchBlogPosts = async () => {
      const blogPostsData = await listBlogPosts();
      setBlogPosts(blogPostsData);
    };

    fetchCourses();
    fetchBlogPosts();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-primary">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.instructor}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={`https://picsum.photos/id/${course.id}/600/400`}
                  alt={course.title}
                  width={600}
                  height={400}
                  className="rounded-md mb-4"
                />
                {course.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-primary">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.author}</CardDescription>
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
          ))}
        </div>
      </section>
    </div>
  );
}


