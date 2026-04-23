import { http, HttpResponse, delay } from 'msw'
import Data from './Data'
import type { ArticleNeighbor } from '@/types/index'
import avatar from '@/assets/【哲风壁纸】伞-和服-少女.png'

const typeConfigMap = {
    category: {
        subtitle: '与其记录在别处，不如沉淀在这里。',
        titleSuffix: 'Collections',
        title: '分类',
        data: Data.categoryList
    },
    tag: {
        subtitle: '每一个标签，都是思绪与热爱的专属注脚',
        titleSuffix: 'Markers',
        title: '标签',
        data: Data.tabsList
    }
};

export const handlers = [
    http.post('/api/auth/verify', async ({ request }) => {
        const cookieHeader = request.headers.get('cookie')
        const tokenMatch = cookieHeader?.match(/token=([^;]+)/)
        const token = tokenMatch ? tokenMatch[1] : null

        if (!token) {
            return HttpResponse.json({
                status: 401,
                username: 'Text',
                avatar,
                token: 'no'
            })
        } else if (token !== 'lingpai') {
            return HttpResponse.json({
                status: 402,
            })
        } else {
            return HttpResponse.json({
                status: 200,
                username: 'Text',
                avatar,
            })
        }
    }),
    http.post('/login', async ({ request }) => {
        const requestData = await request.json() as { username: string; password: string }
        if (requestData) {
            const DuplicateUser = Data.User.find(item => item.username === requestData.username)
            if (!DuplicateUser) {
                return HttpResponse.json({
                    status: 404,
                    msg: '还没注册'
                })
            } else if (DuplicateUser) {
                if (DuplicateUser.username === requestData.username && DuplicateUser.userpassword === requestData.password) {
                    return HttpResponse.json({
                        status: 200,
                        username: DuplicateUser.username,
                        image: DuplicateUser.avatar,
                        msg: '登录成功'
                    }, {
                        headers: {
                            'Set-Cookie': 'token=lingpai; Max-Age=604800; Path=/; HttpOnly; SameSite=Lax'
                        }
                    })
                } else {
                    return HttpResponse.json({
                        status: 404,
                        msg: '用户名或密码错误'
                    })
                }
            }
        }
    }),

    http.post('/register', async (req) => {
        const requestData = await req.request.json()
        return HttpResponse.json({
            status: 200,
            msg: '注册成功'
        })
    }),

    http.post('/reset', async (req) => {
        const requestData = await req.request.json()
        return HttpResponse.json({
            status: 200,
            msg: '重置密码成功'
        })
    }),
    http.post('/logout', async () => {
        return HttpResponse.json({
            status: 200,
            msg: '退出登录成功'
        }, {
            headers: {
                'Set-Cookie': 'token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax'
            }
        })
    }),
    http.post('/setting', async (req) => {
        const requestData = await req.request.json() as { name: string, text: string, selectedGender: string, id: string, img?: string }

        if (requestData) {
            return HttpResponse.json({
                status: 200,
                new: requestData
            })
        }
    }),
    http.post('/treehole', async (req) => {
        const rawData = await req.request.text()
        return HttpResponse.json({
            status: 200
        })
    }),
    http.post('/articleDetail/:articleDetail', async ({ request }) => {
        const id = await request.json()
        const LIKES = 'likes'
        const list = localStorage.getItem(LIKES)
        const Arr = Data.Body.find(item => item.key === Number(id))
        if (list) {
            if (JSON.parse(list).islike) {
                const Obj = {
                    like: JSON.parse(list).like - 1,
                    islike: false,
                }
                localStorage.setItem(LIKES, JSON.stringify(Obj))
                return HttpResponse.json({
                    status: 200,
                    msg: '我会继续努力的~',
                    like: Obj.like,
                    action: "unlike"
                })
            } else {
                const Obj = {
                    like: JSON.parse(list).like + 1,
                    islike: true
                }
                localStorage.setItem(LIKES, JSON.stringify(Obj))
                return HttpResponse.json({
                    status: 200,
                    msg: '感谢你的喜欢～',
                    like: Obj.like,
                    action: "like"
                })
            }

        }
        if (Arr) {
            const Obj = {
                like: Arr?.Likes + 1,
                islike: true
            }
            localStorage.setItem(LIKES, JSON.stringify(Obj))
            return HttpResponse.json({
                status: 200,
                msg: '感谢你的喜欢～',
                like: Obj.like,
                action: "like"
            })
        }

    }),
    http.post('/favorites/:Favorites', async ({ request }) => {
        const id = await request.json()
        const FAVORITES = 'favorites'
        const favorites = localStorage.getItem(FAVORITES)
        const Arr = Data.Body.find(item => item.key === Number(id))

        if (favorites) {
            if (JSON.parse(favorites).isfavorites) {
                console.log()
                const Obj = {
                    favorites: JSON.parse(favorites).favorites - 1,
                    isfavorites: false
                }
                localStorage.setItem(FAVORITES, JSON.stringify(Obj))
                return HttpResponse.json({
                    status: 200,
                    favorites: Obj.favorites,
                    msg: '已从收藏夹移除～',
                    action: "uncollect",
                })
            } else {
                const Obj = {
                    favorites: JSON.parse(favorites).favorites + 1,
                    isfavorites: true
                }
                localStorage.setItem(FAVORITES, JSON.stringify(Obj))
                return HttpResponse.json({
                    status: 200,
                    favorites: Obj.favorites,
                    msg: '收藏成功，想看随时找～',
                    action: "collect"
                })
            }
        }

        if (Arr) {
            const Obj = {
                favorites: Arr?.Favorites + 1,
                isfavorites: true,
            }
            localStorage.setItem(FAVORITES, JSON.stringify(Obj))
            return HttpResponse.json({
                status: 200,
                favorites: Obj.favorites,
                msg: '收藏成功，想看随时找～',
                action: "collect"
            })
        }
    }),
    http.post('/userimg', async (req) => {
        const rawImg = await req.request.json() as { id: string, Url: string }
        if (rawImg) {
            const UserImg = Data.Bio.find(item => item.id === rawImg.id)
            if (UserImg) {
                UserImg.img = rawImg.Url
                return HttpResponse.json({
                    status: 200,
                    UserImg,
                })
            }
        }
    }),
    http.post('/musicPlayer/playlist/:gd', async (req) => {
        const UsePlay = await req.request.json()

        return HttpResponse.json({
            status: 200,
        })
    }),
    http.get('/categoryTagList/:type', (req) => {
        const { type } = req.params;

        if (type) {
            const config = typeConfigMap[type as keyof typeof typeConfigMap];
            return HttpResponse.json({
                status: 200,
                ...config
            })
        }
    }),

    http.get('/home2', () => {
        return HttpResponse.json({
            status: 200,
            lonelyExpressions: Data.lonelyExpressions
        })
    }),
    http.get('/home1', async () => {
        await delay(600);
        return HttpResponse.json({
            status: 200,
            Body: Data.Body,
        })
    }),
    http.get('/timeline', () => {
        const arr: { key: number; title: string; Published: string; }[] = []
        Data.Body.forEach(item => {
            const Obj = {
                key: item.key,
                title: item.title,
                Published: item.Published,
                imgpath: item.imgpath,
                path: item.path
            }
            arr.push(Obj)
        })

        return HttpResponse.json({
            status: 200,
            data: arr
        })
    }),
    http.get('/material/:material', () => {
        const shuffled = [...Data.Body].sort(() => Math.random() - 0.5)
        const RandomArticle = shuffled.slice(0, 3)
        const RandomArticleArr = [] as ArticleNeighbor[]
        RandomArticle.forEach(item => {
            const RandomObj: ArticleNeighbor = {
                id: String(item.key),
                title: item.title,
                cover: item.imgpath,
                published: item.Published
            }
            RandomArticleArr.push(RandomObj)
        })
        return HttpResponse.json({
            status: 200,
            RandomArticleArr,
        })
    }),
    http.get('/setting', () => {
        return HttpResponse.json({
            Data: Data.Bio,
            status: 200
        })
    }),
    http.get('/userdata', () => {
        return HttpResponse.json({
            status: 200,
            data: Data.User[0]
        })
    }),
    http.get('/musicPlayer/*', () => {
        return HttpResponse.json({
            status: 200,
            bannerList: Data.bannerList,
            library: Data.playlists,
            favoritePlaylists: Data.favoritePlaylists,//收藏歌单
            favoriteSongs: Data.favoriteSongs//喜欢歌曲
        })
    }),
    http.get('/articleId/:id', (req) => {
        const articleIdStr = req.params.id;
        let prev
        let next
        const articleIndex = Data.Body.findIndex(item => item.key === Number(articleIdStr))
        const p = Data.Body[articleIndex + 1]
        const n = Data.Body[articleIndex - 1]
        if (!n) {
            next = null;
        } else {
            next = {
                id: n.key,
                title: n.title,
                path: n.path
            }
        }

        if (!p) {
            prev = null
        } else {
            prev = {
                id: p.key,
                title: p.title,
                path: p.path
            }
        }

        if (Data.Body[articleIndex]) {
            return HttpResponse.json({
                current: Data.Body[articleIndex],
                neighbor: {
                    prev,
                    next,
                }
            })
        }
    }),
    http.get('/comments/:id', (req) => {
        const articleIdStr = req.params.id
        const comments = Data.comments.filter(item => item.id === Number(articleIdStr))

        return HttpResponse.json({
            status: 200,
            comments,
        })
    }),
    http.get('/category/:type', async (req) => {
        await delay();
        const type = req.params.type
        const categoryTagList = Data.Body.filter(item => item.category === type)

        if (categoryTagList) {
            return HttpResponse.json({
                status: 200,
                categoryTagList,
            })
        }
    }),
    http.get('/tag/:type', async (req) => {
        await delay();
        const type = req.params.type
        const categoryTagList = Data.Body.filter(item => item.tag === type)

        if (categoryTagList) {
            return HttpResponse.json({
                status: 200,
                categoryTagList
            })
        }
    }),
    http.get('/searchResult', async (req) => {
        await delay();
        const keyword = new URL(req.request.url).searchParams.get('page')
        const arr: any = []
        if (keyword) {
            Data.Body.map(item => {
                const Obj = {
                    id: item.key,
                    title: item.title,
                    Published: item.Published,
                    category: item.category,
                    body: item.body,
                    Pageviews: item.Pageviews,
                    Likes: item.Likes
                }
                arr.push(Obj)
            })
            return HttpResponse.json({
                status: 200,
                searchResult: arr.length,
                filteredArticles: arr
            })
        }
    })
]