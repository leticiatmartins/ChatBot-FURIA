import React from 'react';

const Message = ({ from, text }) => {
  return (
    <div className={`flex ${from === 'bot' ? 'justify-start' : 'justify-end'} animate-fade-in`}>
      <div className={`p-3 rounded-2xl max-w-xs text-sm break-words
        ${from === 'bot' 
          ? 'bg-gray-200 text-black rounded-bl-none' 
          : 'bg-black text-white rounded-br-none'
        }
      `}>
        {text}
      </div>
    </div>
  );
};

export default Message;
