"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Check, CopyIcon } from "lucide-react";
import React, {useEffect} from "react";
import { deploymentURL } from "@/constant/env";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  logoUrl: z.union([z.string().url(), z.string().length(0)]).optional(),
  webAddress: z.string().optional(),
  bgColor: z.string().optional(),

});
export default function OgFrom() {
  const [copied, setCopied] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("title", "Welcome to My Site");
    params.append("description", "Welcome to My Site");
    params.append("webAddress", "www.example.com");
    params.append('bgColor','#FF0000');
    params.append("logoUrl", `${deploymentURL}/images/logo.png`);
    const ogImageUrl = `/api/og?${params.toString()}`;
    setPreviewUrl(ogImageUrl);
  }, []);

  const handleCopyUrl = () => {
    const fullUrl = `${deploymentURL}${previewUrl}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    });
  };
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      logoUrl: "",
      webAddress: "",
      bgColor: ""
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, description, logoUrl, webAddress,bgColor } = values;
    const params = new URLSearchParams();
    if (title) {params.append("title", title);}
    if (description) {params.append("description", description);}
    if (logoUrl) {params.append("logoUrl", logoUrl)}
    if (webAddress) {params.append("webAddress", webAddress)}
    if(bgColor){params.append('bgColor',bgColor)}

    const ogImageUrl = `/api/og?${params.toString()}`;
    setPreviewUrl(ogImageUrl);
  }

  const formFieldList: Array<{
    label: string;
    field: keyof z.infer<typeof formSchema>;
    placeholder: string;
    description: string;
  }> = [
    {
      label: "Title",
      field: "title", // TypeScript will ensure this is a valid key
      placeholder: "Type the title",
      description: "",
    },
    {
      label: "Description",
      field: "description",
      placeholder: "Type the description",
      description: "",
    },
    {
      label: "Image",
      field: "logoUrl",
      placeholder: "Paste the image URL",
      description: `Default: ${deploymentURL}/images/logo.png`,
    },
    {
      label: "Web Address",
      field: "webAddress",
      placeholder: "www.example.com",
      description: "",
    },
    {
      label: "BG Color",
      field: "bgColor",
      placeholder: "Enter bg bgColor code",
      description: "",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto md:grid md:grid-cols-2 md:gap-6 md:space-y-0 space-y-6 px-4 py-12">
      <div className="bg-card p-6 rounded-lg border shadow-md">
        <h2 className="text-2xl font-bold mb-4">Open Graph Image Generator</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {formFieldList.map((item, index) => (
              <div key={index}>
                <FormField
                  control={form.control}
                  name={item.field}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.label}</FormLabel>
                      <FormControl>
                        <Input placeholder={item.placeholder} {...field} />
                      </FormControl>
                      <FormDescription>{item?.description}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <Button type="submit" className="w-full">
              Generate ☘️
            </Button>
          </form>
        </Form>
      </div>
      <div className="bg-card p-6 rounded-lg border shadow-md">
        <div className="bg-muted rounded-lg overflow-hidden">
          {previewUrl && (
            <Image
              priority
              src={previewUrl}
              alt="Open Graph Image"
              width={1200}
              height={630}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <span>Generated URL:</span>
          <div className="bg-muted rounded-md px-3 py-2 flex items-center justify-between">
            <span className="text-sm truncate">{`${deploymentURL}${previewUrl}`}</span>
            <Button
              onClick={handleCopyUrl}
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:bg-muted"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <CopyIcon className="h-4 w-4 me-2" />
              )}
            </Button>
            <a
              href={previewUrl}
              download="my-image.jpg"
              style={{
                display: "inline-block",
                padding: "5px 10px",
                backgroundColor: "#0070f3",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "5px",
              }}
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
