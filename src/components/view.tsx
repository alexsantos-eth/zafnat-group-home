import { VIEW_CLASSNAME } from "@/lib/styles";
import { cn } from "@/lib/utils";

interface ViewProps {
  children: React.ReactNode;
  classNames?: string;
  style?: React.CSSProperties;
}
const View = ({ children, classNames, style }: ViewProps) => {
  return (
    <div className={cn(VIEW_CLASSNAME, classNames)} style={style}>
      {children}
    </div>
  );
};

export default View;
