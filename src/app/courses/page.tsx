import {listCourses} from '@/services/courses';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

export default async function CoursesPage() {
  const courses = await listCourses();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-4 text-primary">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link href={`/courses/${course.id}`} key={course.id}>
            <Card>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
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
          </Link>
        ))}
      </div>
    </div>
  );
}

