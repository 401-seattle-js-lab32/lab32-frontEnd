import React, {useState, useEffect} from 'react';

import io from 'socket.io-client';
import Q from '@nmq/q/client';

import useForm from './hooks/form';
import useSocket from './hooks/queue';
import useQueue from './hooks/socket';


// Connect outside of the render cycle ...
const socket = io.connect('http://localhost:3000');
const queue = new Q('deeds');
Q.publish('deeds', 'work', '');

const App = (props) => {

  const [socketOn, socketEmit] = useSocket(socket);
  const [queuePublish, queueSubscribe] = useQueue(Q, queue);
  const [values, onChange, onSubmit] = useForm(queuePublish, socketEmit);
  const [form, setForm] = useState({});
  const [queueMessage, setQueueMessage] = useState({});
  const [socketMessage, setSocketMessage] = useState({});

  // const handleChange = e => {
  //   setValues({...values, [e.target.name]: e.target.value});
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   e.target.reset();

  //   Q.publish('deeds', 'work', values);
  //   socket.emit('words', values);

  // };

  useEffect(() => {
    queue.subscribe('work', message => {
      setQueueMessage(message);
    });

    socket.on('incoming', message => {
      setSocketMessage(message);
    });

  }, []);


  return (
    <>
      <pre>Form Values: {JSON.stringify(values)}</pre>
      <pre>Queue Values: {JSON.stringify(queueMessage)}</pre>
      <pre>Socket Values: {JSON.stringify(socketMessage)}</pre>
      <form onSubmit={onSubmit}>
        <input name='firstName' placeholder="First Name" onChange={onChange} />
        <input name='lastName' placeholder="Last Name" onChange={onChange} />
        <button>Save</button>
      </form>
    </>
  );
}

export default App;

