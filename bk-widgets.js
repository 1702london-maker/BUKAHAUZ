/* ============================================================
   BUKAHAUZ — Floating WhatsApp + AI Chat Widget (Ope)
   ============================================================ */
(function(){

var WA_NUMBER = '447493099125';
var OPENAI_KEY = window.BK_AI_KEY || '';
var BRAND_GREEN = '#466556';
var BRAND_RUST  = '#8f4c37';

var SYSTEM_PROMPT = 'You are Ope, the AI concierge for Bukahauz — a premium Afro-Continental and Afro-Fusion dining brand based in London. You are warm, knowledgeable, professional and persuasive. Your goal is to help visitors understand the brand, answer questions, and convert enquiries into bookings.\n\nABOUT BUKAHAUZ:\nBukahauz creates extraordinary dining experiences rooted in West African tradition, refined for the modern table. Every plate honours ancestral technique and seasonal ingredients. Based in London, UK.\n\nWHAT WE OFFER:\n- Private Dining: Bespoke dining experiences in your own home or venue. Catered by our chef team. From £45pp.\n- Chef Experiences: Personal chef visits, cook-along sessions, exclusive tasting menus.\n- Wine Tastings: Curated French wine flights, Champagne, rare spirits and Sommelier pairing experiences.\n- Food Truck: Afro-Continental street food at events, festivals and private hire. Next launch Winter 2026.\n- Networking Events: Premium dining experiences for corporate and professional networks.\n- Catering: Full-service catering for weddings, corporate events, and celebrations.\n\nAFRO-CONTINENTAL MENU:\n- White Rice with Chicken Breast £16.95 | Turkey £17.95 | Mackerel £18.95 | Tilapia £19.95 | Catfish £20.95\n- Jollof Rice with Chicken Breast £17.95 | Turkey £18.95 | Mackerel £19.95 | Tilapia £20.95 | Catfish £21.95\n- Plantain Burgers: Chicken Breast £15.95 | Turkey £16.95\n- Sweet Potato Waffles from £16.95 | Plantain Waffles from £16.95\n- Fried Plantain from £14.95 | Sweet Potato Strip Fries from £14.95 | Plantain Cups from £15.95\n\nAFRO-FUSION MENU:\n- Suya Alfredo Pasta £22 | Coconut Curry Seafood Linguine £26 | Jollof Risotto £24\n- Suya Steak Bowl £28 | Jerk Salmon Royale £27 | Prawn Coconut Rice £23\n\nWINE:\n- Les Arranges du Rhum: Glass £14 | Bottle £69\n- Vieux Marc Club 1911: Glass £20 | Bottle £116\n- Ratafia Jean Goyard: Glass £17 | Bottle £93\n\nBOOKING & CONTACT:\n- Email: booking@bukahauz.com\n- WhatsApp: +44 7493 099125\n- Book online: bukahauz.com/book\n\nRULES:\n1. Be warm and enthusiastic about the food and brand.\n2. Give prices clearly and suggest booking.\n3. Guide interested visitors toward booking via WhatsApp or email.\n4. Keep responses concise — 2-4 sentences max unless detail is needed.\n5. If unsure, offer to connect them with booking@bukahauz.com.';

var style = document.createElement('style');
style.textContent = '#bk-float-btns{position:fixed;bottom:28px;right:24px;display:flex;flex-direction:column;align-items:flex-end;gap:12px;z-index:9000;}#bk-wa-btn{width:54px;height:54px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.22);transition:transform .2s;text-decoration:none;}#bk-wa-btn:hover{transform:scale(1.1);}#bk-wa-btn svg{width:28px;height:28px;fill:#fff;}#bk-chat-btn{width:54px;height:54px;border-radius:50%;background:'+BRAND_GREEN+';display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.22);transition:transform .2s;border:none;}#bk-chat-btn:hover{transform:scale(1.1);}#bk-chat-btn svg{width:26px;height:26px;fill:#fff;}#bk-chat-badge{position:absolute;top:-4px;right:-4px;width:18px;height:18px;border-radius:50%;background:'+BRAND_RUST+';color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif;}#bk-chat{position:fixed;bottom:100px;right:24px;width:360px;max-width:calc(100vw - 32px);background:#fff;border-radius:4px;box-shadow:0 8px 40px rgba(0,0,0,.18);display:none;flex-direction:column;z-index:9001;overflow:hidden;font-family:Inter,sans-serif;}#bk-chat.open{display:flex;}#bk-chat-head{background:'+BRAND_GREEN+';padding:16px 20px;display:flex;align-items:center;gap:12px;justify-content:space-between;}#bk-chat-head-left{display:flex;align-items:center;gap:12px;}#bk-chat-avatar{width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:16px;color:#fff;font-weight:700;}#bk-chat-title{color:#fff;font-size:14px;font-weight:600;letter-spacing:.02em;}#bk-chat-sub{color:rgba(255,255,255,.7);font-size:11px;margin-top:2px;}#bk-chat-close{background:none;border:none;cursor:pointer;color:rgba(255,255,255,.7);font-size:20px;line-height:1;padding:0;}#bk-chat-close:hover{color:#fff;}#bk-chat-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;max-height:340px;min-height:200px;}  .bk-msg{max-width:82%;padding:10px 14px;font-size:13px;line-height:1.5;border-radius:2px;word-break:break-word;}.bk-msg-ai{background:#f4f6f4;color:#1a1c1b;align-self:flex-start;}.bk-msg-user{background:'+BRAND_GREEN+';color:#fff;align-self:flex-end;}.bk-msg-typing{display:flex;gap:4px;align-items:center;padding:12px 14px;}.bk-dot{width:7px;height:7px;border-radius:50%;background:#aaa;animation:bkDot 1.2s infinite;}.bk-dot:nth-child(2){animation-delay:.2s;}.bk-dot:nth-child(3){animation-delay:.4s;}@keyframes bkDot{0%,80%,100%{transform:scale(.8);opacity:.5;}40%{transform:scale(1.1);opacity:1;}}#bk-chat-foot{border-top:1px solid #eee;padding:12px 16px;display:flex;gap:8px;}#bk-chat-input{flex:1;border:1px solid #ddd;padding:10px 14px;font-size:13px;font-family:Inter,sans-serif;color:#1a1c1b;outline:none;border-radius:2px;resize:none;}#bk-chat-input:focus{border-color:'+BRAND_GREEN+';}#bk-chat-send{background:'+BRAND_GREEN+';color:#fff;border:none;padding:10px 14px;cursor:pointer;font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;border-radius:2px;}#bk-chat-send:hover{opacity:.9;}#bk-chat-suggest{display:flex;flex-wrap:wrap;gap:6px;padding:0 16px 12px;}.bk-suggest-btn{background:#f4f6f4;border:1px solid #ddd;padding:5px 10px;font-size:11px;font-family:Inter,sans-serif;cursor:pointer;color:#1a1c1b;border-radius:2px;}.bk-suggest-btn:hover{background:'+BRAND_GREEN+';color:#fff;border-color:'+BRAND_GREEN+';}';
document.head.appendChild(style);

var html = '<div id="bk-float-btns"><div id="bk-chat" class=""><div id="bk-chat-head"><div id="bk-chat-head-left"><div id="bk-chat-avatar">O</div><div><div id="bk-chat-title">Ope — Bukahauz Concierge</div><div id="bk-chat-sub">Usually replies instantly</div></div></div><button id="bk-chat-close" onclick="bkChatToggle()">×</button></div><div id="bk-chat-msgs"></div><div id="bk-chat-suggest"><button class="bk-suggest-btn" onclick="bkSuggest(\'What experiences do you offer?\')">Experiences</button><button class="bk-suggest-btn" onclick="bkSuggest(\'How do I book private dining?\')">Private Dining</button><button class="bk-suggest-btn" onclick="bkSuggest(\'Show me menu and prices\')">Menu & Prices</button><button class="bk-suggest-btn" onclick="bkSuggest(\'Tell me about the food truck\')">Food Truck</button></div><div id="bk-chat-foot"><textarea id="bk-chat-input" rows="1" placeholder="Ask me anything about Bukahauz..."></textarea><button id="bk-chat-send" onclick="bkSend()">Send</button></div></div><div style="position:relative;"><button id="bk-chat-btn" onclick="bkChatToggle()" title="Chat with Ope"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg></button><div id="bk-chat-badge" style="display:none;">1</div></div><a id="bk-wa-btn" href="https://wa.me/'+WA_NUMBER+'?text=Hi%20Bukahauz%2C%20I%27d%20like%20to%20make%20an%20enquiry" target="_blank" rel="noopener" title="WhatsApp us"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a></div>';
document.body.insertAdjacentHTML('beforeend', html);

var history = [{role:'system',content:SYSTEM_PROMPT}];
var chatOpen = false;
var greeted = false;

window.bkChatToggle = function(){
  chatOpen = !chatOpen;
  var win = document.getElementById('bk-chat');
  if(chatOpen){win.classList.add('open');document.getElementById('bk-chat-badge').style.display='none';if(!greeted){bkGreet();greeted=true;}setTimeout(function(){document.getElementById('bk-chat-input').focus();},100);}else{win.classList.remove('open');}
};

function bkGreet(){bkAddMsg('ai','Welcome to Bukahauz 🌿 I\'m Ope, your personal concierge. Whether you\'re looking to book a private dining experience, explore our menu, or just find out more — I\'m here to help. What can I do for you today?');}

window.bkSuggest = function(text){document.getElementById('bk-chat-input').value=text;bkSend();};

window.bkSend = function(){
  var input=document.getElementById('bk-chat-input');
  var text=input.value.trim();
  if(!text)return;
  input.value='';
  bkAddMsg('user',text);
  history.push({role:'user',content:text});
  bkThink();
};

document.addEventListener('DOMContentLoaded',function(){
  var inp=document.getElementById('bk-chat-input');
  if(inp)inp.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();bkSend();}});
});

