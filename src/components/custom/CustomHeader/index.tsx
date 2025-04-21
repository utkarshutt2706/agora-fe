import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Room } from '@/dto';
import { TooltipContent } from '@radix-ui/react-tooltip';

function CustomHeader({
  selectedRoom,
  isSocketConnected,
}: {
  selectedRoom: Room | null;
  isSocketConnected: boolean;
}) {
  return (
    <>
      <header className='group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear'>
        <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
          <SidebarTrigger className='-ml-1 cursor-pointer' />
          <Separator
            orientation='vertical'
            className='mx-2 data-[orientation=vertical]:h-4'
          />
          <h1 className='text-base font-medium w-full flex justify-between'>
            <span>{(selectedRoom && selectedRoom.name) || 'Agora'}</span>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className='cursor-pointer'>
                  {isSocketConnected ? '🟢' : '🔴'}
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {isSocketConnected ? 'You are online' : 'You are offline'}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h1>
        </div>
      </header>
    </>
  );
}

export default CustomHeader;
