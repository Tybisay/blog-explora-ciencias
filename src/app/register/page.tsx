'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';

export default function RegisterPage() {
  const [userType, setUserType] = useState('student');

  return (
    <div className="container mx-auto py-10 flex justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Create a new account as a student or professor
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Email" type="email"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Password" type="password"/>
          </div>
          <div className="space-y-2">
            <Label>Register as</Label>
            <RadioGroup defaultValue="student" className="flex flex-col gap-2" onValueChange={setUserType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student"/>
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="professor" id="professor"/>
                <Label htmlFor="professor">Professor</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Create Account as {userType}</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
