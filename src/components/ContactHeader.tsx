import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function ContactHeader() {
  return (
    <Card className="rounded-md text-center">
      <CardHeader>
        <CardTitle>
          <h1 className="font-bold">Get In Touch</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Have something in mind? I'd love to hear from you.</p>
      </CardContent>
    </Card>
  );
}
