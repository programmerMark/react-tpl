<h1 align="center">Welcome to react-project-tpl 👋</h1>

## 安装

```sh
# 根目录安装项目依赖
npm install or yarn install
```

## 使用

```
# 本地运行
npm run dev or yarn dev

# 开启mock服务
npm run mock or yarn mock

# 项目打包
npm run build or yarn build


```

## 项目架构

该项目模板主要使用了 react + vite 来搭建，配合 react-router、redux、react-query 实现页面路由和状态管理等功能，具体的功能和库的对照如下：

### 1. 项目中库的使用

`react + react-dom`: 负责页面渲染，使用 react@17 支持 hooks；

`react-router-dom`: 负责页面路由，项目中已经实现了自动化路由，根据项目目录自动生成页面路由；

`react-redux + @reduxjs/toolkit`: 建议只使用它们管理页面、组件间需要共享的状态；

`redux-persist`: 负责对 redux 中的状态进行持久化，默认同步到 local storage；

`react-query`: 负责管理服务端状态，保证页面数据与服务端状态的同步；

`vite + @vitejs/plugin-react-refresh`: 负责开发环境的热更新，生产环境的打包，代替 webpack；

`@vitejs/plugin-legacy`: 生成 IE 环境下的打包结果；

`json-server`: 负责项目中的前端数据 mock 服务；

`antd`: web 端的 UI 组件库；

`axios`: 负责 ajax 请求；

`typescript`: 项目支持 typescript，支持类型校验；

`eslint + prettier`: 提供代码校验和代码格式化；

`tailwindcss`: css 库，提供了许多原子化的 css 类，大大减少写 css 代码的时间；

### 2. 项目中已实现的功能

#### 1. 自动化路由

项目中使用`react-router-dom`实现了自动化路由，即根据项目目录自动生成对应的页面路由，开发者只需要根据规则创建项目页面即可。

具体的规则是，在项目根目录的`src/pages`目录下，每一级子文件夹的名称都会被映射成对应的路由路径，如项目中的示例代码：

1. `/pages/app/index.tsx`会被映射成路由`/`, 其他所有路由都是它的子路由；
2. `/pages/404/index.tsx`会被映射成路由`/404`, 访问不存在的路由时会被重定向到`/404`；
3. `/pages/article/index.tsx`会被映射成路由`/article`,
4. `/pages/article/pages/_id/index.tsx`会被映射成路由`/article/:id`,它和`/article`是同级路由
5. `/pages/article-manage/index.tsx`会被映射成路由`/article-manage`；
6. `/pages/article-manage/children/articles/index.tsx`会被映射成路由`/article-manage/articles`,同时它是`/article-manage`的子路由；
7. `/pages/article-manage/children/add-article/index.tsx`会被映射成路由`/article-manage/add-article`,同时它是`/article-manage`的子路由；

结合上面的例子，可以总结出几个结论：

1. `/pages/app`被映射成跟路由`/`；
2. `/pages/404`被映射成跟路由`/404`，访问不存在的路由时会被重定向到`/404`；
3. `/pages/**/index.tsx`匹配到的路径会被映射成路由路径，其中包含的`/pages`和`/children`会被忽略掉，`/pages`下的文件会被映射成同级路由，`/children`会被映射成子路由；

#### 2. 状态管理

在阐述项目中的状态管理架构之前，先说明一下对于项目中状态的区分。
首先，我们都知道项目中的状态可以笼统分为两种，一种是在组件和页面中的内部状态，一种是存储在全局的`全局状态`，其中`全局状态`可以在组件、页面中自由引用，一般我们用状态管理器来管理全局状态，如 redux、mobx 等。

`全局状态`通常包括一些页面、组件间共享的状态，这些状态是静态的，称为`客户端状态`，`客户端状态`通常存储在状态管理器中；存储的一些来自于服务器的状态称为`服务端状态`，`服务器状态`通常是动态的，客户端很难确保存储在客户端的状态和服务端是同步的。

通常，我们会把`服务端状态`也存储到状态管理器中，但是`服务端状态`通常并不是由一个客户端控制的，比如：读者正在阅读一篇文章，如果在阅读过程中作者更新了这篇文章，如果读者不刷新读的还会是更新前的内容。由于客户端存储的`服务器状态`很难保证与服务器实时的数据保持同步，所以这里需要专门的工具来帮助我们管理`服务器状态`。

