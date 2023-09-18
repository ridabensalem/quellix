"use client";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import EmptyImage from "@/components/ui/empty_image";
import {resolutionOptions} from './constant';
import {numberOfImages} from './constant';
import { Card, CardFooter} from "@/components/ui/card";
import Image from "next/image";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, FormItem, FormField, FormControl} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import formSchema from "./constant";
import { Loader, Download, ImageIcon} from "lucide-react";

const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount:'1',
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
     const response = await axios.post('/api/image', values);

      
     
      const urls=response.data.map((image: {url: string}) => image.url);
      setImages(urls);
      form.reset();
    } catch (error: any) {
      console.error(error);
      
    } finally {
      // refresh the router 
      router.refresh();
    }
  };

  return (
    <div className="text-center py-8">
      <h1 className="md:text-5xl font-extrabold">
        {" "}
        Welcome to Our Image <span className="text-fuchsia-500"> Generator</span>{" "}
      </h1>
      <p className="mt-4 md:text-xl text-gray-600">
        Generate awesome images with your AI assistant
      </p>
      <div className="mt-12 flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
              rounded-lg 
              border 
              w-3/4 
              p-4
              px-3 
              md:px-6 
              focus-within:shadow-sm
              grid
              grid-cols-12
              justify-center
              gap-2
            "
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Enter a prompt"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
             
             <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
              Generate
            </Button>
            <div className="col-span-12 w-full ">

            
            <FormField 
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className=" m-2 lg:col-span-2">
                  <Select 
                    disabled={isLoading} 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue  />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}  
              name="amount"
              render={({ field }) => (
                <FormItem className=" m-2 lg:col-span-2">
                  <Select 
                    disabled={isLoading} 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {numberOfImages.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
             </div>
           
          </form>
         
              
        </Form>
      </div>
      <div className="mt-8">
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center ">
            <Loader className="animate-spin h-8 w-8 text-fuchsia-500 mr-3" />
            {"Generating..."}
          </div>
        )}
        {images.length === 0 && !isLoading && (
          <EmptyImage />
        )}
       
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {images.map((src) => (
            <Card key={src} className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  fill
                  alt="Generated"
                  src={src}
                />
              </div>
              <CardFooter className="p-2">
                <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ImagePage;
