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
      <ul>
        {chats.map((chat) => (
          <li key={chat._id}>
            <p>{chat.title}</p>
            <p>{chat.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
export default ChatRoom;
