import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { BaseResponse, Room } from '@/dto';
import { API_ENDPOINTS } from '@/lib/constants';
import axios from 'axios';
import { MessageCircleCode, MessageCircleMore } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

function Home() {
  const [rooms, setRooms] = useState([] as Room[]);

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
        <Sidebar collapsible='offcanvas'>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <span className='px-[1rem] cursor-pointer'>
                    <MessageCircleCode />
                    <span className='text-xl font-bold'>Agora</span>
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroupLabel>
              <span className='text-lg px-[1rem]'>Rooms</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {rooms.map((room) => (
                  <SidebarMenuItem key={room._id}>
                    <SidebarMenuButton asChild>
                      <span className='text-base px-[1.5rem] cursor-pointer'>
                        <MessageCircleMore />
                        {room.name}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
            <SidebarGroup />
          </SidebarContent>
          <SidebarFooter>
            <span>User name</span>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className='group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear'>
            <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
              <SidebarTrigger className='-ml-1' />
              <Separator
                orientation='vertical'
                className='mx-2 data-[orientation=vertical]:h-4'
              />
              <h1 className='text-base font-medium'>Documents</h1>
            </div>
          </header>
        </SidebarInset>
      </SidebarProvider>
      <Outlet></Outlet>
    </>
  );
}

export default Home;
