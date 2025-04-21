import CustomHeader from '@/components/custom/CustomHeader';
import CustomSidebar from '@/components/custom/CustomSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import SocketContext from '@/contexts/SocketContext';
import { Room } from '@/dto';
import { axiosGet } from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/constants';
import socket from '@/lib/socket';
import { ROUTES } from '@/routes';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const params = useParams();
  const [rooms, setRooms] = useState([] as Room[]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [selectedRoom, setSelectedRoom] = useState(null as Room | null);

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
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    socket.connect();

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
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
