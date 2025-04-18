import { SidebarProvider } from '@/components/ui/sidebar';
import { BaseResponse, Room } from '@/dto';
import { API_ENDPOINTS } from '@/lib/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import CustomHeader from '../CustomHeader';
import CustomSidebar from '../CustomSidebar';

function Home() {
  const navigate = useNavigate();
  const params = useParams();
  const [rooms, setRooms] = useState([] as Room[]);
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

  const getAllRooms = async () => {
    try {
      const response = await axios.get<void, BaseResponse<Room[]>>(
        `${API_ENDPOINTS.getAllRooms}`
      );
      if (response && response.data) {
        setRooms(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectRoom = (room: Room | null) => {
    setSelectedRoom(room);
    if (room) navigate(`/home/chat/${room._id}`);
  };

  return (
    <>
      <SidebarProvider>
        <CustomSidebar
          rooms={rooms}
          handleSelectRoom={handleSelectRoom}
        ></CustomSidebar>
        <CustomHeader selectedRoom={selectedRoom}></CustomHeader>
      </SidebarProvider>
      <Outlet></Outlet>
    </>
  );
}

export default Home;
