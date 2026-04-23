import image1 from '@/assets/1.webp'
import image2 from '@/assets/3.jpeg'
import image3 from '@/assets/4.jpeg'
import avatar from '@/assets/【哲风壁纸】伞-和服-少女.png'

const List = [
    {
        name: 'minio',
        id: 'minio',
        icon: '|',
        path: '/categories/minio',
        date: '2025年7月12日',
        children: '/material/body1'
    },
    {
        name: '灌水',
        id: 'life',
        icon: '|',
        path: '/categories/life',
        date: '2025年7月2日',
        children: '/material/body2'
    },
    {
        name: '域名含义',
        id: 'tools',
        icon: '|',
        path: '/categories/tools',
        date: '2025年5月12日',
        children: '/material/body3'
    },
]
const List1 = [
    {
        name: 'minio',
        id: 'minio',
        path: '/tags/minio',
        date: '2025年7月12日',
        children: '/material/body1'
    },
    {
        name: '灌水',
        id: 'life',
        path: '/tags/life',
        date: '2025年7月2日',
        children: '/material/body2'
    },
    {
        name: '域名含义',
        id: 'tools',
        path: '/tags/tools',
        date: '2025年5月12日',
        children: '/material/body3'
    },
]
const Nova = [
    {
        name: 'minio',
        date: '2025-7-13',
        neirong: '探索MinIO对象存储技术在动漫资源云端管理中的应用',
        tab: 'minio',
        imgpath: image1,
        card: '文章数',
        path: '/articleDetail/body1',
        children: '/articleDetail/body1'
    },
    {
        name: '灌水',
        date: '2025-7-1',
        neirong: '新海诚《铃芽之旅》全球票房突破3亿美元，成为日本动画电影史上票房第三',
        tab: '灌水',
        imgpath: image2,
        card: '分类数',
        path: '/articleDetail/body2',
        children: '/articleDetail/body2'
    },
    {
        name: '域名含义',
        date: '2025-7-20',
        neirong: '京都动画《紫罗兰永恒花园》新作剧场版宣布制作，延续薇尔莉特的感人故事',
        tab: '解释',
        imgpath: image3,
        card: '评论数',
        path: '/articleDetail/body3',
        children: '/articleDetail/body3'
    }
]

