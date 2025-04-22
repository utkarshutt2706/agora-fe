import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';

function UserAvatar({ userName }: { userName: string }) {
  const [initials, setInitials] = useState('');

  useEffect(() => {
    if (userName) setUserNameInitials(userName);
  }, [userName]);

  const setUserNameInitials = (userName: string) => {
    const name = userName;
    if (!name) return '';

    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
      setInitials(words[0][0].toUpperCase());
      return;
    }

    setInitials(
      words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase()
    );
  };

  return (
    <>
      <Avatar className='h-12 w-12 rounded-full grayscale'>
        <AvatarFallback className='rounded-full'>{initials}</AvatarFallback>
      </Avatar>
    </>
  );
}
export default UserAvatar;
