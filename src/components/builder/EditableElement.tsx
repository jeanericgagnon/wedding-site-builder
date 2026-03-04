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
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 border-2 border-blue-500 bg-blue-500/10 rounded" />
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 pointer-events-auto whitespace-nowrap z-50">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-colors text-xs font-medium flex items-center gap-1.5"
            >
              <Edit3 className="w-3 h-3" />
              Edit {fieldLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