const categoryList = [
    {
        id: 1,
        icon: '',
        name: '二次元脑洞',
        path: '/articleListByCategorys/1',
        articleCount: 1,
        desc: '在次元的边界，让脑洞生长出不被定义的浪漫'
    },
    {
        id: 2,
        icon: '',
        name: '暖途拾光',
        path: '/articleListByCategorys/2',
        articleCount: 1,
        desc: '步履不停的旅途里，捡拾那些温柔的细碎时光'
    },
    {
        id: 3,
        icon: '',
        name: '半生浅悟',
        path: '/articleListByCategorys/3',
        articleCount: 1,
        desc: '走过半生风雨，只言浅悟，皆是人间值得'
    },
    {
        id: 4,
        icon: '',
        name: '其他',
        path: '/articleListByCategorys/3',
        articleCount: 0,
        desc: '万般细碎皆成景，不被归类的美好，自有归处'
    }
]
const tabsList = [
    {
        id: 1,
        name: '二次元',
        path: '/articleListBytabs/1',
        icon: '',
        articleCount: 1,
        desc: '跳出现实的框架，在次元世界里奔赴热爱与自由'
    },
    {
        id: 2,
        name: '治愈',
        path: '/articleListBytabs/2',
        icon: '',
        articleCount: 1,
        desc: '于细碎日常中拾得温柔，治愈每个疲惫的瞬间'
    },
    {
        id: 3,
        name: '感悟',
        path: '/articleListBytabs/3',
        icon: '',
        articleCount: 1,
        desc: '于生活的褶皱里，打捞那些清醒又温柔的感悟'
    },
    {
        id: 4,
        name: '其他',
        path: '/articleListBytabs/4',
        desc: '收纳所有不被定义的思绪，自有其独特的温度'
    }
]
const lonelyExpressions = [
    '人性的背后是白云苍狗',
    '如果当初我勇敢，结局是不是不一样？如果当时你坚持，回忆会不会不这样？',
    '你说你会爱我一辈子，我真傻，居然忘了问是这辈子还是下辈子',
    '有些人，注定是生命中的过客，却在你心里住了整整一个曾经',
    '上海的夜景很美，美得让人想哭，因为每一盏灯后面都有一个不为人知的故事',
    '在这座繁华的城市里，我们像两个孤独的星球，明明靠得那么近，却永远隔着无法跨越的距离',
    '爱情里最残忍的，不是得不到，而是得到了又失去。',
    '你是我穷极一生做不完的梦，我是你一念之间吹过的风。',
    '他们都说我傻，爱一个不爱自己的人。可如果他们尝过我的快乐，就不会这么说了。',
    '我乐瑶这一生，只认真爱过一个人。用尽了全部的力气，所以再也爱不起别人了。'
]
const Body = [
    {
        key: 1,
        category: '二次元脑洞',
        tag: '二次元',
        imgpath: image1,
        title: '「FuFuture.cn」的动漫风解读',
        author: '书瑶',
        Wordcount: 335,
        Pageviews: 105,
        Comments: 1,
        Likes: 5,
        Favorites: 2,
        Published: '2025 - 7 - 21',
        Updated: '2025 - 7 - 21',
        path: '/articleDetail/body1',
        body: `「FuFuture.cn」的动漫风解读​​ 🌟​​「Fu」= 未来（Future）的缩写？​​→ 但读作「ふ」的话…也像​​「不思议（ふしぎ）」​​的「ふ」！→ 
            ​​「不思议的未来」​​= 异世界转生×赛博朋克的氛围✨​​「Future」= 未来？但二次元里…​​→ 
            「未来」可能是​​「与你相连的次元之门」​​！→ （突然EVA风）​​「人类补完计划的域名」​​…🤖​「.cn」= 中国？不不…​​→ 
            动漫视角看是​​「コスプレネットワーク（Cosplay Network）」​​的缩写！→ （突然舰娘风）​​「舰队Collection·网络」​​…？🤔
            终极脑洞​​ ​​「不思议的未来（FuFuture），从中国（.cn）降临的网站…？」​→ 难道是​​「异世界转生×AI×女仆咖啡厅」​​的官网！？(๑•̀ㅂ•́)
            و（※纯属虚构，但二次元脑补力满分！）`,
        isLiked: 1,
        isCollected: 1
    },
    {
        key: 2,
        category: '暖途拾光',
        tag: '其他',
        imgpath: image2,
        title: '《财富的双翼：论省钱与挣钱的辩证之道》',
        author: '沐辰',
        Wordcount: 1200,
        Pageviews: 44,
        Comments: 0,
        Likes: 1,
        Favorites: 1,
        Published: '2025 - 7 - 20',
        Updated: '2025 - 7 - 20',
        path: '/articleDetail/body2',
        body: `古人云："开源节流，富国之基。"在当今社会，关于"钱是省出来的还是挣出来的"的讨论从未停止。有人认为省钱是积累财富的根本，
            有人则坚信挣钱才是财富增长的关键。然而，真正的财富智慧并非非此即彼，而是​​"省钱"与"挣钱"如同鸟之双翼，缺一不可​​。唯有二者结合，
            才能让财富之树茁壮成长。一、挣钱：财富增长的引擎挣钱是财富积累的根本动力。正如《穷爸爸富爸爸》一书所言："富人不为钱工作，
            而是让钱为他们工作。"单纯依靠节省，财富的增长终将受限，而提升挣钱能力才能打开财富的天花板。​事例1：副业与斜杠青年​​近年来，
            "斜杠青年"成为潮流，许多人不再满足于单一收入来源，而是通过副业、自媒体、知识付费等方式增加收入。例如，
            一位普通白领利用业余时间运营自媒体账号，月收入从固定工资的1万元增长到3万元，财富积累速度大幅提升。​事例2：
            投资与被动收入​​《穷查理宝典》中，查理·芒格强调："最好的投资是投资自己。"许多人通过学习投资理财，让钱生钱。例如，巴菲特通过长期投资，
            使财富呈指数级增长，而普通人也可以通过基金定投、股票投资等方式，让资产稳健增值。二、省钱：财富积累的基石​​然而，
            挣钱并非财富增长的唯一途径。若不控制支出，再高的收入也可能被挥霍一空。《邻家的百万富翁》一书研究发现，真正的富人往往生活简朴，
            他们并非高薪人士，而是通过长期节俭积累财富。​​事例1：消费主义陷阱​​现代社会充满消费诱惑，许多人陷入"月光族"困境。例如，
            一些年轻人为了追求奢侈品、网红产品，不惜透支信用卡，最终负债累累。相反，那些懂得理性消费的人，即使收入不高，也能逐步积累储蓄​事例2：
            极简主义与财富自由​​近年来，"极简主义"生活方式兴起，许多人通过减少不必要的消费，提高储蓄率。例如，一位程序员放弃高消费的都市生活，
            搬到低成本城市，通过节省开支和稳健投资，提前实现财务自由。​三、财富的终极智慧：挣钱与省钱的平衡​​真正的财富自由，既需要提升挣钱能力，
            也需要合理控制支出。《财务自由之路》一书指出："财富是认知的变现。"只有建立正确的财富观，才能让钱真正为自己服务。​事例1：
            创业与节俭并重​​许多成功企业家既擅长赚钱，也懂得节俭。例如，比尔·盖茨虽然身家数百亿，但仍保持低调的生活方式，避免奢侈浪费。
            他的财富增长既来自微软的商业成功，也来自长期的投资和节俭习惯。​事例2：普通人的财富自由之路​​一位普通上班族通过提升职业技能，
            从月薪5000元涨到2万元；同时，他坚持记账、减少冲动消费，每月储蓄率达到50%。十年后，他不仅积累了丰厚的存款，
            还通过投资实现了被动收入，最终提前退休。结语​​财富的积累，既不是单纯的省钱，也不是盲目的挣钱，而是二者的辩证统一。​
            ​省钱是守住财富的盾牌，挣钱是开拓财富的利剑​​。在这个充满机遇与挑战的时代，我们既要提升自身价值，增加收入来源，也要理性消费，
            避免财富流失。唯有如此，才能真正实现财务自由，让财富成为生活的助力，而非负担。`,
        isLiked: 1,
        isCollected: 0
    },
    {
        key: 3,
        category: '半生浅悟',
        tag: '感悟',
        imgpath: image3,
        title: 'MinIO原生版2025重磅发布（非阉割版本）',
        author: '听雪',
        Wordcount: 576,
        Pageviews: 71,
        Comments: 1,
        Likes: 1,
        Favorites: 1,
        Published: '2025 - 7 - 22',
        Updated: '2025 - 7 - 22',
        path: '/articleDetail/body3',
        body: `在苏州这座梦里水乡，我们都活得像一条条缺氧的鱼，表面波澜不惊，水下却拼命挣扎，只为了一口呼吸。我的生活就像一列脱轨的火车，
            冲出了既定的轨道，在荒原上漫无目的地燃烧。这座城市的夜晚灯火辉煌得没有一丝道理，它照亮了所有人的路，却唯独照不进我内心的角落。
            成长大概就是这样——以前难受了，恨不得让全世界都知道；而现在，只是一个人点上一支烟，默默地把所有情绪和着烟圈，一口咽下。米彩，
            你就是我生命里的一场暴风雨，来得猝不及防，席卷了一切。别人都关心我飞得高不高，只有她，会看着我满身的伤痕，皱着眉头问："昭阳，
            你疼不疼？"她就像她的名字一样，注定要渲染我单调乏味的人生。可是，我这粗糙的画布，真的能留住你这抹惊心动魄的色彩吗？而简薇，
            是我心头的朱砂痣，烙下了就抹不掉。我们都太傻了，用最锋利的言语刺向最爱的人，好像谁先露出软肋谁就输了，却忘了，
            感情里从来就没有赢家。生活不是电视剧，它比电视剧残忍多了。它不会在你最痛苦的时候插播广告，也不会在结局时给你一个圆满。
            我昭阳这辈子，最对不起的就是自己——把仗义给了兄弟，把温柔给了爱人，把宽容给了世界，却把所有的狼狈和不堪，留给了自己。
            如果我们的故事是一本书，那读者一定会骂我这个主角太窝囊。可这就是我昭阳，一个在爱情和现实里，不断犯错、不断失去、
            又不断寻找的普通男人。暴风雨过后，我是否真的能看见那片从未有过的彩虹？`,
        isLiked: 0,
        isCollected: 1
    }
]
const comments = [
    {
        id: 1,
        userName: '李佳航',
        userAvatar: '',
        content: '111',
        createTime: '2025-08-26 17:55:20',
        replyToCommentId: 2
    }
]

