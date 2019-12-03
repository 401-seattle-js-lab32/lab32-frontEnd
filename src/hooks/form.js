import { useState } from 'react';

function useForm(queuePublish, socketEmit) {
  const [values, setValues] = useState({});

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  const handleSubmit = e => {
    e.preventDefault();
    e.target.reset();
    socketEmit('work', values);
    queuePublish('deeds', 'work', values);
  }

  return [values, handleChange, handleSubmit];
}

export default useForm;