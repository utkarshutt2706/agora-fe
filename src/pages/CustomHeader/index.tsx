import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Room } from '@/dto';

function CustomHeader({ selectedRoom }: { selectedRoom: Room | null }) {
  return (
    <>
      <SidebarInset>
        <header className='group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear'>
          <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
            <SidebarTrigger className='-ml-1 cursor-pointer' />
            <Separator
              orientation='vertical'
              className='mx-2 data-[orientation=vertical]:h-4'
            />
            <h1 className='text-base font-medium'>
              {(selectedRoom && selectedRoom.name) || 'Agora'}
            </h1>
          </div>
        </header>
      </SidebarInset>
    </>
  );
}

export default CustomHeader;
