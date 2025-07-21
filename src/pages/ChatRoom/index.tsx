import ChatForm from '@/components/custom/ChatForm';
import CustomChat from '@/components/custom/CustomChat';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChatRequestDto, ChatResponseDto } from '@/dto';
import { ChatType } from '@/enums';
import useSocket from '@/hooks/useSocket';
import { axiosGet } from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/constants';
import { showErrorToast } from '@/lib/toast';
import { RotateCcw } from 'lucide-react';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

type GroupedChats = {
  [date: string]: ChatResponseDto[];
};

const groupChatsByDate = (chats: ChatResponseDto[]): GroupedChats => {
  return chats.reduce((groups: GroupedChats, chat) => {
    const dateKey = moment(new Date(chat.createdAt)).format(
      'dddd, DD MMMM YYYY'
    );
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(chat);
    return groups;
  }, {});
};

function ChatRoom() {
  const isTyping = useRef(false);
  const params = useParams<{ roomId: string }>();
  const [chats, setChats] = useState<ChatResponseDto[]>([]);
  const [usersTyping, setUsersTyping] = useState<string[]>([]);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  // const showScrollToBottom = useRef(false);
  const [failedChats, setFailedChats] = useState<ChatRequestDto[]>([]);
  const dateRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const socket = useSocket();

  const groupedChats = groupChatsByDate(chats);

  useEffect(() => {
    if (params.roomId) getAllChats(params.roomId);
  }, [params.roomId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [chats, failedChats]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (socket && params.roomId) {
      socket.emit('join_room', params.roomId);
      socket.on('receive_message', onMessageReceive);
      socket.on('user_typing_start', onUserTypingStart);
      socket.on('user_typing_end', onUserTypingEnd);
    }
  }, [socket, params.roomId]);

  useEffect(() => {
    return () => {
      if (socket && params.roomId) {
        socket.off();
        socket.emit('leave_room', params.roomId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUserTypingStart = (name: string) => {
    setUsersTyping((prev) => {
      if (!prev.includes(name)) return [...prev, name];
      return prev;
    });
  };

  const onUserTypingEnd = (name: string) => {
    setUsersTyping((prev) => prev.filter((n) => n !== name));
  };

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

  const onMessageSent = (chat: ChatResponseDto) => {
    onMessageReceive(chat);
    socket?.off('message_sent');
    socket?.off('message_error');
  };

  const onMessageError = ({
    error,
    chat,
  }: {
    error: string;
    chat: ChatRequestDto;
  }) => {
    showErrorToast(error);
    setFailedChats((prev) => [...prev, chat]);
    socket?.off('message_error');
    socket?.off('message_sent');
  };

  const sendMessage = (
    e: React.FormEvent<HTMLFormElement>,
    message: string
  ) => {
    e.preventDefault();
    if (params.roomId) {
      const chat: ChatRequestDto = {
        body: message,
        roomId: params.roomId,
        type: ChatType.TEXT,
      };
      sendMessageToSocket(chat);
    }
  };

  const sendMessageToSocket = (chat: ChatRequestDto) => {
    if (socket) {
      socket.emit('send_message', chat);
      socket.on('message_sent', onMessageSent);
      socket.on('message_error', onMessageError);
    }
  };

  const handleMessageChange = () => {
    if (!socket || !params.roomId) return;

    if (!isTyping.current) {
      socket.emit('typing_start', params.roomId);
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      isTyping.current = false;
      socket.emit('typing_end', params.roomId);
    }, 500);
  };

  const scrollToDate = (date: string) => {
    const element = dateRefs.current[date];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const retryMessage = (chat: ChatRequestDto) => {
    if (socket && params.roomId) {
      sendMessageToSocket(chat);
      setFailedChats((prev) => prev.filter((c) => c !== chat));
    }
  };

  const onScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 200;
    setShowScrollToBottom(!isNearBottom);
  };

  return (
    <>
      <div
        style={{ height: 'calc(100svh - 48px)' }}
        className='flex flex-col justify-end px-4 py-4 lg:px-6'
      >
        <div
          className='flex flex-col overflow-y-auto scroll-hidden'
          ref={chatContainerRef}
          onScroll={onScroll}
        >
          {Object.entries(groupedChats).map(([date, dayChats]) => (
            <div
              className='relative'
              key={date}
              ref={(el) => {
                dateRefs.current[date] = el;
              }}
            >
              <div
                className='sticky top-0 z-10 bg-white flex items-center gap-4 px-1 pb-4 mb-4'
                onClick={() => scrollToDate(date)}
              >
                <Separator className='flex-1' />
                <span className='px-4 py-1 rounded-full border border-gray-300 text-center text-sm font-medium text-muted-foreground whitespace-nowrap underline hover:text-foreground hover:bg-muted cursor-pointer'>
                  {date}
                </span>
                <Separator className='flex-1' />
              </div>
              {dayChats.map((chat) => (
                <CustomChat chat={chat} key={chat._id} />
              ))}
            </div>
          ))}
          {failedChats.map((chat, index) => (
            <div
              key={`failed-${index}`}
              className='relative max-w-xs self-end bg-red-100 text-red-800 border border-red-400 px-3 py-2 rounded-lg my-2 mr-[64px]'
            >
              <RotateCcw
                className='absolute top-0 right-[-32px] cursor-pointer'
                onClick={() => retryMessage(chat)}
              />
              <div className='text-sm'>{chat.body}</div>
              <div className='text-xs italic mt-1'>Failed to send</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        {showScrollToBottom && (
          <Button
            className='fixed bottom-24 right-4 z-50 shadow-md'
            onClick={scrollToBottom}
          >
            ↓ Scroll to bottom
          </Button>
        )}
        <ChatForm
          key={params.roomId}
          usersTyping={usersTyping}
          sendMessage={sendMessage}
          handleMessageChange={handleMessageChange}
        ></ChatForm>
      </div>
    </>
  );
}
export default ChatRoom;
