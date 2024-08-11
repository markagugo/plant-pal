import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, TextField, InputAdornment, Card, Typography } from '@mui/material';
import { SendAndArchiveRounded, Chat, Cancel } from '@mui/icons-material';
import { GoogleGenerativeAI } from '@google/generative-ai';
import MessageBox from './components/messge_box';

const drawerWidth = 240;

function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const products = [
    {
      name: 'Aloe Vera',
      price: 12.99,
      description: 'Aloe Vera is a succulent plant with soothing properties, known for its ability to moisturize and heal the skin. Its gel is commonly used in skincare products for its hydrating and anti-inflammatory effects. Ideal for both indoor and outdoor settings, this plant is also easy to care for, requiring minimal watering.'
    },
    {
      name: 'Snake Plant',
      price: 19.99,
      description: 'The Snake Plant, also known as Sansevieria or Mother-in-Law\'s Tongue, is a low-maintenance air-purifying plant. It is renowned for its upright, sword-like leaves and ability to thrive in low light conditions. This plant not only adds a touch of elegance to any room but also improves indoor air quality by removing toxins.'
    },
    {
      name: 'Peace Lily',
      price: 15.99,
      description: 'The Peace Lily is a beautiful indoor plant with glossy, dark green leaves and striking white flowers. It is well-known for its air-purifying qualities and ability to adapt to low light environments. This plant adds a touch of sophistication to any interior while enhancing air quality.'
    },
    {
      name: 'Spider Plant',
      price: 10.99,
      description: 'The Spider Plant is an easy-to-grow plant with long, arching leaves and distinctive white flowers. It is an excellent choice for beginners due to its resilience and ability to thrive in a variety of conditions. This plant is also known for its air-purifying properties and ability to produce new "babies" that can be easily propagated.'
    },
    {
      name: 'Pothos',
      price: 8.99,
      description: 'Pothos, or Epipremnum aureum, is a versatile and low-maintenance plant ideal for any space. It features heart-shaped leaves that come in various colors, including green, yellow, and white. Known for its trailing vines and ability to adapt to different lighting conditions, the Pothos is perfect for adding greenery to your home or office.'
    },
    {
      name: 'ZZ Plant',
      price: 18.99,
      description: 'The ZZ Plant, or Zamioculcas zamiifolia, is a hardy, low-maintenance plant with glossy, dark green leaves. It is well-suited for indoor environments and is known for its tolerance to low light and infrequent watering. The ZZ Plant adds a touch of elegance to any space while requiring minimal care.'
    },
    {
      name: 'Boston Fern',
      price: 14.99,
      description: 'The Boston Fern is a lush, green plant with delicate fronds that create a refreshing look in any room. It thrives in high humidity and indirect light, making it an excellent choice for bathrooms or other humid environments. This plant adds a touch of natural beauty to your indoor space and helps improve air quality.'
    },
    {
      name: 'Bird of Paradise',
      price: 29.99,
      description: 'The Bird of Paradise is a striking plant known for its large, banana-like leaves and vibrant orange and blue flowers. Native to tropical regions, it adds an exotic touch to any indoor or outdoor space. It requires bright, indirect light and regular watering to maintain its lush foliage and stunning appearance.'
    },
    {
      name: 'Fiddle Leaf Fig',
      price: 34.99,
      description: 'The Fiddle Leaf Fig, or Ficus lyrata, is a popular indoor plant with large, violin-shaped leaves. It is known for its dramatic foliage and ability to grow tall, making it a statement piece in any room. This plant thrives in bright, indirect light and requires regular watering to keep its leaves healthy and vibrant.'
    },
    {
      name: 'Rubber Plant',
      price: 22.99,
      description: 'The Rubber Plant, or Ficus elastica, is a hardy indoor plant with large, glossy leaves. It is known for its ability to tolerate low light and irregular watering, making it a great choice for busy individuals. This plant adds a touch of elegance to any space and contributes to improved air quality.'
    },
    {
      name: 'Chinese Evergreen',
      price: 13.99,
      description: 'The Chinese Evergreen, or Aglaonema, is a low-maintenance indoor plant known for its attractive, patterned leaves. It thrives in low to moderate light and requires minimal care, making it an ideal choice for offices and homes. The Chinese Evergreen adds a touch of greenery while purifying the air.'
    },
    {
      name: 'Cactus',
      price: 9.99,
      description: 'Cacti are unique, low-maintenance plants with a wide range of shapes and sizes. Known for their ability to thrive in dry conditions, they are perfect for adding a touch of the desert to your space. Cacti require minimal watering and are great for those who prefer low-maintenance greenery.'
    }
  ];
  

  const genAI = new GoogleGenerativeAI("null");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async function interactWithChatBot(message) {
    const chat = model.startChat();
    setLoading(true);
  
    // Example response based on the message
    let response = "";
    const lowerCaseMessage = message.toLowerCase();
    
    // Check if the message contains a product query
    const product = products.find(p => lowerCaseMessage.includes(p.name.toLowerCase()));
    if (product) {
      response = `Here's some information about ${product.name}: ${product.description} Price: $${product.price}.`;
    } else {
      // Default interaction with AI if no product found
      let result = await chat.sendMessage(message);
      response = result.response.text();
    }
  
    setLoading(false);
    return response;
  }

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { ai: false, text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInput("");

    const aiResponse = await interactWithChatBot(input);
    const aiMessage = { ai: true, text: aiResponse };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box>
    <IconButton
      onClick={toggleChat}
      sx={{
        width:80,
        height: 80,
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1300,
        backgroundColor: '#23501C',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#008c8c',
        },
      }}
    >
      <Chat />
    </IconButton>
    
    {isOpen && (
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          width: 400,
          height: 400,
          borderRadius: 3,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          zIndex: 1300,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: '1px solid #e0e0e0',
            backgroundColor: '#23501C',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textDecoration: 'underline',
              color: 'white'
            }}
          >
            Powered by Google Gemni
          </Typography>
          <IconButton
            onClick={toggleChat}
            sx={{
              backgroundColor: '#f5f5f5',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            <Cancel />
          </IconButton>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            p: 2,
          }}
        >
          {messages.map((message, index) => (
            <Box key={index} sx={{ padding: 0.5, borderRadius: 8, maxWidth: 500, margin: '0 auto' }}>
              <MessageBox ai={message.ai} text={message.text} />
            </Box>
          ))}
          {loading && (
            <Box sx={{ padding: 0.5, borderRadius: 8, maxWidth: '100%', margin: '0 auto' }}>
              <Typography variant="body1" color="textSecondary">
                Bot is typing...
              </Typography>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

       <Box>
       <Card sx={{ backgroundColor: "#f0f0f0",  borderRadius: 5, margin: 1 }}>
          <TextField
            fullWidth
            multiline
            minRows={1}
            maxRows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message ChatBot"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: '50px',
                "& fieldset": {
                  borderColor: 'transparent',
                },
                "&:hover fieldset": {
                  borderColor: 'transparent',
                },
                "&.Mui-focused fieldset": {
                  borderColor: 'transparent',
                },
              },
              overflowY: 'hidden'
            }}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={handleSendMessage}>
                    <SendAndArchiveRounded />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Card>

       </Box>
      </Box>
    )}
  </Box>
  );
}
export default ChatWidget;
