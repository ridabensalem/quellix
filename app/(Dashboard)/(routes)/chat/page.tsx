"use client";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import EmptyChat from "@/components/ui/empty_chat";
import { ChatCompletionRequestMessage } from "openai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProModal } from "@/app/hooks/pro_modal";
import { useRouter } from "next/navigation";
import { Form, FormItem, FormField, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import formSchema from "./constant";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

const ChatPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const proModal = useProModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post('/api/chat', { messages: newMessages });
      setMessages((current) => [...current, userMessage, response.data]);
      console.log(response.data);
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
        Welcome to Our AI <span className="text-indigo-500"> Chat</span>{" "}
      </h1>
      <p className="mt-4 md:text-xl text-gray-600">
        Engage in Conversations with your smart AI assistant
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
                      placeholder="How do I calculate the radius of a circle?"
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
            <Loader className="animate-spin h-8 w-8 text-indigo-500 mr-3" />
            {"Generating..."}
          </div>
        )}
        {messages.length === 0 && !isLoading && (
          <EmptyChat />
        )}
      {messages.map((message) => (
  <div
    key={message.content}
    className={cn(
      "p-4 mx-8 my-4  flex items-start gap-4 rounded-lg",
      message.role === "user" ? "bg-white border border-black/10" : "bg-muted",
    )}
  >
    <p className="text-sm">
      {message.content}
    </p>
  </div>
))}

      </div>
    </div>
  );
};

export default ChatPage;
