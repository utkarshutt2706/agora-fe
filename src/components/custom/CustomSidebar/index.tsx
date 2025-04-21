import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { AuthContext } from '@/contexts/AuthContext';
import { Room } from '@/dto';
import { User } from '@/interfaces';
import {
  MessageCircleCode,
  MessageCircleMore,
  MoreVerticalIcon,
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CustomSidebar({
  rooms,
  handleSelectRoom,
}: {
  rooms: Room[];
  handleSelectRoom: (room: Room) => void;
}) {
  const params = useParams();
  const authData = useContext(AuthContext);
  const [initials, setInitials] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null as Room | null);

  useEffect(() => {
    if (authData && authData.user) setUserNameInitials(authData.user);
  }, [authData]);

  useEffect(() => {
    if (params.roomId && rooms && rooms.length) {
      const currentRoom = rooms.find((room) => room._id === params.roomId);
      if (currentRoom) {
        setSelectedRoom(currentRoom);
      }
    }
  }, [rooms, params.roomId]);

  const setUserNameInitials = (userObj: User) => {
    const name = userObj.fullName;
    if (!name) return '';

    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
      setInitials(words[0][0].toUpperCase());
    }

    setInitials(
      words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase()
    );
  };

  const selectRoomHandler = (room: Room) => {
    setSelectedRoom(room);
    handleSelectRoom(room);
  };

  return (
    <>
      <Sidebar collapsible='icon'>
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
                  <SidebarMenuButton
                    asChild
                    isActive={room._id === selectedRoom?._id}
                  >
                    <span
                      className='text-base px-[1.5rem] cursor-pointer'
                      onClick={() => selectRoomHandler(room)}
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
          {authData && authData.user && (
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size='lg'
                  className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer'
                >
                  <Avatar className='h-8 w-8 rounded-lg grayscale'>
                    <AvatarFallback className='rounded-lg'>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-medium'>
                      {authData.user.fullName}
                    </span>
                    <span className='truncate text-xs text-muted-foreground'>
                      {authData.user.email}
                    </span>
                  </div>
                  <MoreVerticalIcon className='ml-auto size-4' />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          )}
        </SidebarFooter>
      </Sidebar>
    </>
  );
}

export default CustomSidebar;
