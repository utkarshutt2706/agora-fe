import { useParams } from 'react-router-dom';

function ChatRoom() {
  const params = useParams();
  console.log(params);

  return (
    <>
      <p>ChatRoom</p>
    </>
  );
}
export default ChatRoom;
