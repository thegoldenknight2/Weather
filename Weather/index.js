(function(n,d,u){"use strict";const{sendBotMessage:a}=u.findByProps("sendBotMessage");let i;var s={onLoad(){i=d.registerCommand({name:"weather",displayName:"weather",description:"Get the current weather for a city",displayDescription:"Get the current weather for a city",type:1,inputType:1,options:[{name:"city",displayName:"city",description:"The city to get weather for",displayDescription:"The city to get weather for",type:3,required:!0}],execute:async function(y,r){const o=y.find(function(t){return t.name==="city"})?.value;if(o)try{const t=await(await fetch(`https://wttr.in/${encodeURIComponent(o)}?format=j1`)).json(),e=t.current_condition[0],c=t.nearest_area[0],h=c.areaName[0].value,l=c.country[0].value,m=e.temp_C,p=e.temp_F,f=e.FeelsLikeC,F=e.FeelsLikeF,w=e.humidity,$=e.windspeedKmph,v=e.weatherDesc[0].value;a(r.channel.id,`\u{1F324}\uFE0F **Weather in ${h}, ${l}**

**${v}**
\u{1F321}\uFE0F Temp: ${m}\xB0C / ${p}\xB0F
\u{1F914} Feels like: ${f}\xB0C / ${F}\xB0F
\u{1F4A7} Humidity: ${w}%
\u{1F4A8} Wind: ${$} km/h`)}catch{a(r.channel.id,"\u274C Could not find weather for that city. Try again!")}}})},onUnload(){i?.()}};return n.default=s,Object.defineProperty(n,"__esModule",{value:!0}),n})({},vendetta.commands,vendetta.metro);
