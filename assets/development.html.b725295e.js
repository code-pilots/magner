import{r as n,o as s,c as a,a as p,d as e,w as t,F as o,e as l,b as c}from"./app.c75e1bb6.js";const r={},u=l('<h1 id="development-controller" tabindex="-1"><a class="header-anchor" href="#development-controller" aria-hidden="true">#</a> Development controller</h1><p>This is how development controller looks like from far away:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> developmentController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;core/controllers&#39;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> development <span class="token operator">=</span> <span class="token function">developmentController</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  noBackendMode<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n  urlParsers<span class="token punctuation">,</span>\n  errorParser<span class="token punctuation">,</span>\n  profileRequest<span class="token punctuation">,</span>\n  validation<span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="nobackendmode" tabindex="-1"><a class="header-anchor" href="#nobackendmode" aria-hidden="true">#</a> noBackendMode</h2><p>The flag is showing whether your app is ready to connect with backend or not. If set to <code>true</code>, login page will automatically authenticate you with any data passed to it, and the function checking your authentication and user role, would always allow you to any protected route.</p><h2 id="urlparsers" tabindex="-1"><a class="header-anchor" href="#urlparsers" aria-hidden="true">#</a> urlParsers</h2><p>The property await the controller to be passed:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> urlParsersController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;core/controllers&#39;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> urlParsers <span class="token operator">=</span> <span class="token function">urlParsersController</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  dataToUrl<span class="token operator">:</span> <span class="token punctuation">(</span>data<span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token string">&#39;?query=value&#39;</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  urlToData<span class="token operator">:</span> <span class="token punctuation">(</span>query<span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div>',8),i=c("There are two functions which do opposite work: "),k=p("code",null,"dataToUrl",-1),d=c(" accepts any "),b=c("form data"),m=c(" and returns query string that will be passed to the GET request for some data from backend."),h=l('<p><code>urlToData</code> takes the query object and proxies it to the form data. Query string, in this case, is parsed by the Vue router.</p><h2 id="errorparser" tabindex="-1"><a class="header-anchor" href="#errorparser" aria-hidden="true">#</a> errorParser</h2><p>This function is responsible for handling any error incoming from the backend requests:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> errorParserController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;core/controllers&#39;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> errorParser <span class="token operator">=</span> <span class="token function">errorParserController</span><span class="token punctuation">(</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n  fields<span class="token operator">:</span> err<span class="token operator">?.</span>data<span class="token operator">?.</span>errors<span class="token operator">?.</span>fields <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n  message<span class="token operator">:</span> err<span class="token operator">?.</span>data<span class="token operator">?.</span>message <span class="token operator">||</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div>',4),g=p("code",null,"errorParser",-1),y=c(" should return the object with "),f=p("code",null,"message",-1),w=c(" property explaining the error and the "),v=p("code",null,"fields",-1),x=c(" property. It is an object where key is the name of a form field (check "),q=c("generic forms explanation"),T=c(") and value is a string explaining the error in the field."),R=l('<h2 id="profilerequest" tabindex="-1"><a class="header-anchor" href="#profilerequest" aria-hidden="true">#</a> profileRequest</h2><p>Function used every time user enters the app to check his/her authentication status and role:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> dataToProxy<span class="token punctuation">,</span> Response <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;app/requests/login&#39;</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> profileRequestController <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;core/controllers&#39;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">Response</span> <span class="token punctuation">{</span>\n  result<span class="token operator">:</span> <span class="token punctuation">{</span>\n    user<span class="token operator">:</span> <span class="token punctuation">{</span>\n      id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span>\n      login<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>\n      phone<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>\n      roleTitle<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>\n      roles<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  token<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> profileRequest <span class="token operator">=</span> <span class="token function">profileRequestController</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> api <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">try</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> res<span class="token operator">:</span> Response <span class="token operator">=</span> <span class="token keyword">await</span> api<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;auth/profile&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">const</span> proxied <span class="token operator">=</span> <span class="token punctuation">{</span>\n      token<span class="token operator">:</span> res<span class="token punctuation">.</span>token<span class="token punctuation">,</span>\n      role<span class="token operator">:</span> res<span class="token punctuation">.</span>result<span class="token punctuation">.</span>user<span class="token punctuation">.</span>roles<span class="token operator">?.</span>length <span class="token operator">?</span> res<span class="token punctuation">.</span>result<span class="token punctuation">.</span>user<span class="token punctuation">.</span>roles<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>\n      user<span class="token operator">:</span> res<span class="token punctuation">.</span>result<span class="token punctuation">.</span>user<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">return</span> <span class="token punctuation">{</span> error<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> data<span class="token operator">:</span> proxied <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span> error<span class="token operator">:</span> <span class="token string">&#39;Error&#39;</span><span class="token punctuation">,</span> data<span class="token operator">:</span> <span class="token keyword">null</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div>',3),C=c("Function must return the object of restricted type wrapped in "),P=p("code",null,"RequestCallback",-1),j=c(" (read about it "),E=c('in "requests"'),F=c("):"),V=l('<div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">ProfileRequestResponse</span> <span class="token punctuation">{</span>\n  role<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>\n  token<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>\n  user<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>',1),_=c("After all, the "),D=p("code",null,"used",-1),I=c(" is saved in the store, "),M=p("code",null,"token",-1),A=c(" is kept in local storage and "),B=p("code",null,"role",-1),H=c(" is used to check any route change. How roles affect the routing "),S=c("is explained here"),U=c("."),z=l('<h2 id="validators" tabindex="-1"><a class="header-anchor" href="#validators" aria-hidden="true">#</a> Validators</h2><p>Validator is an object that extends the pre-defined validators from the core of Magner.</p><p>To understand, let&#39;s see how validation is used over any field in any form:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">const</span> phoneField <span class="token operator">=</span> <span class="token punctuation">{</span>\n  type<span class="token operator">:</span> <span class="token string">&#39;input&#39;</span><span class="token punctuation">,</span>\n  name<span class="token operator">:</span> <span class="token string">&#39;phone&#39;</span><span class="token punctuation">,</span>\n  validation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>\n    type<span class="token operator">:</span> <span class="token string">&#39;phone&#39;</span><span class="token punctuation">,</span>\n    trigger<span class="token operator">:</span> <span class="token string">&#39;blur&#39;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    type<span class="token operator">:</span> <span class="token string">&#39;empty&#39;</span><span class="token punctuation">,</span>\n    trigger<span class="token operator">:</span> <span class="token string">&#39;blur&#39;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  props<span class="token operator">:</span> <span class="token punctuation">{</span>\n    type<span class="token operator">:</span> <span class="token string">&#39;tel&#39;</span><span class="token punctuation">,</span>\n    placeholder<span class="token operator">:</span> <span class="token string">&#39;+7-000-000-00-00&#39;</span><span class="token punctuation">,</span>\n    mask<span class="token operator">:</span> <span class="token punctuation">{</span>\n      mask<span class="token operator">:</span> <span class="token string">&#39;+7-###-###-##-##&#39;</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>Therefore, <code>validation</code> property is used always in the same way: it specifies on which event it will fire (possible are <code>blur</code> or <code>change</code>), and which type of validator to run. You can pass an array of validations to apply several checks on a field.</p><p>The list of pre-defined validators is very limited:</p><ul><li><code>empty</code> - Special function. Works as a &#39;required&#39; field and is disabled when editing the entity form (to allow PATCH method)</li><li><code>password</code> – Check if a field is longer than 6 symbols</li><li><code>email</code> – Check if email is valid</li></ul><p>Validation can be easily customized. Just define the controller:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> validationController<span class="token punctuation">,</span> TranslateError<span class="token punctuation">,</span> translate <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;magner&#39;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> validation <span class="token operator">=</span> <span class="token function">validationController</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token function-variable function">passwordConfirm</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> value<span class="token punctuation">,</span> form <span class="token punctuation">}</span><span class="token punctuation">,</span> callback<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">&amp;&amp;</span> form<span class="token punctuation">.</span>password <span class="token operator">!==</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">TranslateError</span><span class="token punctuation">(</span><span class="token string">&#39;Passwords do not match!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// Returns translation into the currently selected language (check i18n configuration)</span>\n      <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">TranslateError</span><span class="token punctuation">(</span><span class="token function">translate</span><span class="token punctuation">(</span><span class="token string">&#39;validations.password&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n      <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>First argument of the custom validator is a data you can use to check field&#39;s value. Second argument is callback. If callback argument is <code>new Error(&quot;message&quot;)</code>, the error will be shown over the field.</p>',10);r.render=function(l,c){const r=n("RouterLink");return s(),a(o,null,[u,p("p",null,[i,k,d,e(r,{to:"/docs/form.html"},{default:t((()=>[b])),_:1}),m]),h,p("p",null,[g,y,f,w,v,x,e(r,{to:"/docs/form.html"},{default:t((()=>[q])),_:1}),T]),R,p("p",null,[C,P,j,e(r,{to:"/docs/requests.html"},{default:t((()=>[E])),_:1}),F]),V,p("p",null,[_,D,I,M,A,B,H,e(r,{to:"/configuration/routing.html"},{default:t((()=>[S])),_:1}),U]),z],64)};export{r as default};