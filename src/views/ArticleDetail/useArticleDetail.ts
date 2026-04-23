import { ref, computed, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Article, ArticleNeighbor, ArticleComment } from '@/types/index'
import { setLoadMoreContainerRef, usePaginationCache } from '@/utils/helpers'
import { CACHE_KEYS } from '@/constants/cacheKeys'
import { usePageControl } from '@/composables/usePageControl'
import { scrollToComment } from '@/utils/helpers'
import type Remark from '@/components/内容复用组件/Remark.vue'
import { useCounterStore } from '@/stores/counter'

export function useArticleDetail(remarkComponentRef: Ref<InstanceType<typeof Remark> | null>) {
    const route = useRoute()
    const store = useCounterStore()
    const comments = ref<ArticleComment[]>([])

    const queryData = computed(() => {
        const getParam = (param: string) => {
            return Array.isArray(route.query[param])
                ? route.query[param][0]
                : route.query[param]
        }

        return {
            id: getParam('id'),
        }
    })

    const articleData = ref<Article>({
        _id: '',
        cover: '',
        title: '',
        pageViews: 0,
        comments: 0,
        likes: 0,
        wordCount: 0,
        category: '',
        author: '',
        avatar: '',
        collects: 0,
        tag: '',
        published: '',
        updated: '',
        content: '',
        isLiked: false,
        isCollected: false
    })
    const prev = ref<ArticleNeighbor | undefined>()
    const next = ref<ArticleNeighbor | undefined>()
    let clearObserver: (() => void) | null = null;

    const isDataReady = ref<boolean>(false)
    const isLoading = ref<boolean>(false)
    const isFinished = ref<boolean>(false)

    const ARTICLE_DATA_KEY = '/article'

    const { page, nextPage } = usePageControl()

    const handleUpdateDataLike = (updateLikes: number, isLiked: boolean) => {
        articleData.value.likes = updateLikes
        articleData.value.isLiked = isLiked
        // 同步更新缓存 - 注意缓存结构是 { detail: {...}, prev: {...}, next: {...} }
        if (queryData.value.id) {
            // 先获取当前缓存，进行深合并
            const currentCache = store.getCache(CACHE_KEYS.ARTICLE_DATA, queryData.value.id)
            if (currentCache) {
                store.updateCacheSync(CACHE_KEYS.ARTICLE_DATA, queryData.value.id, {
                    detail: {
                        ...currentCache.detail,
                        likes: updateLikes,
                        isLiked: isLiked
                    }
                })
            }
        }
    }
    const handleUpdateDataFavorites = (updateFavorites: number, isCollected: boolean) => {
        articleData.value.collects = updateFavorites
        articleData.value.isCollected = isCollected
        // 同步更新缓存 - 注意缓存结构是 { detail: {...}, prev: {...}, next: {...} }
        if (queryData.value.id) {
            // 先获取当前缓存，进行深合并
            const currentCache = store.getCache(CACHE_KEYS.ARTICLE_DATA, queryData.value.id)
            if (currentCache) {
                store.updateCacheSync(CACHE_KEYS.ARTICLE_DATA, queryData.value.id, {
                    detail: {
                        ...currentCache.detail,
                        collects: updateFavorites,
                        isCollected: isCollected
                    }
                })
            }
        }
    }

    const fetchArticleData = async () => {
        isDataReady.value = false

        if (!queryData.value.id) return;

        const articleDataCache = await usePaginationCache(
            CACHE_KEYS.ARTICLE_DATA,
            queryData.value.id,
            `${ARTICLE_DATA_KEY}/${queryData.value.id}`
        )

        if (!articleDataCache.detail) return;

        // 创建副本，避免直接修改缓存对象
        articleData.value = { ...articleDataCache.detail }
        prev.value = articleDataCache.prev
        next.value = articleDataCache.next

        setTimeout(() => {
            isDataReady.value = true
        }, 100)
    }

    const fetchComments = async () => {
        if (isLoading.value || isFinished.value) return;

        isLoading.value = true;
        try {
            const commentsListData = await usePaginationCache(
                CACHE_KEYS.COMMENTS_KEY,
                page.value,
                `${ARTICLE_DATA_KEY}/${queryData.value.id}/comments`,
                { page: page.value }
            )

            if (commentsListData.list.length === 0) {
                isFinished.value = true
                return;
            }

            comments.value = [...comments.value, ...commentsListData.list]
            nextPage()

        } catch {
            console.error('分页加载数据失败');
            return;
        } finally {
            isLoading.value = false
        }
    }

    const setLoadMoreContainerRefWrapper = (el: HTMLElement | null) => {
        if (!el) return;

        clearObserver = setLoadMoreContainerRef(el, fetchComments)
    }
    const cleanupuseArticleListByCategory = () => {
        if (clearObserver) {
            clearObserver()
            clearObserver = null
        }
    }

    const handleScrollToComment = () => {
        const domElement = remarkComponentRef.value?.remark
        if (!domElement) return
        scrollToComment(domElement);
    }

    const loadMore = async () => {
        await fetchComments();
    }

    return {
        queryData,
        articleData,
        prev,
        next,
        isDataReady,
        isFinished,
        comments,
        handleUpdateDataLike,
        handleUpdateDataFavorites,
        fetchArticleData,
        fetchComments,
        setLoadMoreContainerRefWrapper,
        cleanupuseArticleListByCategory,
        handleScrollToComment,
        loadMore
    }
}