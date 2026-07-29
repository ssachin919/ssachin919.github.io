import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type SampleSectionProps = {
  id: string;
  title: string;
  library: string;
  description: string;
  children: React.ReactNode;
};

export function SampleSection({
  id,
  title,
  library,
  description,
  children,
}: SampleSectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <Card className="border-mbb-green/15 bg-card/90 backdrop-blur-sm">
        <CardHeader>
          <p className="text-[10px] font-semibold tracking-[0.28em] text-mbb-green uppercase">
            {library}
          </p>
          <CardTitle className="text-xl font-bold tracking-tight">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <Separator className="bg-mbb-green/15" />
        <CardContent className="pt-4">{children}</CardContent>
      </Card>
    </section>
  );
}
