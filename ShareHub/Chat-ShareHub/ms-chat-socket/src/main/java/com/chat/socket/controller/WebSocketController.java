package com.chat.socket.controller;

import com.chat.socket.dto.ChatMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
public class WebSocketController {
    @MessageMapping("/chat/{roomId}")
    @CrossOrigin(origins = "/**")
    @SendTo("/topic/{roomId}")
    public ChatMessage chat(@DestinationVariable String roomId,ChatMessage message) {
        System.out.println(message);
        return new ChatMessage(message.getMessage(), message.getUser());
    }
}
