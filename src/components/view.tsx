import { VIEW_CLASSNAME } from "@/lib/styles";
import { cn } from "@/lib/utils";

interface ViewProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const ViewContent = ({ children, className }: ViewProps) => {
  return <div className={cn("w-full max-w-7xl", className)}>{children}</div>;
};

const View = ({ children, className, style }: ViewProps) => {
  return (
    <div className={cn(VIEW_CLASSNAME, className)} style={style}>
      {children}
    </div>
  );
};

export default View;
