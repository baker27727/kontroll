import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface TreeViewProps {
  data: TreeNode[];
}

function TreeViewItem({ node, level = 0 }: { node: TreeNode; level?: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className={`flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer ${
          level > 0 ? 'ml-4' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {node.children && node.children.length > 0 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 mr-2 transition-transform ${isOpen ? 'transform rotate-90' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
        <span>{node.label}</span>
      </div>
      <AnimatePresence>
        {isOpen && node.children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {node.children.map((child) => (
              <TreeViewItem key={child.id} node={child} level={level + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TreeView({ data }: TreeViewProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      {data.map((node) => (
        <TreeViewItem key={node.id} node={node} />
      ))}
    </div>
  );
}