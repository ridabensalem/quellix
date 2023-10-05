"use client";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import EmptyVideo from "@/components/ui/empty_video";
import { useProModal } from "@/app/hooks/pro_modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, FormItem, FormField, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import formSchema from "./constant";
import { Loader } from "lucide-react";

const VideoPage = () => {
  const router = useRouter();
  const proModal = useProModal();
const [video, setVideo] = useState <string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
    setVideo(undefined);
      const response = await axios.post('/api/video',values);
      setVideo(response.data[0]);
      form.reset();
    } catch (error: any) {
      if (error.response?.status === 403) {
        proModal.onOpen();
      }
    } finally {
      // refresh the router 
      router.refresh();
    }
  };

  return (
    <div className="text-center py-8">
      <h1 className="md:text-5xl font-extrabold">
        {" "}
        Welcome to Our Video <span className="text-amber-500"> Generator</span>{" "}
      </h1>
      <p className="mt-4 md:text-xl text-gray-600">
        Generate great videos with your AI assistant
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
                      placeholder="Enter your video prompt here ..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="mt-8">
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center ">
            <Loader className="animate-spin h-8 w-8 text-amber-500 mr-3" />
            {"Generating..."}
          </div>
        )}
        {!video && !isLoading  && (
          <EmptyVideo />
        )}
       {video && (
          <video controls className="w-full aspect-video mt-8 rounded-lg border bg-black">
            <source src={video} />
          </video>
        )}

      </div>
    </div>
  );
};

export default VideoPage;
