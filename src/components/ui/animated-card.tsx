
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className, 
  hoverEffect = true,
  delay = 0 
}) => {
  return (
    <Card 
      className={cn(
        "transition-all duration-500 ease-out transform",
        hoverEffect && "hover:scale-105 hover:shadow-xl hover:-translate-y-1",
        "animate-in fade-in slide-in-from-bottom-4",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Card>
  );
};

export default AnimatedCard;