目前，已知的提供服务器状态管理的 react 库包括：react-query、swr、apollo client、RTK-Query 等。经过比较和考量，项目中选用了 react-query 来管理`服务器状态`，这 4 中`服务器状态`管理库的比对可以参考[https://cangsdarm.github.io/react-query-web-i18n/getstarted/comparison](https://cangsdarm.github.io/react-query-web-i18n/getstarted/comparison)。
就易用性上而言，react-query 比其它几个也更胜一筹。下面是 react-query 的官方文档：

1. 中文文档：[https://cangsdarm.github.io/react-query-web-i18n/](https://cangsdarm.github.io/react-query-web-i18n/)
2. 英文文档：[https://react-query.tanstack.com/overview](https://react-query.tanstack.com/overview)
3. 视频教程（youtube）: [https://www.youtube.com/watch?v=VtWkSCZX0Ec&list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2](https://www.youtube.com/watch?v=VtWkSCZX0Ec&list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2)
4. react-query 作者介绍 react-query(youtube): [https://www.youtube.com/watch?v=seU46c6Jz7E](https://www.youtube.com/watch?v=seU46c6Jz7E)

综上所述，在本项目中，使用 redux 来管理`客户端状态`，主要处理一些页面、组件间共享的状态，react-query 处理`服务端状态`（不强制要求）。

其中，redux 的部分实际上使用了`react-redux`+`@reduxjs/toolkit`来编写相关代码，使用`@reduxjs/toolkit`可以大大减少使用 redux 时需要的样板代码，同时它还提供了对 typescript 的支持。相关代码和示例，请参`/src/store/modules/article-user`目录下的示例代码。

而 react-query 提供了对 hooks 的完全支持，只需要在使用到的代码中区编写相关的 hooks 代码即可。相关代码和示例，请参`/src/pages/article-manage/hooks`目录下的示例代码。

最后，提醒一下。介于开发者对于 react-query 的掌握程度的不同，开发者也可以不使用 react-query 而是使用类似`useEffect(() => { fetchData(id) }, [id])`的方法，在每一次请求再去同步服务器端的数据的常规做法。react-query 是一个能够提高效率同时减少页面请求、增强用户体验的工具，这基于使用场景和掌握程度，它是一个优化项；在无法处理好的情况下请使用`useEffect`之类的常规做法，减少心智负担。

#### 3. mock 数据服务

项目中的 mock 数据服务使用`json-server`提供，使用它可以开启一个本地持久化的数据 mock 服务，简单来说就是对数据的增删改都会实际地更新数据。
相关代码在项目的`/src/mock`目录下，在里面定义相关的示例代码和 README 文档（`/src/mock/README.md`），项目中`/src/pages`目录下示例代码也是使用 mock 服务做了数据的增删改查，里面也包含了相关的用法，建议查阅 README 文档同时参考示例代码。
json-server 启动的 mock 服务完全遵循 restful api 的规则。

如有需要，也可以参考官方文档。
json-server 文档：[https://www.npmjs.com/package/json-server](https://www.npmjs.com/package/json-server)

#### 4. 使用 tailwind css

项目引用了`tailwind css`这个 css 库来减少开发者编写 css 代码工作量。项目中使用了固定的版本的`tailwindcss@1.9.0`来支持 IE（2.0 以后不再完全支持 IE）。
当然，使用它也存在着一定的学习成本，但一旦入门将大大提升开发者编写样式代码的效率。学习推荐官方视频教程，即可完全入门。
下面是官方文档和推荐的官方视频教程：

1. 中文文档(2.x 版本)：[https://www.tailwindcss.cn/docs](https://www.tailwindcss.cn/docs)
2. 英文文档(最新版，3.x 版本)：[https://tailwindcss.com/docs/installation](https://tailwindcss.com/docs/installation)
3. 视频教程(总时长 90 分钟左右)： [https://www.youtube.com/watch?v=elgqxmdVms8&list=PL5f_mz_zU5eXWYDXHUDOLBE0scnuJofO0](https://www.youtube.com/watch?v=elgqxmdVms8&list=PL5f_mz_zU5eXWYDXHUDOLBE0scnuJofO0)

同理，使用 tailwind css 提供的原子类，可以大大减少我们写 css class 的代码，但并不意味着我们完全不写 css （大多数情况下还真不用写 css）。对于特性的 css 样式，也可以使用自定义的 class。工具是用来服务人提升效率的，请灵活使用。

## Author

👤 **programmermark**
