import { useState, useEffect, useRef } from 'react'
import Board from './Board'
import Confetti from 'react-confetti'
import CheckWin from '../until/CheckWin'

export default function Game() {
  const [squares,setSquares] = useState(Array(25).fill(0))
  const [winner,setWinner] =useState(null)
  const [roomId, setRoomId] = useState('');
  const [inputRoomId, setInputRoomId] = useState('');
  const [message, setMessage] = useState('Tạo phòng hoặc tham gia để chơi.');
  const [isInGame, setIsInGame] = useState(false);

  const wsRef = useRef(null)

  useEffect(() => {
    const result = CheckWin(squares)
    if(result){
      setWinner(result.winner)
    }
  },[squares])

  useEffect(() => {
    // Chỉ kết nối khi wsRef chưa được tạo
    if (!wsRef.current) {
      const ws = new WebSocket('ws://localhost:8084')
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('connected to server WebSocket.')
      };

      // Xử lý tất cả tin nhắn từ server
      ws.onmessage = (event) => {
        const { type, payload } = JSON.parse(event.data)

        switch (type) {
          case 'ROOM_CREATED':
            setRoomId(payload.roomId)
            setMessage(`Room ${payload.roomId} has been created. Waiting for another player...`)
            setIsInGame(true)
            break;

          case 'GAME_START':
            setSquares(payload.gameBoard);
            setMessage('Game begin!')
            setIsInGame(true)
            break

          case 'GAME_STATE_UPDATE':
            setSquares(payload.gameBoard)
            setWinner(null) // Reset winner mỗi khi có nước đi mới
            break

          case 'OPPONENT_LEFT':
            setMessage('a player has left. game over.')
            setWinner('player disconected')
            setIsInGame(false) // Quay về màn hình chính
            setRoomId('')
            break

          case 'ERROR':
            alert(`Error: ${payload.message}`)
            break
        }
      }
      ws.onclose = () => {
        console.log('Disconnected WebSocket.')
        wsRef.current = null; // Đặt lại để có thể kết nối lại
      };
    }
    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, []);
  
  const sendWsMessage = (type, payload = {}) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type, payload }))
    }
  }

  const handleCreateRoom = () => {
    sendWsMessage('CREATE_ROOM')
  }

  const handleJoinRoom = () => {
    if (inputRoomId.trim()) {
      sendWsMessage('JOIN_ROOM', { roomId: inputRoomId.trim().toUpperCase() })
    }
  }

  // Gửi 'move' lên server
  const handleClick = (i) => {
    if (winner || !isInGame) return; // Không cho bấm nếu đã thắng hoặc chưa vào game
    // Gửi nước đi lên server
    sendWsMessage('GAME_MOVE', { index: i })
  }

  // Gửi 'restart' lên server
  const handleRestart = () => {
    sendWsMessage('RESTART_GAME')
  }

return (
    <>
      {winner && winner !== 'player disconected' && <Confetti />}

      <div className='flex flex-col items-center p-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg'>
        
        {/* Màn hình chính (Chưa vào game) */}
        {!isInGame && (
          <div className="w-full text-center text-white">
            <h1 className="text-3xl font-bold mb-4">Odd/Even Online</h1>
            <button
              className='w-full px-4 py-2 mb-4 bg-green-500 text-white rounded'
              onClick={handleCreateRoom}
            >
              Create new room
            </button>
            <div className="flex w-full mb-4">
              <input
                type="text"
                placeholder="Please enter Id"
                className="flex-grow p-2 rounded-l text-white"
                value={inputRoomId}
                onChange={(e) => setInputRoomId(e.target.value)}
              />
              <button
                className='px-4 py-2 bg-blue-500 text-white rounded-r'
                onClick={handleJoinRoom}
              >
                Vào phòng
              </button>
            </div>
            <p className="text-lg">{message}</p>
          </div>
        )}

        {/* Màn hình chơi game (Đã vào game) */}
        {isInGame && (
          <>
            <h2 className='text-xl font-bold mb-2 text-white'>
              {winner ? `Winner is: ${winner}` : `Phòng: ${roomId}`}
            </h2>
            <p className="text-white mb-2">{!winner && message}</p>
            
            <div className="w-full">
              <Board squares={squares} handleClick={handleClick} />
            </div>
            <div className='mt-5'>
              <button
                className='px-4 py-2 bg-blue-500 text-white rounded'
                onClick={handleRestart}
              >
                Restart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}