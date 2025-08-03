import { LockIcon, ShieldIcon } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./../ui/card";

export const HeroCards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap justify-center items-center gap-8 relative w-[500px] h-[500px]">
      {/* HIPAA Compliance Card */}
      <Card className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] drop-shadow-xl shadow-black/10 dark:shadow-white/10 mb-5">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
            <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                <LockIcon />
            </div>
            <div>
                <CardTitle>HIPAA Compliant</CardTitle>
                <CardDescription className="text-md mt-2">
                    The security of our users' PII / PHI is our utmost priority.
                </CardDescription>
            </div>
        </CardHeader>
      </Card>

      {/* SOC2 Compliance Card */}
      {/*
      <Card className="absolute top-[300px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] drop-shadow-xl shadow-black/10 dark:shadow-white/10 mt-5">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
            <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                <ShieldIcon />
            </div>
            <div>
                <CardTitle>SOC 2 Compliant</CardTitle>
                <CardDescription className="text-md mt-2">
                    Gearing up for a voluntary audit on security, availability, processing integrity, confidentiality, and privacy
                </CardDescription>
            </div>
        </CardHeader>
      </Card>
      */}

      <Card className="absolute top-[300px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] drop-shadow-xl shadow-black/10 dark:shadow-white/10 mt-5">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
            <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                <ShieldIcon />
            </div>
            <div>
                <CardTitle>Security-First Approach</CardTitle>
                <CardDescription className="text-md mt-2">
                  Industry-standard data protection, committed to ensuring full compliance as we scale.
                </CardDescription>
            </div>
        </CardHeader>
      </Card>
    </div>
  );
};
