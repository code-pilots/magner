import{r as n,o as e,c as t,a as s,d as a,w as o,F as l,e as i,b as r}from"./app.0066c2fe.js";const p={},c=i('<h1 id="entry-point" tabindex="-1"><a class="header-anchor" href="#entry-point" aria-hidden="true">#</a> Entry point</h1><p>Usually, the entry file for the project configuration is <code>src/configs/index.ts</code>. It is imported from the <code>main.ts</code> and exports the project controller – a function which only argument is the project configuration:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">projectController</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  manifest<span class="token punctuation">,</span>\n  routing<span class="token punctuation">,</span>\n  i18n<span class="token punctuation">,</span>\n  development<span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>In here, each object key is another controller. It is categorized in a way that each key is responsible for its own important logic in the app. To understand more about them, follow the provided links below:</p>',4),u=r("Manifest"),d=r(" – Set of the project descriptors like name and icons. Also used in PWA mode"),f=r("Routing"),m=r(" – Controller that wraps the Vue-router allowing more flexibility with different presets"),h=r("i18n"),b=r(" – Internationalization controller. Configures project languages and their translations"),g=r("Development"),k=r(" – Development controller. Sets up important functions for interactions with the backend"),y=s("p",null,"To understand different core functionality, follow other README links:",-1),w=r("Requests"),v=r("Generic Forms");p.render=function(i,r){const p=n("RouterLink");return e(),t(l,null,[c,s("ul",null,[s("li",null,[a(p,{to:"/configuration/manifest.html"},{default:o((()=>[u])),_:1}),d]),s("li",null,[a(p,{to:"/configuration/routing.html"},{default:o((()=>[f])),_:1}),m]),s("li",null,[a(p,{to:"/configuration/i18n.html"},{default:o((()=>[h])),_:1}),b]),s("li",null,[a(p,{to:"/configuration/development.html"},{default:o((()=>[g])),_:1}),k])]),y,s("ul",null,[s("li",null,[a(p,{to:"/docs/requests.html"},{default:o((()=>[w])),_:1})]),s("li",null,[a(p,{to:"/docs/form.html"},{default:o((()=>[v])),_:1})])])],64)};export{p as default};
