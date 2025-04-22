import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AuthContext from '@/contexts/AuthContext';
import { ChatResponseDto } from '@/dto';
import { useContext } from 'react';
import UserAvatar from '../UserAvatar';

function CustomChat({ chat }: { chat: ChatResponseDto }) {
  const authData = useContext(AuthContext);
  const isOwnMessage = authData?.user._id === chat.authorId;
  return (
    <>
      <div
        key={chat._id}
        className={`mb-8 flex items-center ${
          isOwnMessage ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <UserAvatar userName={chat.authorName} />
        <Card
          key={chat._id}
          className={`w-[250px] lg:w-6/10 md:w-[500px] sm:w-[350px] ${
            isOwnMessage ? 'bg-neutral-200 mr-4' : 'ml-4'
          }`}
        >
          <CardHeader>
            <CardTitle>{chat.authorName}</CardTitle>
            <CardDescription>{chat.body}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}

export default CustomChat;
