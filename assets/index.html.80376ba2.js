import{r as n,o as t,c as e,a,b as s,w as o,F as l,d as i,e as r}from"./app.8826f2fc.js";const p={},c=i('<h1 id="entry-point" tabindex="-1"><a class="header-anchor" href="#entry-point" aria-hidden="true">#</a> Entry point</h1><p>Usually, the entry file for the project configuration is <code>src/configs/index.ts</code>. It is imported from the <code>main.ts</code> and exports the project controller – a function which only argument is the project configuration:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">projectController</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  manifest<span class="token punctuation">,</span>\n  routing<span class="token punctuation">,</span>\n  i18n<span class="token punctuation">,</span>\n  development<span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>In here, each object key is another controller. It is categorized in a way that each key is responsible for its own important logic in the app. To understand more about them, follow the provided links below:</p>',4),u=r("Manifest"),d=r(" – Set of the project descriptors like name and icons. Also used in PWA mode"),f=r("Routing"),m=r(" – Controller that wraps the Vue-router allowing more flexibility with different presets"),h=r("i18n"),b=r(" – Internationalization controller. Configures project languages and their translations"),g=r("Development"),k=r(" – Development controller. Sets up important functions for interactions with the backend"),y=a("p",null,"To understand different core functionality, follow other README links:",-1),w=r("Requests"),v=r("Generic Forms");p.render=function(i,r){const p=n("RouterLink");return t(),e(l,null,[c,a("ul",null,[a("li",null,[s(p,{to:"/configuration/manifest.html"},{default:o((()=>[u])),_:1}),d]),a("li",null,[s(p,{to:"/configuration/routing.html"},{default:o((()=>[f])),_:1}),m]),a("li",null,[s(p,{to:"/configuration/i18n.html"},{default:o((()=>[h])),_:1}),b]),a("li",null,[s(p,{to:"/configuration/development.html"},{default:o((()=>[g])),_:1}),k])]),y,a("ul",null,[a("li",null,[s(p,{to:"/requests.html"},{default:o((()=>[w])),_:1})]),a("li",null,[s(p,{to:"/form.html"},{default:o((()=>[v])),_:1})])])],64)};export{p as default};
