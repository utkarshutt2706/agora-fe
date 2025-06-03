import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

function ChatForm({
  usersTyping,
  sendMessage,
  handleMessageChange,
}: {
  usersTyping: string[];
  sendMessage: (e: React.FormEvent<HTMLFormElement>, message: string) => void;
  handleMessageChange: () => void;
}) {
  const [message, setMessage] = useState('');

  const messageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setMessage(input);
    handleMessageChange();
  };

  const onMessageSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    sendMessage(e, message);
  };

  return (
    <>
      <form
        className='relative flex w-full items-center space-x-2'
        onSubmit={onMessageSend}
      >
        {usersTyping.length > 0 && (
          <div className='absolute text-sm text-muted-foreground px-2 pb-2 top-[-20px]'>
            {usersTyping.join(', ')} {usersTyping.length === 1 ? 'is' : 'are'}{' '}
            typing...
          </div>
        )}
        <Input
          type='text'
          className='h-12'
          value={message}
          placeholder='Type your message'
          onChange={messageChangeHandler}
        />
        <Button
          type='submit'
          disabled={message === ''}
          className='h-12 lg:px-10 md:px-8 sm:px-6 xs:px-4 cursor-pointer'
        >
          Send
        </Button>
      </form>
    </>
  );
}

export default ChatForm;
