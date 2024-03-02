import { CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function CardListFile({ props }: any) {
  const token = localStorage.getItem("token");
  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_BASE_URL_API}/view/file/${props.id}?token=${token}`}
      target="_blank"
    >
      <div className="w-65 h-75 overflow-hidden border rounded-md">
        <img
          alt="Card Image"
          className="w-full h-35 object-cover "
          src="/images/cover/uploadFileCover.png"
        />
        <CardContent className="p-4">
          <CardTitle className="text-xl font-bold mb-2">
            {props.deskripsi}
          </CardTitle>
        </CardContent>
      </div>
    </Link>
  );
}
