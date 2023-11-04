import axios from "axios";
import { notFound } from "next/navigation";

import BackButton from "@/components/BackButton";
import InfoCountry from "@/components/InfoCountry";
import InfoCurrency from "@/components/InfoCurrency";
import InfoCallingCode from "@/components/InfoCallingCode";

export default async function Country({
  searchParams,
}: {
  searchParams?: { [key: string]: string | null | undefined };
}) {
  const dataCountry = await getDataCountry(searchParams?.name);
  const dataCurrency = await getDataCurrency(searchParams?.currency);
  const dataCallingCode = await getDataCallingCode(searchParams?.callingCode);

  return (
    <main className="container py-14 md:px-14 lg:px-40">
      <BackButton />
      <InfoCountry
        name={dataCountry[0].name.common}
        altSpellings={dataCountry[0].altSpellings}
        latlng={dataCountry[0].latlng}
        capital={dataCountry[0].capital}
        region={dataCountry[0].region}
        subregion={dataCountry[0].subregion}
        flag={dataCountry[0].cca2}
      />
      <div className="flex flex-col md:flex-row gap-6 mt-12">
        <InfoCallingCode
          callingCode={searchParams?.callingCode}
          countries={dataCallingCode}
        />
        <InfoCurrency
          currency={searchParams?.currency}
          countries={dataCurrency}
        />
      </div>
    </main>
  );
}

async function getDataCountry(name: string | null | undefined) {
  try {
    const res = await axios.get(
      `https://restcountries.com/v3.1/name/${name}?fullText=true`
    );
    return res.data;
  } catch (error) {
    notFound();
  }
}

async function getDataCurrency(currency: string | null | undefined) {
  try {
    const res = await axios.get(
      `https://restcountries.com/v2/currency/${currency}`
    );
    return res.data;
  } catch (error) {
    notFound();
  }
}

async function getDataCallingCode(callingCode: string | null | undefined) {
  try {
    const res = await axios.get(
      `https://restcountries.com/v2/callingcode/${callingCode}`
    );
    return res.data;
  } catch (error) {
    notFound();
  }
}
