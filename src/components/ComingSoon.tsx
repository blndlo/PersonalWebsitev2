import { Card, CardContent } from '@/components/ui/card';

export default function ComingSoon({ message }: { message: string }) {
  return (
    <Card className="rounded-md py-12 text-center">
      <CardContent className="flex flex-col gap-2">
        <p className="text-base font-bold">Coming soon</p>
        <p className="text-muted-foreground text-sm">{message}</p>
      </CardContent>
    </Card>
  );
}
