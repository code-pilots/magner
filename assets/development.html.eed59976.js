import{r as o,o as c,c as l,a as s,d as e,w as t,F as r,e as a,b as n}from"./app.92ad5328.js";import{_ as u}from"./plugin-vue_export-helper.21dcd24c.js";const i={},k=a(`<h1 id="development-controller" tabindex="-1"><a class="header-anchor" href="#development-controller" aria-hidden="true">#</a> Development controller</h1><p>This is how development controller looks like from far away:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> developmentController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;core/controllers&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> development <span class="token operator">=</span> <span class="token function">developmentController</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  noBackendMode<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  urlParsers<span class="token punctuation">,</span>
  errorParser<span class="token punctuation">,</span>
  profileRequest<span class="token punctuation">,</span>
  validation<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="nobackendmode" tabindex="-1"><a class="header-anchor" href="#nobackendmode" aria-hidden="true">#</a> noBackendMode</h2><p>The flag is showing whether your app is ready to connect with backend or not. If set to <code>true</code>, login page will automatically authenticate you with any data passed to it, and the function checking your authentication and user role, would always allow you to any protected route.</p><h2 id="urlparsers" tabindex="-1"><a class="header-anchor" href="#urlparsers" aria-hidden="true">#</a> urlParsers</h2><p>The property await the controller to be passed:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> urlParsersController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;core/controllers&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> urlParsers <span class="token operator">=</span> <span class="token function">urlParsersController</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  dataToUrl<span class="token operator">:</span> <span class="token punctuation">(</span>data<span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&#39;?query=value&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  urlToData<span class="token operator">:</span> <span class="token punctuation">(</span>query<span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div>`,8),d=n("There are two functions which do opposite work: "),b=s("code",null,"dataToUrl",-1),m=n(" accepts any "),h=n("form data"),g=n(" and returns query string that will be passed to the GET request for some data from backend."),y=a(`<p><code>urlToData</code> takes the query object and proxies it to the form data. Query string, in this case, is parsed by the Vue router.</p><h2 id="errorparser" tabindex="-1"><a class="header-anchor" href="#errorparser" aria-hidden="true">#</a> errorParser</h2><p>This function is responsible for handling any error incoming from the backend requests:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> errorParserController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;core/controllers&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> errorParser <span class="token operator">=</span> <span class="token function">errorParserController</span><span class="token punctuation">(</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  fields<span class="token operator">:</span> err<span class="token operator">?.</span>data<span class="token operator">?.</span>errors<span class="token operator">?.</span>fields <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  message<span class="token operator">:</span> err<span class="token operator">?.</span>data<span class="token operator">?.</span>message <span class="token operator">||</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div>`,4),f=s("code",null,"errorParser",-1),w=n(" should return the object with "),_=s("code",null,"message",-1),v=n(" property explaining the error and the "),x=s("code",null,"fields",-1),q=n(" property. It is an object where key is the name of a form field (check "),T=n("generic forms explanation"),C=n(") and value is a string explaining the error in the field."),R=a(`<h2 id="profilerequest" tabindex="-1"><a class="header-anchor" href="#profilerequest" aria-hidden="true">#</a> profileRequest</h2><p>Function used every time user enters the app to check his/her authentication status and role:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> dataToProxy<span class="token punctuation">,</span> Response <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;app/requests/login&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> profileRequestController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;core/controllers&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">Response</span> <span class="token punctuation">{</span>
  result<span class="token operator">:</span> <span class="token punctuation">{</span>
    user<span class="token operator">:</span> <span class="token punctuation">{</span>
      id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span>
      login<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
      phone<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
      roleTitle<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
      roles<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  token<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> profileRequest <span class="token operator">=</span> <span class="token function">profileRequestController</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> api <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> res<span class="token operator">:</span> Response <span class="token operator">=</span> <span class="token keyword">await</span> api<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;auth/profile&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> proxied <span class="token operator">=</span> <span class="token punctuation">{</span>
      token<span class="token operator">:</span> res<span class="token punctuation">.</span>token<span class="token punctuation">,</span>
      role<span class="token operator">:</span> res<span class="token punctuation">.</span>result<span class="token punctuation">.</span>user<span class="token punctuation">.</span>roles<span class="token operator">?.</span>length <span class="token operator">?</span> res<span class="token punctuation">.</span>result<span class="token punctuation">.</span>user<span class="token punctuation">.</span>roles<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
      user<span class="token operator">:</span> res<span class="token punctuation">.</span>result<span class="token punctuation">.</span>user<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span> error<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> data<span class="token operator">:</span> proxied <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> error<span class="token operator">:</span> <span class="token string">&#39;Error&#39;</span><span class="token punctuation">,</span> data<span class="token operator">:</span> <span class="token keyword">null</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div>`,3),P=n("Function must return the object of restricted type wrapped in "),V=s("code",null,"RequestCallback",-1),j=n(" (read about it "),E=n('in "requests"'),F=n("):"),B=a(`<div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">ProfileRequestResponse</span> <span class="token punctuation">{</span>
  role<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  token<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
  user<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>`,1),N=n("After all, the "),D=s("code",null,"used",-1),I=n(" is saved in the store, "),M=s("code",null,"token",-1),S=n(" is kept in local storage and "),A=s("code",null,"role",-1),H=n(" is used to check any route change. How roles affect the routing "),L=n("is explained here"),U=n("."),z=a(`<h2 id="validators" tabindex="-1"><a class="header-anchor" href="#validators" aria-hidden="true">#</a> Validators</h2><p>Validator is an object that extends the pre-defined validators from the core of Magner.</p><p>To understand, let&#39;s see how validation is used over any field in any form:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">const</span> phoneField <span class="token operator">=</span> <span class="token punctuation">{</span>
  type<span class="token operator">:</span> <span class="token string">&#39;input&#39;</span><span class="token punctuation">,</span>
  name<span class="token operator">:</span> <span class="token string">&#39;phone&#39;</span><span class="token punctuation">,</span>
  validation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">&#39;phone&#39;</span><span class="token punctuation">,</span>
    trigger<span class="token operator">:</span> <span class="token string">&#39;blur&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">&#39;empty&#39;</span><span class="token punctuation">,</span>
    trigger<span class="token operator">:</span> <span class="token string">&#39;blur&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  props<span class="token operator">:</span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">&#39;tel&#39;</span><span class="token punctuation">,</span>
    placeholder<span class="token operator">:</span> <span class="token string">&#39;+7-000-000-00-00&#39;</span><span class="token punctuation">,</span>
    mask<span class="token operator">:</span> <span class="token punctuation">{</span>
      mask<span class="token operator">:</span> <span class="token string">&#39;+7-###-###-##-##&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>Therefore, <code>validation</code> property is used always in the same way: it specifies on which event it will fire (possible are <code>blur</code> or <code>change</code>), and which type of validator to run. You can pass an array of validations to apply several checks on a field.</p><p>The list of pre-defined validators is very limited:</p><ul><li><code>empty</code> - Special function. Works as a &#39;required&#39; field and is disabled when editing the entity form (to allow PATCH method)</li><li><code>password</code> \u2013 Check if a field is longer than 6 symbols</li><li><code>email</code> \u2013 Check if email is valid</li></ul><p>Validation can be easily customized. Just define the controller:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> validationController<span class="token punctuation">,</span> TranslateError<span class="token punctuation">,</span> translate <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;magner&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> validation <span class="token operator">=</span> <span class="token function">validationController</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function-variable function">passwordConfirm</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> value<span class="token punctuation">,</span> form <span class="token punctuation">}</span><span class="token punctuation">,</span> callback<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">&amp;&amp;</span> form<span class="token punctuation">.</span>password <span class="token operator">!==</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">TranslateError</span><span class="token punctuation">(</span><span class="token string">&#39;Passwords do not match!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Returns translation into the currently selected language (check i18n configuration)</span>
      <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">TranslateError</span><span class="token punctuation">(</span><span class="token function">translate</span><span class="token punctuation">(</span><span class="token string">&#39;validations.password&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>First argument of the custom validator is a data you can use to check field&#39;s value. Second argument is callback. If callback argument is <code>new Error(&quot;message&quot;)</code>, the error will be shown over the field.</p>`,10);function G(J,Q){const p=o("RouterLink");return c(),l(r,null,[k,s("p",null,[d,b,m,e(p,{to:"/docs/form.html"},{default:t(()=>[h]),_:1}),g]),y,s("p",null,[f,w,_,v,x,q,e(p,{to:"/docs/form.html"},{default:t(()=>[T]),_:1}),C]),R,s("p",null,[P,V,j,e(p,{to:"/docs/requests.html"},{default:t(()=>[E]),_:1}),F]),B,s("p",null,[N,D,I,M,S,A,H,e(p,{to:"/configuration/routing.html"},{default:t(()=>[L]),_:1}),U]),z],64)}var K=u(i,[["render",G]]);export{K as default};