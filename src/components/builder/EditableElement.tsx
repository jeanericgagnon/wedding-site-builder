import React, { useState } from 'react';
import { CreditCard as Edit3 } from 'lucide-react';

interface EditableElementProps {
  children: React.ReactNode;
  onEdit: () => void;
  fieldLabel: string;
  isPreviewMode?: boolean;
}

export const EditableElement: React.FC<EditableElementProps> = ({
  children,
  onEdit,
  fieldLabel,
  isPreviewMode = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!isPreviewMode) {
    return <>{children}</>;
  }

  return (
    <div
      className="relative inline-block group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onEdit();
      }}
    >
      {children}

      {isHovered && (
        <div className="absolute inset-0 border-2 border-blue-500 bg-blue-500/10 rounded pointer-events-none z-10" />
      )}
    </div>
  );
};
