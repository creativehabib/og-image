import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { deploymentURL } from "@/constant/env";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const fontData = await fetch(
    new URL("../../../../assets/Karla-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const goodFont = await fetch(
    new URL("../../../../assets/good times rg.otf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Default Title";
    const description = searchParams.get("description") || "Default Description";
    const anotherText = searchParams.get('anotherText') || "";
    const logoUrl = searchParams.get("logoUrl");
    const webAddress = searchParams.get("webAddress") || "www.example.com";
    const bgColor = searchParams.get("bgColor") || "#FF0000"; // Fallback to white background if no bgColor is provided

    // Decode the logo URL if provided, fallback to default logo
    const decodedLogoUrl = logoUrl ? decodeURIComponent(logoUrl) : `${deploymentURL}/images/logo.png`;

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            background: bgColor, // Use the dynamic background color with a fallback
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
            letterSpacing: -2,
            fontFamily: '"Karla"',
            fontWeight: "bold",
          }}
        >
          <div
            style={{
              width: "120%",
              height: "800px",
              position: "absolute",
              top: "-510px",
              left: "-10%",
              zIndex: 10,
              borderRadius: "50%",
              background: "#abb2b9",
            }}
          ></div>
          <div
            style={{
              width: "110%",
              height: "950px",
              position: "absolute",
              top: "-660px",
              left: "-5%",
              zIndex: 11,
              borderRadius: "50%",
              background: "#d6dbdf",
            }}
          ></div>

          {decodedLogoUrl && (
            <img
              src={decodedLogoUrl}
              alt="logo"
              width={200}
              height={200}
              style={{
                objectFit: "contain",
                position: "absolute",
                top: 40,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
          )}

          <h1 tw="text-6xl font-bold bg-white rounded-lg uppercase py-2 px-4 text-center absolute top-72">
            {title}
          </h1>
          <p tw="text-6xl font-bold text-white text-center absolute top-100">
            {description}
          </p>

          <p tw="text-6xl font-bold text-white text-center absolute top-120">
              {anotherText}
          </p>

          <div
            style={{
              position: "absolute",
              transform: "translateX(-50%) rotate(-90deg)",
              top: "50%",
              left: "5%",
              transformOrigin: "center center",
              fontSize: "30px",
              whiteSpace: "nowrap",
              opacity: ".8",
              letterSpacing: 4,
              color: "white",
              fontFamily: '"Good Times Rg"',
              textTransform: "uppercase",
            }}
          >
            {webAddress}
          </div>



          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transformOrigin: "center center",
              transform: "translate(-50%, -20%)",
              fontSize: "50px",
              whiteSpace: "nowrap",
              opacity: ".2",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {webAddress}
          </div>
        </div>
      ),
      {
        fonts: [
          {
            name: "Karla",
            data: fontData,
          },
            {
                name: "Good Times Rg",
                data: goodFont
            }
        ],
        width: 1200,
        height: 630,
      }
    );
  } catch (error: any) {
    console.error(`Error generating image: ${error.message}`);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(`Failed to load image: ${errorMessage}`, {
      status: 500,
    });
  }
}
