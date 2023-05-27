import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

async function getProfessionalDetails() {
  const res = await fetch(
    "http://localhost:1337/api/professional-detail?populate=*"
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Contact() {
  const professionalDetails: professionalDetails =
    await getProfessionalDetails();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>
        Email {professionalDetails.data.attributes.name} at{" "}
        {professionalDetails.data.attributes.emailAddress}
      </p>
    </main>
  );
}
