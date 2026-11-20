import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type PageHeaderProps = {
  title: string;
  subtitle: string;
};

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <Card className="rounded-md text-center">
      <CardHeader>
        <CardTitle>
          <h1 className="text-lg font-bold">{title}</h1>
        </CardTitle>
        <CardDescription className="text-sm">{subtitle}</CardDescription>
      </CardHeader>
    </Card>
  );
}
