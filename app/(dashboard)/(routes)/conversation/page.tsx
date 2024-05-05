"use client";

import AiResponse from "@/components/dashboard/ai-response";
import MarkdownResponse from "@/components/dashboard/markdown-response";
import ToolNavigation from "@/components/dashboard/tool-navigation";
import UserMessage from "@/components/dashboard/user-message";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useProModalStore } from "@/stores/pro-modal-store";
import { useChat } from "ai/react";
import { Send } from "lucide-react";
import { useEffect, useRef } from "react";

const ConversationPage = () => {
  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
  } = useChat({
    api: "/api/conversation",
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const { handleOpenOrCloseProModal } = useProModalStore();

  const handleClearChat = () => {
    setMessages([]);
  };

  useEffect(() => {
    if (error) {
      const errorParsed = JSON.parse(error?.message);
      if (errorParsed?.status === 403) {
        handleOpenOrCloseProModal();
      }
    }
  }, [error]);

  return (
    <div className="h-full relative flex flex-col justify-between">
      <div
        ref={containerRef}
        className="overflow-y-auto space-y-10 scroll-smooth h-[calc(100vh-180px)]"
      >
        {messages.length > 0 ? (
          <>
            {messages.map((m) => (
              <div key={m.id} className="whitespace-pre-wrap">
                {m.role === "user" ? (
                  <UserMessage>
                    <MarkdownResponse content={m.content} />
                  </UserMessage>
                ) : (
                  <AiResponse>
                    <MarkdownResponse content={m.content} />
                  </AiResponse>
                )}
              </div>
            ))}
            <div className="absolute left-0 bottom-20 text-right w-full pr-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleClearChat()}
              >
                Clear chat
              </Button>
            </div>
          </>
        ) : (
          <ToolNavigation title="Conversation" />
        )}
      </div>
      <div className="mb-[13px]">
        <form
          onSubmit={isLoading ? stop : handleSubmit}
          className="flex items-center w-full relative"
        >
          <Textarea
            className="min-h-1 resize-none"
            placeholder="Do you have any questions today?"
            value={input}
            onChange={handleInputChange}
          />

          <Button
            type="submit"
            disabled={!input}
            className="absolute right-2 gradient-btn"
          >
            {isLoading ? "Stop" : <Send />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ConversationPage;
