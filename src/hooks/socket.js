import { useState } from 'react';

function useForm(queuePublish, socketEmit){
  const [values, setValues] = useState({});
  
  const _handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const _handleSubmit = e => {
    e.preventDefault();
    e.target.reset();
    socketEmit('words', values);
    queuePublish('deeds', 'work', values)
  };

  return [values, _handleChange, _handleSubmit];
}

export default useForm;  