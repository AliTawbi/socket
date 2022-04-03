import './App.css';
import React,{useState,useEffect}from 'react'
import io from 'socket.io-client'

var receiver;
var sender;
var messageCounter=0;
const pathname = window.location.pathname.substring(1);

if(pathname==="A"){
  receiver="B";
  sender="A";
}
if(pathname==="B")
{receiver="A";
sender="B";
} 

const socket = io('http://localhost:5000')
socket.emit('login', sender)

socket.on('message', data => {
      
  if(data.r===sender){
   
    document.getElementById('chat').innerHTML+="<h3 id='"+data.id+"'>"+data.m+"<h3><br></br>";
    socket.emit('delivered',data)
  }
  
})

socket.on('readed',data=>{
  if(data.s===sender){
    document.getElementById(data.id).innerHTML+= "   Readed";
  }
})

function App() {
  const [message, setMessage] = useState('')
  const [receivedMessage, setReceivedMessage] = useState([])

  function sendMessage(e) {
    console.log(message)
    e.preventDefault()
    const mid = sender+messageCounter;
    socket.emit('message', {m:message , r:receiver,s:sender,id:mid})
    document.getElementById('chat').innerHTML+="<h3 id='"+mid+"'>"+message+"<h3><br></br>";
    messageCounter++;
    setMessage('')
    
  }

  return (
    <div className="App">
      <h1>Chat App</h1>
      <form onSubmit={sendMessage}>
        <input type="text" name="message" 
        placeholder='Type Message...'
        value={message}
        onChange={e => setMessage(e.target.value)}
        ></input>
        <button type="submit">Send</button>
      </form>
     <p id='chat'></p>
    </div>
  );
}

export default App;
