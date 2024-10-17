// src/types/Message.ts
export interface Message {
   id: string;
   text: string;
   sender: string;
   response?: string;
   timestamp: Date;
   isEditing?: boolean;
   suggestion?: string;
}
