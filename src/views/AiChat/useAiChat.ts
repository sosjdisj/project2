import { get, post } from '@/api/request';
import { nextTick, ref, computed } from 'vue';
import type { AiChat, Conversations } from '@/types/index'
import { useCounterStore } from '@/stores/counter'
import { setLoadMoreContainerRef } from '@/utils/helpers'
import { fetchEventSource } from '@microsoft/fetch-event-source';

export function useAiChat() {
    const store = useCounterStore()

    let clearLoadMoreObserver: (() => void) | null = null

    const isCollapsed = ref(true);
    const isChatting = ref(false);
    const isLoading = ref(false)

    const isLoadingHistory = ref(false)
    const hasMoreHistory = ref(true)

    const isNewConversation = ref(true)

    const inputVal = ref('');

    const conversationId = ref()

    const chatContainer = ref<HTMLElement | null>(null); // 2. 定义容器引用

    const tags = ['面试高频题', 'Vue3 架构', 'Pinia 状态管理', 'RBAC 逻辑', 'Prisma 查询'];
    const messages = ref<AiChat[]>([
    ]);
    const conversations = ref<Conversations[]>([])

    const submitHandler = computed(() =>
        isNewConversation.value ?
            handleNewConversationSubmit :
            handleSubmit
    )
    const shouldShowLoadMoreObserver = computed(() => {
        return isChatting.value && !isNewConversation.value && !!conversationId.value
    })

    const handleNewChat = () => {
        isChatting.value = false
        isNewConversation.value = true
    }

    const handleTag = (tag: string) => {
        inputVal.value = tag;
        isChatting.value = true;
    };

    // 3. 封装滚动到底部的函数
    const scrollToBottom = async () => {
        // 等待 DOM 更新完成
        await nextTick();
        if (chatContainer.value) {
            chatContainer.value.scrollTo({
                top: chatContainer.value.scrollHeight,
                behavior: 'smooth' // 平滑滚动，如果想要瞬间到达可以删掉这行
            });
        }
    };

    const handleSubmit = async () => {
        if (!inputVal.value || isLoading.value) return;

        scrollToBottom()

        // 2. 清空输入框并开启加载状态
        const userMessage = inputVal.value
        inputVal.value = ''
        isLoading.value = true;

        // 先添加用户消息到列表（立即显示）
        messages.value.push({ role: 'user', content: userMessage })
        // 定义一个变量，用来引用将来要创建的助手消息对象
        let assistantMsg: AiChat | null = null;

        // 2. 使用库来处理流
        await fetchEventSource(`http://localhost:3001/api/chat/${conversationId.value}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ content: userMessage }),

            // 关键回调：每当收到一条完整消息（data: ... \n\n）时触发
            onmessage(ev) {
                try {
                    const data = JSON.parse(ev.data);

                    if (data.type === 'answer') {
                        if (!assistantMsg) {
                            // 当收到第一波数据时：
                            isLoading.value = false; // 1. 关掉全局加载动画
                            assistantMsg = { role: 'assistant' as const, content: '' };
                            messages.value.push(assistantMsg); // 2. 只有这时才把气泡加进去、
                        }
                        // 后续数据正常累加
                        messages.value[messages.value.length - 1]!.content = data.content;
                        scrollToBottom();
                    } else if (data.type === 'title') {
                        updateConversationTitle(conversationId.value, data.content);
                    }
                } catch (err) {
                    console.error('解析错误', err);
                }
            },

            onclose() {
                isLoading.value = false; // 确保关闭
            },

            onerror(err) {
                isLoading.value = false;
                throw err;
            }
        });
    }

    const updateConversationTitle = (conversationId: string, content: string) => {
        conversations.value.forEach(item => {
            if (item._id === conversationId) {
                item.title = content
            }
        })
    }

    const handleNewConversationSubmit = async () => {
        isChatting.value = true

        const result = await post('/chat/new', {})
        if (result.success) {
            const { _id } = result.data.data

            conversations.value.push(result.data.data)
            messages.value = []

            conversationId.value = _id
            isNewConversation.value = false;
            await handleSubmit()
        }
        isNewConversation.value = false
    }

    const selectConversation = async (id: string) => {
        conversationId.value = id
        isChatting.value = true
        isNewConversation.value = false
        messages.value = []
        hasMoreHistory.value = true

        await loadChatHistory(id)

        scrollToBottom()
    }

    const loadChatHistory = async (id: string) => {

        if (isLoadingHistory.value || !hasMoreHistory.value) return

        isLoadingHistory.value = true

        const cursor = messages.value[0]?.createdAt

        const history = cursor ?
            await get(`/chat/${id}/history`, { cursor }) :
            await get(`/chat/${id}/history`)

        const { chatHistory } = history.data.data

        if (chatHistory.length === 0) {
            hasMoreHistory.value = false
            isLoadingHistory.value = false
            return;
        }

        if (history.success) {
            messages.value = [...chatHistory, ...messages.value]
        }
        isLoadingHistory.value = false

    }

    const setLoadMoreContainerRefWrapper = (el: Element | null) => {
        if (!el) return

        clearLoadMoreObserver = setLoadMoreContainerRef(el, () => {
            loadChatHistory(conversationId.value)
        })
    }

    const fetchConversations = async () => {
        if (!store.username) return;
        const result = await get('/chat/conversations')
        if (result.success) {
            conversations.value = result.data.data.conversations
        }
    }

    const clear = () => {
        if (clearLoadMoreObserver) {
            clearLoadMoreObserver()
            clearLoadMoreObserver = null
        }
    }

    return {
        isCollapsed,
        inputVal,
        isLoading,
        messages,
        conversations,
        submitHandler,
        tags,
        clearLoadMoreObserver,
        isChatting,
        conversationId,
        shouldShowLoadMoreObserver,
        handleTag,
        fetchConversations,
        selectConversation,
        setLoadMoreContainerRefWrapper,
        handleNewChat,
        clear,
        chatContainer,
    }
}