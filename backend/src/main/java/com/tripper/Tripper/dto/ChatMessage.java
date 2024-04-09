package com.tripper.Tripper.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.lang.NonNull;

public class ChatMessage {
    @NonNull
    String role;
    @JsonInclude
    String content;

//    Integer max_tokens;
}
