import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Room } from '@/dto';
import { MessageCircleCode, MessageCircleMore } from 'lucide-react';

function CustomSidebar({
  rooms,
  handleSelectRoom,
}: {
  rooms: Room[];
  handleSelectRoom: (room: Room) => void;
}) {
  return (
    <>
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
                    <span
                      className='text-base px-[1.5rem] cursor-pointer'
                      onClick={() => handleSelectRoom(room)}
                    >
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
    </>
  );
}

export default CustomSidebar;
