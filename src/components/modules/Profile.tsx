/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getInitials } from '@/lib/formatter';
import { Camera, Loader2, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { IUserInfo } from '@/types/user.interface';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateUser } from '@/services/user/userManagements';
import { toast } from 'sonner';
import InputFieldError from '../shared/InputFieldError';

interface profileProps {
  userInfo: IUserInfo;
}
const Profile = ({ userInfo }: profileProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>(userInfo.gender);
  const [result, setResult] = useState<any>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateUser(formData);
      setResult(result);
      // console.log(result);
      if (result.success) {
        toast.success(result.message);

        setPreviewImage(null);
        setError(null);
        setSuccess(result.message);
        router.refresh();
      } else {
        setError(result.message || 'Failed to update profile');
      }
    });
  };

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div>
        <h1 className='text-3xl font-bold'>My Profile</h1>
        <p className='text-muted-foreground mt-1'>
          Manage your personal information
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='grid gap-6 lg:grid-cols-3'>
          {/* Profile Card */}
          <Card className='lg:col-span-1'>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col items-center space-y-1'>
              <div className='relative'>
                <Avatar className='h-32 w-32'>
                  {previewImage || userInfo.profileImage ? (
                    <AvatarImage
                      src={previewImage || (userInfo.profileImage as string)}
                      alt={userInfo.name}
                    />
                  ) : (
                    <AvatarFallback className='text-3xl'>
                      {getInitials(userInfo!.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <label
                  htmlFor='file'
                  className='absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors'
                >
                  <Camera className='h-4 w-4' />
                  <Input
                    type='file'
                    id='file'
                    name='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleImageChange}
                    disabled={isPending}
                  />
                </label>
              </div>

              <div className='text-center mt-2'>
                <p className='font-semibold text-lg'>{userInfo.name}</p>
                <p className='text-sm text-muted-foreground'>
                  {userInfo.email}
                </p>
                <p className='text-xs text-muted-foreground mt-1 capitalize'>
                  {userInfo.role.replace('_', ' ')}
                </p>
              </div>
              <div className='text-center'>
                {userInfo.bio && (
                  <p className='text-sm text-muted-foreground mt-1 max-w-sm'>
                    {userInfo.bio}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Profile Information Card */}
          <Card className='lg:col-span-2'>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {error && (
                <div className='bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm'>
                  {error}
                </div>
              )}

              {success && (
                <div className='bg-green-500/10 text-green-600 px-4 py-3 rounded-md text-sm'>
                  {success}
                </div>
              )}

              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Full Name</Label>
                  <Input
                    id='name'
                    name='name'
                    defaultValue={userInfo.name || ''}
                    required
                    disabled={isPending}
                  />
                  <InputFieldError field='name' state={result} />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    value={userInfo.email || ''}
                    disabled
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='contactNumber'>Contact Number</Label>
                  <Input
                    id='contactNumber'
                    name='contactNumber'
                    placeholder=''
                    defaultValue={userInfo.contactNumber || ''}
                    required
                    disabled={isPending}
                  />
                  <InputFieldError field='contactNumber' state={result} />
                </div>

                <div className='space-y-2'>
                  <input type='hidden' name='gender' value={gender} />
                  <Label htmlFor='gender'>Gender</Label>
                  <Select
                    defaultValue={gender}
                    onValueChange={(value) =>
                      setGender(value as 'MALE' | 'FEMALE')
                    }
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select gender' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value='MALE'>Male</SelectItem>
                        <SelectItem value='FEMALE'>Female</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='dob'>Date of Birth</Label>
                  <Input
                    id='dob'
                    name='dob'
                    defaultValue={
                      userInfo.dob
                        ? new Date(userInfo.dob).toISOString().split('T')[0]
                        : ''
                    }
                    type='date'
                    required
                    disabled={isPending}
                  />
                </div>

                {/* Patient-Specific Fields */}
                {userInfo.hosts && (
                  <>
                    <div className='space-y-2 '>
                      <Label htmlFor='rating'>Rating</Label>
                      <Input
                        id='rating'
                        name='rating'
                        defaultValue={userInfo.hosts.rating || 0}
                        type='number'
                        disabled
                      />
                    </div>

                    <div className='space-y-2 '>
                      <Label htmlFor='totalEventHosted'>
                        Total Events Hosted
                      </Label>
                      <Input
                        id='totalEventHosted'
                        name='totalEventHosted'
                        defaultValue={userInfo.hosts.totalEventsHosted || 0}
                        type='number'
                        disabled
                      />
                    </div>
                  </>
                )}
              </div>

              <div className='flex justify-end pt-4'>
                <Button type='submit' disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className='mr-2 h-4 w-4' />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default Profile;
