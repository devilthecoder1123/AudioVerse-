interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, className = "" }: PageHeaderProps) {
  return (
    <div className={`mb-8 animate-fade-in-up ${className}`}>
      <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
