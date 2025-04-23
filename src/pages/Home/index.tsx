import CustomHeader from '@/components/custom/CustomHeader';
import CustomSidebar from '@/components/custom/CustomSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import SocketContext from '@/contexts/SocketContext';
import { Room } from '@/dto';
import useSocket from '@/hooks/useSocket';
import { axiosGet } from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/constants';
import { ROUTES } from '@/routes';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

function Home() {
  const params = useParams();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const socket = useSocket();

  useEffect(() => {
    getAllRooms();
  }, []);

  useEffect(() => {
    if (params.roomId && rooms && rooms.length) {
      const currentRoom = rooms.find((room) => room._id === params.roomId);
      if (currentRoom) {
        setSelectedRoom(currentRoom);
      } else {
        setSelectedRoom(rooms[0]);
      }
    }
  }, [rooms, params.roomId]);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });
  }, [socket]);

  useEffect(() => {
    if (socket) socket.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllRooms = async () => {
    try {
      const response = await axiosGet<Room[]>(`${API_ENDPOINTS.getAllRooms}`);
      if (response && response.length) {
        setRooms(response);
      } else {
        setRooms([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectRoom = (room: Room | null) => {
    setSelectedRoom(room);
    if (room) navigate(`${ROUTES.chatRoom}${room._id}`);
  };

  return (
    <>
      <SidebarProvider>
        <CustomSidebar
          rooms={rooms}
          handleSelectRoom={handleSelectRoom}
        ></CustomSidebar>
        <SidebarInset>
          <CustomHeader
            selectedRoom={selectedRoom}
            isSocketConnected={isConnected}
          ></CustomHeader>
          <SocketContext.Provider value={socket}>
            <Outlet></Outlet>
          </SocketContext.Provider>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export default Home;