function bkAddMsg(role,text){
  var msgs=document.getElementById('bk-chat-msgs');
  var div=document.createElement('div');
  div.className='bk-msg bk-msg-'+role;
  div.textContent=text;
  msgs.appendChild(div);
  msgs.scrollTop=msgs.scrollHeight;
  return div;
}

function bkThink(){
  if(!OPENAI_KEY){bkAddMsg('ai','Chat is loading… or reach us at booking@bukahauz.com');return;}
  var msgs=document.getElementById('bk-chat-msgs');
  var typing=document.createElement('div');
  typing.className='bk-msg bk-msg-ai bk-msg-typing';
  typing.id='bk-typing';
  typing.innerHTML='<span class="bk-dot"></span><span class="bk-dot"></span><span class="bk-dot"></span>';
  msgs.appendChild(typing);
  msgs.scrollTop=msgs.scrollHeight;
  fetch('https://api.openai.com/v1/chat/completions',{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':'Bearer '+OPENAI_KEY},
    body:JSON.stringify({model:'gpt-4o-mini',messages:history,max_tokens:300,temperature:0.7})
  }).then(function(r){return r.json();}).then(function(data){
    var t=document.getElementById('bk-typing');if(t)t.remove();
    var reply=data.choices&&data.choices[0]?data.choices[0].message.content:'I\'m having a moment — please WhatsApp us at +44 7493 099125 or email booking@bukahauz.com.';
    history.push({role:'assistant',content:reply});
    bkAddMsg('ai',reply);
  }).catch(function(){
    var t=document.getElementById('bk-typing');if(t)t.remove();
    bkAddMsg('ai','Sorry, I\'m having trouble connecting. Reach us at booking@bukahauz.com or WhatsApp +44 7493 099125.');
  });
}

setTimeout(function(){if(!chatOpen&&!greeted){document.getElementById('bk-chat-badge').style.display='flex';}},8000);
})();