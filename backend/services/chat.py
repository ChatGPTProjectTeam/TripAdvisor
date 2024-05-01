class ChatService:
    def __init__(self):
        self.chat_id = 1
        # list 필요하려나
        self.message_list = []

    # post or put
    def create_chat(self):
        self.chat_id += 1
        return self.chat_id

    # get
    def get_message_detail(self, message_id):
        message_detail = self.message_list.get(message_id, None)
        if message_detail is None:
            return None
        else:
            return message_detail

    def get_messages_list(self):
        return self.message_list

    # form 띄우는 메서드 (메인 화면)
