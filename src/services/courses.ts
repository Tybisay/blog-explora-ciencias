/**
 * Represents a course with essential details.
 */
export interface Course {
  /**
   * The unique identifier for the course.
   */
  id: string;
  /**
   * The title of the course.
   */
  title: string;
  /**
   * A brief description of the course content.
   */
  description: string;
  /**
   * The name of the instructor for the course.
   */
  instructor: string;
  /**
   * Detailed syllabus of the course.
   */
  syllabus: string;
  /**
   * Instructor's biography.
   */
  instructorBio: string;
  /**
   * Student testimonials for the course.
   */
  studentTestimonials: string[];
}

/**
 * Asynchronously retrieves a list of available courses.
 *
 * @returns A promise that resolves to an array of Course objects.
 */
export async function listCourses(): Promise<Course[]> {
  // TODO: Implement this by calling an API.
  return [
    {
      id: '1',
      title: 'Introduction to React',
      description: 'Learn the basics of React.',
      instructor: 'John Doe',
      syllabus: 'Module 1: Setup, Module 2: Components',
      instructorBio: 'John Doe is a React expert.',
      studentTestimonials: ['Great course!', 'Highly recommended.'],
    },
    {
      id: '2',
      title: 'Advanced Next.js',
      description: 'Master advanced Next.js concepts.',
      instructor: 'Jane Smith',
      syllabus: 'Module 1: SSR, Module 2: API Routes',
      instructorBio: 'Jane Smith is a Next.js guru.',
      studentTestimonials: ['Excellent content!', 'Learned a lot.'],
    },
  ];
}

/**
 * Asynchronously retrieves a single course by its ID.
 *
 * @param id The unique identifier of the course to retrieve.
 * @returns A promise that resolves to a Course object, or null if not found.
 */
export async function getCourse(id: string): Promise<Course | null> {
  // TODO: Implement this by calling an API.
  return {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the basics of React.',
    instructor: 'John Doe',
    syllabus: 'Module 1: Setup, Module 2: Components',
    instructorBio: 'John Doe is a React expert.',
    studentTestimonials: ['Great course!', 'Highly recommended.'],
  };
}
