import CustomChat from '@/components/custom/CustomChat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatRequestDto, ChatResponseDto } from '@/dto';
import { ChatType } from '@/enums';
import useSocket from '@/hooks/useSocket';
import { axiosGet } from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/constants';
import { showErrorToast } from '@/lib/toast';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

function ChatRoom() {
  const params = useParams();
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([] as ChatResponseDto[]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const socket = useSocket();

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
      socket.on('receive_message', onMessageReceive);
    }
    return () => {
      if (socket && params.roomId) {
        socket.off();
        socket.emit('leave_room', params.roomId);
      }
    };
  }, [socket, params.roomId]);

  const onMessageReceive = (chat: ChatResponseDto) => {
    setChats((chats) => [...chats, chat]);
  };

  const getAllChats = async (roomId: string) => {
    try {
      const response = await axiosGet<ChatResponseDto[]>(
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

  const onMessageSent = () => {
    setMessage('');
    socket?.off('message_sent');
  };

  const onMessageError = (error: string) => {
    showErrorToast(error);
    socket?.off('message_error');
  };

  const sendMessage = () => {
    if (socket && params.roomId) {
      const chatBody: ChatRequestDto = {
        body: message,
        roomId: params.roomId,
        type: ChatType.TEXT,
      };
      socket.emit('send_message', chatBody);
      socket.on('message_sent', onMessageSent);
      socket.on('message_error', onMessageError);
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
            className='h-12'
            value={message}
            placeholder='Type your message'
            onChange={handleMessageChange}
          />
          <Button
            type='submit'
            onClick={sendMessage}
            className='h-12 lg:px-10 md:px-8 sm:px-6 xs:px-4 cursor-pointer'
          >
            Send
          </Button>
        </div>
      </div>
    </>
  );
}
export default ChatRoom;
