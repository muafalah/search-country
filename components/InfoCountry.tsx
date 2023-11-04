import Flags from "country-flag-icons/react/3x2";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import Globe from "@/public/globe.svg";

interface InfoCountryProps {
  name: string;
  altSpellings: string[];
  latlng: number[];
  capital: string[];
  region: string;
  subregion: string;
  flag: string;
}

const InfoCountry = ({
  name,
  altSpellings,
  latlng,
  capital,
  region,
  subregion,
  flag,
}: InfoCountryProps) => {
  return (
    <>
      <div className="flex flex-col gap-2 mb-12">
        <div className="flex gap-2">
          <h1 className="font-bold text-4xl md:text-5xl">{name}</h1>
          <Flags.ID title={name} className="w-12" />
        </div>
        <div className="flex gap-2">
          {altSpellings?.map((spelling) => (
            <Badge key={spelling}>{spelling}</Badge>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/2 relative overflow-hidden">
          <CardHeader>
            <CardTitle>LatLong</CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="font-bold text-4xl md:text-5xl text-violet-500 space-x-4">
              {latlng?.map((item, index) => (
                <span key={index}>
                  {item}.0
                  {latlng.length - 1 === index ? "" : ","}
                </span>
              ))}
            </h1>
          </CardContent>
          <Image
            src={Globe}
            alt="globe-image"
            width="400"
            height="400"
            className="w-[14rem] absolute right-0 top-[30%]"
          />
        </Card>
        <Card className="w-full md:w-1/2">
          <CardContent className="py-6 md:py-0 px-6 space-y-2 h-full flex flex-col justify-center">
            <p className="text-lg">
              Capital: <span className="font-medium">{capital}</span>
            </p>
            <p className="text-lg">
              Region: <span className="font-medium">{region}</span>
            </p>
            <p className="text-lg">
              Subregion: <span className="font-medium">{subregion}</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default InfoCountry;
