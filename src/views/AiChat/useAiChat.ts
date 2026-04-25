import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';
import { get, post } from '@/api/request';
import type { AiChat, Conversations } from '@/types/index';
import { useCounterStore } from '@/stores/counter';
import { setLoadMoreContainerRef } from '@/utils/helpers';

export function useAiChat() {
    const store = useCounterStore();
    const chatContent = ref<HTMLElement | null>(null);
    const InputValue = ref('');
    const loading = ref(false);
    const messages = ref<AiChat[]>([]);
    const messageContent = ref('');
    const conversationsList = ref<Conversations[]>([]);
    const isInputFocused = ref(false);
    const showSendButton = ref(false);
    const isInputDisabled = ref(true);
    let abortController: AbortController | null = null;

    const hasMessages = computed(() => messages.value.length > 0);

    async function getAllConversations() {
        const result = await get('/ai/getConversations');
        if (result.success) {
            conversationsList.value = result.data.data;
        }
    }

    async function getConversationsData(id: string) {
        const result = await get('/ai/getConversation', { id });
        if (result.success) {
            messages.value = result.data.data;
        }
    }

    function handleInputChange(value: string) {
        InputValue.value = value;
        showSendButton.value = value.length > 0;
    }

    async function handleSend() {
        if (InputValue.value.trim() === '' || loading.value) return;
        loading.value = true;
        isInputDisabled.value = true;

        const userMessage: AiChat = {
            role: 'user',
            content: InputValue.value.trim(),
            createdAt: new Date().toLocaleString()
        };

        messages.value.push(userMessage);

        const assistantMessage: AiChat = {
            role: 'assistant',
            content: '',
            createdAt: new Date().toLocaleString()
        };

        messages.value.push(assistantMessage);
        const currentMsgIndex = messages.value.length - 1;

        await nextTick();
        scrollToBottom();

        abortController = new AbortController();

        try {
            const response = await fetch(`http://localhost:3001/api/ai/conversation?message=${encodeURIComponent(userMessage.content)}`, {
                method: 'GET',
                signal: abortController.signal
            });

            const reader = response.body?.getReader();
            if (!reader) throw new Error('No reader available');

            const decoder = new TextDecoder();
            messageContent.value = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                messageContent.value += chunk;

                messages.value[currentMsgIndex] = {
                    ...messages.value[currentMsgIndex],
                    content: messageContent.value
                } as AiChat;

                await nextTick();
                scrollToBottom();
            }
        } catch (error) {
            messages.value[currentMsgIndex] = {
                ...messages.value[currentMsgIndex],
                content: '获取回复失败'
            } as AiChat;
        } finally {
            loading.value = false;
            isInputDisabled.value = false;
            InputValue.value = '';
            showSendButton.value = false;
            abortController = null;
        }
    }

    async function handleSelectConversation(item: Conversations) {
        await getConversationsData(item._id);
        await nextTick();
        scrollToBottom();
    }

    async function handleDeleteConversations(item: Conversations) {
        const result = await post('/ai/delConversations', { id: item._id });
        if (result.success) {
            await getAllConversations();
        }
    }

    function scrollToBottom() {
        if (chatContent.value) {
            chatContent.value.scrollTo({
                top: chatContent.value.scrollHeight,
                behavior: 'smooth'
            });
        }
    }

    function handleInputFocus() {
        isInputFocused.value = true;
    }

    function handleInputBlur() {
        isInputFocused.value = false;
    }

    function clearMessages() {
        messages.value = [];
    }

    function handleStop() {
        if (abortController) {
            abortController.abort();
        }
    }

    onMounted(() => {
        const container = document.querySelector('.scroll-container') as HTMLElement;
        if (container) {
            setLoadMoreContainerRef(container, () => {});
        }
        getAllConversations();
    });

    onUnmounted(() => {
        clearMessages();
    });

    return {
        chatContent,
        InputValue,
        loading,
        messages,
        conversationsList,
        isInputFocused,
        showSendButton,
        isInputDisabled,
        hasMessages,
        handleInputChange,
        handleSend,
        handleSelectConversation,
        handleDeleteConversations,
        scrollToBottom,
        handleInputFocus,
        handleInputBlur,
        clearMessages,
        handleStop
    };
}
