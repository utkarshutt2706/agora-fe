import CustomChat from '@/components/custom/CustomChat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Chat } from '@/dto';
import { axiosGet } from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/constants';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ChatRoom() {
  const params = useParams();
  const [chats, setChats] = useState([] as Chat[]);

  useEffect(() => {
    if (params.roomId) getAllChats(params.roomId);
  }, [params.roomId]);

  const getAllChats = async (roomId: string) => {
    try {
      const response = await axiosGet<Chat[]>(
        `${API_ENDPOINTS.getChatsByRoomId}${roomId}`
      );
      if (response && response.length) {
        setChats(response);
      } else {
        setChats([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{ height: 'calc(100svh - 48px)' }}
        className='flex flex-col justify-end px-4 py-4 lg:px-6'
      >
        <div className='flex flex-col-reverse overflow-y-auto'>
          {chats && chats.length
            ? chats.map((chat) => <CustomChat chat={chat} key={chat._id} />)
            : null}
        </div>
        <div className='flex w-full items-center space-x-2'>
          <Input type='text' placeholder='Type your message' className='h-12' />
          <Button
            type='submit'
            className='h-12 lg:px-10 md:px-8 sm:px-6 xs:px-4'
          >
            Send
          </Button>
        </div>
      </div>
    </>
  );
}
export default ChatRoom;
