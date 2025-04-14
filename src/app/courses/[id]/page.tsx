import {getCourse} from '@/services/courses';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import Image from 'next/image';

interface Props {
  params: {
    id: string;
  };
}

export default async function CoursePage({params}: Props) {
  const {id} = params;
  const course = await getCourse(id);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src={`https://picsum.photos/id/${course.id}/800/600`}
            alt={course.title}
            width={800}
            height={600}
            className="rounded-md mb-4"
          />
          <p>{course.description}</p>
          <p>Instructor: {course.instructor}</p>
          <p>Syllabus: {course.syllabus}</p>
          <p>Instructor Bio: {course.instructorBio}</p>
          <p>Student Testimonials: {course.studentTestimonials.join(', ')}</p>
        </CardContent>
      </Card>
    </div>
  );
}