const Bio = [
    {
        name: 'Text',
        text: '',
        selectedGender: '1',
        id: '1',
        img: '/src/ass/5.jpg'
    }
]
//用户数据
const User = [
    {
        username: 'Text',
        userpassword: 'qw123456qwra#$',
        avatar,
    }
]
const bannerList = [
    {
        id: 1,
        image: "/src/ass/1.webp",
        title: "热门推荐",
        description: "为你精心挑选的音乐",
        alt: "热门推荐1"
    },
    {
        id: 2,
        image: "/src/ass/3.jpeg",
        title: "新歌速递",
        description: "最新最热的音乐作品",
        alt: "热门推荐2"
    },
    {
        id: 3,
        image: "/src/ass/4.jpeg",
        title: "经典老歌",
        description: "永恒不变的音乐经典",
        alt: "热门推荐3"
    }
]
const playlists = [
    {
        name: "华语经典",
        creator: '花间一壶酒',
        description: "精选华语流行音乐",
        coverImage: "/src/ass/12.png",
        playCount: 128,
        path: '/musicPlayer/playlist/gd1',
        pophits: [
            {
                name: '其实 (DJ侯天乐版)',
                singer: '侯天乐',
                imgs: '',
                path: '/src/ass/侯天乐 - 其实 (DJ侯天乐版).mp3',
                duration: '03.12',
                playback: 12
            },
            {
                name: '龙卷风',
                singer: '邓紫棋',
                imgs: '/src/ass/4.jpeg',
                path: '/src/ass/G.E.M. 邓紫棋 - 龙卷风.mp3',
                duration: '04.08',
                playback: 25
            }
        ]
    },
    {
        name: "古风音乐",
        creator: '星河万里',
        description: "中国传统音乐之美",
        coverImage: "/src/ass/12.png",
        playCount: 128,
        path: '/musicPlayer/playlist/gd2',
        pophits: [
            {
                name: '我不配',
                singer: '周杰伦',
                imgs: '',
                path: '',
                duration: '04.48',
                playback: 23
            }
        ]
    },
    {
        name: "日语经典",
        creator: '一叶知秋',
        description: "精选日语流行音乐",
        coverImage: "/src/ass/12.png",
        playCount: 89,
        path: '/musicPlayer/playlist/gd3',
        pophits: [
            {
                name: '龙卷风',
                singer: '周杰伦',
                imgs: '',
                path: '',
                duration: '04.10',
                playback: 30
            },
        ]
    },
    {
        name: "轻音乐纯音乐",
        description: "放松心情的轻音乐",
        coverImage: "/src/ass/12.png",
        playCount: 128,
        path: '/musicPlayer/playlist/gd4',
        pophits: [
            {
                name: '不该',
                singer: '周杰伦',
                imgs: '',
                path: '',
                duration: '04.51',
                playback: 21
            }
        ]
    }
]
const favoritePlaylists = [
    {
        name: "华语经典",
        creator: '花间一壶酒',
        description: "精选华语流行音乐",
        coverImage: "/src/ass/12.png",
        playCount: 128,
        path: '/musicPlayer/playlist/gd1',
        pophits: [
            {
                name: '其实 (DJ侯天乐版)',
                singer: '侯天乐',
                imgs: '',
                path: '/src/ass/侯天乐 - 其实 (DJ侯天乐版).mp3',
                duration: '03.12',
                playback: 12
            },
            {
                name: '龙卷风',
                singer: '邓紫棋',
                imgs: '',
                path: '/src/ass/G.E.M. 邓紫棋 - 龙卷风.mp3',
                duration: '04.08',
                playback: 25
            }
        ]
    },
]
const favoriteSongs = [
    {
        name: '其实 (DJ侯天乐版)',
        singer: '侯天乐',
        imgs: '',
        path: '/src/ass/侯天乐 - 其实 (DJ侯天乐版).mp3',
        duration: '03.12',
        playback: 12
    },
]
export default { List, List1, Nova, lonelyExpressions, Body, User, Bio, categoryList, tabsList, bannerList, playlists, favoritePlaylists, favoriteSongs, comments }