

const Mention = ({ name, image, onClick }) => {
  return (
    <span 
      className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors"
      onClick={onClick}
    >
      {name} 
      {image}
    </span>
  );
};

// Demo usage
const MentionDemo = () => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Mention Component Demo</h2>
      <p>
        Here's a message with mentions: <Mention name="john" image="/api/placeholder/32" onClick={() => alert('John clicked')} /> and{' '}
        <Mention name="sarah" image="/api/placeholder/32" onClick={() => alert('Sarah clicked')} />.
      </p>
    </div>
  );
};

export default MentionDemo;