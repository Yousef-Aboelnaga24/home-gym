import { cn } from './Button';

export function Badge({ className, variant = 'default', children, ...props }) {
  const baseStyles = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2';
  
  const variants = {
    default: 'border-transparent bg-yellow-500 text-black hover:bg-yellow-400',
    secondary: 'border-transparent bg-zinc-800 text-zinc-100 hover:bg-zinc-700',
    outline: 'text-zinc-100 border-zinc-700',
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
