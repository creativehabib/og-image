import {ImageResponse} from "next/og";
import {deploymentURL} from "@/constant/env";

export async function GET(request: Request) {
    // const fontData = fetch(new URL("../../../../assets/SolaimanLipi.ttf", import.meta.url)).then((res) => res.arrayBuffer());
   try {
        const { searchParams } = new URL(request.url);
        const title = searchParams.get("title");
        const description = searchParams.get("description");
        const logoUrl = searchParams.get("logoUrl");

        const decodedLogoUrl = logoUrl ? decodeURIComponent(logoUrl) : `${deploymentURL}/images/logo.png`;
        return new ImageResponse(
            (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    padding: '100px',
                    background: 'linear-gradient(135deg, #FF6FD8 10%, #3813C2 100%)',
                }}>
                    {decodedLogoUrl && (
                        <img src={decodedLogoUrl} alt="logo" width={200} height={200} style={{objectFit: 'contain'}}/>)}
                    <h1 tw="text-6xl font-bold bg-yellow-200 rounded-lg uppercase p-4">{title}</h1>
                    <p tw="text-4xl text-white text-center">{description}</p>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (error: any) {
        console.log(`${error.message}`);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return new Response(`Failed to load image: ${errorMessage}`, {
            status: 500,
        })
    }
}