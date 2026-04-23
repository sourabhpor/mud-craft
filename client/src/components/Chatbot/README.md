# Chatbot Component Documentation

A modern, modular chatbot UI component for your e-commerce frontend. Built with React, TypeScript, Tailwind CSS, and ready for API integration.

## Features

- ✅ Floating chat button (bottom right)
- ✅ Modal chat window
- ✅ User & bot message styling
- ✅ Real-time message state management
- ✅ API integration with `/chat` endpoint
- ✅ Loading indicator (animated dots)
- ✅ Error handling & display
- ✅ Auto-scroll to latest message
- ✅ Clean, modern UI using Tailwind CSS
- ✅ Fully typed with TypeScript

## Component Structure

```
Chatbot/
├── Chatbot.tsx         # Main wrapper component
├── ChatButton.tsx      # Floating chat button
├── ChatWindow.tsx      # Main chat interface
├── ChatMessage.tsx     # Individual message component
└── index.ts            # Exports
```

## Installation & Usage

### 1. Install Required Dependencies

The chatbot uses `lucide-react` for icons. If not already installed:

```bash
npm install lucide-react
```

### 2. Add to Your App

Import and place the Chatbot component in your main App or layout component:

```tsx
import { Chatbot } from "./components/Chatbot";

function App() {
  return (
    <>
      <YourMainContent />
      <Chatbot />
    </>
  );
}
```

### 3. API Integration

The chatbot sends messages to `POST /chat` endpoint. Expected request/response:

**Request:**

```json
{
  "message": "User message text"
}
```

**Response:**

```json
{
  "reply": "Bot response text"
}
```

### 4. Optional: Use Chat API Hook

For more control, use the `useChatAPI` hook directly:

```tsx
import { useChatAPI } from './hooks/useChatAPI';

const MyComponent = () => {
  const { sendMessage, isLoading, error } = useChatAPI();

  const handleSend = async () => {
    const reply = await sendMessage("Hello!");
    console.log(reply);
  };

  return ...;
};
```

## Customization

### Styling

All styling is done with Tailwind CSS classes. Key areas to customize:

- **Colors**: Change `bg-blue-500` to your brand color
- **Size**: Modify `w-96 h-96` for window dimensions
- **Position**: Adjust `fixed bottom-4 right-4` for button position

### API Endpoint

To use a different endpoint, modify:

- `ChatWindow.tsx`: Change `/chat` to your endpoint
- `useChatAPI.ts`: Same change

### Custom Messages

Initialize with custom welcome message in `ChatWindow.tsx`:

```tsx
const [messages, setMessages] = useState<Message[]>([
  {
    id: "1",
    text: "Welcome to our store!",
    isUser: false,
    timestamp: new Date(),
  },
]);
```

## Browser Compatibility

Works on all modern browsers (Chrome, Firefox, Safari, Edge). Uses:

- React 18+
- CSS Flexbox
- CSS Grid
- ES2020+ JavaScript

## Tech Stack

- **React**: Functional components with hooks
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library
- **Vite**: Build tool (already in your project)

## API Error Handling

- Network errors are caught and displayed in chat
- HTTP errors (4xx, 5xx) trigger error message
- User is notified with clear error text
- Retry is possible by sending another message

## Performance

- Lightweight (no heavy dependencies)
- Optimized re-renders with React.FC
- Smooth animations with Tailwind
- Auto-scroll only on new messages

## Accessibility

- Semantic HTML
- ARIA labels on buttons
- Keyboard support (Enter to send)
- Proper form structure

## Future Enhancements

Consider adding:

- Message timestamps display
- Typing indicators from bot
- Message persistence (localStorage)
- User typing indicators
- Emoji support
- Suggested quick replies
- Chat history/context management
