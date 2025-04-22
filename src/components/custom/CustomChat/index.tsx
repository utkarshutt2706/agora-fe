import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AuthContext from '@/contexts/AuthContext';
import { ChatResponseDto } from '@/dto';
import { useContext } from 'react';

function CustomChat({ chat }: { chat: ChatResponseDto }) {
  const authData = useContext(AuthContext);
  return (
    <>
      <div
        key={chat._id}
        className={`flex ${
          authData?.user._id === chat.authorId ? 'justify-end' : 'justify-start'
        }`}
      >
        <Card
          key={chat._id}
          className={`w-[250px] lg:w-6/10 md:w-[500px] sm:w-[350px] mb-8 ${
            chat.authorId === authData?.user._id ? 'bg-neutral-200' : ''
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
