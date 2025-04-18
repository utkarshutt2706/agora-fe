import { SidebarProvider } from '@/components/ui/sidebar';
import { BaseResponse, Room } from '@/dto';
import { API_ENDPOINTS } from '@/lib/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import CustomHeader from '../CustomHeader';
import CustomSidebar from '../CustomSidebar';

function Home() {
  const [rooms, setRooms] = useState([] as Room[]);
  const [selectedRoom, setSelectedRoom] = useState(null as Room | null);

  useEffect(() => {
    getAllRooms();
  }, []);

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

  return (
    <>
      <SidebarProvider>
        <CustomSidebar
          rooms={rooms}
          handleSelectRoom={setSelectedRoom}
        ></CustomSidebar>
        <CustomHeader selectedRoom={selectedRoom}></CustomHeader>
      </SidebarProvider>
      <Outlet></Outlet>
    </>
  );
}

export default Home;
