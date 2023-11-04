import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface InfoCurrencyProps {
  currency: string | null | undefined;
  countries: any[];
}

const InfoCurrency = ({ countries, currency }: InfoCurrencyProps) => {
  return (
    <Card className="w-full md:w-1/2 border-0 m-0 p-0 shadow-none">
      <CardHeader className="px-0">
        <CardTitle>Currency</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <h1 className="font-bold text-4xl md:text-5xl text-violet-500 space-x-4">
          {currency}
        </h1>
        <TooltipProvider>
          <Tooltip>
            <p className="mt-1">
              <TooltipTrigger>
                <span className="underline text-violet-500">
                  {countries.length} country
                </span>
              </TooltipTrigger>{" "}
              with this currency
            </p>
            <TooltipContent className="bg-[#525252] text-white space-y-2">
              {countries?.map((country, index) => (
                <p key={index}>{country.name}</p>
              ))}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default InfoCurrency;
