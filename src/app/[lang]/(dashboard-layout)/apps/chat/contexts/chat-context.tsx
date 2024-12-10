"use client";

import * as React from "react";

import { ChatReducer } from "../reducers/chat-reducer";

import type { ChatContextType, ChatType } from "../types";

// Create Kanban context
export const ChatContext = React.createContext<ChatContextType | undefined>(
  undefined
);

export function ChatProvider({
  chatsData,
  children,
}: {
  chatsData: ChatType[];
  children: React.ReactNode;
}) {
  // Reducer to manage Chat state
  const [chatState, dispatch] = React.useReducer(ChatReducer, {
    chats: chatsData,
    selectedChat: null,
  });

  // Sidebar state management
  const [isChatSidebarOpen, setIsChatSidebarOpen] = React.useState(false);

  // Handlers for message actions
  const handleAddTextMessage = (text: string) => {
    dispatch({ type: "addTextMessage", text });
  };

  const handleAddImagesMessage = (images: File[]) => {
    dispatch({ type: "addImagesMessage", images });
  };

  const handleAddFilesMessage = (files: File[]) => {
    dispatch({ type: "addFilesMessage", files });
  };

  // Handlers for chat actions
  const handleSetUnreadCount = () => {
    dispatch({ type: "setUnreadCount" });
  };

  // Selection handlers
  const handleSelectChat = (chat: ChatType) => {
    dispatch({ type: "selectChat", chat });
  };

  return (
    <ChatContext.Provider
      value={{
        chatState,
        isChatSidebarOpen,
        setIsChatSidebarOpen,
        handleSelectChat,
        handleAddTextMessage,
        handleAddImagesMessage,
        handleAddFilesMessage,
        handleSetUnreadCount,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
