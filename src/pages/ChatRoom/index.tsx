import CustomChat from '@/components/custom/CustomChat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SocketContext from '@/contexts/SocketContext';
import { Chat } from '@/dto';
import { axiosGet } from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/constants';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

function ChatRoom() {
  const params = useParams();
  const [chats, setChats] = useState([] as Chat[]);
  const [message, setMessage] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (params.roomId) getAllChats(params.roomId);
  }, [params.roomId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  useEffect(() => {
    if (socket && params.roomId) {
      socket.emit('join_room', params.roomId);
    }
  }, [socket, params.roomId]);

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

  const sendMessage = () => {
    if (socket && params.roomId) {
      socket.emit('send_message', {
        body: message,
        roomId: params.roomId,
        type: 'text',
      });
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (socket) {
      socket?.emit('typing', params.roomId);
    }
  };

  return (
    <>
      <div
        style={{ height: 'calc(100svh - 48px)' }}
        className='flex flex-col justify-end px-4 py-4 lg:px-6'
      >
        <div className='flex flex-col overflow-y-auto'>
          {chats && chats.length
            ? chats.map((chat) => <CustomChat chat={chat} key={chat._id} />)
            : null}
          {/* Invisible anchor to scroll to */}
          <div ref={bottomRef} />
        </div>
        <div className='flex w-full items-center space-x-2'>
          <Input
            type='text'
            placeholder='Type your message'
            className='h-12'
            onChange={handleMessageChange}
          />
          <Button
            type='submit'
            onClick={sendMessage}
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
