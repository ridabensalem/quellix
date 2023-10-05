"use client";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useProModal } from "@/app/hooks/pro_modal";
import EmptyVoice from "@/components/ui/empty_voice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, FormItem, FormField, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import formSchema from "./constant";
import { Loader } from "lucide-react";

const VoicePage = () => {
  const router = useRouter();
const [voice, setVoice] = useState <string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
    setVoice(undefined);
      const response = await axios.post('/api/voice',values);
      setVoice (response.data);
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
        Welcome to Our Voice <span className="text-red-400"> Generator</span>{" "}
      </h1>
      <p className="mt-4 md:text-xl text-gray-600">
        Generate  voice  with your AI assistant
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
            <Loader className="animate-spin h-8 w-8 text-red-400 mr-3" />
            {"Generating..."}
          </div>
        )}
        {!voice && !isLoading  && (
          <EmptyVoice />
        )}
       {voice && (
          <audio controls className="w-full mt-8">
            <source src={voice} />
          </audio>
        )}

      </div>
    </div>
  );
};

export default VoicePage;
