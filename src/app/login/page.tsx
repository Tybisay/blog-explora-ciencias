'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-10 flex justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Choose your role to proceed.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button onClick={() => router.push('/login/student')} className="w-full">
            Student Login
          </Button>
          <Button onClick={() => router.push('/login/teacher')} className="w-full">
            Teacher Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
